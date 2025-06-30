"use client";

import { useState, useRef, useEffect, ChangeEvent, useMemo, useCallback, memo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ChevronDown } from "lucide-react";
import { FieldProps } from "formik";
import { cn } from "@app/utils";

type DropdownProps = {
  className?: string;
  placeholder?: string;
  values?: any[];
  defaultSelected?: any;
  onSelect?: (value: any, index: number) => void;
  itemMapper?: (value: any) => string;
  selectMapper?: <K>(value: any) => K;
  isLoading?: boolean;
  isNotFormField?: boolean;
  enableSearch?: boolean;
};

const Dropdown = ({
  className,
  placeholder = "Select an option",
  values = [],
  defaultSelected,
  onSelect,
  itemMapper,
  selectMapper,
  field,
  isLoading = false,
  enableSearch = true,
  form,
}: DropdownProps & Partial<FieldProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectItem = useCallback(
    (item: any, index: number) => {
      if (onSelect) {
        onSelect(selectMapper ? selectMapper(item) : item, index);
      } else if (form && field && field.name) {
        form.setFieldValue(field.name, item);
      }
      setSelectedItem(item);
      setIsOpen(false);
    },
    [onSelect, selectMapper, form, field],
  );

  useEffect(() => {
    if (field?.value || defaultSelected) {
      setSelectedItem(field?.value || defaultSelected);
    }
  }, [defaultSelected, field?.value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSearch = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  }, 300);

  const displayValues = useMemo(() => {
    if (searchTerm === "") return values;
    return values.filter((value: any) => {
      if (typeof value === "string" || typeof value === "number") {
        return value.toString().toLowerCase().includes(searchTerm);
      }

      if (typeof value === "object") {
        return Object.entries(value as Object).some(([_, val]) => val.toString().toLowerCase().includes(searchTerm));
      }
    });
  }, [values, searchTerm]);

  const displayValue = useMemo(
    () => (selectedItem ? (itemMapper ? itemMapper(selectedItem) : String(selectedItem)) : placeholder),
    [selectedItem, itemMapper, placeholder],
  );

  return (
    <div ref={dropdownRef} className={cn("relative")}>
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2 border rounded-md cursor-pointer shadow-sm h-14",
          className,
        )}
        onClick={handleToggleDropdown}
      >
        <span className={cn("text-sm", selectedItem ? "" : "text-gray-400")}>{displayValue}</span>
        <ChevronDown size={16} />
      </div>

      {isOpen && (
        <ul className="absolute left-0 right-0 z-10 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto custom-scroll">
          {enableSearch && (
            <div className="w-full p-3">
              <input
                className="w-full p-3 border text-xs md:text-sm rounded"
                placeholder="Tìm kiếm..."
                onChange={onSearch}
              />
            </div>
          )}

          {isLoading ? (
            <li className="p-4 cursor-pointer text-sm hover:bg-gray-200 text-center">Đang tải...</li>
          ) : (
            displayValues.map((item, index) => (
              <li
                key={`${item}:${index}`}
                className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-200"
                onClick={() => handleSelectItem(item, index)}
              >
                {itemMapper ? itemMapper(item) : String(item)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default memo(Dropdown);

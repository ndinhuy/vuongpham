"use client";

import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useListing = <T extends Object>(dataSource: Array<T> = []) => {
  const [displayItems, setDisplayItems] = useState<Array<T>>([]);

  useEffect(() => {
    if (dataSource) {
      setDisplayItems(dataSource);
    }
  }, [dataSource]);

  const onSearchChange = useCallback(
    useDebouncedCallback((query: string) => {
      if (query) {
        setDisplayItems(searchFilterByStringQuery<T>(query, dataSource));
      } else {
        setDisplayItems(dataSource);
      }
    }, 300),
    [dataSource],
  );

  const onFieldFilterChange = useCallback(
    (fieldName: keyof T, query: "-" | string) => {
      if (query === "-") {
        setDisplayItems(dataSource);
      } else {
        setDisplayItems(searchFilterByField<T>(query, fieldName, dataSource));
      }
    },
    [dataSource],
  );

  const searchFilterByStringQuery = <T extends Object>(query: string, dataSource?: Array<T>): SetStateAction<any> => {
    return (prevState: Array<T>) => {
      return (dataSource || prevState).filter((item: T) => {
        return Object.values(item).some((fieldValue) =>
          fieldValue.toString().toLowerCase().includes(query.toLowerCase()),
        );
      });
    };
  };

  const searchFilterByField = <T>(query: string, field: keyof T, dataSource?: Array<T>): SetStateAction<any> => {
    return (prevState: Array<T>) => {
      return (dataSource || prevState).filter((item: T) => {
        return item[field]?.toString().toLowerCase().includes(query.toLowerCase());
      });
    };
  };

  return {
    displayItems,
    setDisplayItems,
    onSearchChange,
    onFieldFilterChange,
  };
};

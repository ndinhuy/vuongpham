"use client";

import { cn } from "@app/utils";
import React, { ForwardedRef, forwardRef, ReactNode, useImperativeHandle, useState } from "react";

interface ModalProps {
  toggle: ReactNode;
  children?: ReactNode;
  title: string;
  enableHeading?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const getModalSize = (size: string) => {
  switch (size) {
    case "sm":
      return "lg:max-w-md max-w-lg";
    case "md":
      return "lg:max-w-lg max-w-4xl";
    case "lg":
      return "lg:max-w-4xl max-w-6xl";
    case "xl":
      return "lg:max-w-6xl";
    case "full":
      return "";
  }
};

const Modal = forwardRef<any, ModalProps>(
  ({ enableHeading = true, toggle, children, title, size }, ref: ForwardedRef<any>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    return (
      <>
        {React.isValidElement(toggle) &&
          React.cloneElement(toggle as React.ReactElement, {
            onClick: toggleModal,
          })}

        {isOpen && (
          <div
            id="select-modal"
            tabIndex={-1}
            className="fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-overlay"
          >
            <div ref={ref} className={cn("relative p-4 w-full max-h-[90vh]", getModalSize(size || "sm"))}>
              <div className="relative bg-white rounded-lg shadow transition-all pop-up-show">
                {enableHeading && (
                  <div className="flex items-center justify-between p-4 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                      onClick={toggleModal}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                )}

                {/* Modal body */}
                <div className="max-h-[80vh] overflow-y-auto">{children}</div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  },
);

Modal.displayName = "Modal";

export default Modal;

"use client";

import { cn } from "@app/utils";
import { FC, useRef } from "react";

interface FileUploaderProps {
  onFilesSelect: (files: File[]) => void;
  className?: string;
}

const FileUploader: FC<FileUploaderProps> = ({ onFilesSelect, className }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    onFilesSelect(fileArray);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex flex-col items-center justify-center w-full h-[300px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all",
          className,
        )}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click để tải lên</span> hoặc kéo thả file
          </p>
          <p className="text-xs text-gray-500">PNG, JPG</p>
        </div>

        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUploader;

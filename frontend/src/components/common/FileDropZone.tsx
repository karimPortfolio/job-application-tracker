"use client";

import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FileDropZoneProps {
  acceptedTypes?: string[];
  maxSize?: number; // in bytes
  onFileSelect: (file: File) => void;
  onError?: (error: string) => void;
  onFileClear?: () => void;
  disabled?: boolean;
  label?: string;
  description?: string;
}

export function FileDropZone({
  acceptedTypes = ["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  maxSize = 2 * 1024 * 1024, // 2MB default
  onFileSelect,
  onError,
  onFileClear,
  disabled = false,
  label = "Upload File",
  description = "Drag and drop your file here, or click to select",
}: FileDropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback(
    (file: File): boolean => {
      // Check file type
      if (!acceptedTypes.includes(file.type)) {
        const types = acceptedTypes
          .map((t) => {
            if (t === "application/pdf") return "PDF";
            if (t === "text/plain") return "TXT";
            if (
              t === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
              return "DOCX";
            return t;
          })
          .join(", ");
        const errorMsg = `Invalid file type. Accepted types: ${types}`;
        setError(errorMsg);
        onError?.(errorMsg);
        return false;
      }

      // Check file size
      if (file.size > maxSize) {
        const sizeMB = (maxSize / (1024 * 1024)).toFixed(2);
        const errorMsg = `File size exceeds ${sizeMB}MB limit`;
        setError(errorMsg);
        onError?.(errorMsg);
        return false;
      }

      return true;
    },
    [acceptedTypes, maxSize, onError]
  );

  const handleFile = useCallback(
    (file: File) => {
      if (disabled) return;
      if (validateFile(file)) {
        setSelectedFile(file);
        setError(null);
        onFileSelect(file);
      }
    },
    [disabled, onFileSelect, validateFile]
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragActive(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [disabled, handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError(null);
    onFileClear?.();
  };

  const acceptString = acceptedTypes.join(",");

  return (
    <div className="w-full">
      <Label
        htmlFor="file-upload"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <Input
          id="file-upload"
          type="file"
          accept={acceptString}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
          aria-label="File upload"
        />

        {selectedFile ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
              type="button"
            >
              <X className="inline h-4 w-4" /> Clear
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </div>
        )}
      </Label>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
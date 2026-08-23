import React, { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  ArrowRight,
} from 'lucide-react';
import type { FileUploadInfo } from '../types';
import { SampleDocSelector } from './SampleDocSelector';
import type { SamplePost } from '../utils/sampleTexts';

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  onSampleSelected: (sample: SamplePost) => void;
  currentFile: FileUploadInfo | null;
  onClearFile: () => void;
  isLoading: boolean;
  onProceedToExtract: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
  onSampleSelected,
  currentFile,
  onClearFile,
  isLoading,
  onProceedToExtract,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  const MAX_SIZE_MB = 10;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const validateAndProcessFile = (file: File) => {
    setErrorMessage(null);

    if (file.size > MAX_SIZE_BYTES) {
      setErrorMessage(`File too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Limit is ${MAX_SIZE_MB}MB.`);
      return;
    }

    const fileType = file.type;
    const extension = file.name.split('.').pop()?.toLowerCase();
    const isValidFormat =
      ALLOWED_TYPES.includes(fileType) ||
      ['pdf', 'png', 'jpg', 'jpeg', 'webp'].includes(extension || '');

    if (!isValidFormat) {
      setErrorMessage('Unsupported format. Please upload PDF, PNG, JPG, or JPEG.');
      return;
    }

    onFileSelected(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-5">
      <SampleDocSelector onSelectSample={onSampleSelected} />

      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          onChange={handleFileChange}
          className="hidden"
        />

        {!currentFile ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-10 text-center cursor-pointer transition-colors flex flex-col items-center justify-center ${
              isDragging
                ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/50'
                : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mb-3">
              <UploadCloud className="w-5 h-5" />
            </div>

            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">
              Drag & drop your file here
            </h3>
            <p className="text-xs text-zinc-500 mb-3">
              or <span className="text-zinc-900 dark:text-zinc-100 font-semibold underline underline-offset-2">browse device</span>
            </p>

            <div className="flex items-center space-x-2 text-[11px] font-semibold text-zinc-500">
              <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">PDF</span>
              <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">PNG</span>
              <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">JPG</span>
              <span>(Max 10MB)</span>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100 font-bold text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>File Selected</span>
              </div>
              <button
                onClick={onClearFile}
                className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              {currentFile.previewUrl ? (
                <img
                  src={currentFile.previewUrl}
                  alt="Preview"
                  className="w-14 h-14 rounded-lg object-cover border border-zinc-200 dark:border-zinc-700"
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                  <FileText className="w-6 h-6" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {currentFile.name}
                </h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  {formatFileSize(currentFile.size)} • {currentFile.type.includes('pdf') ? 'PDF' : 'Image'}
                </p>
              </div>
            </div>

            <button
              onClick={onProceedToExtract}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-1.5 disabled:opacity-50"
            >
              <span>Extract Text & Analyze</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-between text-xs text-rose-700 dark:text-rose-300">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage(null)}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

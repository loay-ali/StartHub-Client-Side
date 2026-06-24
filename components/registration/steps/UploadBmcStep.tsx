"use client";

import { FiFileText, FiUploadCloud } from "react-icons/fi";

interface UploadBmcStepProps {
  selectedFile?: File | null;
  onFileSelect?: (file: File) => void;
}

export default function UploadBmcStep({
  selectedFile,
  onFileSelect,
}: UploadBmcStepProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onFileSelect?.(file);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-text-primary">
          Upload Your BMC
        </h2>

        <p className="mt-3 text-text-secondary">
          Upload your Business Model Canvas to receive an AI-powered score and
          analysis.
        </p>
      </div>

      <label className="block cursor-pointer">
        <div className="rounded-3xl border-2 border-dashed border-border bg-surface p-12 text-center transition hover:border-primary">
          <FiUploadCloud className="mx-auto mb-4 text-6xl text-primary" />

          <h3 className="text-xl font-semibold">Drag & Drop Your File</h3>

          <p className="mt-3 text-text-secondary">PDF, DOCX, PNG, JPG</p>

          <div className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-medium text-white">
            Browse Files
          </div>
        </div>

        <input
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {selectedFile && (
        <div className="mt-6 rounded-2xl border border-border bg-background p-5">
          <div className="flex items-center gap-4">
            <FiFileText className="text-3xl text-primary" />

            <div>
              <h4 className="font-semibold">{selectedFile.name}</h4>

              <p className="text-sm text-text-secondary">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

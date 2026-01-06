
import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSelect(e.target.files[0]);
    }
  };

  const validateAndSelect = (file: File) => {
    const validExtensions = ['xlsx', 'xls', 'csv'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension && validExtensions.includes(fileExtension)) {
      setError(null);
      onFileSelect(file);
    } else {
      setError("Please upload a valid Excel or CSV file.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-200 text-center ${
          dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-white'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          accept=".xlsx, .xls, .csv" 
          onChange={handleChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
          <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Upload className="w-8 h-8" />}
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-800">
              {isLoading ? 'Processing your work plan...' : 'Upload your work plan'}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Drag and drop your .xlsx or .csv file here
            </p>
          </div>
          {!isLoading && (
            <div className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
              Browse Files
            </div>
          )}
        </label>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Extract Tasks", desc: "Automated next-week filtering" },
          { title: "Group Team", desc: "Smart assignee identification" },
          { title: "Review & Send", desc: "Ready-to-go notifications" }
        ].map((feature, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3">
            <div className="bg-slate-100 w-8 h-8 rounded flex items-center justify-center text-slate-600 font-bold">
              {i + 1}
            </div>
            <div>
              <p className="font-medium text-slate-800 text-sm">{feature.title}</p>
              <p className="text-slate-500 text-xs">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;

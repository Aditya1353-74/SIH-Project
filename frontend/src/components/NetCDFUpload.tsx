'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface NetCDFFile {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  status: 'processing' | 'completed' | 'error';
  floatId?: string;
  location?: string;
  parameters?: string[];
}

export default function NetCDFUpload() {
  const [files, setFiles] = useState<NetCDFFile[]>([
    {
      id: '1',
      name: 'argo_float_2901234.nc',
      size: 2.4 * 1024 * 1024, // 2.4 MB
      uploadDate: '2024-01-15T10:30:00Z',
      status: 'completed',
      floatId: '2901234',
      location: 'Arabian Sea (15.5°N, 73.8°E)',
      parameters: ['Temperature', 'Salinity', 'Pressure', 'Oxygen']
    },
    {
      id: '2',
      name: 'argo_float_2901235.nc',
      size: 1.8 * 1024 * 1024, // 1.8 MB
      uploadDate: '2024-01-14T14:45:00Z',
      status: 'completed',
      floatId: '2901235',
      location: 'Bay of Bengal (12.3°N, 80.2°E)',
      parameters: ['Temperature', 'Salinity', 'BGC Parameters']
    },
    {
      id: '3',
      name: 'argo_float_2901236.nc',
      size: 3.2 * 1024 * 1024, // 3.2 MB
      uploadDate: '2024-01-13T08:15:00Z',
      status: 'processing',
      floatId: '2901236',
      location: 'Indian Ocean (8.7°N, 76.9°E)',
      parameters: ['Temperature', 'Salinity', 'Pressure']
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: NetCDFFile[] = acceptedFiles.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      uploadDate: new Date().toISOString(),
      status: 'processing' as const,
      floatId: Math.random().toString().substr(2, 7),
      location: 'Processing...',
      parameters: ['Analyzing...']
    }));

    setFiles(prev => [...newFiles, ...prev]);
    setIsProcessing(true);

    // Simulate file processing
    setTimeout(() => {
      setFiles(prev => prev.map(file => 
        newFiles.some(newFile => newFile.id === file.id) 
          ? {
              ...file,
              status: 'completed',
              location: `${(Math.random() * 30).toFixed(1)}°N, ${(Math.random() * 80 + 60).toFixed(1)}°E`,
              parameters: ['Temperature', 'Salinity', 'Pressure', 'Oxygen']
            }
          : file
      ));
      setIsProcessing(false);
    }, 3000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/x-netcdf': ['.nc'],
      'application/octet-stream': ['.nc']
    },
    multiple: true
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'processing': return '⏳';
      case 'error': return '✗';
      default: return '?';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Upload NetCDF Files</h3>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-pink-400 bg-pink-500/20' 
              : 'border-white/30 hover:border-pink-300 hover:bg-white/10'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-2xl">📁</span>
            </div>
            <div>
              <p className="text-white text-lg font-medium">
                {isDragActive ? 'Drop NetCDF files here' : 'Drag & drop NetCDF files here'}
              </p>
              <p className="text-white/70 text-sm mt-2">
                or click to select files
              </p>
            </div>
            <div className="text-white/60 text-xs">
              <p>Supported formats: .nc (NetCDF)</p>
              <p>Maximum file size: 100MB</p>
            </div>
          </div>
        </div>

        {isProcessing && (
          <div className="mt-4 p-4 bg-yellow-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-yellow-200 text-sm">Processing uploaded files...</span>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Uploaded Files</h3>
        
        <div className="space-y-3">
          {files.map((file) => (
            <div key={file.id} className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-white font-medium">{file.name}</span>
                    <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(file.status)}`}>
                      {getStatusIcon(file.status)} {file.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white/60">Size</p>
                      <p className="text-white/80">{formatFileSize(file.size)}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Upload Date</p>
                      <p className="text-white/80">{new Date(file.uploadDate).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Float ID</p>
                      <p className="text-white/80">{file.floatId}</p>
                    </div>
                  </div>
                  {file.status === 'completed' && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white/60">Location</p>
                        <p className="text-white/80">{file.location}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Parameters</p>
                        <p className="text-white/80">{file.parameters?.join(', ')}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    View Data
                  </button>
                  {file.status === 'completed' && (
                    <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm transition-colors">
                      Export
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h4 className="text-2xl font-bold text-white mb-1">{files.length}</h4>
          <p className="text-white/80 text-sm">Total Files</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h4 className="text-2xl font-bold text-white mb-1">
            {files.filter(f => f.status === 'completed').length}
          </h4>
          <p className="text-white/80 text-sm">Processed</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h4 className="text-2xl font-bold text-white mb-1">
            {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
          </h4>
          <p className="text-white/80 text-sm">Total Size</p>
        </div>
      </div>
    </div>
  );
}


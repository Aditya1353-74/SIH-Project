'use client';

import { useState } from 'react';

interface ExportOptions {
  format: 'ascii' | 'netcdf' | 'csv' | 'json';
  dataType: 'profiles' | 'timeSeries' | 'metadata' | 'all';
  dateRange: {
    start: string;
    end: string;
  };
  includeQualityFlags: boolean;
  includeMetadata: boolean;
}

export default function DataExport() {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'ascii',
    dataType: 'profiles',
    dateRange: {
      start: '2024-01-01',
      end: '2024-01-31'
    },
    includeQualityFlags: true,
    includeMetadata: true
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState([
    {
      id: '1',
      filename: 'argo_profiles_20240115.ascii',
      format: 'ASCII',
      size: '2.3 MB',
      date: '2024-01-15T10:30:00Z',
      status: 'completed'
    },
    {
      id: '2',
      filename: 'temperature_data_20240114.nc',
      format: 'NetCDF',
      size: '1.8 MB',
      date: '2024-01-14T14:45:00Z',
      status: 'completed'
    },
    {
      id: '3',
      filename: 'bgc_parameters_20240113.csv',
      format: 'CSV',
      size: '0.9 MB',
      date: '2024-01-13T08:15:00Z',
      status: 'completed'
    }
  ]);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      const newExport = {
        id: Date.now().toString(),
        filename: `argo_data_${new Date().toISOString().split('T')[0]}.${exportOptions.format === 'ascii' ? 'txt' : exportOptions.format}`,
        format: exportOptions.format.toUpperCase(),
        size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
        date: new Date().toISOString(),
        status: 'completed'
      };
      
      setExportHistory(prev => [newExport, ...prev]);
      setIsExporting(false);
    }, 3000);
  };

  const downloadFile = (filename: string) => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = `#download-${filename}`;
    link.download = filename;
    link.click();
  };

  const getFormatDescription = (format: string) => {
    const descriptions = {
      ascii: 'Plain text format with tab-separated values, suitable for analysis software',
      netcdf: 'Network Common Data Format, standard for oceanographic data',
      csv: 'Comma-separated values, compatible with Excel and most data tools',
      json: 'JavaScript Object Notation, structured format for web applications'
    };
    return descriptions[format as keyof typeof descriptions] || '';
  };

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Export Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Format Selection */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Export Format</label>
            <select
              value={exportOptions.format}
              onChange={(e) => setExportOptions(prev => ({ ...prev, format: e.target.value as any }))}
              className="w-full bg-white/20 text-white border border-white/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-pink-300"
            >
              <option value="ascii">ASCII (.txt)</option>
              <option value="netcdf">NetCDF (.nc)</option>
              <option value="csv">CSV (.csv)</option>
              <option value="json">JSON (.json)</option>
            </select>
            <p className="text-white/60 text-xs mt-1">{getFormatDescription(exportOptions.format)}</p>
          </div>

          {/* Data Type */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Data Type</label>
            <select
              value={exportOptions.dataType}
              onChange={(e) => setExportOptions(prev => ({ ...prev, dataType: e.target.value as any }))}
              className="w-full bg-white/20 text-white border border-white/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-pink-300"
            >
              <option value="profiles">Depth Profiles</option>
              <option value="timeSeries">Time Series</option>
              <option value="metadata">Metadata Only</option>
              <option value="all">All Data</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={exportOptions.dateRange.start}
              onChange={(e) => setExportOptions(prev => ({ 
                ...prev, 
                dateRange: { ...prev.dateRange, start: e.target.value }
              }))}
              className="w-full bg-white/20 text-white border border-white/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-pink-300"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              value={exportOptions.dateRange.end}
              onChange={(e) => setExportOptions(prev => ({ 
                ...prev, 
                dateRange: { ...prev.dateRange, end: e.target.value }
              }))}
              className="w-full bg-white/20 text-white border border-white/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-pink-300"
            />
          </div>
        </div>

        {/* Options */}
        <div className="mt-4 space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={exportOptions.includeQualityFlags}
              onChange={(e) => setExportOptions(prev => ({ ...prev, includeQualityFlags: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-white text-sm">Include Quality Flags</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={exportOptions.includeMetadata}
              onChange={(e) => setExportOptions(prev => ({ ...prev, includeMetadata: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-white text-sm">Include Metadata</span>
          </label>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full mt-6 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Exporting...
            </>
          ) : (
            <>
              <span className="mr-2">📊</span>
              Export Data
            </>
          )}
        </button>
      </div>

      {/* Export History */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Export History</h3>
        
        <div className="space-y-3">
          {exportHistory.map((export_) => (
            <div key={export_.id} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <p className="text-white font-medium">{export_.filename}</p>
                    <p className="text-white/60 text-sm">
                      {export_.format} • {export_.size} • {new Date(export_.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      export_.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {export_.status}
                    </span>
                    <button
                      onClick={() => downloadFile(export_.filename)}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h4 className="text-2xl font-bold text-white mb-1">12.4 GB</h4>
          <p className="text-white/80 text-sm">Total Data Exported</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h4 className="text-2xl font-bold text-white mb-1">247</h4>
          <p className="text-white/80 text-sm">Export Requests</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <h4 className="text-2xl font-bold text-white mb-1">98.5%</h4>
          <p className="text-white/80 text-sm">Success Rate</p>
        </div>
      </div>
    </div>
  );
}



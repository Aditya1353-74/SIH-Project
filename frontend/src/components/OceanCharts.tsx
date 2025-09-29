'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter } from 'recharts';

interface DepthTimeData {
  depth: number;
  temperature: number;
  salinity: number;
  oxygen: number;
  date: string;
}

interface ProfileData {
  depth: number;
  temperature: number;
  salinity: number;
  oxygen: number;
  floatId: string;
}

interface SeasonalData {
  month: string;
  temperature: number;
  salinity: number;
  chlorophyll: number;
}

export default function OceanCharts() {
  const [selectedChart, setSelectedChart] = useState<'depth-time' | 'profiles' | 'seasonal' | 'scatter'>('depth-time');

  // Dummy depth-time data
  const depthTimeData: DepthTimeData[] = [
    { depth: 0, temperature: 28.5, salinity: 35.2, oxygen: 220, date: '2024-01-01' },
    { depth: 50, temperature: 28.2, salinity: 35.3, oxygen: 215, date: '2024-01-01' },
    { depth: 100, temperature: 27.8, salinity: 35.4, oxygen: 210, date: '2024-01-01' },
    { depth: 200, temperature: 25.5, salinity: 35.6, oxygen: 190, date: '2024-01-01' },
    { depth: 500, temperature: 18.2, salinity: 35.8, oxygen: 150, date: '2024-01-01' },
    { depth: 1000, temperature: 8.5, salinity: 36.2, oxygen: 120, date: '2024-01-01' },
    { depth: 2000, temperature: 3.2, salinity: 36.8, oxygen: 80, date: '2024-01-01' },
    { depth: 0, temperature: 29.1, salinity: 34.8, oxygen: 225, date: '2024-01-02' },
    { depth: 50, temperature: 28.9, salinity: 34.9, oxygen: 220, date: '2024-01-02' },
    { depth: 100, temperature: 28.5, salinity: 35.1, oxygen: 215, date: '2024-01-02' },
    { depth: 200, temperature: 26.2, salinity: 35.4, oxygen: 195, date: '2024-01-02' },
    { depth: 500, temperature: 19.1, salinity: 35.7, oxygen: 155, date: '2024-01-02' },
    { depth: 1000, temperature: 9.2, salinity: 36.1, oxygen: 125, date: '2024-01-02' },
    { depth: 2000, temperature: 3.8, salinity: 36.7, oxygen: 85, date: '2024-01-02' },
  ];

  // Dummy profile comparison data
  const profileData: ProfileData[] = [
    { depth: 0, temperature: 28.5, salinity: 35.2, oxygen: 220, floatId: '2901234' },
    { depth: 50, temperature: 28.2, salinity: 35.3, oxygen: 215, floatId: '2901234' },
    { depth: 100, temperature: 27.8, salinity: 35.4, oxygen: 210, floatId: '2901234' },
    { depth: 200, temperature: 25.5, salinity: 35.6, oxygen: 190, floatId: '2901234' },
    { depth: 500, temperature: 18.2, salinity: 35.8, oxygen: 150, floatId: '2901234' },
    { depth: 1000, temperature: 8.5, salinity: 36.2, oxygen: 120, floatId: '2901234' },
    { depth: 0, temperature: 29.1, salinity: 34.8, oxygen: 225, floatId: '2901235' },
    { depth: 50, temperature: 28.9, salinity: 34.9, oxygen: 220, floatId: '2901235' },
    { depth: 100, temperature: 28.5, salinity: 35.1, oxygen: 215, floatId: '2901235' },
    { depth: 200, temperature: 26.2, salinity: 35.4, oxygen: 195, floatId: '2901235' },
    { depth: 500, temperature: 19.1, salinity: 35.7, oxygen: 155, floatId: '2901235' },
    { depth: 1000, temperature: 9.2, salinity: 36.1, oxygen: 125, floatId: '2901235' },
  ];

  // Dummy seasonal data
  const seasonalData: SeasonalData[] = [
    { month: 'Jan', temperature: 26.5, salinity: 35.8, chlorophyll: 0.8 },
    { month: 'Feb', temperature: 27.2, salinity: 35.6, chlorophyll: 1.2 },
    { month: 'Mar', temperature: 28.1, salinity: 35.4, chlorophyll: 1.5 },
    { month: 'Apr', temperature: 29.5, salinity: 35.2, chlorophyll: 2.1 },
    { month: 'May', temperature: 30.2, salinity: 35.0, chlorophyll: 2.8 },
    { month: 'Jun', temperature: 29.8, salinity: 34.8, chlorophyll: 3.2 },
    { month: 'Jul', temperature: 28.9, salinity: 34.6, chlorophyll: 2.9 },
    { month: 'Aug', temperature: 28.2, salinity: 34.8, chlorophyll: 2.5 },
    { month: 'Sep', temperature: 28.8, salinity: 35.0, chlorophyll: 2.2 },
    { month: 'Oct', temperature: 29.1, salinity: 35.2, chlorophyll: 1.8 },
    { month: 'Nov', temperature: 28.5, salinity: 35.4, chlorophyll: 1.3 },
    { month: 'Dec', temperature: 27.2, salinity: 35.6, chlorophyll: 0.9 },
  ];

  const renderDepthTimeChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={depthTimeData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="depth" 
          stroke="#9CA3AF"
          label={{ value: 'Depth (m)', position: 'insideBottom', offset: -10, style: { fill: '#9CA3AF' } }}
        />
        <YAxis stroke="#9CA3AF" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937', 
            border: '1px solid #374151', 
            borderRadius: '8px',
            color: '#F9FAFB'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="temperature" 
          stackId="1" 
          stroke="#EF4444" 
          fill="#EF4444" 
          fillOpacity={0.6}
          name="Temperature (°C)"
        />
        <Area 
          type="monotone" 
          dataKey="salinity" 
          stackId="2" 
          stroke="#3B82F6" 
          fill="#3B82F6" 
          fillOpacity={0.6}
          name="Salinity (PSU)"
        />
        <Area 
          type="monotone" 
          dataKey="oxygen" 
          stackId="3" 
          stroke="#10B981" 
          fill="#10B981" 
          fillOpacity={0.6}
          name="Oxygen (μmol/kg)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderProfileChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={profileData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="depth" 
          stroke="#9CA3AF"
          label={{ value: 'Depth (m)', position: 'insideBottom', offset: -10, style: { fill: '#9CA3AF' } }}
        />
        <YAxis stroke="#9CA3AF" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937', 
            border: '1px solid #374151', 
            borderRadius: '8px',
            color: '#F9FAFB'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="temperature" 
          stroke="#EF4444" 
          strokeWidth={2}
          name="Temperature (°C)"
          dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="salinity" 
          stroke="#3B82F6" 
          strokeWidth={2}
          name="Salinity (PSU)"
          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="oxygen" 
          stroke="#10B981" 
          strokeWidth={2}
          name="Oxygen (μmol/kg)"
          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderSeasonalChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={seasonalData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="month" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937', 
            border: '1px solid #374151', 
            borderRadius: '8px',
            color: '#F9FAFB'
          }}
        />
        <Bar dataKey="temperature" fill="#EF4444" name="Temperature (°C)" />
        <Bar dataKey="salinity" fill="#3B82F6" name="Salinity (PSU)" />
        <Bar dataKey="chlorophyll" fill="#10B981" name="Chlorophyll (mg/m³)" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderScatterChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart data={profileData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          type="number" 
          dataKey="temperature" 
          stroke="#9CA3AF"
          label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -10, style: { fill: '#9CA3AF' } }}
        />
        <YAxis 
          type="number" 
          dataKey="salinity" 
          stroke="#9CA3AF"
          label={{ value: 'Salinity (PSU)', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937', 
            border: '1px solid #374151', 
            borderRadius: '8px',
            color: '#F9FAFB'
          }}
        />
        <Scatter dataKey="depth" fill="#8B5CF6" />
      </ScatterChart>
    </ResponsiveContainer>
  );

  return (
    <div className="w-full">
      {/* Chart Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedChart('depth-time')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedChart === 'depth-time'
              ? 'bg-pink-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Depth-Time Plot
        </button>
        <button
          onClick={() => setSelectedChart('profiles')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedChart === 'profiles'
              ? 'bg-pink-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Profile Comparison
        </button>
        <button
          onClick={() => setSelectedChart('seasonal')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedChart === 'seasonal'
              ? 'bg-pink-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Seasonal Trends
        </button>
        <button
          onClick={() => setSelectedChart('scatter')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedChart === 'scatter'
              ? 'bg-pink-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          T-S Diagram
        </button>
      </div>

      {/* Chart Display */}
      <div className="bg-white/10 rounded-lg p-6">
        {selectedChart === 'depth-time' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Depth-Time Temperature & Salinity</h3>
            {renderDepthTimeChart()}
          </div>
        )}
        {selectedChart === 'profiles' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Multi-Float Profile Comparison</h3>
            {renderProfileChart()}
          </div>
        )}
        {selectedChart === 'seasonal' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Seasonal Ocean Parameter Trends</h3>
            {renderSeasonalChart()}
          </div>
        )}
        {selectedChart === 'scatter' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Temperature-Salinity Diagram</h3>
            {renderScatterChart()}
          </div>
        )}
      </div>
    </div>
  );
}



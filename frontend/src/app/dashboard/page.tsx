'use client';

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import GoogleMap from "../../components/GoogleMap";
import OceanCharts from "../../components/OceanCharts";
import DataExport from "../../components/DataExport";
import NetCDFUpload from "../../components/NetCDFUpload";

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'map' | 'charts' | 'export' | 'search' | 'upload'>('map');
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <Link href="/" className="ml-3 text-white font-bold text-xl">FloatChat</Link>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-pink-300 transition-colors">Home</Link>
          <Link href="/chatbot" className="text-white hover:text-pink-300 transition-colors">Chatbot</Link>
          <Link href="/dashboard" className="text-pink-300 font-semibold">Dashboard</Link>
          <Link href="/about" className="text-white hover:text-pink-300 transition-colors">About us</Link>
          <Link href="/contact" className="text-white hover:text-pink-300 transition-colors">Contact us</Link>
        </nav>
        
        {/* User Menu */}
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">Welcome, {user.name}</span>
            <Link href="/chatbot" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-medium transition-colors">
              Chatbot
            </Link>
          </div>
        ) : (
          <Link href="/login" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center">
            Login
            <div className="w-2 h-2 bg-white rounded-full ml-2" />
          </Link>
        )}
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4 font-bold">
            Ocean Data Dashboard
          </h1>
          <p className="text-xl md:text-2xl font-serif text-white">
            Interactive visualizations and analytics for ARGO float data
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedTab('map')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'map'
                ? 'bg-pink-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Interactive Maps
          </button>
          <button
            onClick={() => setSelectedTab('charts')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'charts'
                ? 'bg-pink-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Data Charts
          </button>
          <button
            onClick={() => setSelectedTab('export')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'export'
                ? 'bg-pink-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Export Data
          </button>
          <button
            onClick={() => setSelectedTab('search')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'search'
                ? 'bg-pink-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Vector Search
          </button>
          <button
            onClick={() => setSelectedTab('upload')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'upload'
                ? 'bg-pink-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            NetCDF Upload
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="max-w-7xl mx-auto">
          {selectedTab === 'map' && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">ARGO Float Trajectories</h2>
                <div className="flex space-x-2">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-sm">Indian Ocean</button>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm">Global</button>
                </div>
              </div>
              <div className="h-96">
                <GoogleMap />
              </div>
            </div>
          )}

          {selectedTab === 'charts' && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Ocean Data Visualizations</h2>
              <OceanCharts />
            </div>
          )}

          {selectedTab === 'export' && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Data Export Center</h2>
              <DataExport />
            </div>
          )}

          {selectedTab === 'search' && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Vector Database Search</h2>
              <div className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Search ARGO metadata, locations, or parameters..." 
                    className="w-full bg-white/20 text-white placeholder-white/70 p-4 rounded-lg border border-white/30 focus:outline-none focus:border-pink-300"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-2">Search Results</h3>
                    <div className="space-y-2">
                      <div className="bg-white/10 rounded p-2">
                        <p className="text-white/80 text-sm">Similarity: 0.95</p>
                        <p className="text-white/60 text-xs">Float 2901234 - Arabian Sea, Temperature profiles</p>
                      </div>
                      <div className="bg-white/10 rounded p-2">
                        <p className="text-white/80 text-sm">Similarity: 0.87</p>
                        <p className="text-white/60 text-xs">Float 2901235 - Bay of Bengal, BGC data</p>
                      </div>
                      <div className="bg-white/10 rounded p-2">
                        <p className="text-white/80 text-sm">Similarity: 0.82</p>
                        <p className="text-white/60 text-xs">Float 2901236 - Indian Ocean, Salinity profiles</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-2">Search Statistics</h3>
                    <div className="space-y-2">
                      <p className="text-white/80 text-sm">Total Records: 15,247</p>
                      <p className="text-white/80 text-sm">Active Floats: 2,847</p>
                      <p className="text-white/80 text-sm">Data Points: 15.2M</p>
                      <p className="text-white/80 text-sm">Last Update: 2 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'upload' && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">NetCDF File Processing</h2>
              <NetCDFUpload />
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-white mb-2">2,847</h3>
            <p className="text-white/80">Active Floats</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-white mb-2">15.2M</h3>
            <p className="text-white/80">Data Points</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-white mb-2">24/7</h3>
            <p className="text-white/80">Real-time Updates</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-white mb-2">Global</h3>
            <p className="text-white/80">Coverage</p>
          </div>
        </div>
      </main>
    </div>
  );
}

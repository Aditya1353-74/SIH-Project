'use client';

import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";

export default function About() {
  const { user } = useAuth();
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
          <Link href="/dashboard" className="text-white hover:text-pink-300 transition-colors">Dashboard</Link>
          <Link href="/about" className="text-pink-300 font-semibold">About us</Link>
          <Link href="/contact" className="text-white hover:text-pink-300 transition-colors">Contact us</Link>
        </nav>
        
        {/* User Menu */}
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">Welcome, {user.name}</span>
            <Link href="/dashboard" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-medium transition-colors">
              Dashboard
            </Link>
          </div>
        ) : (
          <Link href="/login" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center">
            Get Started
            <div className="w-2 h-2 bg-white rounded-full ml-2" />
          </Link>
        )}
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4 font-bold">
            About FloatChat
          </h1>
          <p className="text-xl md:text-2xl font-serif text-white">
            Democratizing access to oceanographic data through AI
          </p>
        </div>
        
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-white text-lg leading-relaxed mb-6">
              FloatChat is an AI-powered conversational system for ARGO float data that enables users to query, 
              explore, and visualize oceanographic information using natural language. We bridge the gap between 
              domain experts, decision-makers, and raw data by allowing non-technical users to extract meaningful 
              insights effortlessly.
            </p>
            <p className="text-white text-lg leading-relaxed">
              Our platform transforms complex oceanographic datasets into accessible, interactive experiences 
              that empower researchers, policymakers, and ocean enthusiasts to understand our planet's oceans better.
            </p>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">AI-Powered Queries</h3>
            <p className="text-white/80">
              Natural language processing to understand complex oceanographic questions and translate them into database queries.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Real-time Visualization</h3>
            <p className="text-white/80">
              Interactive dashboards with geospatial visualizations, depth-time plots, and profile comparisons.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Comprehensive Data</h3>
            <p className="text-white/80">
              Access to temperature, salinity, BGC parameters, and other essential ocean variables from ARGO floats.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">User-Friendly Interface</h3>
            <p className="text-white/80">
              Intuitive chatbot interface that guides users through data discovery without technical expertise.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Global Coverage</h3>
            <p className="text-white/80">
              Worldwide ARGO float data with focus on Indian Ocean and extensibility to other oceanographic datasets.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Research Ready</h3>
            <p className="text-white/80">
              Export capabilities to ASCII, NetCDF formats for further analysis and research applications.
            </p>
          </div>
        </div>
        
        {/* Data Processing Pipeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Data Processing Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">NetCDF Ingestion</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• Automated ARGO NetCDF file processing</li>
                  <li>• Conversion to structured formats (SQL/Parquet)</li>
                  <li>• Metadata extraction and validation</li>
                  <li>• Quality control and data cleaning</li>
                  <li>• Real-time data ingestion pipeline</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Database Architecture</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• PostgreSQL for relational data storage</li>
                  <li>• FAISS/Chroma vector database for metadata</li>
                  <li>• Optimized queries for oceanographic data</li>
                  <li>• Scalable architecture for global datasets</li>
                  <li>• Data compression and indexing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Technology Stack */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Backend</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• PostgreSQL for structured data storage</li>
                  <li>• FAISS/Chroma for vector database</li>
                  <li>• Multimodal LLMs (GPT, QWEN, LLaMA, Mistral)</li>
                  <li>• Model Context Protocol (MCP)</li>
                  <li>• RAG pipelines for intelligent retrieval</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Frontend</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• Next.js with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Plotly, Leaflet, Cesium for visualizations</li>
                  <li>• Interactive dashboards and chat interface</li>
                  <li>• Responsive design for all devices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Proof of Concept */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Proof of Concept</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Current Implementation</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• Indian Ocean ARGO data focus</li>
                  <li>• Working chatbot interface</li>
                  <li>• Interactive dashboard with visualizations</li>
                  <li>• Natural language query processing</li>
                  <li>• Export capabilities (ASCII, NetCDF)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Future Extensibility</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• BGC (Bio-Geo-Chemical) floats integration</li>
                  <li>• Glider and buoy data support</li>
                  <li>• Satellite dataset integration</li>
                  <li>• Global ocean coverage expansion</li>
                  <li>• Advanced ML/AI capabilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import Chatbot from "../../components/Chatbot";

export default function ChatbotPage() {
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
          <Link href="/chatbot" className="text-pink-300 font-semibold">Chatbot</Link>
          <Link href="/dashboard" className="text-white hover:text-pink-300 transition-colors">Dashboard</Link>
          <Link href="/about" className="text-white hover:text-pink-300 transition-colors">About us</Link>
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
            Login
            <div className="w-2 h-2 bg-white rounded-full ml-2" />
          </Link>
        )}
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-8">
        {/* Hero Text */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-serif text-white mb-6 font-bold">
            AI-Powered Ocean Data Chat
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-white mb-8">
            Ask questions about ARGO float data in natural language
          </p>
        </div>
        
        {/* Chat Interface */}
        <div className="w-full max-w-4xl">
          <Chatbot />
          
          {/* ARGO-Specific Query Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
              <h3 className="font-bold mb-2">Temperature & Salinity</h3>
              <p className="text-sm mb-2">"Show me temperature profiles at 1000m depth in the Indian Ocean"</p>
              <p className="text-sm">"Compare salinity trends between 2022 and 2023"</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
              <h3 className="font-bold mb-2">BGC Parameters</h3>
              <p className="text-sm mb-2">"Analyze chlorophyll levels in the Bay of Bengal"</p>
              <p className="text-sm">"Show oxygen concentration profiles"</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
              <h3 className="font-bold mb-2">Location & Trajectory</h3>
              <p className="text-sm mb-2">"Find floats near 20°N, 70°E"</p>
              <p className="text-sm">"Show ARGO float trajectories in the Arabian Sea"</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
              <h3 className="font-bold mb-2">Time Series</h3>
              <p className="text-sm mb-2">"Depth-time plots for the last 6 months"</p>
              <p className="text-sm">"Seasonal variations in temperature"</p>
            </div>
          </div>
          
          {/* RAG Pipeline Status */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">RAG Pipeline Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xl">✓</span>
                </div>
                <p className="text-white font-medium">Vector Database</p>
                <p className="text-white/70 text-sm">FAISS/Chroma Active</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xl">✓</span>
                </div>
                <p className="text-white font-medium">LLM Integration</p>
                <p className="text-white/70 text-sm">GPT/QWEN/LLaMA Ready</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xl">✓</span>
                </div>
                <p className="text-white font-medium">MCP Protocol</p>
                <p className="text-white/70 text-sm">Model Context Active</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

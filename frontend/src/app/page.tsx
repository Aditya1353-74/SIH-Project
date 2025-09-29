'use client';

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
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
          <span className="ml-3 text-white font-bold text-xl">FloatChat</span>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-pink-300 transition-colors">Home</Link>
          <Link href="/chatbot" className="text-white hover:text-pink-300 transition-colors">Chatbot</Link>
          <Link href="/dashboard" className="text-white hover:text-pink-300 transition-colors">Dashboard</Link>
          <Link href="/about" className="text-white hover:text-pink-300 transition-colors">About us</Link>
          <Link href="/contact" className="text-white hover:text-pink-300 transition-colors">Contact us</Link>
        </nav>
        
        {/* User Menu / CTA Button */}
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">Welcome, {user.name}</span>
            <Link href="/dashboard" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Dashboard
            </Link>
            <button 
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center">
            Get Started
            <div className="w-2 h-2 bg-white rounded-full ml-2" />
          </Link>
        )}
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-8">
        {/* Hero Text */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-serif text-white mb-6 font-bold">
            From Complexity to Clarity
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-white mb-8">
            We help "you" build what matters.
          </p>
          <Link href={user ? "/dashboard" : "/login"} className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors flex items-center mx-auto">
            {user ? "GO TO DASHBOARD" : "GET STARTED"}
            <div className="w-2 h-2 bg-white rounded-full ml-2" />
          </Link>
        </div>
        
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {/* Card 1 */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">AI-Powered Data Query</h3>
            <p className="text-sm mb-4">Natural language queries for ARGO float data with RAG pipeline</p>
            <Link href="/chatbot" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-colors inline-block">
              Try Chatbot
            </Link>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Interactive Visualizations</h3>
            <p className="text-sm mb-4">Geospatial maps, depth-time plots, and profile comparisons</p>
            <Link href="/dashboard" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-colors inline-block">
              View Dashboard
            </Link>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">NetCDF Processing</h3>
            <p className="text-sm mb-4">Automated ingestion and conversion of oceanographic data</p>
            <Link href="/about" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-colors inline-block">
              Learn More
            </Link>
          </div>
          
          {/* Card 4 */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Export & Analysis</h3>
            <p className="text-sm mb-4">Export to ASCII, NetCDF formats with vector database search</p>
            <Link href="/dashboard" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-colors inline-block">
              Explore Tools
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

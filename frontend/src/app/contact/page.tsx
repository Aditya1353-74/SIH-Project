'use client';

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Contact() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', organization: '', subject: '', message: '' });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
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
          <Link href="/about" className="text-white hover:text-pink-300 transition-colors">About us</Link>
          <Link href="/contact" className="text-pink-300 font-semibold">Contact us</Link>
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
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl font-serif text-white">
            Get in touch with our team for support and collaboration
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-white/20 text-white placeholder-white/70 p-4 rounded-lg border border-white/30 focus:outline-none focus:border-pink-300"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-white/20 text-white placeholder-white/70 p-4 rounded-lg border border-white/30 focus:outline-none focus:border-pink-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full bg-white/20 text-white placeholder-white/70 p-4 rounded-lg border border-white/30 focus:outline-none focus:border-pink-300"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={6}
                    className="w-full bg-white/20 text-white placeholder-white/70 p-4 rounded-lg border border-white/30 focus:outline-none focus:border-pink-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-4 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Organization Info */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Organization</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong>Ministry of Earth Sciences (MoES)</strong></p>
                  <p>Indian National Centre for Ocean Information Services (INCOIS)</p>
                  <p>Category: Software</p>
                  <p>Theme: Miscellaneous</p>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Project Information</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong>Problem Statement ID:</strong> 25040</p>
                  <p><strong>Title:</strong> FloatChat - AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization</p>
                  <p><strong>Status:</strong> Active Development</p>
                </div>
              </div>
              
              {/* Support Channels */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Support Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📧</span>
                    </div>
                    <span className="text-white/80">support@floatchat.incois.gov.in</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📞</span>
                    </div>
                    <span className="text-white/80">+91-XXX-XXXX-XXXX</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🌐</span>
                    </div>
                    <span className="text-white/80">www.incois.gov.in</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/chatbot" className="block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-center transition-colors">
                    Try the Chatbot
                  </Link>
                  <Link href="/dashboard" className="block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-center transition-colors">
                    View Dashboard
                  </Link>
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
                    Download Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


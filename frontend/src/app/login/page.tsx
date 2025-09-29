'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    organization: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.name || 'User',
        organization: formData.organization || 'Research Institution',
        loginTime: new Date().toISOString()
      }));
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <Link href="/" className="ml-3 text-white font-bold text-xl">FloatChat</Link>
        </div>
        
        <Link href="/" className="text-white hover:text-pink-300 transition-colors">
          ← Back to Home
        </Link>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[80vh] px-8">
        <div className="w-full max-w-md">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join FloatChat'}
              </h1>
              <p className="text-white/80">
                {isLogin ? 'Sign in to access ARGO data analytics' : 'Create your account to start exploring'}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex mb-6 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isLogin ? 'bg-pink-500 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isLogin ? 'bg-pink-500 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/20 text-white placeholder-white/70 p-3 rounded-lg border border-white/30 focus:outline-none focus:border-pink-300"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Organization</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full bg-white/20 text-white placeholder-white/70 p-3 rounded-lg border border-white/30 focus:outline-none focus:border-pink-300"
                      placeholder="Research institution or company"
                      required={!isLogin}
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/20 text-white placeholder-white/70 p-3 rounded-lg border border-white/30 focus:outline-none focus:border-pink-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/20 text-white placeholder-white/70 p-3 rounded-lg border border-white/30 focus:outline-none focus:border-pink-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-white/80 text-sm">Remember me</span>
                  </label>
                  <a href="#" className="text-pink-300 hover:text-pink-200 text-sm">
                    Forgot password?
                  </a>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>
            
            {isLogin && (
              <div className="mt-6 text-center">
                <p className="text-white/80 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-pink-300 hover:text-pink-200 font-medium"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            )}
            
            {!isLogin && (
              <div className="mt-6 text-center">
                <p className="text-white/80 text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-pink-300 hover:text-pink-200 font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            )}
          </div>
          
          {/* Demo Credentials */}
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Demo Credentials</h3>
            <p className="text-white/70 text-sm mb-1">Email: demo@floatchat.com</p>
            <p className="text-white/70 text-sm">Password: demo123</p>
            <button
              onClick={() => {
                setFormData({
                  email: 'demo@floatchat.com',
                  password: 'demo123',
                  name: 'Demo User',
                  organization: 'INCOIS'
                });
                setIsLogin(true);
              }}
              className="mt-2 text-pink-300 hover:text-pink-200 text-sm font-medium"
            >
              Use Demo Account →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}



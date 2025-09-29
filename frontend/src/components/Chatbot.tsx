'use client';

import { useState } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const dummyResponses = {
  'salinity': 'I found 15 ARGO floats with salinity data near the equator in March 2023. The average salinity ranges from 34.5 to 35.2 PSU. The data shows seasonal variations with peak values during the monsoon season.',
  'temperature': 'Temperature profiles at 1000m depth in the Indian Ocean show an average of 8.2°C. The data from 12 ARGO floats indicates a warming trend of 0.1°C per decade.',
  'bgc': 'BGC parameters in the Arabian Sea show chlorophyll levels ranging from 0.2 to 1.8 mg/m³. Oxygen concentrations vary from 180 to 220 μmol/kg at surface levels.',
  'location': 'Found 3 ARGO floats within 100km of your location. Float 2901234 is 45km away with recent temperature and salinity data. Float 2901235 is 78km away with BGC parameters.',
  'trajectory': 'ARGO float trajectories in the Arabian Sea show typical cyclonic patterns. Float 2901234 has traveled 1,200km over the past 6 months.',
  'depth': 'Depth-time plots for the last 6 months show mixed layer depths varying from 20m in winter to 60m in summer. Temperature profiles extend to 2000m depth.',
  'export': 'Data export is ready! You can download the results in ASCII format (2.3MB) or NetCDF format (1.8MB). The export includes metadata and quality flags.',
  'default': 'I understand you\'re asking about ARGO float data. Could you be more specific? I can help with temperature, salinity, BGC parameters, locations, trajectories, or data exports.'
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your ARGO data assistant. Ask me about ocean parameters, float locations, or data analysis.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('salinity')) return dummyResponses.salinity;
    if (lowerMessage.includes('temperature')) return dummyResponses.temperature;
    if (lowerMessage.includes('bgc') || lowerMessage.includes('chlorophyll') || lowerMessage.includes('oxygen')) return dummyResponses.bgc;
    if (lowerMessage.includes('location') || lowerMessage.includes('near') || lowerMessage.includes('float')) return dummyResponses.location;
    if (lowerMessage.includes('trajectory') || lowerMessage.includes('path')) return dummyResponses.trajectory;
    if (lowerMessage.includes('depth') || lowerMessage.includes('profile')) return dummyResponses.depth;
    if (lowerMessage.includes('export') || lowerMessage.includes('download')) return dummyResponses.export;
    
    return dummyResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 mb-6">
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-lg max-w-md ${
                message.isUser 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white/30 text-white'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/30 text-white p-4 rounded-lg max-w-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Chat Input */}
        <div className="flex space-x-4">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about ARGO float data, ocean parameters, or locations..." 
            className="flex-1 bg-white/20 text-white placeholder-white/70 p-4 rounded-lg border border-white/30 focus:outline-none focus:border-pink-300"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-500 text-white px-6 py-4 rounded-lg font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button 
          onClick={() => setInputText('Show me salinity profiles near the equator')}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg text-sm transition-colors"
        >
          Salinity Data
        </button>
        <button 
          onClick={() => setInputText('Find ARGO floats near 20°N, 70°E')}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg text-sm transition-colors"
        >
          Find Floats
        </button>
        <button 
          onClick={() => setInputText('Compare BGC parameters in Arabian Sea')}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg text-sm transition-colors"
        >
          BGC Analysis
        </button>
        <button 
          onClick={() => setInputText('Export temperature data to NetCDF')}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg text-sm transition-colors"
        >
          Export Data
        </button>
      </div>
    </div>
  );
}


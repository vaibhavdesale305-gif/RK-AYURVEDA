
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2E7D32] text-white">
      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl animate-pulse">
        <span className="text-4xl font-bold text-[#2E7D32]">RK</span>
      </div>
      <h1 className="text-2xl font-bold tracking-wider">Radhe Krishna</h1>
      <p className="text-sm font-light uppercase tracking-[0.3em] opacity-80">Ayurveda</p>
      <div className="mt-12 flex space-x-2">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
};

export default SplashScreen;

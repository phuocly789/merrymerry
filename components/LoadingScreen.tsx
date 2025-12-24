
import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center">
      <div className="relative mb-8">
        <div className="text-6xl animate-spin-slow">❄️</div>
        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
      </div>
      
      <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-red-500 via-yellow-200 to-green-500 transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        ></div>
        <div className="absolute inset-0 bg-white/10 animate-shimmer"></div>
      </div>
      
      <p className="mt-4 text-white/40 text-[10px] uppercase tracking-[0.5em] font-light">
        Đang tải... {percent}%
      </p>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </div>
  );
};

export default LoadingScreen;

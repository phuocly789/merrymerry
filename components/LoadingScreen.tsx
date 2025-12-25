
import React, { useState, useEffect } from 'react';
import { Gift, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  onUserInteract: () => void;
}


const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, onUserInteract}) => {
  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFinished(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const handleOpenGift = () => {
    onUserInteract(); // 🎵 PLAY NHẠC NGAY TẠI CLICK
    setIsExploding(true);

    setTimeout(() => {
      onComplete();
    }, 1200);
  };


  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-1000 ${isExploding ? 'bg-white' : 'bg-[#020617]'} ${isExploding ? 'animate-screenshake' : ''}`}>

      {/* Tia sáng bùng nổ khi click */}
      {isExploding && (
        <div className="absolute inset-0 z-[110] flex items-center justify-center overflow-hidden pointer-events-none">
          <div className="absolute w-[300vw] h-[300vw] bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,215,0,0.8)_20%,rgba(239,68,68,0.4)_40%,transparent_70%)] animate-expand-light"></div>
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-particle"
              style={{
                width: Math.random() * 15 + 5 + 'px',
                height: Math.random() * 15 + 5 + 'px',
                background: ['#facc15', '#ef4444', '#3b82f6', '#22c55e', '#ffffff'][i % 5],
                '--tx': `${(Math.random() - 0.5) * 1500}px`,
                '--ty': `${(Math.random() - 0.5) * 1500}px`,
                '--rot': `${Math.random() * 720}deg`
              } as any}
            ></div>
          ))}
        </div>
      )}

      <div className={`relative mb-12 transition-all duration-700 ${isExploding ? 'scale-[10] opacity-0 blur-xl' : ''}`}>
        <div className="text-7xl animate-spin-slow">❄️</div>
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150"></div>
      </div>

      {!isFinished ? (
        <div className={`flex flex-col items-center transition-opacity duration-500 ${isExploding ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-yellow-200 to-green-500 transition-all duration-300 ease-out"
              style={{ width: `${percent}%` }}
            ></div>
            <div className="absolute inset-0 bg-white/10 animate-shimmer"></div>
          </div>

          <p className="mt-6 text-white/30 text-[10px] uppercase tracking-[0.6em] font-light animate-pulse text-center">
            Đang chuẩn bị phép màu... {percent}%
          </p>
        </div>
      ) : (
        <button
          onClick={handleOpenGift}
          disabled={isExploding}
          className={`group flex flex-col items-center gap-6 transition-all duration-500 ${isExploding ? 'scale-150 opacity-0 blur-md' : 'animate-in zoom-in'}`}
        >
          <div className="relative">
            <div className="bg-red-600 p-10 rounded-[2.5rem] shadow-[0_0_80px_rgba(220,38,38,0.7)] group-hover:scale-110 group-active:scale-95 transition-transform cursor-pointer relative animate-wiggle-strong">
              <Gift className="w-16 h-16 text-white" />
              <div className="absolute -top-4 -right-4 bg-yellow-400 p-2 rounded-full animate-bounce shadow-xl">
                <Sparkles className="w-6 h-6 text-red-700" />
              </div>
              <div className="absolute inset-0 rounded-[2.5rem] animate-ping bg-red-600 opacity-20"></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white/90 font-cursive text-5xl tracking-widest animate-pulse">Nhấn để mở quà</span>
            <span className="text-white/40 text-[10px] uppercase tracking-[0.8em] mt-3 font-light">Phép màu đang chờ bạn bùng nổ</span>
          </div>
        </button>
      )}

      <style>{`
        @keyframes wiggle-strong {
          0%, 100% { transform: rotate(-6deg) scale(1); }
          50% { transform: rotate(6deg) scale(1.05); }
        }
        @keyframes screenshake {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5px, -5px); }
          20% { transform: translate(5px, 5px); }
          30% { transform: translate(-5px, 5px); }
          40% { transform: translate(5px, -5px); }
          50% { transform: translate(-5px, 0); }
          60% { transform: translate(5px, 0); }
          100% { transform: translate(0, 0); }
        }
        @keyframes expand-light {
          0% { transform: scale(0); opacity: 1; }
          30% { opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes particle {
          0% { transform: translate(0, 0) rotate(0); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-wiggle-strong { animation: wiggle-strong 0.3s infinite ease-in-out; }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-expand-light { animation: expand-light 1s forwards ease-out; }
        .animate-particle { animation: particle 1.2s forwards cubic-bezier(0, 0.6, 0.4, 1); }
        .animate-screenshake { animation: screenshake 0.5s infinite; }
      `}</style>
    </div>
  );
};

export default LoadingScreen;

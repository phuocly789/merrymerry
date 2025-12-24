
import React from 'react';

const ChristmasTree: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#020617] overflow-hidden">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,1)_0%,rgba(2,6,23,1)_100%)]"></div>

      {/* Aurora Borealis Effect - Magic Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[50%] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent blur-[120px] animate-aurora-1"></div>
        <div className="absolute top-[5%] left-[-20%] w-[140%] h-[40%] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-[100px] animate-aurora-2"></div>
      </div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={`ss-${i}`}
            className="absolute bg-white w-[2px] h-[2px] rounded-full animate-shooting-star"
            style={{
              top: `${Math.random() * 40}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 15}s`,
            }}
          >
            <div className="absolute top-0 left-0 w-[150px] h-[1px] bg-gradient-to-r from-white/60 to-transparent -translate-x-full"></div>
          </div>
        ))}
      </div>

      {/* Santa Sleigh Animation */}
      <div className="absolute top-24 right-[-400px] animate-santa-fly z-0 opacity-40 pointer-events-none">
         <div className="flex items-center gap-2 transform scale-x-[-1]">
            <span className="text-4xl filter drop-shadow-[0_0_15px_white]">🛷</span>
            <span className="text-3xl">🦌</span>
            <span className="text-3xl">🦌</span>
            <span className="text-4xl">🎅</span>
         </div>
      </div>

      {/* Ground Mist for Depth */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white/5 to-transparent blur-[80px] pointer-events-none z-10 opacity-30"></div>

      {/* Floating Magic Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-yellow-200 rounded-full animate-float-slow opacity-20"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDuration: Math.random() * 10 + 10 + 's',
              animationDelay: Math.random() * 5 + 's',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center scale-75 md:scale-100">
        {/* Tree Aura Glow behind the star */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[600px] bg-green-500/10 blur-[120px] rounded-full z-0 animate-pulse"></div>

        {/* The North Star */}
        <div className="relative z-50 mb-[-25px] animate-star-pulse">
          <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-50 scale-150"></div>
          <svg viewBox="0 0 24 24" className="w-28 h-28 text-yellow-300 fill-current filter drop-shadow-[0_0_40px_rgba(253,224,71,1)]">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        {/* 3D Layered Tree Body */}
        <div className="flex flex-col items-center" style={{ perspective: '1500px' }}>
          {[
            { w: '180px', h: '140px', mt: '0', z: '40', color: '#064e3b', lights: 15 },
            { w: '280px', h: '200px', mt: '-70px', z: '30', color: '#065f46', lights: 22 },
            { w: '400px', h: '260px', mt: '-100px', z: '20', color: '#047857', lights: 30 },
            { w: '520px', h: '320px', mt: '-130px', z: '10', color: '#064e3b', lights: 45 }
          ].map((tier, idx) => (
            <div
              key={idx}
              className="relative shadow-2xl transition-all duration-700 hover:rotate-y-12 group"
              style={{
                width: tier.w,
                height: tier.h,
                marginTop: tier.mt,
                zIndex: tier.z,
                background: `linear-gradient(145deg, ${tier.color} 0%, #022c22 100%)`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 -10px 20px rgba(255,255,255,0.05)'
              }}
            >
              {/* Christmas Ornaments & LED Lights */}
              {[...Array(tier.lights)].map((_, lIdx) => (
                <div
                  key={lIdx}
                  className="absolute rounded-full animate-twinkle-premium"
                  style={{
                    width: lIdx % 3 === 0 ? '10px' : '6px',
                    height: lIdx % 3 === 0 ? '10px' : '6px',
                    top: (Math.random() * 60 + 35) + '%',
                    left: (Math.random() * 80 + 10) + '%',
                    background: ['#ef4444', '#facc15', '#3b82f6', '#ffffff', '#ec4899', '#44ff44'][lIdx % 6],
                    boxShadow: `0 0 20px ${['#ef4444', '#facc15', '#3b82f6', '#ffffff', '#ec4899', '#44ff44'][lIdx % 6]}`,
                    animationDelay: (Math.random() * 4) + 's',
                    animationDuration: (Math.random() * 3 + 1) + 's'
                  }}
                />
              ))}
              
              {/* Delicate Silver Garland Lines */}
              <div className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[15deg] top-[55%] left-[-50%] blur-[0.5px]"></div>
            </div>
          ))}

          {/* Trunk with Texture */}
          <div className="w-20 h-28 bg-gradient-to-b from-[#451a03] via-[#2d1202] to-[#1a0a04] -mt-5 rounded-b-3xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-t border-white/5"></div>
        </div>

        {/* Elegant Gifts */}
        <div className="flex gap-10 mt-8 items-end animate-fade-in">
          <div className="w-20 h-16 bg-red-700 rounded-lg shadow-2xl relative rotate-[-5deg] hover:scale-110 transition-transform cursor-pointer border-b-4 border-black/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-yellow-500 opacity-80"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 bg-yellow-500 opacity-80"></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs opacity-50">🎀</span>
          </div>
          <div className="w-16 h-14 bg-blue-700 rounded-lg shadow-2xl relative rotate-[8deg] hover:scale-110 transition-transform cursor-pointer border-b-4 border-black/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-white opacity-80"></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs opacity-50">🎁</span>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center px-6 z-20 max-w-4xl relative">
        {/* FIX: Thêm leading-tight và py-4 để chữ không bị cắt ở trên/dưới */}
        <h1 className="text-7xl md:text-9xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-200 to-green-500 mb-8 filter drop-shadow-lg leading-[1.2] py-4">
          Noel An Lành
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl font-light italic leading-relaxed tracking-wide opacity-80 animate-fade-up">
          "Mong rằng những điều tốt đẹp vẫn đang lặng lẽ chờ bạn phía trước..."
        </p>
        <div className="mt-10 flex items-center justify-center gap-6 opacity-60">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-red-500"></div>
          <span className="text-red-500 font-cursive text-4xl">From LMP With Love</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-red-500"></div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle-premium {
          0%, 100% { opacity: 0.3; transform: scale(0.8); filter: brightness(0.8); }
          50% { opacity: 1; transform: scale(1.4); filter: brightness(1.5); }
        }
        @keyframes star-pulse {
          0% { transform: scale(1); filter: brightness(1); }
          100% { transform: scale(1.1); filter: brightness(1.3); }
        }
        @keyframes float-slow {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        .animate-twinkle-premium { animation: twinkle-premium 3s infinite ease-in-out; }
        .animate-star-pulse { animation: star-pulse 2s infinite alternate ease-in-out; }
        .animate-float-slow { animation: float-slow linear infinite; }
        .animate-fade-up { animation: fade-up 2.5s ease-out forwards; }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes aurora-1 {
          0%, 100% { transform: translateX(-5%) skewX(-10deg); opacity: 0.1; }
          50% { transform: translateX(5%) skewX(10deg); opacity: 0.4; }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translateX(5%) skewX(5deg); opacity: 0.2; }
          50% { transform: translateX(-5%) skewX(-5deg); opacity: 0.5; }
        }
        @keyframes shooting-star {
          0% { transform: translate(0, 0); opacity: 0; }
          5% { opacity: 1; }
          15% { transform: translate(-800px, 300px); opacity: 0; }
          100% { transform: translate(-800px, 300px); opacity: 0; }
        }
        @keyframes santa-fly {
          0% { transform: translateX(0) translateY(0) rotate(-2deg); }
          100% { transform: translateX(calc(-100vw - 600px)) translateY(-40px) rotate(3deg); }
        }
        .animate-aurora-1 { animation: aurora-1 15s infinite alternate ease-in-out; }
        .animate-aurora-2 { animation: aurora-2 20s infinite alternate-reverse ease-in-out; }
        .animate-shooting-star { animation: shooting-star 12s infinite; }
        .animate-santa-fly { animation: santa-fly 25s linear infinite; }
      `}</style>
    </div>
  );
};

export default ChristmasTree;

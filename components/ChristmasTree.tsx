
import React from 'react';

const ChristmasTree: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#020617] overflow-hidden">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,1)_0%,rgba(2,6,23,1)_100%)]"></div>

      {/* Floating Magic Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
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
            { w: '180px', h: '140px', mt: '0', z: '40', color: '#064e3b', lights: 8 },
            { w: '280px', h: '200px', mt: '-70px', z: '30', color: '#065f46', lights: 14 },
            { w: '400px', h: '260px', mt: '-100px', z: '20', color: '#047857', lights: 20 },
            { w: '520px', h: '320px', mt: '-130px', z: '10', color: '#064e3b', lights: 30 }
          ].map((tier, idx) => (
            <div
              key={idx}
              className="relative shadow-2xl transition-all duration-700 hover:rotate-y-12"
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
                    background: ['#ef4444', '#facc15', '#3b82f6', '#ffffff', '#ec4899'][lIdx % 5],
                    boxShadow: `0 0 20px ${['#ef4444', '#facc15', '#3b82f6', '#ffffff', '#ec4899'][lIdx % 5]}`,
                    animationDelay: (Math.random() * 4) + 's'
                  }}
                />
              ))}
            </div>
          ))}

          {/* Trunk with Texture */}
          <div className="w-20 h-28 bg-gradient-to-b from-[#451a03] via-[#2d1202] to-[#1a0a04] -mt-5 rounded-b-3xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-t border-white/5"></div>
        </div>

        {/* Elegant Gifts */}
        <div className="flex gap-10 mt-8 items-end animate-fade-in">
          <div className="w-20 h-16 bg-red-700 rounded-lg shadow-2xl relative rotate-[-5deg] hover:scale-110 transition-transform cursor-pointer">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-yellow-500 opacity-80"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 bg-yellow-500 opacity-80"></div>
          </div>
          <div className="w-16 h-14 bg-blue-700 rounded-lg shadow-2xl relative rotate-[8deg] hover:scale-110 transition-transform cursor-pointer">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-white opacity-80"></div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center px-6 z-20 max-w-4xl">
        <h1 className="text-7xl md:text-9xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-200 to-green-500 mb-8 filter drop-shadow-lg">
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
      `}</style>
    </div>
  );
};

export default ChristmasTree;

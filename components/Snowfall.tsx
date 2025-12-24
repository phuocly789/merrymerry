
import React from 'react';

const Snowfall: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Layer 1: Background Fine Snow */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`s-${i}`}
          className="absolute text-white opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            fontSize: '6px',
            animation: `snowfall ${Math.random() * 4 + 5}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          •
        </div>
      ))}
      
      {/* Layer 2: Medium Snowflakes */}
      {[...Array(40)].map((_, i) => (
        <div
          key={`m-${i}`}
          className="absolute text-white opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            fontSize: '12px',
            animation: `snowfall ${Math.random() * 6 + 8}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          ❄
        </div>
      ))}

      {/* Layer 3: Sparkling Glitter Snow */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`g-${i}`}
          className="absolute text-yellow-100 opacity-60 filter blur-[0.5px] animate-glitter-snow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            fontSize: '4px',
            animation: `snowfall ${Math.random() * 3 + 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: '0 0 10px rgba(255,255,255,0.8)'
          }}
        >
          ✦
        </div>
      ))}

      {/* Layer 4: Large Foreground Flakes */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`l-${i}`}
          className="absolute text-white opacity-50 filter blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            fontSize: '28px',
            animation: `snowfall ${Math.random() * 10 + 15}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          ❄
        </div>
      ))}

      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(25vh) translateX(20px) rotate(90deg); }
          50% { transform: translateY(50vh) translateX(-20px) rotate(180deg); }
          75% { transform: translateY(75vh) translateX(15px) rotate(270deg); }
          100% { transform: translateY(105vh) translateX(0) rotate(360deg); }
        }
        @keyframes glitter-snow {
          0%, 100% { opacity: 0.3; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(2); }
        }
        .animate-glitter-snow { animation: glitter-snow 1s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default Snowfall;

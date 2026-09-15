import React from 'react';

export const BrandLogo: React.FC<{
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
}> = ({ className = '', showText = true, size = 'md', theme = 'light' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Shield Checkmark Logo identical to user's uploaded Image 1 & 10 */}
      <svg
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} shrink-0 transition-transform duration-200 hover:scale-105`}
      >
        <defs>
          <linearGradient id="shieldGrad" x1="10" y1="10" x2="90" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="checkGrad" x1="20" y1="40" x2="80" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>

        {/* Outer Shield Border */}
        <path
          d="M50 8L86 26V58C86 78 70 96 50 104C30 96 14 78 14 58V26L50 8Z"
          stroke="url(#shieldGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Checkmark Ribbon looping inward */}
        <path
          d="M34 62L48 76L76 38"
          stroke="url(#checkGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Circular Dot at the top-right of checkmark */}
        <circle cx="80" cy="30" r="5" fill="#2563eb" />

        {/* Inner lower curve accent */}
        <path
          d="M26 62C26 74 36 84 50 84C62 84 70 76 72 70"
          stroke="#2563eb"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            <span
              className={`font-extrabold tracking-tight ${textSizes[size]} ${
                theme === 'dark' ? 'text-white' : 'text-[#0f2444]'
              }`}
            >
              Label<span className="text-blue-600">Checkr</span>
            </span>
          </div>
          <span className="text-[10.5px] font-medium text-slate-500 mt-0.5 tracking-wide">
            ระบบตรวจสอบมาตรฐานฉลากอาหาร อย.
          </span>
        </div>
      )}
    </div>
  );
};

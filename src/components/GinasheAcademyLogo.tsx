import React from 'react';
import { useTheme } from '../lib/theme';

export default function GinasheAcademyLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const primaryBrand = isDark ? '#ffffff' : '#0B0C10';
  const obsidian = '#0B0C10';
  const brandCyan = '#00f2ff';
  const secondaryOpacity = '0.8';

  const sizeClass = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-16' : 'h-12';

  return (
    <svg 
      width="850" 
      height="250" 
      viewBox="0 0 850 250" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`w-auto ${sizeClass} transition-colors duration-300`}
    >
      <defs>
        <linearGradient id="gaLineFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primaryBrand} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={primaryBrand} stopOpacity="0"/>
        </linearGradient>

        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Outfit:wght@500;700&display=swap');
            .ga-word-ginashe { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 82px; transition: fill 0.3s ease; }
            .ga-word-academy { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 26px; text-transform: uppercase; transition: fill 0.3s ease; letter-spacing: 0.5em; }
            
            @keyframes gaFlowData {
              0%, 80% { stroke-dashoffset: 50; opacity: 0; }
              82% { opacity: 1; }
              98% { opacity: 1; }
              100% { stroke-dashoffset: -450; opacity: 0; }
            }
            .ga-tech-flow {
              stroke-dasharray: 40 1000;
              animation: gaFlowData 10s infinite cubic-bezier(0.2, 0, 0.2, 1);
            }
          `}
        </style>
      </defs>

      {/* Shield */}
      <g transform="translate(15, 10)">
        <path d="M 125 35 C 170 35, 195 45, 195 60 L 195 140 C 195 180, 160 210, 125 225 C 90 210, 55 180, 55 140 L 55 60 C 55 45, 80 35, 125 35 Z" 
              fill={brandCyan} 
              stroke={primaryBrand} 
              strokeWidth="7"
              />

        <path d="M 160 85 L 125 65 L 90 85 L 90 125 L 125 145 L 160 125 L 160 105 L 125 105" 
              fill="none" 
              stroke={obsidian} 
              strokeWidth="14" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              />

        <polygon points="125,12 145,22 125,32 105,22" fill={primaryBrand} />
        <path d="M 125 22 C 135 27, 140 32, 142 42" fill="none" stroke={primaryBrand} strokeWidth="1.5" />
        <rect x="140" y="40" width="4" height="4" fill={primaryBrand} />
      </g>

      {/* Wordmark */}
      <text x="290" y="125" fill={primaryBrand} className="ga-word-ginashe" textLength="480" lengthAdjust="spacing">GINASHE</text>
      
      {/* Signal line */}
      <line x1="290" y1="145" x2="770" y2="145" stroke={brandCyan} strokeWidth="20" opacity="0.05" strokeLinecap="round"/>
      <line x1="290" y1="145" x2="770" y2="145" stroke={brandCyan} strokeWidth="12" opacity="0.15" strokeLinecap="round"/>
      <line x1="290" y1="145" x2="840" y2="145" stroke="url(#gaLineFade)" strokeWidth="10" strokeLinecap="round"/>
      <line x1="290" y1="145" x2="770" y2="145" stroke={obsidian} strokeWidth="10" strokeLinecap="round" />
      <line x1="290" y1="145" x2="770" y2="145" stroke={brandCyan} strokeWidth="4" strokeLinecap="round" />
      <line className="ga-tech-flow" x1="290" y1="145" x2="840" y2="145" stroke={primaryBrand} strokeWidth="2" strokeLinecap="round"/>

      {/* ACADEMY only (no "DIGITAL") */}
      <text x="290" y="182" textLength="480" lengthAdjust="spacing">
        <tspan fill={primaryBrand} className="ga-word-academy" style={{ opacity: Number(secondaryOpacity) }}>ACADEMY</tspan>
      </text>
    </svg>
  );
}

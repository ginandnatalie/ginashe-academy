import React from 'react';
import { useTheme } from '../lib/theme';

export default function GinasheAcademyLogo({ variant, size = 'md' }: { variant?: 'light' | 'dark', size?: 'sm' | 'md' | 'lg' }) {
  const { theme } = useTheme();
  
  // Follow theme if no variant is provided.
  // showWhite means we use the White Logo (for dark backgrounds).
  const showWhite = variant ? variant === 'light' : theme === 'dark';
  const sizeClass = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-16' : 'h-12';

  if (showWhite) {
    // --- WHITE LOGO (FOR DARK BACKGROUNDS) ---
    // EXACT SVG FROM USER REQUEST
    return (
      <svg width="850" height="250" viewBox="0 0 850 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-auto ${sizeClass} transition-all duration-300`}>
        <defs>
          <linearGradient id="gaLineFadeWhite" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
          </linearGradient>

          <g id="ga-master-circuit-white">
            <path d="M 75 70 L 80 70 L 95 85 L 105 85" fill="none" />
            <circle cx="105" cy="85" r="2" fill="#ffffff" />
            <circle cx="75" cy="70" r="3" fill="#ffffff" />
            <path d="M 65 105 L 80 105 L 90 115 L 105 115" fill="none" />
            <circle cx="105" cy="115" r="2" fill="#ffffff" />
            <circle cx="65" cy="105" r="3" fill="#ffffff" />
            <path d="M 55 140 L 70 140 L 85 125 L 100 125" fill="none" />
            <circle cx="100" cy="125" r="2" fill="#ffffff" />
            <circle cx="55" cy="140" r="3" fill="#ffffff" />
            <path d="M 90 45 L 105 55 L 105 70" fill="none" />
            <circle cx="90" cy="45" r="1.5" fill="#ffffff" />
          </g>

          <g id="ga-master-circuit-flow-white">
            <path className="tech-pulse c-delay-1" d="M 75 70 L 80 70 L 95 85 L 105 85" fill="none" />
            <path className="tech-pulse c-delay-2" d="M 65 105 L 80 105 L 90 115 L 105 115" fill="none" />
            <path className="tech-pulse c-delay-3" d="M 55 140 L 70 140 L 85 125 L 100 125" fill="none" />
          </g>

          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Outfit:wght@500;700&display=swap');
              .ga-word-ginashe-white { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 82px; }
              .ga-word-academy-white { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 26px; text-transform: uppercase; letter-spacing: 0.5em; opacity: 1; }
              
              @keyframes gaFlowDataWhite {
                0%, 80% { stroke-dashoffset: 50; opacity: 0; }
                82% { opacity: 1; }
                98% { opacity: 1; }
                100% { stroke-dashoffset: -450; opacity: 0; }
              }
              .ga-tech-flow-white {
                stroke-dasharray: 40 1000;
                animation: gaFlowDataWhite 10s infinite cubic-bezier(0.2, 0, 0.2, 1);
              }

              @keyframes gaCircuitPulseWhite {
                0%, 80% { stroke-dashoffset: 60; opacity: 0; }
                85% { opacity: 1;  }
                95% { opacity: 1;  }
                100% { stroke-dashoffset: -60; opacity: 0; }
              }
              .tech-pulse {
                stroke: #00f2ff;
                stroke-width: 2.5;
                stroke-linecap: round;
                stroke-dasharray: 15 120;
                animation: gaCircuitPulseWhite 4s infinite linear;
              }
              .c-delay-1 { animation-delay: 0s; }
              .c-delay-2 { animation-delay: 1.3s; }
              .c-delay-3 { animation-delay: 2.6s; }
            `}
          </style>
        </defs>

        <g transform="translate(15, 10)">
          <path d="M 125 35 
                   C 170 35, 195 45, 195 60 
                   L 195 140 
                   C 195 180, 160 210, 125 225 
                   C 90 210, 55 180, 55 140 
                   L 55 60 
                   C 55 45, 80 35, 125 35 Z"
            fill="#00f2ff"
            stroke="#ffffff"
            strokeWidth="7"
          />

          <g stroke="#ffffff" strokeWidth="1.5" opacity="0.4">
            <use href="#ga-master-circuit-white" />
            <use href="#ga-master-circuit-white" transform="translate(250, 0) scale(-1, 1)" />
            <path d="M 125 35 L 125 65 M 125 185 L 125 225" strokeDasharray="2 4" strokeWidth="2" opacity="0.5" />
          </g>
          <g>
            <use href="#ga-master-circuit-flow-white" />
            <use href="#ga-master-circuit-flow-white" transform="translate(250, 0) scale(-1, 1)" />
          </g>

          <path d="M 125 160 L 175 145 L 125 155 L 75 145 Z" fill="#ffffff" opacity="0.1" />
          <path d="M 125 170 L 185 155 L 125 165 L 65 155 Z" fill="#ffffff" opacity="0.15" />
          <path d="M 125 180 L 190 165 L 125 175 L 60 165 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
          <polygon points="124,155 126,155 132,180 118,180" fill="#ffffff" />

          <path d="M 160 85
                   L 125 65 
                   L 90 85 
                   L 90 125 
                   L 125 145 
                   L 160 125 
                   L 160 105 
                   L 125 105"
            fill="none"
            stroke="#0B0C10"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polygon points="125,12 145,22 125,32 105,22" fill="#ffffff" />
          <path d="M 125 22 C 135 27, 140 32, 142 42" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="140" y="40" width="4" height="4" fill="#ffffff" />
        </g>

        <text x="290" y="125" className="ga-word-ginashe-white" fill="#ffffff" textLength="480" lengthAdjust="spacing">GINASHE</text>

        <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="20" opacity="0.05" strokeLinecap="round" />
        <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="12" opacity="0.15" strokeLinecap="round" />

        <line x1="290" y1="145" x2="840" y2="145" stroke="url(#gaLineFadeWhite)" strokeWidth="10" strokeLinecap="round" />
        <line x1="290" y1="145" x2="770" y2="145" stroke="#0B0C10" strokeWidth="10" strokeLinecap="round" />

        <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="4" strokeLinecap="round" />

        <line className="ga-tech-flow-white" x1="290" y1="145" x2="840" y2="145" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

        <text x="290" y="182" className="ga-word-academy-white" fill="#ffffff" textLength="480" lengthAdjust="spacing">ACADEMY</text>
      </svg>
    );
  }

  // --- BLACK LOGO (FOR WHITE BACKGROUNDS) ---
  // EXACT SVG FROM USER REQUEST
  return (
    <svg width="850" height="250" viewBox="0 0 850 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-auto ${sizeClass} transition-all duration-300`}>
      <defs>
        <linearGradient id="gaLineFadeBlack" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0B0C10" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#0B0C10" stop-opacity="0" />
        </linearGradient>

        <g id="ga-master-circuit-black">
          <path d="M 75 70 L 80 70 L 95 85 L 105 85" fill="none" />
          <circle cx="105" cy="85" r="2" fill="#0B0C10" />
          <circle cx="75" cy="70" r="3" fill="#0B0C10" />
          <path d="M 65 105 L 80 105 L 90 115 L 105 115" fill="none" />
          <circle cx="105" cy="115" r="2" fill="#0B0C10" />
          <circle cx="65" cy="105" r="3" fill="#0B0C10" />
          <path d="M 55 140 L 70 140 L 85 125 L 100 125" fill="none" />
          <circle cx="100" cy="125" r="2" fill="#0B0C10" />
          <circle cx="55" cy="140" r="3" fill="#0B0C10" />
          <path d="M 90 45 L 105 55 L 105 70" fill="none" />
          <circle cx="90" cy="45" r="1.5" fill="#0B0C10" />
        </g>

        <g id="ga-master-circuit-flow-black">
          <path className="tech-pulse c-delay-1" d="M 75 70 L 80 70 L 95 85 L 105 85" fill="none" />
          <path className="tech-pulse c-delay-2" d="M 65 105 L 80 105 L 90 115 L 105 115" fill="none" />
          <path className="tech-pulse c-delay-3" d="M 55 140 L 70 140 L 85 125 L 100 125" fill="none" />
        </g>

        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Outfit:wght@500;700&display=swap');
            .ga-word-ginashe-black { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 82px; }
            .ga-word-academy-black { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 26px; text-transform: uppercase; letter-spacing: 0.5em; opacity: 1; }
            
            @keyframes gaFlowDataBlack {
              0%, 80% { stroke-dashoffset: 50; opacity: 0; }
              82% { opacity: 1; }
              98% { opacity: 1; }
              100% { stroke-dashoffset: -450; opacity: 0; }
            }
            .ga-tech-flow-black {
              stroke-dasharray: 40 1000;
              animation: gaFlowDataBlack 10s infinite cubic-bezier(0.2, 0, 0.2, 1);
            }

            @keyframes gaCircuitPulseBlack {
              0%, 80% { stroke-dashoffset: 60; opacity: 0; }
              85% { opacity: 1;  }
              95% { opacity: 1;  }
              100% { stroke-dashoffset: -60; opacity: 0; }
            }
            .tech-pulse {
              stroke: #00f2ff;
              stroke-width: 2.5;
              stroke-linecap: round;
              stroke-dasharray: 15 120;
              animation: gaCircuitPulseBlack 4s infinite linear;
            }
            .c-delay-1 { animation-delay: 0s; }
            .c-delay-2 { animation-delay: 1.3s; }
            .c-delay-3 { animation-delay: 2.6s; }
          `}
        </style>
      </defs>

      <g transform="translate(15, 10)">
        <path d="M 125 35 
                 C 170 35, 195 45, 195 60 
                 L 195 140 
                 C 195 180, 160 210, 125 225 
                 C 90 210, 55 180, 55 140 
                 L 55 60 
                 C 55 45, 80 35, 125 35 Z"
          fill="#00f2ff"
          stroke="#0B0C10"
          strokeWidth="7"
        />

        <g stroke="#0B0C10" strokeWidth="1.5" opacity="0.4">
          <use href="#ga-master-circuit-black" />
          <use href="#ga-master-circuit-black" transform="translate(250, 0) scale(-1, 1)" />
          <path d="M 125 35 L 125 65 M 125 185 L 125 225" strokeDasharray="2 4" strokeWidth="2" opacity="0.5" />
        </g>
        <g>
          <use href="#ga-master-circuit-flow-black" />
          <use href="#ga-master-circuit-flow-black" transform="translate(250, 0) scale(-1, 1)" />
        </g>

        <path d="M 125 160 L 175 145 L 125 155 L 75 145 Z" fill="#0B0C10" opacity="0.1" />
        <path d="M 125 170 L 185 155 L 125 165 L 65 155 Z" fill="#0B0C10" opacity="0.15" />
        <path d="M 125 180 L 190 165 L 125 175 L 60 165 Z" fill="none" stroke="#0B0C10" strokeWidth="1.5" opacity="0.8" />
        <polygon points="124,155 126,155 132,180 118,180" fill="#0B0C10" />

        <path d="M 160 85
                 L 125 65 
                 L 90 85 
                 L 90 125 
                 L 125 145 
                 L 160 125 
                 L 160 105 
                 L 125 105"
          fill="none"
          stroke="#0B0C10"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <polygon points="125,12 145,22 125,32 105,22" fill="#0B0C10" />
        <path d="M 125 22 C 135 27, 140 32, 142 42" fill="none" stroke="#0B0C10" strokeWidth="1.5" />
        <rect x="140" y="40" width="4" height="4" fill="#0B0C10" />
      </g>

      <text x="290" y="125" className="ga-word-ginashe-black" fill="#000000" textLength="480" lengthAdjust="spacing">GINASHE</text>

      <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="20" opacity="0.05" strokeLinecap="round" />
      <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="12" opacity="0.15" strokeLinecap="round" />

      <line x1="290" y1="145" x2="840" y2="145" stroke="url(#gaLineFadeBlack)" strokeWidth="10" strokeLinecap="round" />
      <line x1="290" y1="145" x2="770" y2="145" stroke="#0B0C10" strokeWidth="10" strokeLinecap="round" />

      <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="4" strokeLinecap="round" />

      <line className="ga-tech-flow-black" x1="290" y1="145" x2="840" y2="145" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

      <text x="290" y="182" className="ga-word-academy-black" fill="#000000" textLength="480" lengthAdjust="spacing">ACADEMY</text>
    </svg>
  );
}

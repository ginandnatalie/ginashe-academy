import React from 'react';
import { useTheme } from '../lib/theme';

export default function Logo({ variant, className = "w-auto h-12 md:h-16 transition-all duration-300" }: { variant?: 'light' | 'dark', className?: string }) {
  const { theme } = useTheme();
  
  // Follow theme if no variant is provided.
  // showWhite means we use the White Logo (for dark backgrounds).
  const showWhite = variant ? variant === 'light' : theme === 'dark';

  if (showWhite) {
    // --- WHITE LOGO (FOR DARK BACKGROUNDS) ---
    return (
      <svg width="850" height="250" viewBox="0 0 850 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="lineFade_logo_white-neon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </linearGradient>

          <g id="circuit-traces_logo_white-neon">
            <path d="M 72 68 L 78 68 L 88 78 L 96 78" fill="none" />
            <circle cx="96" cy="78" r="1.8" fill="#ffffff" />
            <circle cx="72" cy="68" r="2" fill="#ffffff" />
            
            <path d="M 64 100 L 74 100 L 82 108 L 92 108" fill="none" />
            <circle cx="92" cy="108" r="1.8" fill="#ffffff" />
            <circle cx="64" cy="100" r="2" fill="#ffffff" />
            
            <path d="M 60 135 L 70 135 L 78 127 L 88 127" fill="none" />
            <circle cx="88" cy="127" r="1.8" fill="#ffffff" />
            <circle cx="60" cy="135" r="2" fill="#ffffff" />
            
            <path d="M 88 50 L 98 58 L 98 68" fill="none" />
            <circle cx="88" cy="50" r="1.5" fill="#ffffff" />
          </g>

          <g id="circuit-flow_logo_white-neon">
            <path className="pulse_logo_white-neon p-d1" d="M 72 68 L 78 68 L 88 78 L 96 78" fill="none" />
            <path className="pulse_logo_white-neon p-d2" d="M 64 100 L 74 100 L 82 108 L 92 108" fill="none" />
            <path className="pulse_logo_white-neon p-d3" d="M 60 135 L 70 135 L 78 127 L 88 127" fill="none" />
          </g>

          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Outfit:wght@500;700&display=swap');
              .word-ginashe_logo_white-neon { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 82px; }
              .word-academy_logo_white-neon { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 26px; text-transform: uppercase; letter-spacing: 0.5em; opacity: 1; }
              
              @keyframes flowData_logo_white-neon {
                0%, 80% { stroke-dashoffset: 50; opacity: 0; }
                82% { opacity: 1; }
                98% { opacity: 1; }
                100% { stroke-dashoffset: -450; opacity: 0; }
              }
              .tech-flow_logo_white-neon {
                stroke-dasharray: 40 1000;
                animation: flowData_logo_white-neon 10s infinite cubic-bezier(0.2, 0, 0.2, 1);
              }
              
              @keyframes pulseFlow_logo_white-neon {
                0%, 80% { stroke-dashoffset: 60; opacity: 0; }
                85% { opacity: 1; }
                95% { opacity: 1; }
                100% { stroke-dashoffset: -60; opacity: 0; }
              }
              .pulse_logo_white-neon {
                stroke: #00f2ff;
                stroke-width: 2.5;
                stroke-linecap: round;
                stroke-dasharray: 15 120;
                animation: pulseFlow_logo_white-neon 4s infinite linear;
              }
              .p-d1 { animation-delay: 0s; }
              .p-d2 { animation-delay: 1.3s; }
              .p-d3 { animation-delay: 2.6s; }
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
            fill="#00f2ff" stroke="#ffffff" strokeWidth="7" />

          <g stroke="#ffffff" strokeWidth="1.5" opacity="0.4">
            <use href="#circuit-traces_logo_white-neon" />
            <use href="#circuit-traces_logo_white-neon" transform="translate(250, 0) scale(-1, 1)" />
          </g>

          <g>
            <use href="#circuit-flow_logo_white-neon" />
            <use href="#circuit-flow_logo_white-neon" transform="translate(250, 0) scale(-1, 1)" />
          </g>

          <path d="M 125 162 Q 155 152, 178 148 Q 150 155, 125 158 Q 100 155, 72 148 Q 95 152, 125 162 Z" fill="#ffffff" opacity="0.1"/>
          <path d="M 125 172 Q 160 160, 186 155 Q 155 163, 125 168 Q 95 163, 64 155 Q 90 160, 125 172 Z" fill="#ffffff" opacity="0.15"/>
          <path d="M 125 182 Q 162 170, 190 164 Q 158 172, 125 178 Q 92 172, 60 164 Q 88 170, 125 182 Z" 
                fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8"/>
          
          <line x1="125" y1="157" x2="125" y2="182" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />

          <polygon points="
            125,58
            166,78
            166,90
            155,84
            155,80
            125,66
            95,80
            95,130
            125,150
            155,130
            155,112
            131,112
            131,100
            166,100
            166,130
            125,158
            84,130
            84,78
          " fill="#0B0C10" />

          <polygon points="125,12 148,23 125,34 102,23" fill="#ffffff" />
          <path d="M 125 23 C 133 27, 138 31, 140 38" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="140.5" cy="39.5" r="2.5" fill="#ffffff" />
        </g>

        <text x="290" y="125" className="word-ginashe_logo_white-neon" fill="#ffffff" textLength="480" lengthAdjust="spacing">GINASHE</text>
        
        <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="20" opacity="0.05" strokeLinecap="round"/>
        <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="12" opacity="0.15" strokeLinecap="round"/>
        
        <line x1="290" y1="145" x2="840" y2="145" stroke="url(#lineFade_logo_white-neon)" strokeWidth="10" strokeLinecap="round"/>
        <line x1="290" y1="145" x2="770" y2="145" stroke="#0B0C10" strokeWidth="10" strokeLinecap="round" />

        <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="4" strokeLinecap="round" />

        <line className="tech-flow_logo_white-neon" x1="290" y1="145" x2="840" y2="145" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>

        <text x="290" y="182" className="word-academy_logo_white-neon" fill="#ffffff" textLength="480" lengthAdjust="spacing">ACADEMY</text>
      </svg>
    );
  }

  // --- BLACK LOGO (FOR WHITE BACKGROUNDS) ---
  return (
    <svg width="850" height="250" viewBox="0 0 850 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="lineFade_logo_black-neon" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B0C10" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#0B0C10" stopOpacity="0"/>
        </linearGradient>

        <g id="circuit-traces_logo_black-neon">
          <path d="M 72 68 L 78 68 L 88 78 L 96 78" fill="none" />
          <circle cx="96" cy="78" r="1.8" fill="#0B0C10" />
          <circle cx="72" cy="68" r="2" fill="#0B0C10" />
          
          <path d="M 64 100 L 74 100 L 82 108 L 92 108" fill="none" />
          <circle cx="92" cy="108" r="1.8" fill="#0B0C10" />
          <circle cx="64" cy="100" r="2" fill="#0B0C10" />
          
          <path d="M 60 135 L 70 135 L 78 127 L 88 127" fill="none" />
          <circle cx="88" cy="127" r="1.8" fill="#0B0C10" />
          <circle cx="60" cy="135" r="2" fill="#0B0C10" />
          
          <path d="M 88 50 L 98 58 L 98 68" fill="none" />
          <circle cx="88" cy="50" r="1.5" fill="#0B0C10" />
        </g>

        <g id="circuit-flow_logo_black-neon">
          <path className="pulse_logo_black-neon p-d1" d="M 72 68 L 78 68 L 88 78 L 96 78" fill="none" />
          <path className="pulse_logo_black-neon p-d2" d="M 64 100 L 74 100 L 82 108 L 92 108" fill="none" />
          <path className="pulse_logo_black-neon p-d3" d="M 60 135 L 70 135 L 78 127 L 88 127" fill="none" />
        </g>

        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Outfit:wght@500;700&display=swap');
            .word-ginashe_logo_black-neon { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 82px; }
            .word-academy_logo_black-neon { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 26px; text-transform: uppercase; letter-spacing: 0.5em; opacity: 1; }
            
            @keyframes flowData_logo_black-neon {
              0%, 80% { stroke-dashoffset: 50; opacity: 0; }
              82% { opacity: 1; }
              98% { opacity: 1; }
              100% { stroke-dashoffset: -450; opacity: 0; }
            }
            .tech-flow_logo_black-neon {
              stroke-dasharray: 40 1000;
              animation: flowData_logo_black-neon 10s infinite cubic-bezier(0.2, 0, 0.2, 1);
            }
            
            @keyframes pulseFlow_logo_black-neon {
              0%, 80% { stroke-dashoffset: 60; opacity: 0; }
              85% { opacity: 1; }
              95% { opacity: 1; }
              100% { stroke-dashoffset: -60; opacity: 0; }
            }
            .pulse_logo_black-neon {
              stroke: #00f2ff;
              stroke-width: 2.5;
              stroke-linecap: round;
              stroke-dasharray: 15 120;
              animation: pulseFlow_logo_black-neon 4s infinite linear;
            }
            .p-d1 { animation-delay: 0s; }
            .p-d2 { animation-delay: 1.3s; }
            .p-d3 { animation-delay: 2.6s; }
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
              fill="#00f2ff" stroke="#0B0C10" strokeWidth="7" />

        <g stroke="#0B0C10" strokeWidth="1.5" opacity="0.4">
          <use href="#circuit-traces_logo_black-neon" />
          <use href="#circuit-traces_logo_black-neon" transform="translate(250, 0) scale(-1, 1)" />
        </g>

        <g>
          <use href="#circuit-flow_logo_black-neon" />
          <use href="#circuit-flow_logo_black-neon" transform="translate(250, 0) scale(-1, 1)" />
        </g>

        <path d="M 125 162 Q 155 152, 178 148 Q 150 155, 125 158 Q 100 155, 72 148 Q 95 152, 125 162 Z" fill="#0B0C10" opacity="0.1"/>
        <path d="M 125 172 Q 160 160, 186 155 Q 155 163, 125 168 Q 95 163, 64 155 Q 90 160, 125 172 Z" fill="#0B0C10" opacity="0.15"/>
        <path d="M 125 182 Q 162 170, 190 164 Q 158 172, 125 178 Q 92 172, 60 164 Q 88 170, 125 182 Z" 
              fill="none" stroke="#0B0C10" strokeWidth="1.5" opacity="0.8"/>
        
        <line x1="125" y1="157" x2="125" y2="182" stroke="#0B0C10" strokeWidth="1.5" opacity="0.5" />

        <polygon points="
          125,58
          166,78
          166,90
          155,84
          155,80
          125,66
          95,80
          95,130
          125,150
          155,130
          155,112
          131,112
          131,100
          166,100
          166,130
          125,158
          84,130
          84,78
        " fill="#0B0C10" />

        <polygon points="125,12 148,23 125,34 102,23" fill="#0B0C10" />
        <path d="M 125 23 C 133 27, 138 31, 140 38" fill="none" stroke="#0B0C10" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="140.5" cy="39.5" r="2.5" fill="#0B0C10" />
      </g>

      <text x="290" y="125" className="word-ginashe_logo_black-neon" fill="#000000" textLength="480" lengthAdjust="spacing">GINASHE</text>
      
      <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="20" opacity="0.05" strokeLinecap="round"/>
      <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="12" opacity="0.15" strokeLinecap="round"/>
      
      <line x1="290" y1="145" x2="840" y2="145" stroke="url(#lineFade_logo_black-neon)" strokeWidth="10" strokeLinecap="round"/>
      <line x1="290" y1="145" x2="770" y2="145" stroke="#0B0C10" strokeWidth="10" strokeLinecap="round" />

      <line x1="290" y1="145" x2="770" y2="145" stroke="#00f2ff" strokeWidth="4" strokeLinecap="round" />

      <line className="tech-flow_logo_black-neon" x1="290" y1="145" x2="840" y2="145" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>

      <text x="290" y="182" className="word-academy_logo_black-neon" fill="#000000" textLength="480" lengthAdjust="spacing">ACADEMY</text>
    </svg>
  );
}

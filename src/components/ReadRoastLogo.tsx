import React from 'react';

interface ReadRoastLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function ReadRoastLogo({ className = '', size = 'md' }: ReadRoastLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-28 h-28',
    xl: 'w-48 h-48',
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-forest-950"
      >
        {/* Outer Circular border - Forest Green */}
        <circle cx="200" cy="200" r="185" stroke="#143A24" strokeWidth="8" />
        
        {/* Inner thin border - Gold */}
        <circle cx="200" cy="200" r="165" stroke="#caa141" strokeWidth="3" strokeDasharray="10 5" />
        
        {/* Upper region - Steam */}
        <path
          d="M190 120 C185 110, 195 100, 190 90 C185 80, 195 70, 190 60"
          stroke="#caa141"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M210 120 C205 110, 215 100, 210 90 C205 80, 215 70, 210 60"
          stroke="#caa141"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Coffee Cup body - Cream/White and Forest Green details */}
        <path
          d="M135 150 C135 220, 265 220, 265 150 Z"
          fill="#faf6ee"
          stroke="#143A24"
          strokeWidth="8"
        />
        
        {/* Cup Rim */}
        <ellipse cx="200" cy="150" rx="65" ry="15" fill="#faf6ee" stroke="#143A24" strokeWidth="6" />
        <ellipse cx="200" cy="150" rx="50" ry="8" fill="#143A24" opacity="0.1" />

        {/* Cup Handle */}
        <path
          d="M265 160 C295 160, 295 200, 260 200"
          stroke="#143A24"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Ampersand Logo on Cup */}
        <text
          x="200"
          y="190"
          fontFamily="Georgia, serif"
          fontSize="42"
          fontWeight="bold"
          fill="#143A24"
          textAnchor="middle"
        >
          &
        </text>

        {/* Supporting Open Book under the cup */}
        <path
          d="M200 215 C230 212, 275 220, 310 245 L310 215 C275 190, 230 182, 200 185 C170 182, 125 190, 90 215 L90 245 C125 220, 170 212, 200 215 Z"
          fill="#faf6ee"
          stroke="#143A24"
          strokeWidth="6"
        />
        
        {/* Book pages lines detail */}
        <path
          d="M200 215 L200 185"
          stroke="#143A24"
          strokeWidth="4"
        />
        
        {/* Page curves left page */}
        <path d="M105 225 C135 212, 170 205, 195 208" stroke="#143A24" strokeWidth="2" fill="none" />
        <path d="M110 232 C140 219, 175 212, 195 215" stroke="#143A24" strokeWidth="2" fill="none" />
        
        {/* Page curves right page */}
        <path d="M295 225 C265 212, 230 205, 205 208" stroke="#143A24" strokeWidth="2" fill="none" />
        <path d="M290 232 C260 219, 225 212, 205 215" stroke="#143A24" strokeWidth="2" fill="none" />

        {/* Circular text banner background strip */}
        <rect x="50" y="250" width="300" height="42" rx="6" fill="#143A24" stroke="#caa141" strokeWidth="3" />
        
        {/* Banner text "READ & ROAST" */}
        <text
          x="200"
          y="280"
          fontFamily="Georgia, serif"
          fontSize="24"
          fontWeight="bold"
          fill="#faf6ee"
          letterSpacing="4"
          textAnchor="middle"
        >
          READ & ROAST
        </text>

        {/* Bottom coffee bean decoration */}
        <ellipse cx="200" cy="318" rx="14" ry="9" fill="#78350f" transform="rotate(-15 200 318)" />
        <path d="M188 322 C194 319, 202 318, 212 314" stroke="#faf6ee" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Left and Right horizontal lines */}
        <line x1="100" y1="318" x2="175" y2="318" stroke="#caa141" strokeWidth="3" strokeLinecap="round" />
        <line x1="225" y1="318" x2="300" y2="318" stroke="#caa141" strokeWidth="3" strokeLinecap="round" />

        {/* Footer arc text "BOOKS. COFFEE. GOOD VIBES." */}
        <path
          id="textArcPath"
          d="M 85 320 A 130 130 0 0 0 315 320"
          fill="none"
        />
        <text className="font-sans text-[11.5px] font-bold" fill="#143A24" letterSpacing="5">
          <textPath href="#textArcPath" startOffset="50%" textAnchor="middle">
            BOOKS. COFFEE. GOOD VIBES.
          </textPath>
        </text>
      </svg>
    </div>
  );
}

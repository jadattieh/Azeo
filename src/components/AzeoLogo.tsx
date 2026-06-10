import React from "react";

interface AzeoLogoProps {
  className?: string;
  light?: boolean;
}

export default function AzeoLogo({ className = "h-16 w-auto", light = false }: AzeoLogoProps) {
  // We can support light mode styling for dark backgrounds like preloader/footer
  const sloganAndLinesColor = light ? "#f5f1e6" : "#1a2a1a";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 460 180"
      className={className}
      fill="none"
    >
      <defs>
        {/* Luxury Champagne Gold Linear Gradient */}
        <linearGradient id="azeoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7e9c8" />
          <stop offset="35%" stopColor="#d1a657" />
          <stop offset="65%" stopColor="#b08332" />
          <stop offset="100%" stopColor="#f3deab" />
        </linearGradient>
        
        {/* Soft elegant drop shadow */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#logoShadow)">
        {/* --- LETTER A --- */}
        <path
          d="M 28 120 L 58 35 H 68 L 98 120 H 84 L 77 96 H 49 L 42 120 Z M 52 84 H 74 L 63 48 Z"
          fill="url(#azeoGold)"
        />

        {/* --- LETTER Z --- */}
        <path
          d="M 112 38 H 178 V 49 L 126 108 H 178 V 120 H 112 V 109 L 164 50 H 112 Z"
          fill="url(#azeoGold)"
        />

        {/* Small horizontal chef knife over the Z */}
        <g transform="translate(108, 64)">
          {/* Blade pointing right */}
          <path
            d="M 18 10 C 28 10 48 11.5 58 12 C 54 13.5 34 14 20 14 C 18 14 18 11.5 18 10 Z"
            fill="#f5f1e6"
            stroke="url(#azeoGold)"
            strokeWidth="0.8"
          />
          {/* Sharp point and handle */}
          <path
            d="M 18 12 H 11 C 10 12 9 11 9 10 C 9 9 10 8 11 8 H 18 Z"
            fill="#6d4c1b"
          />
        </g>

        {/* Golden Royal Crown above Z */}
        <g transform="translate(125, 8)">
          {/* Base */}
          <rect x="4" y="16" width="22" height="2.5" rx="1" fill="url(#azeoGold)" />
          {/* Points */}
          <path d="M 4 16 L 3 9 C 6 12 11 12 15 5 C 19 12 24 12 27 9 L 26 16 Z" fill="url(#azeoGold)" />
          {/* Pearls */}
          <circle cx="3" cy="8" r="1.5" fill="#ffffff" />
          <circle cx="15" cy="4" r="2" fill="#ffffff" />
          <circle cx="27" cy="8" r="1.5" fill="#ffffff" />
        </g>

        {/* --- LETTER E --- */}
        <path
          d="M 194 35 H 244 V 47 H 207 V 70 H 238 V 81 H 207 V 108 H 245 V 120 H 194 Z"
          fill="url(#azeoGold)"
        />

        {/* --- LETTER O (with embedded CATERING banner) --- */}
        {/* Golden Ring circle */}
        <path
          d="M 302 77.5 C 302 99.8 283.8 118 261.5 118 C 239.2 118 221 99.8 221 77.5 C 221 55.2 239.2 37 261.5 37 C 283.8 37 302 55.2 302 77.5 Z"
          stroke="url(#azeoGold)"
          strokeWidth="11"
        />
        {/* Crescent underline */}
        <path
          d="M 236 94 C 243 101 251 104 261.5 104 C 272 104 280 101 287 94"
          stroke="url(#azeoGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Dark backdrop banner to make CATERING text stand out cleanly */}
        <rect x="226" y="66" width="71" height="18" rx="2" fill="#090e0b" />
        {/* Inner crisp text */}
        <text
          x="261.5"
          y="79"
          fill="#ffffff"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="11.5"
          fontStyle="italic"
          textAnchor="middle"
          letterSpacing="1.2"
        >
          CATERING
        </text>

        {/* --- TAGLINE & SIGNATURE DIVIDER LINES --- */}
        {/* Left side rule */}
        <line x1="28" y1="148" x2="162" y2="148" stroke="url(#azeoGold)" strokeWidth="1.5" opacity="0.8" />
        
        {/* Right side rule */}
        <line x1="298" y1="148" x2="432" y2="148" stroke="url(#azeoGold)" strokeWidth="1.5" opacity="0.8" />

        {/* Tagline text: Where.Taste.Meets.Style */}
        <text
          x="230"
          y="152"
          fill={sloganAndLinesColor}
          fontFamily="Georgia, Cambria, 'Times New Roman', Times, serif"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
          letterSpacing="2"
        >
          Where.Taste.Meets.Style
        </text>
      </g>
    </svg>
  );
}

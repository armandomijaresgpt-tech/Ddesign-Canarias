import React, { useState } from 'react';

interface GeometricImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  objectFit?: 'cover' | 'contain';
  onClick?: () => void;
}

export const GeometricImage: React.FC<GeometricImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[16/10]',
  objectFit = 'cover',
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden bg-zinc-950 ${aspectRatioClass} ${className}`}
      onClick={onClick}
    >
      {/* High-End Geometric Placeholder with Shimmer & Technical Grid */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none flex items-center justify-center ${
          isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        
        {/* Shimmer wave effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

        {/* Blueprint geometric emblem */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-zinc-600">
          <svg 
            viewBox="0 0 32 32" 
            className="w-6 h-6 stroke-current stroke-[1.2] fill-none opacity-60"
          >
            <rect x="4" y="4" width="24" height="24" rx="4" />
            <circle cx="11" cy="11" r="2.5" />
            <path d="M4 22L12 14L20 22" />
            <path d="M16 18L21 13L28 20" />
            <line x1="4" y1="28" x2="28" y2="28" strokeDasharray="2 2" />
          </svg>
          <span className="text-[9px] font-mono tracking-widest uppercase opacity-40">
            {hasError ? 'ACTIVO NO DISPONIBLE' : 'CANARIAS · TALLER'}
          </span>
        </div>
      </div>

      {/* Main Image with Lazy Loading & Blur Transition */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-${objectFit} transition-all duration-700 ease-out ${
            isLoaded 
              ? 'opacity-100 scale-100 filter-none' 
              : 'opacity-0 scale-105 blur-sm'
          }`}
        />
      )}
    </div>
  );
};

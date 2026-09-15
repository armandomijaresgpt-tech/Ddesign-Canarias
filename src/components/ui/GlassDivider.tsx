import React from 'react';

interface GlassDividerProps {
  className?: string;
  id?: string;
  withGlow?: boolean;
  accent?: 'default' | 'red';
}

export const GlassDivider: React.FC<GlassDividerProps> = ({
  className = '',
  id,
  withGlow = true,
  accent = 'red',
}) => {
  return (
    <div 
      id={id}
      className={`relative w-full flex items-center justify-center py-2 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Specular glassmorphic horizontal hairline */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.22] to-transparent backdrop-blur-md" />
      
      {/* Subtle under-shadow for frosted depth */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-black/70 to-transparent translate-y-[1px]" />
      
      {/* Ambient glass glow aura */}
      {withGlow && (
        <div 
          className={`absolute w-32 sm:w-48 h-3 rounded-full blur-md -translate-y-1/2 ${
            accent === 'red' 
              ? 'bg-gradient-to-r from-transparent via-red-500/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-white/15 to-transparent'
          }`} 
        />
      )}
      
      {/* Precision micro-pip in dead center */}
      <div className="absolute flex items-center justify-center">
        <div className="w-2 h-2 rotate-45 border border-white/40 bg-zinc-950/90 shadow-[0_0_8px_rgba(255,255,255,0.4)] flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-white shadow-[0_0_4px_#ffffff]" />
        </div>
      </div>
    </div>
  );
};

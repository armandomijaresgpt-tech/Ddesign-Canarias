import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('CONECTANDO AL TALLER...');

  useEffect(() => {
    // Collect all portfolio image URLs
    const portfolioImages = PORTFOLIO_DATA.map((item) => item.image);
    
    // Add primary product images for an ultra-smooth initial render
    const initialImages = [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
      ...portfolioImages,
    ];

    const uniqueImages = Array.from(new Set(initialImages));
    const total = uniqueImages.length;
    let loaded = 0;

    const updateProgress = () => {
      loaded += 1;
      const calculated = Math.min(100, Math.round((loaded / total) * 100));
      setProgress(calculated);

      if (calculated < 40) {
        setStatusMessage('CARGANDO ACTIVOS DE PRODUCCIÓN...');
      } else if (calculated < 85) {
        setStatusMessage('PRE-RENDERIZANDO PROYECTOS DEL PORTAFOLIO...');
      } else if (calculated < 100) {
        setStatusMessage('SINCRONIZANDO ESPECIFICACIONES TÉCNICAS...');
      } else {
        setStatusMessage('ESTUDIO & TALLER PREPARADOS');
      }

      if (loaded >= total) {
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    // Preload each image asynchronously
    uniqueImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress; // Advance even if an individual asset fails
    });

    // Safety fallback: Never keep the user waiting longer than 2.8s
    const timeout = setTimeout(() => {
      setProgress(100);
      setStatusMessage('ESTUDIO & TALLER PREPARADOS');
      setTimeout(() => {
        onComplete();
      }, 300);
    }, 2800);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <motion.div
      id="app-loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080C] text-white select-none px-6"
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        {/* Sleek Embossed Emblem */}
        <motion.div 
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-b from-white/40 via-zinc-700 to-black shadow-[0_8px_30px_rgba(0,0,0,0.9),inset_0_2px_3px_rgba(255,255,255,0.4)] mb-8"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-b from-zinc-800 via-[#101217] to-zinc-950 flex items-center justify-center border border-white/20 relative overflow-hidden">
            {/* Real Logo Image */}
            <img 
              src="https://covndikrmfvxscuajrqp.supabase.co/storage/v1/object/public/Logo/logo.jpeg"
              alt="Design Canarias Logo"
              className="w-full h-full object-cover relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Minimal Progress Bar */}
        <div className="w-full h-[2px] bg-zinc-800/80 rounded-full overflow-hidden relative shadow-inner mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-zinc-400 via-white to-zinc-200 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>

        {/* Numeric Percentage Counter and Island Label */}
        <div className="w-full flex items-center justify-between text-xs font-mono tracking-wider">
          <span className="text-zinc-500 text-[10px] tracking-widest uppercase">
            DESIGN CANARIAS
          </span>
          <span className="text-white font-bold text-sm tabular-nums">
            {progress.toString().padStart(2, '0')}%
          </span>
        </div>

        {/* Status Line */}
        <p className="mt-3 text-[10px] tracking-widest text-zinc-400 uppercase font-mono text-center transition-all">
          {statusMessage}
        </p>
      </div>
    </motion.div>
  );
};

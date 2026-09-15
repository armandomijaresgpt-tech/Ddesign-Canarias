import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  RotateCw, 
  Wifi, 
  ShieldCheck, 
  ArrowRight,
  Printer,
  Maximize2
} from 'lucide-react';
import { NavSection } from '../types';

interface InteractiveHeroCardProps {
  onSelectServiceForQuote: (serviceId: string) => void;
}

interface CardFinishOption {
  id: string;
  name: string;
  serviceId: string;
  badge: string;
  gradient: string;
  accent: string;
  tagline: string;
  texture: string;
  specs: string[];
}

export const InteractiveHeroCard: React.FC<InteractiveHeroCardProps> = ({
  onSelectServiceForQuote,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<number>(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const cardFinishes: CardFinishOption[] = [
    {
      id: 'softtouch',
      name: 'Black Soft-Touch 600g',
      serviceId: 'impresion',
      badge: 'Acabado Velvet & Canto Rojo',
      gradient: 'from-[#14151C] via-[#0E0F14] to-[#1A1C26]',
      accent: 'border-red-500/40 text-red-400',
      tagline: 'Papelería Ultra-Premium con tacto aterciopelado',
      texture: 'subtle-matte',
      specs: ['600g Grosor Duplex', 'Barniz UVI Selectivo 3D', 'Cantos Tintados Rojo', 'FSC Certificado'],
    },
    {
      id: 'holographic',
      name: 'HoloFoil & Relieve Canario',
      serviceId: 'branding',
      badge: 'Foil Holográfico Iridiscente',
      gradient: 'from-[#171822] via-[#10121A] to-[#201524]',
      accent: 'border-rose-500/50 text-rose-300',
      tagline: 'Reflejo holográfico dinámico y stamping térmico',
      texture: 'hologram',
      specs: ['Stamping Térmico 180°', 'Anti-Rayaduras Pro', 'Efecto Óptico Prisma', 'Logotipo Vectorizado'],
    },
    {
      id: 'wrap',
      name: 'Rotulación Flota Cast',
      serviceId: 'rotulacion',
      badge: 'Vinilo Polimérico Anti-Salitre',
      gradient: 'from-[#161214] via-[#1A0B0F] to-[#2B0E14]',
      accent: 'border-red-600/60 text-red-400',
      tagline: 'Protección intemperie y resistencia solar UV Canarias',
      texture: 'carbon',
      specs: ['Garantía 7 años', 'Laminado Cast 3D', 'Corte CNC Milimétrico', 'Instalación Homologada'],
    },
    {
      id: 'nfc',
      name: 'Smart Card NFC Canarias',
      serviceId: 'digital',
      badge: 'Chip NFC Integrado & QR',
      gradient: 'from-[#0B1017] via-[#0A131C] to-[#111D2B]',
      accent: 'border-cyan-500/40 text-cyan-400',
      tagline: 'Comparte tu contacto y catálogo con 1 solo toque',
      texture: 'tech-grid',
      specs: ['Chip NTAG213 Certificado', 'Compatible iOS y Android', 'Sin Apps Requeridas', 'Perfil Dinámico'],
    }
  ];

  const current = cardFinishes[selectedFinish];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Percentage within the card (-1 to 1)
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    
    setRotateY(px * 14); // Horizontal tilt
    setRotateX(-py * 14); // Vertical tilt
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      
      {/* 3D Perspective Card Stage */}
      <div 
        className="w-full max-w-[420px] aspect-[1.65/1] perspective-1000 relative select-none cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          ref={cardRef}
          animate={{
            rotateX: rotateX,
            rotateY: isFlipped ? rotateY + 180 : rotateY,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          style={{ transformStyle: 'preserve-3d' }}
          className={`relative w-full h-full rounded-2xl p-6 sm:p-7 border ${current.accent} bg-gradient-to-br ${current.gradient} shadow-2xl shadow-black/80 transition-shadow duration-300 overflow-hidden backdrop-blur-xl`}
        >
          {/* Dynamic Light Glare Effect based on cursor */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 group-hover:opacity-75"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.08) 25%, transparent 60%)`,
            }}
          />

          {/* Holographic Rainbow Sheen for holo cards */}
          {current.id === 'holographic' && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-color-dodge transition-transform duration-200"
              style={{
                backgroundImage: 'linear-gradient(135deg, rgba(255,0,0,0.4) 0%, rgba(255,255,0,0.4) 25%, rgba(0,255,255,0.4) 50%, rgba(255,0,255,0.4) 75%, rgba(255,0,0,0.4) 100%)',
                transform: `translateX(${(glarePos.x - 50) * 1.5}px) translateY(${(glarePos.y - 50) * 1.5}px)`,
              }}
            />
          )}

          {/* CARD FRONT */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            
            {/* Top Row: Brand Monogram & Chips */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center font-extrabold text-white text-xs">
                  DC
                </div>
                <div>
                  <div className="font-display font-extrabold text-white text-sm tracking-tight flex items-center gap-1.5">
                    DESIGN CANARIAS
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                    Studio & Craft Lab
                  </div>
                </div>
              </div>

              {/* NFC / Tech / Quality Icon */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] text-zinc-300 backdrop-blur-md">
                {current.id === 'nfc' ? (
                  <>
                    <Wifi className="w-3 h-3 text-cyan-400 rotate-90" />
                    <span>NFC Tap</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3 h-3 text-red-400" />
                    <span>Canarias Pro</span>
                  </>
                )}
              </div>
            </div>

            {/* Middle: Hologram / Emblem Graphic */}
            <div className="my-auto py-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                  {current.badge}
                </span>
              </div>
              <h4 className="font-display font-bold text-white text-lg sm:text-xl tracking-tight mt-1">
                {current.name}
              </h4>
              <p className="text-xs text-zinc-300/80 font-normal line-clamp-1">
                {current.tagline}
              </p>
            </div>

            {/* Bottom Row: Micro specs & Flip clue */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[11px]">
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>Hecho en Canarias</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-zinc-400 group-hover:text-red-400 transition-colors">
                <RotateCw className="w-3 h-3" />
                <span>Girar 3D</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Switcher Bar beneath card */}
      <div className="w-full max-w-[420px] mt-4 flex flex-col gap-2">
        <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider text-center">
          Toca para alternar acabados y producciones:
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {cardFinishes.map((item, idx) => {
            const isSelected = selectedFinish === idx;
            return (
              <button
                key={item.id}
                id={`card-finish-pill-${item.id}`}
                onClick={() => setSelectedFinish(idx)}
                className={`px-2.5 py-2 rounded-xl text-left transition-all duration-200 border text-xs focus:outline-none cursor-pointer ${
                  isSelected 
                    ? 'bg-zinc-800 border-red-500/80 text-white shadow-md shadow-red-500/10' 
                    : 'bg-zinc-950/60 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10'
                }`}
              >
                <div className="text-[11px] font-semibold truncate leading-tight">
                  {item.name.split(' ')[0]} {item.name.split(' ')[1] || ''}
                </div>
                <div className="text-[9px] text-zinc-400 truncate mt-0.5">
                  {item.serviceId.toUpperCase()}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action button straight to quote */}
        <button
          id="card-cta-customize-btn"
          onClick={() => onSelectServiceForQuote(current.serviceId)}
          className="mt-1 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 active:scale-98 transition-all cursor-pointer"
        >
          <span>Personalizar {current.name} en Cotizador</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette,
  Printer,
  Store,
  Layers,
  ShoppingBag,
  Sparkles,
  Shirt,
  Award,
  Check,
  Clock,
  Euro,
  ArrowRight,
  Tag,
  Calculator
} from 'lucide-react';
import { NavSection } from '../../types';
import { useSound } from '../../context/SoundContext';
import { NavigationPillMenu } from '../NavigationPillMenu';
import { LoopingWords } from '../ui/looping-words-with-gsap';
import { HeroParticleCanvas } from '../HeroParticleCanvas';

const SPECIALTIES_WORDS = [
  'Diseño',
  'Impresiones',
  'Rotulación',
  'Papelería',
  'Merchadising',
  'Vinilos',
  'Personalización',
  'Eventos',
  'Bodas'
];

interface ProductItem {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  description: string;
  startingPrice: string;
}

// Exactly 8 official services from https://designcanarias.com/service/
const PRODUCTS: ProductItem[] = [
  {
    id: 'diseno-grafico',
    name: 'Diseño Gráfico',
    category: 'Diseño & Creatividad',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    description: 'De la idea al concepto final: creación de logotipos vectoriales, cartelería publicitaria y dossiers.',
    startingPrice: 'Desde 95€',
  },
  {
    id: 'impresiones',
    name: 'Impresiones',
    category: 'Pequeño & Gran Formato',
    icon: Printer,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    description: 'Impresión en alta definición para papelería, folletos, lonas publicitarias y banners exteriores.',
    startingPrice: 'Desde 49€',
  },
  {
    id: 'rotulacion',
    name: 'Rotulación',
    category: 'Espacios & Flotas',
    icon: Store,
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1200&q=80',
    description: 'Rotulación integral de fachadas, escaparates, letras corpóreas y flotas comerciales con montaje.',
    startingPrice: 'Desde 145€',
  },
  {
    id: 'papeleria',
    name: 'Papelería Premium',
    category: 'Identidad Corporativa',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    description: 'Tarjetas de visita de alta gama, sobres corporativos, carpetas troqueladas y menús hosteleros.',
    startingPrice: 'Desde 39€',
  },
  {
    id: 'merchandising',
    name: 'Merchandising',
    category: 'Regalos Promocionales',
    icon: ShoppingBag,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    description: 'Personalización de artículos promocionales: tazas cerámicas, bolígrafos láser, botellas térmicas y lanyards.',
    startingPrice: 'Desde 65€',
  },
  {
    id: 'vinilos-adhesivos',
    name: 'Vinilos & Adhesivos',
    category: 'Adhesivos & Decoración',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=1200&q=80',
    description: 'Vinilos de corte al detalle para paredes o cristales, pegatinas troqueladas y microperforado.',
    startingPrice: 'Desde 29€',
  },
  {
    id: 'personalizacion',
    name: 'Personalización',
    category: 'Textil & Producto',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    description: 'Personalización textil con camisetas, sudaderas, ropa laboral técnica y gorras con tecnología DTF.',
    startingPrice: 'Desde 45€',
  },
  {
    id: 'eventos',
    name: 'Eventos & Bodas',
    category: 'Celebraciones & Ferias',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    description: 'Invitaciones exclusivas, photocalls personalizados con estructura, minutas de mesa y roll-ups.',
    startingPrice: 'Desde 55€',
  },
];

interface HeroSectionProps {
  activeSection?: NavSection;
  onNavigate?: (section: NavSection) => void;
  onSelectServiceForQuote?: (serviceId: string) => void;
}

interface ServiceTooltipProps {
  product: ProductItem;
  index: number;
}

const ServiceTooltip: React.FC<ServiceTooltipProps> = ({ product, index }) => {
  const isTopRow = index < 4;
  const isLeftCol = index % 4 === 0;
  const isRightCol = index % 4 === 3;

  const positionClasses = isTopRow 
    ? 'top-[calc(100%+8px)]' 
    : 'bottom-[calc(100%+8px)]';

  const alignmentClasses = isLeftCol
    ? 'left-0'
    : isRightCol
      ? 'right-0'
      : 'left-1/2 -translate-x-1/2';

  return (
    <motion.div
      initial={{ opacity: 0, y: isTopRow ? -6 : 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: isTopRow ? -4 : 4, scale: 0.95 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className={`absolute ${positionClasses} ${alignmentClasses} z-50 pointer-events-none w-56 sm:w-64 p-3 rounded-xl bg-zinc-950/95 border border-white/25 shadow-[0_14px_36px_rgba(0,0,0,0.95),0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-2xl text-left`}
    >
      {/* Caret Triangle Indicator */}
      <div 
        className={`absolute w-2.5 h-2.5 rotate-45 bg-zinc-950 border border-white/25 ${
          isTopRow 
            ? '-top-1.5 border-b-0 border-r-0' 
            : '-bottom-1.5 border-t-0 border-l-0'
        } ${
          isLeftCol 
            ? 'left-6' 
            : isRightCol 
              ? 'right-6' 
              : 'left-1/2 -translate-x-1/2'
        }`} 
      />

      {/* Header with Title & Category */}
      <div className="flex items-center justify-between gap-1.5 mb-1.5 pb-1 border-b border-white/10">
        <span className="text-xs font-bold text-white tracking-tight line-clamp-1">
          {product.name}
        </span>
        <span className="text-[9px] uppercase font-semibold text-red-400 px-1.5 py-0.5 rounded bg-red-500/10 shrink-0">
          {product.category}
        </span>
      </div>

      {/* Brief Description */}
      <p className="text-[11px] text-zinc-300 leading-relaxed line-clamp-2 mb-2">
        {product.description}
      </p>

      {/* Estimated Base Price Pill & Turnaround */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.08] text-[10px]">
        <div className="flex items-center gap-1 font-bold text-white bg-white/10 px-2 py-0.5 rounded-lg border border-white/15">
          <Euro className="w-3 h-3 text-zinc-300" />
          <span>{product.startingPrice}</span>
        </div>
        <div className="flex items-center gap-1 text-zinc-400">
          <Clock className="w-2.5 h-2.5 text-zinc-400" />
          <span>24h-72h</span>
        </div>
      </div>
    </motion.div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeSection = 'hero',
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(PRODUCTS[0]);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const { playHover, playClick } = useSound();

  return (
    <div className="w-full min-h-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex flex-col justify-start lg:justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-4 lg:gap-6 w-full items-center">
        
        {/* Left Half: Selected product image with seamless crossfade animation */}
        <div 
          id="hero-product-image-container"
          className="relative w-full h-[150px] xs:h-[180px] sm:h-[270px] lg:h-[min(480px,calc(100vh-9.5rem))] max-h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden border border-white/[0.12] bg-[#0c0d12] flex items-center justify-center shadow-2xl shadow-black/90 group"
        >
          {/* True Crossfade using motion.img */}
          <AnimatePresence>
            <motion.img
              key={selectedProduct.id}
              id="hero-selected-product-img"
              src={selectedProduct.image}
              alt={selectedProduct.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </AnimatePresence>

          {/* Minimalist studio watermark badge */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-medium tracking-wide shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-zinc-400 font-normal">Taller Canarias</span>
            <span className="text-zinc-600">|</span>
            <span className="font-semibold text-white uppercase tracking-wider text-[9px] sm:text-[10px]">{selectedProduct.category}</span>
          </div>

          {/* Bottom subtle detail overlay on image */}
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/65 to-transparent flex items-end justify-between z-10">
            <div>
              <h3 className="text-white font-display font-bold text-base sm:text-lg tracking-tight">
                {selectedProduct.name}
              </h3>
              <p className="text-zinc-400 text-xs font-normal max-w-xs sm:max-w-md line-clamp-1 mt-0.5">
                {selectedProduct.description}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-300 bg-white/[0.1] px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md whitespace-nowrap font-medium">
                <Tag className="w-3 h-3 text-white" />
                <span>{selectedProduct.startingPrice}</span>
              </div>

              {onSelectServiceForQuote && (
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    onSelectServiceForQuote(selectedProduct.id);
                  }}
                  className="btn-haptic-red px-3 sm:px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-red-600/30 border border-red-500/50 cursor-pointer active:scale-95 transition-all"
                  title="Cotizar este servicio ahora"
                >
                  <span>Cotizar</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Half: Navigation Menu Bar RIGHT ABOVE the Product Buttons Grid */}
        <div 
          id="hero-products-button-grid-container"
          className="w-full flex flex-col justify-center gap-2 lg:gap-2.5 relative overflow-visible"
        >
          {/* Prominent 'Solicitar Presupuesto' Button with Hover Lift Effect kept at top position */}
          <div className="w-full flex items-center justify-center">
            <button
              id="hero-solicitar-presupuesto-btn"
              type="button"
              onClick={() => {
                playClick();
                if (onNavigate) {
                  onNavigate('cotizador');
                }
              }}
              onMouseEnter={playHover}
              className="group relative flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(239,68,68,0.35)] border border-red-400/40 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(239,68,68,0.55)] active:translate-y-0 active:scale-[0.98]"
            >
              <Calculator className="w-4 h-4 text-white shrink-0 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-black uppercase tracking-wider font-display">
                Solicitar Presupuesto
              </span>
              <span className="text-[9.5px] px-1.5 py-0.5 rounded-full bg-black/30 border border-white/20 text-white/90 font-medium">
                60s
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* SECTION NAVIGATION MENU MOVED RIGHT ABOVE BUTTONS (HIDDEN ON MOBILE, VISIBLE ON TABLET/DESKTOP) */}
          <div className="hidden sm:flex w-full items-center justify-center pb-0.5">
            <NavigationPillMenu 
              activeSection={activeSection} 
              onNavigate={onNavigate || (() => {})} 
              className="w-full" 
              layoutIdPrefix="heroPill" 
            />
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white font-display">
                Catálogo de Artículos & Servicios
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 tracking-wider">
              {PRODUCTS.length} Especialidades Canarias
            </span>
          </div>

          {/* 4-Column Grid for exactly 8 services */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 xs:gap-2 sm:gap-2.5 relative overflow-visible">
            {PRODUCTS.map((product, index) => {
              const isSelected = selectedProduct.id === product.id;
              const IconComponent = product.icon;

              return (
                <div 
                  key={product.id} 
                  className="relative overflow-visible"
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <button
                    id={`hero-btn-${product.id}`}
                    type="button"
                    onClick={() => {
                      playClick();
                      setSelectedProduct(product);
                    }}
                    onMouseEnter={playHover}
                    className={`btn-haptic-dark group relative w-full flex flex-col items-center justify-center text-center p-2 xs:p-2.5 sm:p-3 rounded-xl border select-none cursor-pointer min-h-[56px] xs:min-h-[62px] sm:min-h-[80px] lg:min-h-[88px] transition-all duration-200 ease-out hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'bg-white text-zinc-950 border-white ring-2 ring-white ring-offset-2 ring-offset-[#07080C] shadow-[0_0_24px_rgba(255,255,255,0.35)] opacity-100 z-20 scale-[1.02]'
                        : 'bg-[#101217]/90 border-white/[0.08] text-zinc-400 opacity-80 hover:opacity-100 hover:text-white hover:bg-zinc-800/90 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.22)] z-10'
                    }`}
                    aria-pressed={isSelected}
                    title={product.name}
                  >
                    {/* Icon with contrast adaptation */}
                    <IconComponent 
                      className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-1.5 transition-transform duration-200 group-hover:scale-110 ${
                        isSelected ? 'text-zinc-950 stroke-[2.4]' : 'text-zinc-400 group-hover:text-white stroke-[1.8]'
                      }`} 
                    />

                    {/* Non-hyphenated Label */}
                    <span className={`text-[10.5px] xs:text-[11px] sm:text-xs leading-tight font-bold tracking-tight line-clamp-1 ${
                      isSelected ? 'text-zinc-950 font-bold' : 'text-zinc-200 group-hover:text-white'
                    }`}>
                      {product.name}
                    </span>

                    {/* Category subtitle */}
                    <span className={`text-[8.5px] xs:text-[9px] uppercase tracking-wider font-semibold mt-0.5 line-clamp-1 ${
                      isSelected ? 'text-zinc-700' : 'text-zinc-500 group-hover:text-zinc-400'
                    }`}>
                      {product.category}
                    </span>

                    {/* Active Selected Visual Indicator: Red Badge */}
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center z-30">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600 border border-white items-center justify-center shadow-md">
                          <Check className="w-2 h-2 text-white stroke-[3.5]" />
                        </span>
                      </div>
                    )}

                    {/* Active Bottom Strip Bar Indicator */}
                    {isSelected && (
                      <motion.div 
                        layoutId="activeHeroButtonIndicator"
                        className="absolute bottom-1 w-6 h-0.5 rounded-full bg-zinc-950" 
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </button>

                  {/* Tooltip Component */}
                  <AnimatePresence>
                    {hoveredProductId === product.id && (
                      <ServiceTooltip product={product} index={index} />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Looping Words Interactive Card with Canvas Particles MOVED BELOW THE CATALOG */}
          <div className="relative w-full rounded-2xl p-1.5 sm:p-2 bg-zinc-950/80 border border-white/[0.12] backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center overflow-hidden my-1 sm:my-0">
            {/* Subtle Interactive Particle Canvas strictly behind LoopingWords */}
            <HeroParticleCanvas className="pointer-events-none" />

            {/* Animated GSAP Looping Words Selector */}
            <div className="w-full flex items-center justify-center relative z-10">
              <LoopingWords 
                words={SPECIALTIES_WORDS} 
                onWordClick={(word) => {
                  playClick();
                  const match = PRODUCTS.find(p => 
                    p.name.toLowerCase().includes(word.toLowerCase()) || 
                    p.category.toLowerCase().includes(word.toLowerCase())
                  );
                  if (match) setSelectedProduct(match);
                }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

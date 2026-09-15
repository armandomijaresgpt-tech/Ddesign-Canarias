import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  MapPin, 
  CheckCircle2, 
  X, 
  Calculator, 
  Layers, 
  Clock, 
  Calendar 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { PortfolioItem, NavSection } from '../../types';
import { TestimonialCarousel } from '../TestimonialCarousel';
import { GeometricImage } from '../GeometricImage';
import { useSound } from '../../context/SoundContext';
import { SideScrollMenu } from '../ui/SideScrollMenu';

interface PortfolioSectionProps {
  onNavigate: (section: NavSection) => void;
  onSelectServiceForQuote?: (serviceId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ 
  onNavigate,
  onSelectServiceForQuote 
}) => {
  const [filter, setFilter] = useState<string>('Todos');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const { playHover, playClick } = useSound();

  const categories = ['Todos', 'Branding', 'Rotulación', 'Hostelería', 'Comercio', 'Textil'];

  const filteredProjects = filter === 'Todos'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  const handleSelectFilter = (cat: string) => {
    playClick();
    setFilter(cat);
  };

  const handleCardClick = (project: PortfolioItem) => {
    playClick();
    setActiveItem(project);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full min-h-full flex flex-col justify-start sm:justify-center max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2"
    >
      
      {/* Header & Filter Row */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-2.5"
      >
        <div>
          <h2 className="font-display font-extrabold text-base sm:text-xl lg:text-2xl text-white tracking-tight">
            Casos de Éxito en Canarias
          </h2>
        </div>

        {/* Filter Pills with High-End Side Scrolling & Branded Red Scrollbar */}
        <div className="w-full sm:w-auto min-w-0 max-w-full">
          <SideScrollMenu 
            id="portfolio-filter-scroller" 
            showArrows={true} 
            showScrollbar={true}
            className="pb-1"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                id={`portfolio-filter-${cat.toLowerCase()}`}
                onClick={() => handleSelectFilter(cat)}
                onMouseEnter={playHover}
                className={`btn-haptic-dark px-2.5 sm:px-3 py-1 sm:py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  filter === cat
                    ? 'bg-white text-zinc-950 font-bold shadow-sm shadow-white/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </SideScrollMenu>
        </div>
      </motion.div>

      {/* Projects Grid with Staggered Cascading Children */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3"
      >
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            id={`portfolio-card-${project.id}`}
            onClick={() => handleCardClick(project)}
            onMouseEnter={playHover}
            className="group relative p-3 sm:p-3.5 rounded-2xl bg-zinc-900/60 border border-white/[0.08] hover:border-white/30 hover:bg-zinc-900/90 transition-all duration-300 cursor-pointer backdrop-blur-xl flex flex-col justify-between overflow-hidden"
          >
            {/* Visual Thumbnail Image with Geometric Placeholder & Lazy Loading */}
            <div className="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden mb-2 bg-zinc-950 border border-white/10 group">
              <GeometricImage 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                aspectRatioClass="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[10px] text-zinc-300 font-bold uppercase tracking-wider z-10">
                {project.category}
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] text-zinc-300 font-medium z-10">
                <MapPin className="w-3 h-3 text-zinc-400" />
                <span>{project.location.split(',')[0]}</span>
              </div>
            </div>

            {/* Card Content */}
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-zinc-200 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Bottom Highlight & CTA Indicator */}
            <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span className="truncate max-w-[180px]">{project.highlight}</span>
              </span>

              <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-zinc-950 transition-colors shrink-0">
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>

          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials Carousel with Auto-Fade Animation */}
      <motion.div variants={itemVariants}>
        <TestimonialCarousel />
      </motion.div>

      {/* Deep-Dive Project Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                id="close-portfolio-modal-btn"
                onClick={() => {
                  playClick();
                  setActiveItem(null);
                }}
                onMouseEnter={playHover}
                className="btn-haptic-dark absolute top-4 right-4 w-8 h-8 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden mb-3 border border-white/10 bg-zinc-900">
                <GeometricImage 
                  src={activeItem.image} 
                  alt={activeItem.title} 
                  className="w-full h-full"
                  aspectRatioClass="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2 z-10">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                    {activeItem.category}
                  </span>
                  <span className="text-xs text-zinc-300 font-medium">
                    {activeItem.location}
                  </span>
                </div>
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1">
                {activeItem.title}
              </h3>
              
              <p className="text-xs text-zinc-400 mt-0.5">
                Cliente: <span className="text-zinc-200 font-medium">{activeItem.client}</span>
              </p>

              <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                {activeItem.description}
              </p>

              <div className="grid grid-cols-2 gap-2.5 my-3 p-3 rounded-2xl bg-zinc-900/60 border border-white/10 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold mb-0.5">
                    Hito Destacado
                  </span>
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{activeItem.highlight}</span>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold mb-0.5">
                    Materiales & Acabados
                  </span>
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <Layers className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    <span className="truncate">{activeItem.materials}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Entrega: {activeItem.year}</span>
                </div>

                <button
                  id="portfolio-quote-modal-btn"
                  onClick={() => {
                    playClick();
                    setActiveItem(null);
                    if (onSelectServiceForQuote) {
                      const catMap: Record<string, string> = {
                        branding: 'diseno-grafico',
                        rotulación: 'rotulacion',
                        hostelería: 'papeleria',
                        comercio: 'rotulacion',
                        textil: 'personalizacion',
                      };
                      const key = catMap[activeItem.category.toLowerCase()] || 'diseno-grafico';
                      onSelectServiceForQuote(key);
                    } else {
                      onNavigate('cotizador');
                    }
                  }}
                  onMouseEnter={playHover}
                  className="btn-haptic-red px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-red-600/30 border border-red-500/50 transition-all cursor-pointer active:scale-95"
                >
                  <Calculator className="w-3.5 h-3.5 text-white" />
                  <span>Cotizar proyecto similar</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

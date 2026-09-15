import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Palette, 
  Printer, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Truck, 
  Store, 
  ShoppingBag, 
  Cpu,
  Sparkles,
  Award
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { NavSection } from '../../types';
import { useSound } from '../../context/SoundContext';

interface ServicesSectionProps {
  onNavigate: (section: NavSection) => void;
  onSelectServiceForQuote: (serviceId: string) => void;
}

// Staggered entrance orchestration for the entire section
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

// Fluid fade-in + subtle scale-up for individual elements
const staggeredItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 16, 
    scale: 0.96, 
    filter: 'blur(4px)' 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Nested stagger container for service selector tabs
const serviceListContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

// Staggered inspector card variants
const inspectorCardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.97, 
    y: 12, 
    filter: 'blur(4px)' 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      duration: 0.38, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.06,
      delayChildren: 0.08
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.98, 
    y: -8, 
    filter: 'blur(3px)',
    transition: { duration: 0.18, ease: 'easeIn' } 
  }
};

const inspectorItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);
  const { playHover, playClick } = useSound();

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette': return Palette;
      case 'Printer': return Printer;
      case 'Store': return Store;
      case 'Layers': return Layers;
      case 'ShoppingBag': return ShoppingBag;
      case 'Sparkles': return Sparkles;
      case 'Truck': return Truck;
      case 'Award': return Award;
      default: return Layers;
    }
  };

  const handleSelectTab = (id: string) => {
    playClick();
    setSelectedServiceId(id);
  };

  return (
    <motion.div 
      variants={sectionContainerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1 sm:py-2"
    >
      
      {/* Header with staggered entrance */}
      <motion.div 
        variants={staggeredItemVariants}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 mb-2"
      >
        <div>
          <h2 className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl text-white tracking-tight">
            Servicios Oficiales de Diseño & Producción
          </h2>
        </div>
        <p className="text-[10.5px] sm:text-xs text-zinc-400 max-w-md leading-relaxed">
          Catálogo integral directo de taller: diseño, impresión, rotulación, merchandising y montaje in-situ en cualquier isla.
        </p>
      </motion.div>

      {/* Interactive Two-Column Service Matrix with Staggered Entrance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-4 items-stretch">
        
        {/* Left Column: Service Selector Tabs (8 items compact) */}
        <motion.div 
          variants={serviceListContainerVariants}
          className="lg:col-span-5 flex flex-col gap-1 sm:gap-1.5"
        >
          {SERVICES_DATA.map((service) => {
            const isSelected = service.id === selectedServiceId;
            const Icon = getServiceIcon(service.iconName);

            return (
              <motion.button
                key={service.id}
                variants={staggeredItemVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                id={`service-tab-${service.id}`}
                onClick={() => handleSelectTab(service.id)}
                onMouseEnter={playHover}
                className={`btn-haptic-dark relative flex items-center justify-between py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-zinc-950 border-white shadow-md shadow-white/10 ring-1 ring-white'
                    : 'bg-zinc-950/60 border-white/[0.08] hover:bg-zinc-900/80 hover:border-white/20 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                    isSelected ? 'bg-zinc-950 text-white' : 'bg-zinc-800/80 text-zinc-400'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-display font-bold text-xs truncate ${isSelected ? 'text-zinc-950' : 'text-white'}`}>
                        {service.title}
                      </span>
                      {service.badge && (
                        <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider shrink-0 ${
                          isSelected ? 'bg-red-600 text-white' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <div className={`text-[10px] truncate max-w-[200px] sm:max-w-xs ${isSelected ? 'text-zinc-700' : 'text-zinc-400'}`}>
                      {service.tagline}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end pl-2 shrink-0">
                  <span className={`text-[8.5px] uppercase font-medium ${isSelected ? 'text-zinc-600' : 'text-zinc-500'}`}>Desde</span>
                  <span className={`text-xs font-bold tabular-nums ${isSelected ? 'text-zinc-950' : 'text-white'}`}>{service.startingPrice}</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Right Column: Dynamic Deep-Dive Service Inspector with Staggered Elements */}
        <motion.div variants={staggeredItemVariants} className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.id}
              variants={inspectorCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-zinc-900/60 border border-white/[0.1] backdrop-blur-xl relative overflow-hidden shadow-xl"
            >
              {/* Subtle ambient glow inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/[0.04] rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-2.5">
                
                {/* Header info (staggered) */}
                <motion.div 
                  variants={inspectorItemVariants}
                  className="flex items-start justify-between border-b border-white/[0.08] pb-2.5"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider flex items-center gap-1">
                      <Award className="w-3 h-3 text-red-400" />
                      <span>{selectedService.category}</span>
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white mt-0.5">
                      {selectedService.title}
                    </h3>
                    <p className="text-xs text-zinc-300 mt-0.5 max-w-xl leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  <div className="text-right pl-3 shrink-0">
                    <span className="text-[9.5px] text-zinc-400 uppercase">Tarifa Taller</span>
                    <div className="text-lg sm:text-xl font-extrabold text-white">
                      {selectedService.startingPrice}
                    </div>
                  </div>
                </motion.div>

                {/* Deliverables Checklist (staggered container & items) */}
                <motion.div variants={inspectorItemVariants}>
                  <h4 className="text-[10.5px] font-bold uppercase text-zinc-300 tracking-wider mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Entregables y Cobertura Oficial Incluida</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {selectedService.deliverables.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        variants={inspectorItemVariants}
                        className="flex items-start gap-1.5 py-1 px-2 rounded-lg bg-zinc-950/50 border border-white/5 text-[11px] text-zinc-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
                        <span className="leading-tight">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Technical Specs & Climate resistance (staggered) */}
                <motion.div 
                  variants={inspectorItemVariants}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-0.5"
                >
                  <div className="p-2 rounded-xl bg-zinc-950/40 border border-white/5">
                    <div className="text-[8.5px] uppercase text-zinc-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-300" />
                      <span>Plazo Fabricación</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      {selectedService.turnaround}
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-zinc-950/40 border border-white/5">
                    <div className="text-[8.5px] uppercase text-zinc-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Garantía Clima Canarias</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      Anti-Salitre & Filtro UV
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-zinc-950/40 border border-white/5">
                    <div className="text-[8.5px] uppercase text-zinc-400 font-semibold flex items-center gap-1">
                      <Layers className="w-3 h-3 text-zinc-300" />
                      <span>Taller Propio</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      Sin intermediarios
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Action CTAs for this service (staggered) with vibrant RED CTA accent */}
              <motion.div 
                variants={inspectorItemVariants}
                className="flex flex-wrap items-center gap-2 pt-2.5 mt-1 border-t border-white/[0.08]"
              >
                <button
                  id="service-action-quote-btn"
                  onClick={() => {
                    playClick();
                    onSelectServiceForQuote(selectedService.id);
                  }}
                  onMouseEnter={playHover}
                  className="btn-haptic-red flex-1 min-w-[180px] py-2 px-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 border border-red-500/50 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Cotizar {selectedService.title.split(' ')[0]} al Instante</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  id="service-action-whatsapp-btn"
                  href={`https://wa.me/34641501773?text=Hola%20Design%20Canarias,%20quiero%20consultar%20sobre%20${encodeURIComponent(selectedService.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="btn-haptic-dark px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Consultar Taller</span>
                </a>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>

    </motion.div>
  );
};

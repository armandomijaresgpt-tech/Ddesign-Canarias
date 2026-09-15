import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  Briefcase, 
  Calculator, 
  Building2, 
  HelpCircle,
  UserCircle 
} from 'lucide-react';
import { NavSection } from '../types';
import { useSound } from '../context/SoundContext';

interface MobileNavigationProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeSection,
  onNavigate,
}) => {
  const { playClick, playHover } = useSound();

  const items: { id: NavSection; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'hero', label: 'Inicio', icon: Sparkles },
    { id: 'servicios', label: 'Servicios', icon: Layers },
    { id: 'portfolio', label: 'Trabajos', icon: Briefcase },
    { id: 'cotizador', label: 'Cotizar', icon: Calculator },
    { id: 'estudio', label: 'Estudio', icon: Building2 },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'perfil', label: 'Mi Panel', icon: UserCircle },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden px-2 xs:px-3 pb-2.5 pt-2 bg-gradient-to-t from-[#07080C] via-[#07080C]/95 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto flex items-center justify-between xs:justify-around p-1 xs:p-1.5 rounded-2xl bg-zinc-900/95 border border-white/10 backdrop-blur-2xl shadow-2xl">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`dock-nav-${item.id}`}
              onClick={() => {
                playClick();
                onNavigate(item.id);
              }}
              onMouseEnter={playHover}
              className={`relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 xs:px-2 rounded-xl transition-all cursor-pointer min-h-[44px] select-none active:scale-95 ${
                isActive ? 'text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockPill"
                  className="absolute inset-0 rounded-xl bg-white shadow-md shadow-white/20"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <Icon className={`w-3.5 xs:w-4 h-3.5 xs:h-4 ${isActive ? 'text-zinc-950 stroke-[2.2]' : 'text-zinc-400'}`} />
                <span className={`text-[8.5px] xs:text-[9px] tracking-tight mt-0.5 whitespace-nowrap ${isActive ? 'text-zinc-950 font-bold' : 'font-semibold'}`}>
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

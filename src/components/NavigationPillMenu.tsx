import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  Briefcase, 
  Calculator, 
  Building2, 
  HelpCircle
} from 'lucide-react';
import { NavSection } from '../types';
import { Tooltip } from './Tooltip';
import { useSound } from '../context/SoundContext';

interface NavigationPillMenuProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  className?: string;
  layoutIdPrefix?: string;
}

export const navMenuItems: { 
  id: NavSection; 
  label: string; 
  icon: React.ComponentType<{ className?: string }>; 
  tooltip: string;
  badge?: string; 
}[] = [
  { id: 'hero', label: 'Catálogo', icon: Sparkles, tooltip: 'Catálogo principal y productos destacados' },
  { id: 'servicios', label: 'Servicios', icon: Layers, tooltip: '6 especialidades de diseño e imprenta técnica' },
  { id: 'portfolio', label: 'Proyectos', icon: Briefcase, tooltip: 'Portfolio de trabajos en las 8 Islas' },
  { id: 'cotizador', label: 'Cotizador', icon: Calculator, badge: '60S', tooltip: 'Calculadora de presupuesto en 60 segundos' },
  { id: 'estudio', label: 'Taller', icon: Building2, tooltip: 'Taller físico, maquinaria y 12 documentos legales' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, tooltip: 'Preguntas frecuentes, envíos e IGIC canario' },
];

export const NavigationPillMenu: React.FC<NavigationPillMenuProps> = ({
  activeSection,
  onNavigate,
  className = '',
  layoutIdPrefix = 'globalNavPill',
}) => {
  const { playClick, playHover } = useSound();

  return (
    <nav 
      id="navigation-pill-menu"
      className={`flex items-center overflow-x-auto no-scrollbar scroll-smooth p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-zinc-900/95 border border-white/[0.14] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(255,255,255,0.04)] gap-1 sm:gap-1.5 justify-start sm:justify-between max-w-full ${className}`}
      style={{ touchAction: 'pan-x' }}
    >
      {navMenuItems.map((item) => {
        const isActive = activeSection === item.id;
        const Icon = item.icon;
        return (
          <Tooltip
            key={item.id}
            content={item.tooltip}
            position="bottom"
            shortcut={item.badge}
            className="shrink-0 sm:flex-1"
          >
            <button
              id={`nav-pill-btn-${item.id}`}
              type="button"
              onClick={() => {
                playClick();
                onNavigate(item.id);
              }}
              onMouseEnter={playHover}
              className={`btn-haptic-dark relative w-full flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-medium transition-colors duration-200 focus:outline-none whitespace-nowrap cursor-pointer select-none active:scale-95 ${
                isActive ? 'text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId={`${layoutIdPrefix}-active`}
                  className="absolute inset-0 rounded-xl sm:rounded-full bg-white shadow-md shadow-white/20"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-1.5">
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-zinc-950 stroke-[2.2]' : 'text-zinc-400'}`} />
                <span className="shrink-0 font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0 transition-colors ${
                    isActive ? 'bg-zinc-900 text-white' : 'bg-white/15 text-zinc-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </span>
            </button>
          </Tooltip>
        );
      })}
    </nav>
  );
};

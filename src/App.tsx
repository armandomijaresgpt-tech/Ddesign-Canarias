import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavSection } from './types';
import { InteractiveBackground } from './components/InteractiveBackground';
import { Header } from './components/Header';
import { MobileNavigation } from './components/MobileNavigation';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { QuoteCalculatorSection } from './components/sections/QuoteCalculatorSection';
import { StudioSection } from './components/sections/StudioSection';
import { ContactSection } from './components/sections/ContactSection';
import { FAQSection } from './components/sections/FAQSection';
import { DashboardSection } from './components/sections/DashboardSection';
import { NavigationPillMenu } from './components/NavigationPillMenu';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SoundProvider, useSound } from './context/SoundContext';
import { ToastProvider } from './context/ToastContext';

const SECTION_ORDER: NavSection[] = [
  'hero',
  'servicios',
  'portfolio',
  'cotizador',
  'estudio',
  'faq',
  'contacto',
  'perfil',
];

const pageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : dir < 0 ? -80 : 0,
    opacity: 0,
    filter: 'blur(6px)',
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 32 },
      opacity: { duration: 0.28, ease: 'easeOut' },
      filter: { duration: 0.28, ease: 'easeOut' },
      scale: { duration: 0.28, ease: 'easeOut' },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : dir < 0 ? 80 : 0,
    opacity: 0,
    filter: 'blur(6px)',
    scale: 0.99,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 32 },
      opacity: { duration: 0.22, ease: 'easeIn' },
      filter: { duration: 0.22, ease: 'easeIn' },
      scale: { duration: 0.22, ease: 'easeIn' },
    },
  }),
};

const MainAppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [[activeSection, direction], setNavState] = useState<[NavSection, number]>(['hero', 0]);
  const [quotePreselectedService, setQuotePreselectedService] = useState<string>('diseno-grafico');
  const { playClick } = useSound();

  const handleNavigate = (newSection: NavSection) => {
    if (newSection === activeSection) return;
    const prevIndex = SECTION_ORDER.indexOf(activeSection);
    const nextIndex = SECTION_ORDER.indexOf(newSection);
    const dir = nextIndex >= prevIndex ? 1 : -1;
    setNavState([newSection, dir]);
  };

  // Handle keyboard navigation for power users (arrows or 1-7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or if still loading
      if (isLoading || ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const currentIndex = SECTION_ORDER.indexOf(activeSection);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIndex = (currentIndex + 1) % SECTION_ORDER.length;
        playClick();
        handleNavigate(SECTION_ORDER[nextIndex]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIndex = (currentIndex - 1 + SECTION_ORDER.length) % SECTION_ORDER.length;
        playClick();
        handleNavigate(SECTION_ORDER[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, playClick, isLoading]);

  const handleSelectServiceForQuote = (serviceId: string) => {
    setQuotePreselectedService(serviceId);
    handleNavigate('cotizador');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <HeroSection 
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        );
      case 'servicios':
        return (
          <ServicesSection 
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        );
      case 'portfolio':
        return (
          <PortfolioSection 
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        );
      case 'cotizador':
        return (
          <QuoteCalculatorSection 
            initialServiceId={quotePreselectedService}
          />
        );
      case 'estudio':
        return (
          <StudioSection 
            onNavigate={handleNavigate}
          />
        );
      case 'faq':
        return (
          <FAQSection 
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        );
      case 'contacto':
        return <ContactSection />;
      case 'perfil':
        return (
          <DashboardSection 
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden flex flex-col justify-between bg-[#07080C] text-zinc-100 antialiased relative">
      
      {/* High-End Minimal Custom Cursor */}
      <CustomCursor />

      {/* Minimalist Image Preloading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Dynamic ambient tech background */}
      <InteractiveBackground activeSection={activeSection} />

      {/* Top Glassmorphic Navigation Bar */}
      <Header 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />

      {/* PERSISTENT TOP CENTERED NAVIGATION MENU (HIDDEN ON MOBILE, VISIBLE ON TABLET/DESKTOP) */}
      {activeSection !== 'hero' && (
        <div className="hidden sm:flex w-full pt-17 pb-1 px-4 items-center justify-center z-30 shrink-0">
          <div className="w-full max-w-3xl">
            <NavigationPillMenu
              activeSection={activeSection}
              onNavigate={handleNavigate}
              layoutIdPrefix="globalSubNavPill"
            />
          </div>
        </div>
      )}

      {/* Main Single-View Projected Stage with High-End Slide-In Transition */}
      <main className={`flex-1 w-full ${activeSection === 'hero' ? 'pt-14 sm:pt-16' : 'pt-14 sm:pt-2'} pb-28 sm:pb-4 overflow-y-auto overflow-x-hidden custom-scrollbar flex items-start sm:items-center justify-center relative z-10`}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSection}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full min-h-full flex flex-col items-center justify-start sm:justify-center"
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Floating WhatsApp Icon in the Bottom-Right Corner */}
      <FloatingWhatsApp />

      {/* Mobile Bottom Dock Navigation (Sticky & Floating) */}
      <MobileNavigation 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />

    </div>
  );
};

export default function App() {
  return (
    <SoundProvider>
      <ToastProvider>
        <MainAppContent />
      </ToastProvider>
    </SoundProvider>
  );
}

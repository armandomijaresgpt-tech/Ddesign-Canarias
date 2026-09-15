import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  ArrowUpRight, 
  Menu, 
  X, 
  MessageCircle,
  LogIn,
  Sparkles,
  Layers,
  Briefcase,
  Building2,
  Mail, 
  Phone, 
  ShieldCheck, 
  Instagram, 
  Facebook, 
  UserCircle,
  HelpCircle,
  Copy,
  Check,
  Shirt,
  Heart,
  CreditCard,
  Volume2,
  VolumeX
} from 'lucide-react';
import { NavSection } from '../types';
import { LoginModal } from './LoginModal';
import { Tooltip } from './Tooltip';
import { useSound } from '../context/SoundContext';
import { useToast } from '../context/ToastContext';

// Minimalist TikTok Brand Icon SVG
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.83 4.46 6.3 6.3 0 0 0 1.96-4.51V8.92a8.28 8.28 0 0 0 4.8 1.51v-3.46a4.85 4.85 0 0 1-1-.28z"/>
  </svg>
);

interface HeaderProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { playHover, playClick, isSoundEnabled, toggleSound } = useSound();
  const { showSuccess } = useToast();

  const handleCopyEmail = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    playClick();
    const email = 'info@designcanarias.com';
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedEmail(true);
      showSuccess(
        '¡Email copiado al portapapeles!',
        `${email} listo para pegar.`
      );
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      showSuccess('Email del Estudio', email);
    }
  };

  const navItems: { id: NavSection; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'hero', label: 'Catálogo', icon: Sparkles },
    { id: 'servicios', label: 'Servicios', icon: Layers },
    { id: 'portfolio', label: 'Proyectos', icon: Briefcase },
    { id: 'cotizador', label: 'Cotizador', icon: Calculator, badge: '60s' },
    { id: 'estudio', label: 'Taller', icon: Building2 },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  const handleSelectSection = (id: NavSection) => {
    playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 flex items-center px-3 sm:px-6 lg:px-8 border-b border-white/[0.08] bg-[#07080C]/95 backdrop-blur-xl">
        <div className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-between">
          
          {/* LEFT: Trust Badges (Calidad premium garantizada, Diseños únicos y personalizados, Pago online seguro) */}
          <div 
            id="header-trust-badges-group"
            className="hidden sm:flex items-center gap-1.5 sm:gap-2 text-xs select-none shrink-0 z-10"
          >
            {/* 1. Calidad premium garantizada */}
            <Tooltip content="Garantía de confección y materiales de primer nivel en Canarias" position="bottom">
              <div 
                id="header-trust-badge-quality"
                onMouseEnter={playHover}
                className="hidden md:flex items-center gap-2 h-9 px-2.5 sm:px-3 rounded-xl bg-zinc-900/85 hover:bg-zinc-800/90 border border-white/[0.08] hover:border-white/20 transition-all duration-200 select-none shrink-0 group cursor-default shadow-sm"
              >
                <Shirt className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors shrink-0" />
                <div className="flex flex-col text-left leading-[1.15] justify-center">
                  <span className="text-[11px] font-bold text-white tracking-tight whitespace-nowrap">
                    Calidad premium
                  </span>
                  <span className="text-[9.5px] font-medium text-zinc-400 whitespace-nowrap">
                    garantizada
                  </span>
                </div>
              </div>
            </Tooltip>

            {/* 2. Diseños únicos y personalizados */}
            <Tooltip content="Diseños vectoriales a medida adaptados a tu identidad corporativa" position="bottom">
              <div 
                id="header-trust-badge-custom-design"
                onMouseEnter={playHover}
                className="hidden sm:flex items-center gap-2 h-9 px-2.5 sm:px-3 rounded-xl bg-zinc-900/85 hover:bg-zinc-800/90 border border-white/[0.08] hover:border-white/20 transition-all duration-200 select-none shrink-0 group cursor-default shadow-sm"
              >
                <Heart className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors shrink-0" />
                <div className="flex flex-col text-left leading-[1.15] justify-center">
                  <span className="text-[11px] font-bold text-white tracking-tight whitespace-nowrap">
                    Diseños únicos y
                  </span>
                  <span className="text-[9.5px] font-medium text-zinc-400 whitespace-nowrap">
                    personalizados
                  </span>
                </div>
              </div>
            </Tooltip>

            {/* 3. Pago online seguro */}
            <Tooltip content="Pasarela 100% cifrada con Redsys, Stripe y Bizum oficial" position="bottom">
              <div 
                id="header-trust-badge-secure-payment"
                onMouseEnter={playHover}
                className="hidden lg:flex items-center gap-2 h-9 px-2.5 sm:px-3 rounded-xl bg-zinc-900/85 hover:bg-zinc-800/90 border border-white/[0.08] hover:border-white/20 transition-all duration-200 select-none shrink-0 group cursor-default shadow-sm"
              >
                <CreditCard className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[11px] font-bold text-white tracking-tight whitespace-nowrap">
                  Pago online seguro
                </span>
              </div>
            </Tooltip>
          </div>

          {/* CENTER: Mi Panel PRO + Centered Embossed Logo + Cotizar Ahora (MATHEMATICALLY DEAD CENTER ON MOBILE & DESKTOP) */}
          <div 
            id="header-center-action-pod"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-1.5 sm:gap-2.5 z-20 pointer-events-auto"
          >
            {/* Mi Panel PRO Button - HIDDEN ON MOBILE */}
            <Tooltip content="Acceso a panel de clientes, pedidos, facturas y seguimiento" position="bottom" shortcut="PRO">
              <button
                id="header-mi-panel-pro-btn"
                type="button"
                onClick={() => {
                  playClick();
                  setLoginModalOpen(true);
                }}
                onMouseEnter={playHover}
                className="hidden sm:flex btn-haptic-dark group relative h-8 sm:h-9 px-2.5 sm:px-3.5 rounded-lg sm:rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 hover:border-white/30 text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shadow-sm items-center gap-1 sm:gap-2 active:scale-95"
              >
                <UserCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300 group-hover:text-white transition-colors shrink-0" />
                <span className="hidden xs:inline">Mi Panel</span>
                <span className="xs:hidden">Panel</span>
                <span className="text-[8.5px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded font-black tracking-wider bg-white/15 text-white border border-white/20 group-hover:bg-white group-hover:text-zinc-950 transition-colors">
                  PRO
                </span>
              </button>
            </Tooltip>

            {/* Brand Logo in Circular Frame with Relief (Dead Center, Proportional Size) */}
            <Tooltip content="Volver a la portada del Catálogo" position="bottom">
              <button 
                id="brand-logo-btn"
                onClick={() => handleSelectSection('hero')}
                onMouseEnter={playHover}
                className="group relative flex items-center justify-center focus:outline-none cursor-pointer shrink-0"
                aria-label="Design Canarias - Inicio"
              >
                {/* Outer Circular Relief Bezel & Lighting */}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full p-[1.5px] sm:p-[2px] bg-gradient-to-b from-white/35 via-zinc-700 to-black shadow-[0_3px_12px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.45),0_0_12px_rgba(255,255,255,0.08)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.95),inset_0_2px_3px_rgba(255,255,255,0.65),0_0_18px_rgba(255,255,255,0.2)] group-hover:scale-105 active:scale-95 transition-all duration-200">
                  
                  {/* Inner Convex Embossed Disc */}
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-zinc-800 via-[#101217] to-zinc-950 flex items-center justify-center relative overflow-hidden shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.3),inset_0_-2px_3px_rgba(0,0,0,0.95)] border border-white/20">
                    
                    {/* Upper Curvature Glass/Light Sheen */}
                    <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
                    
                    {/* Precision Sculpted Logo Mark with Depth */}
                    <svg 
                      viewBox="0 0 40 40" 
                      className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] relative z-10 transition-transform duration-200 group-hover:scale-110" 
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="dcReliefGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="50%" stopColor="#E4E4E7" />
                          <stop offset="100%" stopColor="#A1A1AA" />
                        </linearGradient>
                        <linearGradient id="dcBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>

                      {/* Concentric relief inner ring */}
                      <circle cx="20" cy="20" r="17.5" stroke="url(#dcBevelGrad)" strokeWidth="0.8" opacity="0.7" />

                      {/* D Monogram Letterform */}
                      <path 
                        d="M11 11.5 H18.5 C22.8 11.5 26 14.8 26 20 C26 25.2 22.8 28.5 18.5 28.5 H11 V11.5 Z M14.8 15.2 V24.8 H18.2 C20.8 24.8 22.4 22.8 22.4 20 C22.4 17.2 20.8 15.2 18.2 15.2 H14.8 Z" 
                        fill="url(#dcReliefGrad)"
                      />

                      {/* C Counter-arc with light reflex */}
                      <path 
                        d="M24 14 C26.2 15.6 27.5 17.6 27.5 20 C27.5 22.4 26.2 24.4 24 26" 
                        stroke="#FFFFFF" 
                        strokeWidth="2.4" 
                        strokeLinecap="round"
                      />

                      {/* Archipelago Focal Light Point */}
                      <circle cx="29" cy="13" r="1.4" fill="#FFFFFF" className="animate-pulse" />
                    </svg>

                    {/* Micro Ambient Glow behind icon */}
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-[2px] pointer-events-none" />
                  </div>
                </div>
              </button>
            </Tooltip>

            {/* Cotizar Ahora CTA Button - Visible on sm and up */}
            <Tooltip content="Calculadora interactiva de presupuestos en 60 segundos" position="bottom" shortcut="⚡">
              <button
                id="header-cta-quote-btn"
                type="button"
                onClick={() => handleSelectSection('cotizador')}
                onMouseEnter={playHover}
                className="hidden sm:flex btn-haptic relative group overflow-hidden h-9 px-3.5 sm:px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs tracking-tight shadow-sm shadow-white/10 transition-all duration-200 focus:outline-none cursor-pointer border border-white whitespace-nowrap items-center gap-1.5 active:scale-95"
              >
                <Calculator className="w-3.5 h-3.5 shrink-0" />
                <span>Cotizar Ahora</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Tooltip>
          </div>

          {/* RIGHT: Telephone, Sound Toggle, Copy Email, Social Icons & WhatsApp (HIDDEN ON MOBILE, FULL ON TABLET/DESKTOP) */}
          <div className="hidden sm:flex items-center justify-end gap-1.5 sm:gap-2 shrink-0 z-10">
            {/* Direct Telephone Dial */}
            <Tooltip content="Llamar al taller central: +34 922 00 00 00" position="bottom">
              <a
                id="header-phone-btn"
                href="tel:+34922000000"
                onMouseEnter={playHover}
                onClick={playClick}
                className="hidden xl:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-white/30 text-zinc-200 hover:text-white text-xs font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>+34 922 00 00 00</span>
              </a>
            </Tooltip>

            {/* Dedicated Quick Copy Email Button (h-9 unified) */}
            <Tooltip content={copiedEmail ? "¡Correo copiado al portapapeles!" : "Copiar info@designcanarias.com"} position="bottom">
              <button
                id="header-quick-copy-email-btn"
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="hidden lg:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-white/30 text-zinc-200 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                )}
                <span className="hidden xl:inline">{copiedEmail ? '¡Email Copiado!' : 'Copiar Email'}</span>
                <span className="xl:hidden">{copiedEmail ? 'Copiado' : 'Email'}</span>
              </button>
            </Tooltip>

            {/* Sound FX Mute / Unmute Toggle */}
            <Tooltip content={isSoundEnabled ? "Silenciar efectos sonoros" : "Activar efectos sonoros"} position="bottom">
              <button
                id="header-sound-toggle-btn"
                type="button"
                onClick={() => {
                  playClick();
                  toggleSound();
                }}
                onMouseEnter={playHover}
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-zinc-900/90 border border-white/10 hover:border-white/30 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
                aria-label={isSoundEnabled ? "Silenciar efectos sonoros" : "Activar efectos sonoros"}
              >
                {isSoundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />
                )}
              </button>
            </Tooltip>

            {/* Social Media (Desktop/Tablet Only) & WhatsApp */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Instagram */}
              <Tooltip content="Instagram @designcanarias" position="bottom">
                <a
                  id="header-instagram-btn"
                  href="https://instagram.com/designcanarias"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-900/90 border border-white/10 hover:border-white/30 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </Tooltip>

              {/* Facebook */}
              <Tooltip content="Facebook Design Canarias" position="bottom">
                <a
                  id="header-facebook-btn"
                  href="https://facebook.com/designcanarias"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-900/90 border border-white/10 hover:border-white/30 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </Tooltip>

              {/* TikTok */}
              <Tooltip content="TikTok @designcanarias" position="bottom">
                <a
                  id="header-tiktok-btn"
                  href="https://tiktok.com/@designcanarias"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-900/90 border border-white/10 hover:border-white/30 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </Tooltip>

              {/* WhatsApp (Identical, Emerald Glow) */}
              <Tooltip content="Chat directo por WhatsApp en tiempo real" position="bottom" shortcut="WA">
                <a
                  id="header-whatsapp-btn"
                  href="https://wa.me/34600000000?text=Hola%20Design%20Canarias,%20quiero%20informaci%C3%B3n%20sobre%20un%20proyecto"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  aria-label="Contactar por WhatsApp"
                  className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-zinc-900/90 border border-emerald-500/35 hover:border-emerald-400 hover:bg-emerald-950/40 text-emerald-400 hover:text-emerald-300 transition-all duration-200 active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.15)] cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </Tooltip>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <Tooltip content={mobileMenuOpen ? "Cerrar menú" : "Menú móvil"} position="bottom">
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                onMouseEnter={playHover}
                className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-zinc-900 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white focus:outline-none active:scale-95 cursor-pointer ml-0.5"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
            </Tooltip>
          </div>

        </div>
      </header>

      {/* Login / Mi Panel PRO Modal */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onLoginSuccess={() => onNavigate('perfil')}
        onNavigateToProfile={() => onNavigate('perfil')}
      />

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-x-0 top-14 sm:top-16 z-40 bg-[#07080C]/98 backdrop-blur-2xl border-b border-white/10 p-4 sm:p-5 lg:hidden shadow-2xl max-h-[calc(100dvh-3.5rem)] overflow-y-auto custom-scrollbar"
          >
            <div className="flex flex-col gap-2">
              {/* Dedicated Mi Panel PRO button in mobile drawer */}
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                  setLoginModalOpen(true);
                }}
                className="btn-haptic w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-white/20 text-white font-bold text-sm mb-1 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <UserCircle className="w-5 h-5 text-white" />
                  <span>Mi Panel PRO (Pedidos & Cuenta)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white text-zinc-950 font-black">
                  PRO
                </span>
              </button>

              {/* Trust Badges in Mobile Drawer */}
              <div className="grid grid-cols-3 gap-2 py-2 my-1 border-y border-white/10">
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-zinc-900/90 border border-white/5">
                  <Shirt className="w-4 h-4 text-white mb-1" />
                  <span className="text-[10px] font-bold text-white leading-tight">Calidad premium</span>
                  <span className="text-[9px] text-zinc-400">garantizada</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-zinc-900/90 border border-white/5">
                  <Heart className="w-4 h-4 text-white mb-1" />
                  <span className="text-[10px] font-bold text-white leading-tight">Diseños únicos</span>
                  <span className="text-[9px] text-zinc-400">personalizados</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-zinc-900/90 border border-white/5">
                  <CreditCard className="w-4 h-4 text-white mb-1" />
                  <span className="text-[10px] font-bold text-white leading-tight">Pago online</span>
                  <span className="text-[9px] text-zinc-400">100% seguro</span>
                </div>
              </div>

              <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider px-3 pb-1">
                Navegación Rápida
              </div>
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleSelectSection(item.id)}
                    onMouseEnter={playHover}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-white text-zinc-950 font-bold shadow-md' 
                        : 'bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950 stroke-[2.2]' : 'text-zinc-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-zinc-900 text-white' : 'bg-white/10 text-zinc-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Direct WhatsApp Callout in Mobile */}
              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn-haptic w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-sm font-semibold cursor-pointer"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-300" />
                  )}
                  <span>{copiedEmail ? '¡Email Copiado!' : 'Copiar Email (info@designcanarias.com)'}</span>
                </button>

                <a
                  href="https://wa.me/34600000000?text=Hola%20Design%20Canarias,%20deseo%20hacer%20una%20consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4 text-zinc-300" />
                  <span>WhatsApp Directo Canarias</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

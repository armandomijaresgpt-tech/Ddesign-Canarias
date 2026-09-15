import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const FloatingWhatsApp: React.FC = () => {
  const { playHover, playClick } = useSound();

  return (
    <aside
      aria-label="Contacto directo por WhatsApp"
      className="fixed z-40 right-3 xs:right-4 sm:right-6 bottom-[72px] xs:bottom-[76px] sm:bottom-6 pointer-events-auto"
    >
      <a
        id="floating-whatsapp-btn"
        href="https://wa.me/34600000000?text=Hola%20Design%20Canarias,%20quiero%20informaci%C3%B3n%20sobre%20un%20proyecto"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={playHover}
        onClick={playClick}
        aria-label="Abrir chat de WhatsApp en tiempo real"
        title="Chat directo con Design Canarias por WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-[0_8px_28px_rgba(16,185,129,0.55),0_0_15px_rgba(16,185,129,0.35)] border border-emerald-300/40 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_12px_36px_rgba(16,185,129,0.75),0_0_25px_rgba(16,185,129,0.5)] focus:outline-none"
      >
        {/* Pulsing Radar Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/25 animate-ping pointer-events-none" />

        {/* Ambient Glow */}
        <span className="absolute inset-0 rounded-full bg-emerald-400/20 blur-sm pointer-events-none" />

        {/* Online Status Indicator Dot */}
        <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#07080C]" />
        </span>

        {/* Official WhatsApp Monogram SVG for precision */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 xs:w-6.5 xs:h-6.5 sm:w-7 sm:h-7 fill-white relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 drop-shadow-md"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.127-.532-1.745-.724-2.868-2.512-2.955-2.628-.088-.116-.713-.949-.713-1.809 0-.86.449-1.284.609-1.458.16-.174.35-.218.468-.218.118 0 .237.002.34.007.108.005.253-.041.395.3.144.348.491 1.199.535 1.287.044.088.073.19.014.306-.059.116-.089.188-.176.29-.088.102-.185.228-.264.306-.089.088-.182.183-.078.361.104.178.462.763.993 1.236.684.609 1.26.797 1.439.886.178.088.283.074.388-.047.104-.12.449-.523.568-.702.119-.178.238-.148.397-.089.159.059 1.008.475 1.181.562.173.088.289.131.332.204.043.073.043.424-.101.829z" />
        </svg>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;

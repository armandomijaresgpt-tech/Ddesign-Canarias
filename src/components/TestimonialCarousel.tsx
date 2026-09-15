import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  island: string;
  avatar: string;
  rating: number;
  comment: string;
  service: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Elena Cabrera Díaz',
    role: 'Directora de Marca',
    company: 'Cervecería Artesanal Dorada Sur',
    island: 'Tenerife',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'La calidad del vinilo fundido para nuestra flota de furgonetas y el estucado de las cartas de menú resiste el salitre y sol canario sin degradarse. Puntualidad británica en el taller.',
    service: 'Rotulación de Flotas & Menús',
  },
  {
    id: 't-2',
    author: 'Javier Betancort',
    role: 'Fundador & Shaper',
    company: 'Vulcano Surf & Adventure Co.',
    island: 'Lanzarote',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Nuestras sudaderas corporativas con bordado de alta densidad y las tarjetas con cantos en negro mate han multiplicado la percepción de lujo de nuestra tienda en Famara.',
    service: 'Textil Corporativo & Tarjetas Visita',
  },
  {
    id: 't-3',
    author: 'Arq. Sofía Morales',
    role: 'Socia Principal',
    company: 'Estudio Atlántica Arquitectura',
    island: 'Gran Canaria',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'El rótulo de letras corpóreas en acero cepillado retroiluminado con LED cálido quedó impecable en la fachada del estudio en Triana. El render previo coincidió al milímetro.',
    service: 'Letras Corpóreas & Rótulos LED',
  },
  {
    id: 't-4',
    author: 'Marco Santana',
    role: 'Gerente General',
    company: 'Grupo Gastronómico El Mirador',
    island: 'Fuerteventura',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Impresión de packaging para delivery y tarjetas NFC inteligentes para fidelización directa de clientes en Corralejo. Servicio con IGIC transparente y envío urgente entre islas.',
    service: 'Packaging & Smart Cards NFC',
  },
];

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-fade timer: 5 seconds interval
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <div 
      id="portfolio-testimonial-carousel"
      className="w-full mt-4 sm:mt-6 rounded-2xl bg-zinc-950/80 border border-white/[0.08] p-4 sm:p-5 relative overflow-hidden backdrop-blur-xl group shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background soft ambient badge */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/[0.02] rounded-full pointer-events-none" />
      <div className="absolute top-3 right-4 opacity-10 text-white pointer-events-none">
        <Quote className="w-16 h-16" />
      </div>

      {/* Top Header bar with Verified Canary reviews label and Navigation Controls */}
      <div className="flex items-center justify-between gap-3 mb-3 border-b border-white/[0.06] pb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center text-amber-400 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-white tracking-tight">
            5.0 · Reseñas de Empresas en Canarias
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <CheckCircle className="w-2.5 h-2.5" />
            Verificadas
          </span>
        </div>

        {/* Previous / Next Arrows */}
        <div className="flex items-center gap-1.5">
          <button
            id="testimonial-prev-btn"
            type="button"
            onClick={handlePrev}
            className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id="testimonial-next-btn"
            type="button"
            onClick={handleNext}
            className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Crossfade Animated Testimonial Card */}
      <div className="min-h-[90px] sm:min-h-[82px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6"
          >
            {/* Testimonial Quote */}
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed italic font-normal">
                "{current.comment}"
              </p>
              <div className="mt-1.5 flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="font-semibold text-white">{current.service}</span>
                <span>•</span>
                <span>Isla de {current.island}</span>
              </div>
            </div>

            {/* Author Profile */}
            <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 sm:border-l sm:border-white/[0.08] sm:pl-5">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-tight">
                  {current.author}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium">
                  {current.role}
                </span>
                <span className="text-[10px] text-zinc-300 font-semibold">
                  {current.company}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5 pt-2 border-t border-white/[0.05]">
        {TESTIMONIALS.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx 
                ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
            }`}
            aria-label={`Ir al testimonio ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

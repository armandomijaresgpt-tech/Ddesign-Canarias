import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SideScrollMenuProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  showArrows?: boolean;
  showScrollbar?: boolean;
  id?: string;
}

export const SideScrollMenu: React.FC<SideScrollMenuProps> = ({
  children,
  className = '',
  containerClassName = '',
  showArrows = true,
  showScrollbar = true,
  id,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0); // 0 to 1
  const [thumbWidthPct, setThumbWidthPct] = useState<number>(30); // in percent
  const [isDraggingTrack, setIsDraggingTrack] = useState<boolean>(false);

  // Mouse drag-to-scroll support for desktop/tablet
  const isMouseDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);

    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < maxScroll - 4);

    if (maxScroll > 0) {
      const progress = scrollLeft / maxScroll;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      
      const visibleRatio = clientWidth / scrollWidth;
      // Minimum thumb width 18% for usability, max 90%
      const calculatedThumbWidth = Math.min(Math.max(visibleRatio * 100, 18), 90);
      setThumbWidthPct(calculatedThumbWidth);
    } else {
      setScrollProgress(0);
      setThumbWidthPct(100);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    const handleScroll = () => {
      window.requestAnimationFrame(updateScrollState);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    
    // ResizeObserver to detect layout/content changes
    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scrollByAmount = (amount: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: amount,
      behavior: 'smooth',
    });
  };

  // Direct click / scrub on track
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !scrollRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - trackRect.left;
    const clickRatio = Math.min(Math.max(clickX / trackRect.width, 0), 1);
    
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    scrollRef.current.scrollTo({
      left: maxScroll * clickRatio,
      behavior: 'smooth',
    });
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only if not clicking a button directly to avoid blocking clicks unless dragged
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
    hasDraggedRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startXRef.current) * 1.5; // scroll speed multiplier
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isMouseDownRef.current = false;
  };

  // Calculate thumb left offset in percentage
  const maxThumbOffsetPct = 100 - thumbWidthPct;
  const thumbLeftPct = scrollProgress * maxThumbOffsetPct;
  const isScrollable = thumbWidthPct < 98;

  return (
    <div 
      id={id}
      className={`relative flex flex-col gap-1.5 w-full max-w-full ${containerClassName}`}
    >
      {/* Scrollable Row with Fade Masks */}
      <div className="relative w-full flex items-center group">
        
        {/* Left Edge Mask & Nudge Arrow */}
        <div 
          className={`absolute left-0 top-0 bottom-0 z-10 flex items-center pr-2 bg-gradient-to-r from-[#07080C] via-[#07080C]/80 to-transparent transition-opacity duration-200 pointer-events-none ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {showArrows && canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollByAmount(-140)}
              className="pointer-events-auto p-1 rounded-full bg-zinc-900/90 border border-white/20 text-zinc-300 hover:text-white hover:bg-zinc-800 shadow-md shadow-black/80 transition-all cursor-pointer -ml-0.5"
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`w-full flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth select-none cursor-grab active:cursor-grabbing pb-0.5 ${className}`}
          style={{ 
            touchAction: 'pan-x',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>

        {/* Right Edge Mask & Nudge Arrow */}
        <div 
          className={`absolute right-0 top-0 bottom-0 z-10 flex items-center pl-2 bg-gradient-to-l from-[#07080C] via-[#07080C]/80 to-transparent transition-opacity duration-200 pointer-events-none ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {showArrows && canScrollRight && (
            <button
              type="button"
              onClick={() => scrollByAmount(140)}
              className="pointer-events-auto p-1 rounded-full bg-zinc-900/90 border border-white/20 text-zinc-300 hover:text-white hover:bg-zinc-800 shadow-md shadow-black/80 transition-all cursor-pointer -mr-0.5"
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Creative High-End Tech "Side Bar" / Horizontal Scrollbar Track */}
      {showScrollbar && isScrollable && (
        <div className="w-full flex items-center justify-between gap-2 px-1 pt-0.5 select-none">
          {/* Track Rail */}
          <div 
            ref={trackRef}
            onClick={handleTrackClick}
            className="group/track relative flex-1 h-1.5 rounded-full bg-zinc-900/90 border border-white/[0.08] hover:border-white/20 transition-colors cursor-pointer overflow-hidden backdrop-blur-sm shadow-inner"
            title="Desplazamiento horizontal de categorías"
          >
            {/* Ambient track groove line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

            {/* Glowing Brand-Red Indicator Thumb */}
            <div
              className="absolute top-0 bottom-0 rounded-full transition-all duration-100 ease-out flex items-center justify-center bg-gradient-to-r from-red-600 via-rose-500 to-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)] group-hover/track:shadow-[0_0_12px_rgba(239,68,68,0.9)]"
              style={{
                left: `${thumbLeftPct}%`,
                width: `${thumbWidthPct}%`,
              }}
            >
              {/* Micro Tech White Center Pip for Cyber-Precision Aesthetic */}
              <span className="w-1.5 h-0.5 rounded-full bg-white/90 shadow-[0_0_3px_#fff]" />
            </div>
          </div>

          {/* Micro-indicator cue for mobile */}
          <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono text-zinc-500 shrink-0 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>Slide</span>
          </div>
        </div>
      )}
    </div>
  );
};

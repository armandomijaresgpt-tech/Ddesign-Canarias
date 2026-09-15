import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // High precision direct motion values (zero lag 1:1 response)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Subtle agile spring for outer ring only (normalized responsiveness)
  const ringX = useSpring(cursorX, { damping: 45, stiffness: 850, mass: 0.04 });
  const ringY = useSpring(cursorY, { damping: 45, stiffness: 850, mass: 0.04 });

  const isHoveredRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }

      // Check if hovered element is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest(
            'button, a, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive="true"]'
          )
        );
        if (interactive !== isHoveredRef.current) {
          isHoveredRef.current = interactive;
          setIsHovered(interactive);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
      isHoveredRef.current = false;
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isFinePointer || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] select-none">
      {/* Normalized Agile Outer Halo / Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center transition-[width,height,border-color,background-color] duration-150"
        animate={{
          width: isHovered ? 36 : 18,
          height: isHovered ? 36 : 18,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.02)',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.25)',
          borderWidth: isHovered ? '1.5px' : '1px',
        }}
      />

      {/* Immediate 1:1 Precision Center Dot (Direct Zero-Lag Movement) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 pointer-events-none rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
        animate={{
          width: isHovered ? 4 : 5,
          height: isHovered ? 4 : 5,
          opacity: isHovered ? 0.9 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

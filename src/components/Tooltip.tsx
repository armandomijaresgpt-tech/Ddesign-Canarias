import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  shortcut?: string;
  className?: string;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'bottom',
  delay = 180,
  shortcut,
  className = '',
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Position coordinates and motion variants
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
    }
  };

  const getMotionOffsets = () => {
    switch (position) {
      case 'top':
        return { initial: { opacity: 0, y: 4, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.95 } };
      case 'bottom':
        return { initial: { opacity: 0, y: -4, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -3, scale: 0.95 } };
      case 'left':
        return { initial: { opacity: 0, x: 4, scale: 0.94 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 3, scale: 0.95 } };
      case 'right':
        return { initial: { opacity: 0, x: -4, scale: 0.94 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -3, scale: 0.95 } };
    }
  };

  const motionVariants = getMotionOffsets();

  // Clone child to attach mouse & focus listeners seamlessly
  const trigger = React.cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent) => {
      showTooltip();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hideTooltip();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      showTooltip();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hideTooltip();
      children.props.onBlur?.(e);
    },
  });

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {trigger}

      <AnimatePresence>
        {isVisible && !disabled && (
          <motion.div
            role="tooltip"
            initial={motionVariants.initial}
            animate={motionVariants.animate}
            exit={motionVariants.exit}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute ${getPositionClasses()} z-50 pointer-events-none whitespace-nowrap`}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950/95 border border-white/20 text-zinc-100 text-[11px] font-medium tracking-normal shadow-[0_4px_20px_rgba(0,0,0,0.85),0_0_1px_rgba(255,255,255,0.4)] backdrop-blur-xl">
              <span>{content}</span>
              {shortcut && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/15 text-zinc-300 border border-white/10">
                  {shortcut}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

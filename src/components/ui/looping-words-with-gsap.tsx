'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';

export interface LoopingWordsProps {
  words?: string[];
  className?: string;
  onWordClick?: (word: string) => void;
}

export const LoopingWords: React.FC<LoopingWordsProps> = ({ 
  words = [
    'Diseño',
    'Impresiones',
    'Rotulación',
    'Papelería',
    'Merchadising',
    'Vinilos',
    'Personalización',
    'Eventos',
    'Bodas'
  ],
  className = '',
  onWordClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordListRef = useRef<HTMLUListElement>(null);
  const edgeElementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isInteractingRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number>(0);
  const touchStartXRef = useRef<number>(0);
  const touchDeltaYRef = useRef<number>(0);
  const touchDeltaXRef = useRef<number>(0);

  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);

  // Calculate total words and the height percentage for each word's vertical shift.
  const totalWords = words.length;
  const wordHeight = 100 / totalWords;

  // Local index tracker for GSAP timeline
  const currentIndexRef = useRef<number>(0);

  // Safely schedule an efficient requestAnimationFrame
  const scheduleUpdate = useCallback((fn: () => void) => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      fn();
    });
  }, []);

  // Callback to update the width of the selector edge based on the currently displayed word.
  const updateEdgeWidth = useCallback(() => {
    const wordList = wordListRef.current;
    const edgeElement = edgeElementRef.current;
    if (!wordList || !edgeElement) return;

    // Target the word at currentIndex + 1 (the one centered in view)
    const centerWordIndex = (currentIndexRef.current + 1) % totalWords;
    const centerWord = wordList.children[centerWordIndex] as HTMLLIElement;

    if (centerWord) {
      const pElement = (centerWord.querySelector('p') || centerWord) as HTMLElement;
      const centerWordWidth = pElement.getBoundingClientRect().width;
      const listWidth = wordList.getBoundingClientRect().width;
      
      if (listWidth > 0 && centerWordWidth > 0) {
        // Red corner brackets framing room
        const bracketPadding = 24;
        const percentageWidth = Math.min(96, Math.max(18, ((centerWordWidth + bracketPadding) / listWidth) * 100));

        gsap.to(edgeElement, {
          width: `${percentageWidth}%`,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      setActiveWordIndex(centerWordIndex);
    }
  }, [totalWords]);

  // Callback to animate the word list forward
  const moveWords = useCallback(() => {
    const wordList = wordListRef.current;
    if (!wordList) return;

    currentIndexRef.current++;

    gsap.to(wordList, {
      yPercent: -wordHeight * currentIndexRef.current,
      duration: 0.85,
      ease: 'elastic.out(1, 0.92)',
      overwrite: 'auto',
      onStart: () => scheduleUpdate(updateEdgeWidth),
      onComplete: function() {
        if (currentIndexRef.current >= totalWords - 3 && wordList.children.length > 0) {
          wordList.appendChild(wordList.children[0]);
          currentIndexRef.current--;
          gsap.set(wordList, { yPercent: -wordHeight * currentIndexRef.current });
        }
      },
    });
  }, [wordHeight, updateEdgeWidth, totalWords, scheduleUpdate]);

  // Move words backward (for swipe down / drag right gesture)
  const moveWordsBackward = useCallback(() => {
    const wordList = wordListRef.current;
    if (!wordList) return;

    // Prep by moving last child to start if near beginning
    if (currentIndexRef.current <= 0 && wordList.children.length > 0) {
      wordList.prepend(wordList.children[wordList.children.length - 1]);
      currentIndexRef.current++;
      gsap.set(wordList, { yPercent: -wordHeight * currentIndexRef.current });
    }

    currentIndexRef.current--;

    gsap.to(wordList, {
      yPercent: -wordHeight * currentIndexRef.current,
      duration: 0.85,
      ease: 'elastic.out(1, 0.92)',
      overwrite: 'auto',
      onStart: () => scheduleUpdate(updateEdgeWidth),
    });
  }, [wordHeight, updateEdgeWidth, scheduleUpdate]);

  // Restart the automatic loop with safety pause
  const restartTimeline = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    timelineRef.current = gsap.timeline({ repeat: -1, delay: 2.2 });
    timelineRef.current
      .call(moveWords)
      .to({}, { duration: 2.2 });
  }, [moveWords]);

  // Setup ResizeObserver & Animation Lifecycle with robust resize timeline cleanup
  useEffect(() => {
    scheduleUpdate(updateEdgeWidth);
    restartTimeline();

    let resizeDebounceTimer: ReturnType<typeof setTimeout> | null = null;

    // ResizeObserver: safely calibrate selector and recalibrate animations without layout thrashing
    const resizeObserver = new ResizeObserver((entries) => {
      let shouldRecalibrate = false;
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          shouldRecalibrate = true;
          break;
        }
      }

      if (!shouldRecalibrate) return;

      // Immediate edge calibration via rAF
      scheduleUpdate(updateEdgeWidth);

      // Debounce timeline restart during rapid resizing or device rotation
      if (resizeDebounceTimer) {
        clearTimeout(resizeDebounceTimer);
      }
      resizeDebounceTimer = setTimeout(() => {
        // Recalibrate active tweens and safely resume timeline
        if (wordListRef.current) {
          gsap.killTweensOf(wordListRef.current);
          gsap.set(wordListRef.current, { yPercent: -wordHeight * currentIndexRef.current });
        }
        if (edgeElementRef.current) {
          gsap.killTweensOf(edgeElementRef.current);
        }
        restartTimeline();
        scheduleUpdate(updateEdgeWidth);
      }, 100);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (wordListRef.current) {
      resizeObserver.observe(wordListRef.current);
    }

    return () => {
      if (resizeDebounceTimer) {
        clearTimeout(resizeDebounceTimer);
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      resizeObserver.disconnect();
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (wordListRef.current) {
        gsap.killTweensOf(wordListRef.current);
      }
      if (edgeElementRef.current) {
        gsap.killTweensOf(edgeElementRef.current);
      }
    };
  }, [updateEdgeWidth, restartTimeline, scheduleUpdate, wordHeight]);

  // Touch and Drag Gestures (Manual Swipe/Drag Between Categories)
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isInteractingRef.current = true;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    touchStartYRef.current = clientY;
    touchStartXRef.current = clientX;
    touchDeltaYRef.current = 0;
    touchDeltaXRef.current = 0;

    // Pause auto-rotation while user is actively swiping/dragging
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
    if (wordListRef.current) {
      gsap.killTweensOf(wordListRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isInteractingRef.current) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    touchDeltaYRef.current = clientY - touchStartYRef.current;
    touchDeltaXRef.current = clientX - touchStartXRef.current;

    // Realtime tactile dragging feedback
    if (wordListRef.current && containerRef.current) {
      const containerH = containerRef.current.clientHeight || 64;
      const dragPercent = (touchDeltaYRef.current / containerH) * wordHeight * 0.75;
      gsap.set(wordListRef.current, {
        yPercent: -wordHeight * currentIndexRef.current + dragPercent,
      });
    }
  };

  const handleTouchEnd = () => {
    if (!isInteractingRef.current) return;
    isInteractingRef.current = false;
    const deltaY = touchDeltaYRef.current;
    const deltaX = touchDeltaXRef.current;

    // Determine primary swipe axis
    if (Math.abs(deltaY) >= Math.abs(deltaX)) {
      // Vertical swipe
      if (deltaY < -15) {
        // Swiped Up -> Advance forward
        moveWords();
      } else if (deltaY > 15) {
        // Swiped Down -> Move backward
        moveWordsBackward();
      } else {
        // Snap cleanly back to active word
        if (wordListRef.current) {
          gsap.to(wordListRef.current, {
            yPercent: -wordHeight * currentIndexRef.current,
            duration: 0.35,
            ease: 'power2.out',
            onStart: () => scheduleUpdate(updateEdgeWidth),
          });
        }
      }
    } else {
      // Horizontal swipe
      if (deltaX < -15) {
        // Swiped Left -> Advance
        moveWords();
      } else if (deltaX > 15) {
        // Swiped Right -> Move backward
        moveWordsBackward();
      } else {
        if (wordListRef.current) {
          gsap.to(wordListRef.current, {
            yPercent: -wordHeight * currentIndexRef.current,
            duration: 0.35,
            ease: 'power2.out',
            onStart: () => scheduleUpdate(updateEdgeWidth),
          });
        }
      }
    }

    // Resume auto-looping after gesture finishes
    restartTimeline();
  };

  return (
    <div 
      ref={containerRef}
      className={`cloneable select-none relative ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      style={{ touchAction: 'manipulation' }}
    >
      <div className="looping-words cursor-grab active:cursor-grabbing">
        <div className="looping-words__containers">
          <ul data-looping-words-list="" className="looping-words__list" ref={wordListRef}>
            {words.map((word, index) => {
              const isCentered = index === activeWordIndex;
              return (
                <li 
                  key={`${word}-${index}`} 
                  className="looping-words__list group/word cursor-pointer"
                  onClick={() => {
                    if (onWordClick) {
                      onWordClick(word);
                    }
                  }}
                >
                  <p 
                    className={`looping-words__p transition-all duration-300 transform ${
                      isCentered 
                        ? 'opacity-100 scale-100 text-white font-black' 
                        : 'opacity-40 scale-95 text-zinc-400 group-hover/word:opacity-85 group-hover/word:scale-100 group-hover/word:text-zinc-200'
                    } group-hover/word:text-white group-active/word:scale-95`}
                  >
                    {word}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        
        {/* Soft Vignette Mask */}
        <div className="looping-words__fade" aria-hidden="true" />
        
        {/* Dynamic GSAP Selector with Red Laser Corner Brackets */}
        <div data-looping-words-selector="" className="looping-words__selector" ref={edgeElementRef}>
          <div className="looping-words__edge" />
          <div className="looping-words__edge is--2" />
          <div className="looping-words__edge is--3" />
          <div className="looping-words__edge is--4" />
        </div>
      </div>
    </div>
  );
};

export default LoopingWords;

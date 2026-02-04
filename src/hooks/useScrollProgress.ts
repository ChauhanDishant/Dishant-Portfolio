import { useState, useEffect, useCallback, useRef } from 'react';
import type { ScrollProgress } from '@/types';
import { throttle } from '@/utils/helpers';

interface UseScrollProgressOptions {
  target?: React.RefObject<HTMLElement>;
  offset?: number;
}

/**
 * Custom hook to track scroll progress
 * Optimized for performance with RAF and throttling
 */
export function useScrollProgress(
  options: UseScrollProgressOptions = {}
): ScrollProgress {
  const { target, offset = 0 } = options;
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    scrollY: 0,
    scrollYProgress: 0,
  });
  const rafRef = useRef<number | null>(null);

  const calculateProgress = useCallback((): void => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (target?.current) {
        const element = target.current;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = element.scrollHeight;
        const viewportHeight = window.innerHeight;

        const scrollY = window.scrollY - elementTop + offset;
        const maxScroll = elementHeight - viewportHeight;
        const scrollYProgress = Math.max(0, Math.min(1, scrollY / maxScroll));

        setScrollProgress({
          scrollY,
          scrollYProgress,
        });
      } else {
        const scrollY = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollYProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

        setScrollProgress({
          scrollY,
          scrollYProgress,
        });
      }
    });
  }, [target, offset]);

  const handleScroll = useCallback(
    throttle(() => {
      calculateProgress();
    }, 16), // ~60fps
    [calculateProgress]
  );

  useEffect(() => {
    calculateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateProgress);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [calculateProgress, handleScroll]);

  return scrollProgress;
}

import { useState, useEffect, useCallback, useRef } from 'react';
import type { CursorPosition } from '@/types';
import { throttle } from '@/utils/helpers';

interface UseCustomCursorResult {
  position: CursorPosition;
  isHovering: boolean;
  cursorVariant: 'default' | 'hover' | 'click';
}

/**
 * Custom hook for reactive cursor tracking
 * Optimized with throttling for performance
 */
export function useCustomCursor(): UseCustomCursorResult {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click'>('default');
  const rafRef = useRef<number | null>(null);

  // Throttled mouse move handler for performance
  const handleMouseMove = useCallback(
    throttle((e: unknown) => {
      const event = e as MouseEvent;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY });
      });
    }, 16), // ~60fps
    []
  );

  const handleMouseDown = useCallback(() => {
    setCursorVariant('click');
  }, []);

  const handleMouseUp = useCallback(() => {
    setCursorVariant(isHovering ? 'hover' : 'default');
  }, [isHovering]);

  useEffect(() => {
    // Add interactive element detection
    const handleMouseEnter = (e: Event): void => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
        setCursorVariant('hover');
      }
    };

    const handleMouseLeave = (e: Event): void => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  return { position, isHovering, cursorVariant };
}

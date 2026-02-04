import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomCursor } from '@/hooks/useCustomCursor';

/**
 * Custom cursor component with reactive SVG that blooms on hover
 * Uses pointer-events: none to prevent interference with clicks
 */
export const CustomCursor = React.memo(() => {
  const { position, isHovering, cursorVariant } = useCustomCursor();

  const cursorSize = {
    default: 16,
    hover: 40,
    click: 32,
  };

  const size = cursorSize[cursorVariant];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 z-[9999] mix-blend-difference pointer-events-none"
        animate={{
          x: position.x - size / 2,
          y: position.y - size / 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Default cursor - simple ring */}
          {cursorVariant === 'default' && (
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            />
          )}

          {/* Hover cursor - blooming neon ring */}
          {cursorVariant === 'hover' && (
            <>
              <motion.circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="url(#cursor-gradient)"
                strokeWidth="3"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1"
                opacity="0.5"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.3 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </>
          )}

          {/* Click cursor - compressed ring */}
          {cursorVariant === 'click' && (
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="#818cf8"
              strokeWidth="4"
              initial={{ scale: 1 }}
              animate={{ scale: 0.8 }}
              exit={{ scale: 1 }}
            />
          )}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="cursor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow effect on hover */}
        {isHovering && (
          <motion.div
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 0.5 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
});

CustomCursor.displayName = 'CustomCursor';

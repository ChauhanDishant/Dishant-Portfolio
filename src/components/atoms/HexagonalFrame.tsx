import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { TiltState } from "@/types";

interface HexagonalFrameProps {
  children: React.ReactNode;
  size?: number;
  glowColor?: "cyan" | "indigo" | "gradient";
  className?: string;
}

/**
 * Hexagonal frame with glassmorphism, neon glow, and 3D tilt effect
 */
export const HexagonalFrame = React.memo<HexagonalFrameProps>(
  ({ children, size = 288, glowColor = "gradient", className = "" }) => {
    const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * 20, y: -x * 20 });
      },
      [],
    );

    const handleMouseLeave = useCallback(() => {
      setTilt({ x: 0, y: 0 });
    }, []);

    const hexagonClipPath =
      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

    const glowStyles = {
      cyan: "from-neon-cyan to-neon-cyan",
      indigo: "from-neon-indigo to-neon-indigo",
      gradient: "from-neon-cyan to-electric-indigo",
    };

    return (
      <div
        className={`relative ${className}`}
        style={{ width: size, height: size, perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Outer glow layer */}
          <div
            className={`absolute inset-0 opacity-60 blur-xl bg-gradient-to-br ${glowStyles[glowColor]}`}
            style={{ clipPath: hexagonClipPath }}
          />

          {/* Glassmorphism frame */}
          <div
            className="absolute inset-2 backdrop-blur-glass bg-glass-white border-2 border-neon-cyan/30"
            style={{ clipPath: hexagonClipPath }}
          >
            {/* Content */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: hexagonClipPath }}
            >
              {children}
            </div>

            {/* Holographic scan line */}
          </div>

          {/* Corner accent dots */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-neon-cyan rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-electric-indigo rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
      </div>
    );
  },
);

HexagonalFrame.displayName = "HexagonalFrame";

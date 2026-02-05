import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import { useWaveTrail } from "@/hooks/useWaveTrail";

export const CustomCursor = React.memo(() => {
  const { position, cursorVariant } = useCustomCursor();
  const { points, setHead } = useWaveTrail(9, 0.3);

  // Medium-size cursor (balanced)
  const size = 34;

  useEffect(() => {
    setHead(position.x, position.y);
  }, [position, setHead]);

  return (
    <>
      {/* ===== Neon Wave Trail ===== */}
      {points.map((point, index) => (
        <div
          key={index}
          className="fixed pointer-events-none"
          style={{
            left: point.x,
            top: point.y,
            width: 18 - index * 1.4,
            height: 18 - index * 1.4,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.9), rgba(129,140,248,0.4))",
            filter: "blur(6px)",
            opacity: 1 - index / points.length,
            zIndex: 9998,
          }}
        />
      ))}

      {/* ===== Cursor Head ===== */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: position.x - size / 2,
          y: position.y - size / 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.6,
        }}
        style={{
          width: size,
          height: size,
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              cursorVariant === "hover"
                ? "0 0 18px rgba(34,211,238,0.9), 0 0 36px rgba(129,140,248,0.6)"
                : "0 0 10px rgba(34,211,238,0.7)",
          }}
        />

        {/* SVG Ring */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className="absolute inset-0"
          style={{
            filter:
              "drop-shadow(0 0 6px rgba(34,211,238,0.9)) drop-shadow(0 0 12px rgba(129,140,248,0.6))",
          }}
        >
          {cursorVariant === "click" ? (
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="#a5b4fc"
              strokeWidth="5"
            />
          ) : (
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="url(#cursor-gradient)"
              strokeWidth="3"
            />
          )}

          <defs>
            <linearGradient
              id="cursor-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </>
  );
});

CustomCursor.displayName = "CustomCursor";

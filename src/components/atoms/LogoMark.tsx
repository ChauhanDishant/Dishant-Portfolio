import React from "react";
import { motion } from "framer-motion";

interface LogoMarkProps {
  showName?: boolean;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ showName = true }) => {
  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer select-none"
      whileHover={{ scale: 1.05 }}
    >
      {/* Monogram */}
      <div className="w-10 h-10 rounded-lg border border-neon-cyan/50 flex items-center justify-center bg-glass-white backdrop-blur-md">
        <span className="font-black text-lg bg-gradient-to-r from-neon-cyan to-electric-indigo bg-clip-text text-transparent">
          DC
        </span>
      </div>

      {/* Name */}
      {showName && (
        <span className="text-lg font-semibold text-white tracking-wide">
          Dishant
        </span>
      )}
    </motion.div>
  );
};

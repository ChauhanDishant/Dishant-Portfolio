import React from "react";
import { motion } from "framer-motion";

interface NavLinkProps {
  label: string;
  targetId: string;
  active: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  label,
  targetId,
  active,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.a
      href={`#${targetId}`}
      onClick={handleClick}
      className={`relative text-base font-medium transition-colors ${
        active ? "text-neon-cyan" : "text-slate-300 hover:text-neon-cyan"
      }`}
    >
      {label}

      {/* Active underline */}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-neon-cyan transition-all ${
          active ? "w-full" : "w-0"
        }`}
      />
    </motion.a>
  );
};

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/helpers";

interface NeonButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  as?: React.ElementType<any>;
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Neon-styled button component with glassmorphism and hover effects
 */
export const NeonButton = React.memo<NeonButtonProps>(
  ({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    as,
    className,
    href,
    target,
    rel,
    ...props
  }) => {
    const baseStyles =
      "relative font-bold rounded-lg overflow-hidden transition-all duration-300 cursor-pointer";

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-neon-cyan to-neon-indigo text-white hover:shadow-neon-cyan",
      secondary:
        "backdrop-blur-glass bg-glass-white border border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan hover:shadow-neon-cyan",
      ghost:
        "backdrop-blur-glass bg-transparent border border-neon-cyan/20 text-slate-300 hover:border-neon-cyan/50 hover:text-neon-cyan",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const Component = (
      as ? motion(as as React.ElementType) : motion.button
    ) as any;

    const buttonProps = as === "a" ? { href, target, rel, ...props } : props;

    return (
      <Component
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className,
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...buttonProps}
      >
        {/* Gradient overlay on hover */}
        {variant === "primary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-neon-indigo to-neon-cyan opacity-0 hover:opacity-100 transition-opacity duration-500" />
        )}

        {/* Button content */}
        <span className="relative z-10">{children}</span>

        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-neon-cyan/30 to-neon-indigo/30" />
      </Component>
    );
  },
);

NeonButton.displayName = "NeonButton";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

interface NeonBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'indigo' | 'gradient';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Neon-styled badge component for displaying technologies and tags
 */
export const NeonBadge = React.memo<NeonBadgeProps>(
  ({ children, variant = 'cyan', size = 'md', className }) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-full font-mono backdrop-blur-glass border transition-all duration-300';

    const variantStyles = {
      cyan: 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan hover:shadow-neon-cyan',
      indigo:
        'bg-neon-indigo/10 border-neon-indigo/30 text-electric-indigo hover:border-neon-indigo hover:shadow-neon-indigo',
      gradient:
        'bg-gradient-to-r from-neon-cyan/10 to-neon-indigo/10 border-neon-cyan/20 text-neon-cyan hover:from-neon-cyan/20 hover:to-neon-indigo/20',
    };

    const sizeStyles = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
    };

    return (
      <motion.span
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        {children}
      </motion.span>
    );
  }
);

NeonBadge.displayName = 'NeonBadge';

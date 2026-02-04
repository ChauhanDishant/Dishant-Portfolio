import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/helpers';

interface FormFieldProps {
  name: string;
  type?: 'text' | 'email' | 'textarea';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  className?: string;
}

/**
 * Form field component with glassmorphism and real-time validation
 */
export const FormField = React.memo<FormFieldProps>(
  ({ name, type = 'text', placeholder, value, onChange, error, rows = 5, className }) => {
    const baseStyles =
      'w-full px-6 py-4 rounded-lg backdrop-blur-glass bg-glass-white border border-neon-cyan/30 text-white placeholder-slate-400 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300';

    const errorStyles = error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : '';

    const Element = type === 'textarea' ? 'textarea' : 'input';

    return (
      <div className={cn('relative', className)}>
        <Element
          name={name}
          type={type !== 'textarea' ? type : undefined}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={type === 'textarea' ? rows : undefined}
          className={cn(baseStyles, errorStyles, type === 'textarea' && 'resize-none')}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />

        {/* Error message with animation */}
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${name}-error`}
              className="text-red-400 text-sm mt-2 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Success indicator */}
        {!error && value.length > 0 && (
          <motion.div
            className="absolute right-4 top-4 text-neon-cyan"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

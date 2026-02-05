import { motion } from "framer-motion";

type ToastVariant = "success" | "error" | "loading";

interface NeonToastProps {
  message: string;
  variant: ToastVariant;
}

const ICONS: Record<ToastVariant, JSX.Element> = {
  success: (
    <svg
      className="w-5 h-5 text-neon-cyan"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg
      className="w-5 h-5 text-red-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  loading: (
    <svg
      className="w-5 h-5 text-electric-indigo animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v3m6.364.636-2.121 2.121M21 12h-3m-.636 6.364-2.121-2.121M12 21v-3m-6.364-.636 2.121-2.121M3 12h3m.636-6.364 2.121 2.121"
      />
    </svg>
  ),
};

export const NeonToast: React.FC<NeonToastProps> = ({ message, variant }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="
        flex items-center gap-3
        px-5 py-4
        rounded-xl
        backdrop-blur-xl
        bg-glass-white
        border border-neon-cyan/30
        shadow-[0_0_28px_rgba(6,182,212,0.25)]
        text-slate-200
        max-w-sm
      "
    >
      <div className="flex-shrink-0">{ICONS[variant]}</div>
      <p className="text-sm leading-relaxed font-medium">{message}</p>
    </motion.div>
  );
};

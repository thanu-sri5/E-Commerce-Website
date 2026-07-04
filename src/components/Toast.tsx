import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export default function Toast({ toasts, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const iconMap = {
            success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
            error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
            info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
          };

          const bgMap = {
            success: 'bg-white dark:bg-zinc-900 border-emerald-500/30 dark:border-emerald-500/20 shadow-emerald-100/50 dark:shadow-none',
            error: 'bg-white dark:bg-zinc-900 border-rose-500/30 dark:border-rose-500/20 shadow-rose-100/50 dark:shadow-none',
            info: 'bg-white dark:bg-zinc-900 border-blue-500/30 dark:border-blue-500/20 shadow-blue-100/50 dark:shadow-none',
          };

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg ${bgMap[toast.type]}`}
              id={`toast-${toast.id}`}
            >
              <div className="flex items-center gap-3">
                {iconMap[toast.type]}
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => onClose(toast.id)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

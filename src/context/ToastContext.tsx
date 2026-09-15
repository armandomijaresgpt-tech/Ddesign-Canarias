import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Calculator, 
  Send, 
  X 
} from 'lucide-react';
import { useSound } from './SoundContext';

export type ToastType = 'success' | 'info' | 'error' | 'quote';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (title: string, message?: string, type?: ToastType) => void;
  showSuccess: (title: string, message?: string) => void;
  showQuoteSaved: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const { playSuccess, playHover } = useSound();

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, message?: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastItem = { id, title, message, type };

    setToasts((prev) => [...prev.slice(-3), newToast]);

    if (type === 'success' || type === 'quote') {
      playSuccess();
    }

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [playSuccess, removeToast]);

  const showSuccess = useCallback((title: string, message?: string) => {
    showToast(title, message, 'success');
  }, [showToast]);

  const showQuoteSaved = useCallback((title: string, message?: string) => {
    showToast(title, message, 'quote');
  }, [showToast]);

  const showError = useCallback((title: string, message?: string) => {
    showToast(title, message, 'error');
  }, [showToast]);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'quote':
        return <Calculator className="w-4 h-4 text-white" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Info className="w-4 h-4 text-zinc-300" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showQuoteSaved, showError, removeToast }}>
      {children}

      {/* Global Toast Container - Fixed Floating Overlay */}
      <div 
        id="global-toast-container"
        className="fixed top-20 sm:top-24 right-4 sm:right-8 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, scale: 0.94, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto relative p-3.5 sm:p-4 rounded-2xl bg-[#0b0c11]/95 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-2xl text-left overflow-hidden group"
            >
              {/* Subtle top ambient sheen */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                  toast.type === 'quote'
                    ? 'bg-zinc-900 border-white/30 text-white'
                    : toast.type === 'success'
                      ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                      : toast.type === 'error'
                        ? 'bg-red-950/60 border-red-500/30 text-red-400'
                        : 'bg-zinc-900 border-white/10 text-zinc-300'
                }`}>
                  {getIcon(toast.type)}
                </div>

                <div className="flex-1 pr-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug font-display">
                    {toast.title}
                  </h4>
                  {toast.message && (
                    <p className="text-[11px] sm:text-xs text-zinc-300 mt-0.5 leading-relaxed">
                      {toast.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  onMouseEnter={playHover}
                  className="w-6 h-6 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer shrink-0 -mr-1 -mt-1"
                  aria-label="Cerrar notificación"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Minimal auto-dismiss progress line */}
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-0.5 ${
                  toast.type === 'quote' 
                    ? 'bg-white' 
                    : toast.type === 'success' 
                      ? 'bg-emerald-400' 
                      : toast.type === 'error' 
                        ? 'bg-red-400' 
                        : 'bg-zinc-400'
                }`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

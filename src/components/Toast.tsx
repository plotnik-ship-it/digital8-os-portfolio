import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../lib/store';
import { useEffect } from 'react';

export function Toast() {
  const { toastMessage, hideToast } = useTaskStore();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2000); // Auto-hide after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [toastMessage, hideToast]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50 pointer-events-none"
        >
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg px-4 py-3 shadow-xl">
            <p className="text-sm text-gray-300">
              {toastMessage}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

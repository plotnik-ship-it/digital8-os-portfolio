import { motion } from 'framer-motion';
import { Keyboard } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NavigationGuide() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Detect if user is on Mac
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const shortcutKey = isMac ? 'Cmd+K' : 'Ctrl+K';

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-30"
      style={{ opacity: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Keyboard size={12} className="text-gray-600" />
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-gray-900/50 border border-gray-800 text-gray-400 font-mono text-xs">{shortcutKey}</kbd> to search</span>
          </div>
          <div className="text-gray-600">
            Digital8 OS v1.0
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

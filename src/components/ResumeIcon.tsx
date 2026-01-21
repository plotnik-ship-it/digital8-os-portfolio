import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function ResumeIcon() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Open Resume.pdf from public root in a new tab
    window.open('/Resume.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="fixed bottom-24 right-8 md:right-10 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-800 bg-gray-900/40 hover:bg-gray-900/60 hover:border-accent/50 transition-all cursor-pointer backdrop-blur-sm"
      >
        <motion.div
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -5, 5, -5, 0] : 0
          }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <FileText size={32} className="text-accent" />
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-1 -right-1"
            >
              <ExternalLink size={12} className="text-accent" />
            </motion.div>
          )}
        </motion.div>
        <span className="text-xs text-gray-400 group-hover:text-accent transition-colors font-medium">
          Resume.pdf
        </span>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-12 right-0 px-2 py-1 rounded bg-gray-900 border border-gray-800 text-xs text-gray-300 whitespace-nowrap"
          >
            Click to open CV
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 w-2 h-2 bg-gray-900 border-r border-b border-gray-800 rotate-45"></div>
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}

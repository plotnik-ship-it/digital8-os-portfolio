import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  projectDomain?: string;
  isVisible: boolean;
}

const systemLogs = [
  '[BOOT] Digital8 OS initialized.',
  '[NET] Resolved planner.travelpoint.ca... Status 200.',
  '[SEC] OpenAI_API_KEY validated: SUCCESS.',
];

// DNS logs for specific domains
const getDNSLogs = (domain?: string): string[] => {
  if (!domain) return systemLogs;

  // For MyTravelPoint, show hybrid architecture logs
  if (domain === 'mytravelpoint.ca') {
    return [
      '[BOOT] Digital8 OS initialized.',
      '[SYS] Syncing with Duda CMS... SUCCESS.',
      '[SYS] Loading AI Planner Module... SUCCESS.',
    ];
  }

  // For Digital8 Corporate, use DNS logs
  if (domain === 'digital8.ca') {
    return [
      '[BOOT] Digital8 OS initialized.',
      `[DNS] Connecting to ${domain}... SUCCESS.`,
      '[SEC] SSL Certificate validated: SUCCESS.',
    ];
  }

  // For other domains, replace in existing logs
  return systemLogs.map(log => log.replace('planner.travelpoint.ca', domain));
};

export function Terminal({ projectDomain, isVisible }: TerminalProps) {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedLogs([]);
      setCurrentLogIndex(0);
      setCurrentCharIndex(0);
      setIsTyping(false);
      return;
    }

    const allLogs = getDNSLogs(projectDomain);

    if (currentLogIndex >= allLogs.length) {
      return;
    }

    const currentLog = allLogs[currentLogIndex];

    if (currentCharIndex < currentLog.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, 30); // Typing speed: 30ms per character

      return () => clearTimeout(timer);
    } else {
      // Log complete, move to next
      setIsTyping(false);
      setDisplayedLogs((prev) => [...prev, currentLog]);
      const timer = setTimeout(() => {
        setCurrentLogIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 500); // Small delay before next log

      return () => clearTimeout(timer);
    }
  }, [isVisible, currentLogIndex, currentCharIndex, projectDomain]);

  if (!isVisible) return null;

  const allLogs = getDNSLogs(projectDomain);

  const currentLog = allLogs[currentLogIndex];
  const currentText = currentLog
    ? currentLog.substring(0, currentCharIndex)
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full w-full bg-pure-black overflow-hidden"
    >
      <div className="h-full flex flex-col">
        {/* Terminal Header */}
        <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
          <TerminalIcon size={16} className="text-accent" />
          <span className="text-sm font-medium text-gray-300">System Terminal</span>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
          <div className="space-y-1">
            <AnimatePresence>
              {displayedLogs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-400"
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>

            {currentText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400"
              >
                {currentText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1 text-accent"
                  >
                    ▊
                  </motion.span>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

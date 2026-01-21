import { useEffect, useCallback } from 'react';
import { useTaskStore } from '../lib/store';

/**
 * Hook to handle global keyboard shortcuts
 * - 'C' key: Opens Quick Create modal
 * - 'A' key: Set filter to 'All'
 * - 'U' key: Set filter to 'Urgent'
 * - 'D' key: Set filter to 'Done'
 * - 'Esc' key: Closes any open modal (Command Palette or Quick Create)
 * 
 * Smart Focus: Shortcuts don't trigger when user is typing in input/textarea
 */
export function useGlobalShortcuts() {
  const { 
    isCommandPaletteOpen, 
    isQuickCreateOpen,
    setCommandPalette, 
    setQuickCreate,
    toggleCommandPalette,
    setFilter,
    showToast
  } = useTaskStore();

  // Memoize handlers to prevent unnecessary re-renders
  const handleFilterAll = useCallback(() => {
    setFilter('all');
    showToast('Filtered by: All');
  }, [setFilter, showToast]);

  const handleFilterUrgent = useCallback(() => {
    setFilter('urgent');
    showToast('Filtered by: Urgent');
  }, [setFilter, showToast]);

  const handleFilterDone = useCallback(() => {
    setFilter('done');
    showToast('Filtered by: Done');
  }, [setFilter, showToast]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input field or textarea
      const activeElement = document.activeElement;
      const isTyping = 
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.getAttribute('contenteditable') === 'true';

      // Don't trigger shortcuts if user is typing
      if (isTyping) {
        return;
      }

      // Handle 'C' key - Open Quick Create
      if (e.key === 'c' || e.key === 'C') {
        // Only trigger if no modifier keys are pressed
        if (!e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
          e.preventDefault();
          setQuickCreate(true);
        }
      }

      // Handle Cmd+K / Ctrl+K - Open Command Palette
      if (e.key === 'k' || e.key === 'K') {
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          toggleCommandPalette();
        }
      }

      // Handle filter shortcuts
      if (e.key === 'a' || e.key === 'A') {
        if (!e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
          e.preventDefault();
          handleFilterAll();
        }
      }

      if (e.key === 'u' || e.key === 'U') {
        if (!e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
          e.preventDefault();
          handleFilterUrgent();
        }
      }

      if (e.key === 'd' || e.key === 'D') {
        if (!e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
          e.preventDefault();
          handleFilterDone();
        }
      }

      // Handle 'Esc' key - Close any open modal
      if (e.key === 'Escape') {
        if (isCommandPaletteOpen) {
          e.preventDefault();
          setCommandPalette(false);
        }
        if (isQuickCreateOpen) {
          e.preventDefault();
          setQuickCreate(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCommandPaletteOpen, isQuickCreateOpen, setCommandPalette, setQuickCreate, toggleCommandPalette, handleFilterAll, handleFilterUrgent, handleFilterDone]);
}

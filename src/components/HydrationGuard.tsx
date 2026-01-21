import { useEffect, useState } from 'react';

/**
 * Component that prevents rendering until Zustand persist has hydrated
 * This fixes React error #185 (hooks order violation) during hydration
 */
export function HydrationGuard({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Give Zustand persist a moment to hydrate from localStorage
    // Zustand persist hydrates synchronously, but we need to wait a tick
    // to ensure all components have consistent state
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Don't render children until hydration is complete
  // This prevents React from seeing different hook orders between renders
  if (!isHydrated) {
    return (
      <div className="flex h-screen bg-pure-black text-white items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

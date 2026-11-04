'use client';

import { useCallback } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { CompactControl } from '@/components/shared/compact-control';
import { useMounted } from '@/hooks/use-mounted';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const toggleTheme = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

      if (
        !document.startViewTransition ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setTheme(nextTheme);
        return;
      }

      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      );

      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      await transition.ready;

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    },
    [resolvedTheme, setTheme],
  );

  if (!mounted) {
    return <CompactControl className="w-8 p-0" aria-label="Theme control" />;
  }

  return (
    <CompactControl
      onClick={toggleTheme}
      className="w-8 p-0"
      aria-label="Toggle theme"
      title={resolvedTheme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ y: -16, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 16, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-3.5 w-3.5" />
          ) : (
            <Moon className="h-3.5 w-3.5" />
          )}
        </motion.div>
      </AnimatePresence>
    </CompactControl>
  );
}

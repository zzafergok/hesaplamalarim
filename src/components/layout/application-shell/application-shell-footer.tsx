'use client';

import type { ApplicationShellFooterProps } from './types';

export function ApplicationShellFooter({
  children,
  placement,
  collapsed = false,
}: ApplicationShellFooterProps) {
  return (
    <footer
      className={`flex shrink-0 items-center justify-center border-t border-border ${
        placement === 'sidebar'
          ? collapsed
            ? 'h-auto min-h-16 px-2 py-3'
            : 'h-16 px-3 sm:px-4'
          : 'min-h-16 px-4 py-3 text-center font-mono text-2xs uppercase text-ash'
      }`}
    >
      {children}
    </footer>
  );
}

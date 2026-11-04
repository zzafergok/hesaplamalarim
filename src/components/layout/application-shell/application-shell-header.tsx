'use client';

import { type ReactNode } from 'react';
import { Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/core/button';
import type { ApplicationShellNavItem } from './types';

interface ApplicationShellHeaderProps {
  active?: ApplicationShellNavItem;
  collapsed: boolean;
  headerActions?: ReactNode;
  onOpenMobile: () => void;
  onToggleCollapsed: () => void;
}

export function ApplicationShellHeader({
  active,
  collapsed,
  headerActions,
  onOpenMobile,
  onToggleCollapsed,
}: ApplicationShellHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Button
          onClick={onOpenMobile}
          variant="outline"
          size="icon"
          aria-label="Menüyü aç"
          className="shrink-0 border-border bg-background p-2 text-muted-foreground hover:text-foreground md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Button
          onClick={onToggleCollapsed}
          variant="outline"
          size="icon"
          aria-label={collapsed ? 'Menüyü genişlet' : 'Menüyü daralt'}
          className="hidden shrink-0 border-border bg-background text-muted-foreground hover:text-foreground md:inline-flex"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
        <div className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="truncate font-semibold uppercase tracking-widest">
            {active?.label}
          </span>
        </div>
      </div>
      {headerActions && (
        <div className="flex shrink-0 items-center gap-3 font-mono text-xs">
          {headerActions}
        </div>
      )}
    </header>
  );
}

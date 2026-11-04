'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from '@/components/core/link';
import { TooltipComponent } from '@/components/core/tooltip';
import { isNavItemActive } from './nav-utils';
import type { ApplicationShellNavItem } from './types';

interface SidebarNavProps {
  navItems: ApplicationShellNavItem[];
  pathname: string;
  collapsed: boolean;
  onNavigate: () => void;
}

export function SidebarNav({
  navItems,
  pathname,
  collapsed,
  onNavigate,
}: SidebarNavProps) {
  return (
    <nav
      className={`flex-1 space-y-1.5 font-mono text-xs uppercase tracking-wider ${
        collapsed ? 'p-2' : 'p-3'
      }`}
    >
      {navItems.map((item) => {
        const isActive = isNavItemActive(pathname, item);
        const Icon = item.icon;

        if (collapsed) {
          const collapsedClassName = `flex h-12 w-full items-center justify-center overflow-hidden border transition-all ${
            isActive
              ? 'cursor-default border-l-4 border-tulpar-blue/40 border-l-tulpar-blue bg-background text-foreground shadow-md'
              : item.highlight
                ? 'cursor-pointer border-border bg-background/40 text-tulpar-blue hover:border-muted-foreground hover:text-foreground'
                : 'cursor-pointer border-transparent text-muted-foreground hover:border-border hover:bg-background/60 hover:text-foreground'
          }`;

          const content = (
            <Icon
              className={`h-5 w-5 shrink-0 ${
                isActive
                  ? 'text-tulpar-blue'
                  : item.highlight
                    ? 'text-warning'
                    : 'text-muted-foreground'
              }`}
            />
          );

          return (
            <TooltipComponent
              key={item.href}
              content={
                <div>
                  <div className="font-bold">{item.label}</div>
                  {item.subtitle && (
                    <div className="text-2xs text-muted-foreground">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              }
              side="right"
            >
              {isActive ? (
                <div
                  aria-current="page"
                  aria-disabled="true"
                  className={collapsedClassName}
                >
                  {content}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={collapsedClassName}
                  aria-label={item.label}
                >
                  {content}
                </Link>
              )}
            </TooltipComponent>
          );
        }

        const expandedClassName = `flex h-14 w-full items-center justify-between gap-2 overflow-hidden border px-3.5 transition-all ${
          isActive
            ? 'cursor-default border-l-4 border-tulpar-blue/40 border-l-tulpar-blue bg-background text-foreground shadow-md'
            : item.highlight
              ? 'cursor-pointer border-border bg-background/40 text-tulpar-blue hover:border-muted-foreground hover:text-foreground'
              : 'cursor-pointer border-transparent text-muted-foreground hover:border-border hover:bg-background/60 hover:text-foreground'
        }`;

        const content = (
          <>
            <span className="flex min-w-0 flex-1 items-center gap-3">
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isActive
                    ? 'text-tulpar-blue'
                    : item.highlight
                      ? 'text-warning'
                      : 'text-muted-foreground'
                }`}
              />
              <span className="min-w-0 flex-1 text-left">
                <span
                  className="block truncate text-xs font-bold"
                  title={item.label}
                >
                  {item.label}
                </span>
                {item.subtitle && (
                  <span
                    className="block truncate text-micro normal-case text-muted-foreground"
                    title={item.subtitle}
                  >
                    {item.subtitle}
                  </span>
                )}
              </span>
            </span>
            {isActive && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-tulpar-blue" />
            )}
          </>
        );

        return isActive ? (
          <div
            key={item.href}
            aria-current="page"
            aria-disabled="true"
            className={expandedClassName}
          >
            {content}
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={expandedClassName}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}

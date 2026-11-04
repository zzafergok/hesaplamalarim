'use client';

import * as React from 'react';

import { Button } from '@/components/core/button';
import { cn } from '@/lib/utils';

import type { CompactControlProps } from './types';

/**
 * A compact, bordered action control for toolbars and header utilities.
 * It keeps the full Button API for icons, labels, pending states, menus, and
 * future interaction patterns without requiring layout-specific wrappers.
 */
export const CompactControl = React.forwardRef<
  HTMLButtonElement,
  CompactControlProps
>(({ className, variant = 'ghost', ...props }, ref) => (
  <Button
    ref={ref}
    variant={variant}
    className={cn(
      'relative inline-flex h-8 min-w-8 items-center justify-center overflow-hidden rounded-none border border-gunmetal px-2 text-ash transition-colors hover:border-tulpar-blue/50 hover:text-titanium',
      className,
    )}
    data-slot="compact-control"
    {...props}
  />
));

CompactControl.displayName = 'CompactControl';

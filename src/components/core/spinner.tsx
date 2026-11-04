'use client';

import * as React from 'react';
import { LoaderIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Inline Spinner (lucide, button/inline kullanımı) ─────────────────────────

export function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

// ─── LoadingSpinner (CVA, standalone/page-level, SVG halka) ───────────────────

const spinnerVariants = cva('', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
      '2xl': 'h-16 w-16',
    },
    variant: {
      default: 'text-tulpar-blue',
      secondary: 'text-ash',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export interface LoadingSpinnerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  text?: string;
  centered?: boolean;
}

export const LoadingSpinner = React.forwardRef<
  HTMLDivElement,
  LoadingSpinnerProps
>(({ className, size, variant, text, centered = false, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="loading-spinner"
    className={cn(
      'inline-flex items-center gap-3',
      centered && 'w-full justify-center',
      className,
    )}
    {...props}
  >
    <div className={cn('relative', spinnerVariants({ size, variant }))}>
      {/* Glow ring */}
      <div className="absolute inset-0 animate-spin rounded-full bg-gradient-to-r from-current via-transparent to-current opacity-20" />
      {/* SVG arc */}
      <svg
        className="relative animate-spin"
        style={{
          animationDuration: '1.5s',
          animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
        }}
        viewBox="0 0 24 24"
        fill="none"
        role="status"
        aria-label={text ?? 'Loading'}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
          className="opacity-25"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="23.562"
          className="opacity-75"
          style={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
        />
      </svg>
    </div>
    {text && <span className="animate-pulse text-sm text-ash/70">{text}</span>}
  </div>
));
LoadingSpinner.displayName = 'LoadingSpinner';

// ─── LoadingDots (bouncing dots) ──────────────────────────────────────────────

const dotSizeMap: Record<NonNullable<LoadingSpinnerProps['size']>, string> = {
  xs: 'h-1 w-1',
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
  xl: 'h-3 w-3',
  '2xl': 'h-4 w-4',
};

const dotColorMap: Record<
  NonNullable<LoadingSpinnerProps['variant']>,
  string
> = {
  default: 'bg-tulpar-blue',
  secondary: 'bg-gunmetal',
  white: 'bg-white shadow-lg',
};

export const LoadingDots = React.forwardRef<
  HTMLDivElement,
  LoadingSpinnerProps
>(({ className, size = 'md', variant = 'default', text, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="loading-dots"
    className={cn('inline-flex items-center gap-3', className)}
    {...props}
  >
    <div className="flex space-x-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'transform-gpu rounded-full drop-shadow-sm',
            dotSizeMap[size ?? 'md'],
            dotColorMap[variant ?? 'default'],
          )}
          style={{
            animation: `modernBounce 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
    {text && <span className="text-sm text-ash/70">{text}</span>}
  </div>
));
LoadingDots.displayName = 'LoadingDots';

// ─── LoadingPulse (pulsing blob) ──────────────────────────────────────────────

const pulseSizeMap: Record<NonNullable<LoadingSpinnerProps['size']>, string> = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-20 w-20',
  '2xl': 'h-24 w-24',
};

const pulseColorMap: Record<
  NonNullable<LoadingSpinnerProps['variant']>,
  string
> = {
  default:
    'bg-gradient-to-br from-tulpar-blue/40 via-tulpar-blue/60 to-tulpar-blue/80',
  secondary:
    'bg-gradient-to-br from-gunmetal/40 via-gunmetal/60 to-gunmetal/80',
  white: 'bg-gradient-to-br from-white via-titanium/80 to-titanium',
};

const pulseHighlightSizeMap: Record<
  NonNullable<LoadingSpinnerProps['size']>,
  string
> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
  xl: 'h-5 w-5',
  '2xl': 'h-6 w-6',
};

export const LoadingPulse = React.forwardRef<
  HTMLDivElement,
  LoadingSpinnerProps
>(({ className, size = 'md', variant = 'default', text, ...props }, ref) => {
  const s = size ?? 'md';
  const v = variant ?? 'default';
  return (
    <div
      ref={ref}
      data-slot="loading-pulse"
      className={cn('inline-flex items-center gap-3', className)}
      {...props}
    >
      <div className="relative">
        {/* Blur glow */}
        <div
          className={cn(
            'absolute inset-0 rounded-full opacity-30 blur-sm',
            pulseSizeMap[s],
            pulseColorMap[v],
          )}
          style={{
            animation: 'modernPulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
          }}
        />
        {/* Main blob */}
        <div
          className={cn(
            'relative rounded-full shadow-lg',
            pulseSizeMap[s],
            pulseColorMap[v],
          )}
          style={{
            animation: 'modernPulse 2s cubic-bezier(0.4,0,0.6,1) infinite 0.3s',
            boxShadow:
              'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.1)',
          }}
        />
        {/* Highlight */}
        <div
          className={cn(
            'absolute left-1/4 top-1/4 rounded-full bg-white opacity-40',
            pulseHighlightSizeMap[s],
          )}
          style={{
            animation: 'modernPulse 2s cubic-bezier(0.4,0,0.6,1) infinite 0.1s',
          }}
        />
      </div>
      {text && <span className="text-sm text-ash/70">{text}</span>}
    </div>
  );
});
LoadingPulse.displayName = 'LoadingPulse';

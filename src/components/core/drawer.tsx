'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';
import { useMounted } from '@/hooks/use-mounted';
import { Button } from './button';

// ─── Composable Drawer (vaul-based, data-slot) ───────────────────────────────

export function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

export function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

export function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

export function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-void-black/80 backdrop-blur-xs',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  );
}

export function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          'group/drawer-content fixed z-50 flex h-auto flex-col border-gunmetal/80 bg-obsidian text-titanium shadow-2xl',
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-sm data-[vaul-drawer-direction=top]:border-b',
          'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-sm data-[vaul-drawer-direction=bottom]:border-t',
          'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm',
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
          className,
        )}
        {...props}
      >
        <div className="mx-auto mt-4 hidden h-1.5 w-12 shrink-0 rounded-full bg-gunmetal/60 group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

export function DrawerHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'flex flex-col gap-1 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left',
        className,
      )}
      {...props}
    />
  );
}

export function DrawerFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

export function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        'text-base font-semibold tracking-tight text-white',
        className,
      )}
      {...props}
    />
  );
}

export function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-sm text-ash/80', className)}
      {...props}
    />
  );
}

// ─── AnimatedDrawer (Framer Motion, programmatic API) ─────────────────────────

export interface AnimatedDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  placement?: 'right' | 'left' | 'top' | 'bottom';
  maskClosable?: boolean;
  showCloseButton?: boolean;
}

const animatedDrawerSizes = {
  sm: 'w-screen sm:w-96 sm:max-w-sm',
  md: 'w-screen sm:w-[28rem] sm:max-w-md',
  lg: 'w-screen sm:w-[36rem] sm:max-w-2xl',
  xl: 'w-screen sm:w-[42rem] sm:max-w-3xl',
};

function getPlacementClasses(
  placement: AnimatedDrawerProps['placement'],
  size: AnimatedDrawerProps['size'] = 'md',
) {
  const s = animatedDrawerSizes[size];
  switch (placement) {
    case 'left':
      return `top-0 bottom-0 left-0 right-0 sm:right-auto ${s}`;
    case 'top':
      return 'top-0 bottom-0 left-0 right-0 sm:bottom-auto h-screen sm:h-80';
    case 'bottom':
      return 'top-0 bottom-0 left-0 right-0 sm:top-auto h-screen sm:h-80';
    default: // right
      return `top-0 bottom-0 left-0 right-0 sm:left-auto ${s}`;
  }
}

function getAnimationVariants(placement: AnimatedDrawerProps['placement']) {
  switch (placement) {
    case 'left':
      return {
        initial: { opacity: 0, x: '-100%' },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: '-100%' },
      };
    case 'top':
      return {
        initial: { opacity: 0, y: '-100%' },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: '-100%' },
      };
    case 'bottom':
      return {
        initial: { opacity: 0, y: '100%' },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: '100%' },
      };
    default: // right
      return {
        initial: { opacity: 0, x: '100%' },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: '100%' },
      };
  }
}

export function AnimatedDrawer({
  open,
  onOpenChange,
  title,
  footer,
  children,
  className,
  size = 'md',
  placement = 'right',
  maskClosable = true,
  showCloseButton = true,
}: AnimatedDrawerProps) {
  const mounted = useMounted();

  // Body scroll lock
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // ESC key
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onOpenChange(false);
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  const content = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            data-slot="animated-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] hidden bg-black/50 backdrop-blur-sm sm:block"
            onClick={maskClosable ? () => onOpenChange(false) : undefined}
          />

          {/* Panel */}
          <motion.div
            data-slot="animated-drawer-content"
            {...getAnimationVariants(placement)}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            className={cn(
              'fixed z-[9999] flex flex-col border border-gunmetal/50 bg-void-black shadow-2xl',
              getPlacementClasses(placement, size),
              className,
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div
                data-slot="animated-drawer-header"
                className="flex items-center justify-between border-b border-gunmetal bg-obsidian p-4 sm:p-6"
              >
                {title && (
                  <p className="flex-1 truncate pr-4 text-base font-semibold text-titanium sm:text-lg">
                    {title}
                  </p>
                )}
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close"
                  >
                    <XIcon className="size-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                )}
              </div>
            )}

            {/* Body */}
            <div
              data-slot="animated-drawer-body"
              className="flex-1 overflow-y-auto p-4 sm:p-6"
            >
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div
                data-slot="animated-drawer-footer"
                className="border-t border-gunmetal/30 bg-gunmetal/10 p-4 sm:p-6"
              >
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return mounted ? createPortal(content, document.body) : null;
}

// ─── useDrawer hook ────────────────────────────────────────────────────────────

export function useDrawer() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = React.useCallback(() => setOpen(true), []);
  const closeDrawer = React.useCallback(() => setOpen(false), []);
  const toggleDrawer = React.useCallback(() => setOpen((prev) => !prev), []);
  return { open, openDrawer, closeDrawer, toggleDrawer, setOpen };
}

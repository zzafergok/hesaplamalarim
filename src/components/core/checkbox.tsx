'use client';

import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      'shadow-xs peer size-4 shrink-0 rounded-[4px] border border-gunmetal/80 bg-obsidian text-white outline-none transition-shadow',
      'hover:border-gunmetal hover:bg-gunmetal/20',
      'focus-visible:border-hesaplamalarim-blue focus-visible:ring-[3px] focus-visible:ring-hesaplamalarim-blue/20',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-alert-red aria-invalid:ring-alert-red/20',
      'data-[state=checked]:border-hesaplamalarim-blue data-[state=checked]:bg-hesaplamalarim-blue data-[state=checked]:text-white',
      'data-[state=indeterminate]:border-hesaplamalarim-blue data-[state=indeterminate]:bg-hesaplamalarim-blue data-[state=indeterminate]:text-white',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="grid place-content-center text-current transition-none"
    >
      <Check className="size-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

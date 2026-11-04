'use client';

import { CheckCircle2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/core/label';
import { cn } from '@/lib/utils';

export interface ChoiceCardOption {
  value: string;
  label: string;
  description: string;
  meta?: string;
  preview?: ReactNode;
}

interface ChoiceCardFieldProps {
  name: string;
  label: string;
  options: ChoiceCardOption[];
  description?: string;
  density?: 'default' | 'compact';
  disabled?: boolean;
  onValueChange?: (
    value: string,
    previousValue: string,
  ) => void | Promise<void>;
}

/** A compact, keyboard-accessible radio group presented as selectable cards. */
export function ChoiceCardField({
  name,
  label,
  options,
  description,
  density = 'default',
  disabled = false,
  onValueChange,
}: ChoiceCardFieldProps) {
  const { control, formState } = useFormContext();
  const isDisabled = disabled || formState.isSubmitting;
  const isCompact = density === 'compact';

  return (
    <fieldset className={cn(isCompact ? 'space-y-2' : 'space-y-2.5')}>
      <legend className="text-sm font-bold text-foreground">{label}</legend>
      {description && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className={cn(
              'grid sm:grid-cols-2',
              isCompact ? 'grid-cols-2 gap-2' : 'gap-3',
            )}
          >
            {options.map((option) => {
              const isSelected = field.value === option.value;
              const inputId = `${name}-${option.value}`;
              return (
                <Label
                  key={option.value}
                  htmlFor={inputId}
                  className={cn(
                    'group relative flex cursor-pointer border bg-background transition-colors focus-within:border-tulpar-blue focus-within:ring-2 focus-within:ring-tulpar-blue/50',
                    isCompact
                      ? 'min-h-20 items-center gap-3 p-3'
                      : 'min-h-28 flex-col justify-between p-4',
                    isSelected
                      ? 'border-tulpar-blue bg-tulpar-blue/10'
                      : 'border-border hover:border-muted-foreground hover:bg-muted/30',
                    isDisabled && 'cursor-not-allowed opacity-60',
                  )}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => {
                      const previousValue = String(field.value);
                      field.onChange(option.value);
                      void onValueChange?.(option.value, previousValue);
                    }}
                    className="sr-only"
                  />
                  {option.preview && (
                    <span
                      className={cn('block', isCompact ? 'shrink-0' : 'mb-3')}
                      aria-hidden="true"
                    >
                      {option.preview}
                    </span>
                  )}
                  <span className={cn('block', isCompact && 'min-w-0 flex-1')}>
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {option.label}
                      </span>
                      <CheckCircle2
                        aria-hidden="true"
                        className={cn(
                          'h-4 w-4 shrink-0 transition-opacity',
                          isSelected
                            ? 'text-tulpar-blue opacity-100'
                            : 'text-muted-foreground opacity-0 group-hover:opacity-50',
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        'mt-2 block text-xs leading-relaxed text-muted-foreground',
                        isCompact && 'mt-1 line-clamp-2 text-2xs',
                      )}
                    >
                      {option.description}
                    </span>
                    {option.meta && (
                      <span
                        className={cn(
                          'mt-2 block text-2xs font-bold',
                          isSelected
                            ? 'text-tulpar-blue'
                            : 'text-muted-foreground',
                        )}
                      >
                        {option.meta}
                      </span>
                    )}
                  </span>
                </Label>
              );
            })}
          </div>
        )}
      />
    </fieldset>
  );
}

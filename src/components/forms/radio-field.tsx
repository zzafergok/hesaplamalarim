'use client';

import { AlertCircle } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

import { Label } from '@/components/core/label';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

interface RadioFieldProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  description?: string;
  options: RadioOption[];
  orientation?: 'vertical' | 'horizontal';
}

export function RadioField({
  name,
  label,
  options,
  disabled,
  className,
  description,
  required = false,
  orientation = 'vertical',
}: RadioFieldProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const error = name.split('.').reduce<unknown>((obj, key) => {
    if (obj && typeof obj === 'object' && key in obj) {
      return (obj as Record<string, unknown>)[key];
    }
    return undefined;
  }, errors) as { message?: string } | undefined;

  const isDisabled = disabled || isSubmitting;

  return (
    <div className={cn('space-y-1.5 sm:space-y-2', className)}>
      <Label className="text-xs sm:text-sm">
        {label} {required && <span className="text-tulpar-blue">*</span>}
      </Label>
      {description && !error && (
        <p className="text-2xs text-ash/60 sm:text-xs">{description}</p>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className={cn(
              orientation === 'horizontal'
                ? 'flex flex-wrap gap-4'
                : 'space-y-2',
              error && 'border-red-500',
            )}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-start space-x-2 sm:space-x-3"
              >
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  disabled={option.disabled || isDisabled}
                  className="mt-0.5 h-4 w-4 text-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor={`${name}-${option.value}`}
                    className={cn(
                      'cursor-pointer text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm',
                    )}
                  >
                    {option.label}
                  </Label>
                  {option.description && (
                    <p className="text-2xs text-ash/60 sm:text-xs">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      />
      {error && (
        <p className="flex items-center gap-1 text-2xs text-alert-red sm:text-xs">
          <AlertCircle className="h-3 w-3" />
          {error.message}
        </p>
      )}
    </div>
  );
}

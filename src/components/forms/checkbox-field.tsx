'use client';

import { AlertCircle } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';
import type { ReactNode } from 'react';

import { Label } from '@/components/core/label';
import { Checkbox } from '@/components/core/checkbox';
import { cn } from '@/lib/utils';

interface CheckboxFieldProps {
  name: string;
  label: ReactNode;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getErrorMessage(errors: unknown, name: string): string | null {
  let current: unknown = errors;
  for (const key of name.split('.')) {
    if (!isRecord(current)) return null;
    current = current[key];
  }
  if (!isRecord(current) || typeof current.message !== 'string') return null;
  return current.message;
}

export function CheckboxField({
  name,
  label,
  disabled,
  className,
  description,
  required = false,
}: CheckboxFieldProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors, name);
  const isDisabled = disabled || isSubmitting;

  return (
    <div className={cn('space-y-1.5 sm:space-y-2', className)}>
      <div className="flex items-start space-x-2 sm:space-x-3">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isDisabled}
              className={cn(errorMessage && 'border-alert-red')}
            />
          )}
        />
        <div className="flex-1 space-y-1">
          <Label
            htmlFor={name}
            className={cn(
              'cursor-pointer text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm',
            )}
          >
            {label} {required && <span className="text-tulpar-blue">*</span>}
          </Label>
          {description && !errorMessage && (
            <p className="text-2xs text-ash/60 sm:text-xs">{description}</p>
          )}
          {errorMessage && (
            <p
              role="alert"
              className="flex items-center gap-1 text-2xs text-alert-red sm:text-xs"
            >
              <AlertCircle className="h-3 w-3" />
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { AlertCircle } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

import { Label } from '@/components/core/label';
import { ModernDatePicker } from '@/components/core/date-picker';
import { useCurrentLocale } from '@/components/providers/client-locale-provider';
import { cn } from '@/lib/utils';

interface DateFieldProps {
  name: string;
  label: string;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  description?: string;
  includeTime?: boolean;
  valueFormat?: 'date' | 'iso-date';
}

function toIsoDateValue(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function fromIsoDateValue(value: string): Date | null {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function getFieldErrorMessage(errors: unknown, name: string): string | null {
  let current: unknown = errors;
  for (const key of name.split('.')) {
    if (current === null || typeof current !== 'object' || !(key in current)) {
      return null;
    }
    current = Object.entries(current).find(
      ([candidate]) => candidate === key,
    )?.[1];
  }

  if (
    current !== null &&
    typeof current === 'object' &&
    'message' in current &&
    typeof current.message === 'string'
  ) {
    return current.message;
  }
  return null;
}

export function DateField({
  name,
  label,
  minDate,
  maxDate,
  disabled,
  className,
  placeholder,
  description,
  required = false,
  clearable = true,
  includeTime = false,
  valueFormat = 'date',
}: DateFieldProps) {
  const locale = useCurrentLocale();
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const errorMessage = getFieldErrorMessage(errors, name);
  const isDisabled = disabled || isSubmitting;

  return (
    <div className={cn('space-y-1.5 sm:space-y-2', className)}>
      <Label
        htmlFor={name}
        className="font-mono text-2xs uppercase tracking-wider text-ash"
      >
        {label} {required && <span className="text-tulpar-blue">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ModernDatePicker
            value={
              valueFormat === 'iso-date' && typeof field.value === 'string'
                ? fromIsoDateValue(field.value)
                : field.value instanceof Date
                  ? field.value
                  : null
            }
            onChange={(date) =>
              field.onChange(
                valueFormat === 'iso-date' && date
                  ? toIsoDateValue(date)
                  : date,
              )
            }
            placeholder={placeholder}
            disabled={isDisabled}
            minDate={minDate}
            maxDate={maxDate}
            clearable={clearable}
            includeTime={includeTime}
            locale={locale}
            error={errorMessage !== null}
            className="text-xs sm:text-sm"
          />
        )}
      />
      {description && !errorMessage && (
        <p className="text-2xs text-ash/60 sm:text-xs">{description}</p>
      )}
      {errorMessage && (
        <p className="flex items-center gap-1 text-2xs text-alert-red sm:text-xs">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </p>
      )}
    </div>
  );
}

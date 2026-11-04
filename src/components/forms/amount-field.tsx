'use client';

import { AlertCircle } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/components/core/input';
import { Label } from '@/components/core/label';
import { formatAmountInput } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface AmountFieldProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
}

export function AmountField({
  name,
  label,
  disabled,
  className,
  placeholder,
  description,
  required = false,
}: AmountFieldProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const error = errors[name];
  const errorMessage =
    typeof error?.message === 'string' ? error.message : undefined;

  return (
    <div className={cn('space-y-1.5 sm:space-y-2', className)}>
      <Label
        htmlFor={name}
        className="font-mono text-2xs uppercase tracking-wider text-ash"
      >
        {label} {required && <span className="text-tulpar-blue">*</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            id={name}
            type="text"
            inputMode="decimal"
            disabled={disabled || isSubmitting}
            placeholder={placeholder}
            value={
              field.value !== undefined && field.value !== null
                ? String(field.value)
                : ''
            }
            onChange={(event) =>
              field.onChange(formatAmountInput(event.target.value))
            }
            error={errorMessage}
            className={cn(
              'text-xs font-bold',
              errorMessage && 'border-alert-red/50',
            )}
          />
        )}
      />
      {description && !errorMessage && (
        <p className="font-mono text-2xs text-ash/60">{description}</p>
      )}
      {errorMessage && (
        <p className="flex items-center gap-1 font-mono text-2xs text-alert-red">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </p>
      )}
    </div>
  );
}

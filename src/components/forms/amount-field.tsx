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
        className="font-sans text-compact font-semibold tracking-tight text-titanium"
      >
        {label} {required && <span className="text-hesaplamalarim-blue">*</span>}
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
              'font-mono text-body-sm font-bold tabular-nums text-titanium',
              errorMessage && 'border-alert-red/60',
            )}
          />
        )}
      />
      {description && !errorMessage && (
        <p className="font-sans text-2xs font-normal italic text-ash">
          {description}
        </p>
      )}
      {errorMessage && (
        <p className="flex items-center gap-1 font-sans text-2xs font-medium italic text-alert-red">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </p>
      )}
    </div>
  );
}

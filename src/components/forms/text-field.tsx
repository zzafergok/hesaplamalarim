'use client';

import { AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/core/input';
import { Label } from '@/components/core/label';
import { cn } from '@/lib/utils';

interface TextFieldProps {
  name: string;
  label: string;
  pattern?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  hideLabel?: boolean;
  description?: string;
  placeholder?: string;
  autoComplete?: string;
  inputClassName?: string;
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'number';
}

export function TextField({
  name,
  label,
  pattern,
  disabled,
  maxLength,
  className,
  hideLabel,
  minLength,
  min,
  max,
  step,
  placeholder,
  description,
  autoComplete,
  inputClassName,
  type = 'text',
  required = false,
}: TextFieldProps) {
  const {
    register,
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
    <div
      className={cn(
        hideLabel ? 'space-y-0' : 'space-y-1.5 sm:space-y-2',
        className,
      )}
    >
      <Label
        htmlFor={name}
        className={cn(
          'font-sans text-compact font-semibold tracking-tight text-titanium',
          hideLabel && 'sr-only',
        )}
      >
        {label} {required && <span className="text-hesaplamalarim-blue">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        min={min}
        max={max}
        step={step ?? (type === 'number' ? 'any' : undefined)}
        placeholder={placeholder}
        disabled={isDisabled}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        error={error?.message}
        {...register(name, {
          valueAsNumber: type === 'number',
        })}
        className={cn(
          type === 'number'
            ? 'font-mono text-body-sm font-semibold tabular-nums text-titanium'
            : 'font-sans text-body-sm font-normal text-titanium',
          inputClassName,
        )}
      />
      {description && !error && (
        <p className="font-sans text-2xs font-normal italic text-ash">
          {description}
        </p>
      )}
      {error && (
        <p className="flex items-center gap-1 font-sans text-2xs font-medium italic text-alert-red">
          <AlertCircle className="h-3 w-3" />
          {error.message}
        </p>
      )}
    </div>
  );
}

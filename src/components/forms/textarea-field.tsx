'use client';

import { AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Label } from '@/components/core/label';
import { Textarea } from '@/components/core/textarea';
import { cn } from '@/lib/utils';

interface TextareaFieldProps {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
  description?: string;
  showCharCount?: boolean;
}

export function TextareaField({
  name,
  label,
  disabled,
  rows = 4,
  maxLength,
  className,
  placeholder,
  description,
  required = false,
  showCharCount = false,
}: TextareaFieldProps) {
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const error = name.split('.').reduce<unknown>((obj, key) => {
    if (obj && typeof obj === 'object' && key in obj) {
      return (obj as Record<string, unknown>)[key];
    }
    return undefined;
  }, errors) as { message?: string } | undefined;

  const fieldValue = watch(name) as string;

  const isDisabled = disabled || isSubmitting;
  const charCount = fieldValue?.length || 0;

  return (
    <div className={cn('space-y-1.5 sm:space-y-2', className)}>
      <div className="flex items-center justify-between">
        <Label
          htmlFor={name}
          className="font-mono text-2xs uppercase tracking-wider text-ash"
        >
          {label} {required && <span className="text-tulpar-blue">*</span>}
        </Label>
        {showCharCount && maxLength && (
          <span className="font-mono text-2xs text-ash/60">
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <Textarea
        id={name}
        placeholder={placeholder}
        disabled={isDisabled}
        rows={rows}
        maxLength={maxLength}
        {...register(name)}
        className={cn('resize-none text-xs', error && 'border-alert-red/50')}
      />
      {description && !error && (
        <p className="font-mono text-2xs text-ash/60">{description}</p>
      )}
      {error && (
        <p className="flex items-center gap-1 font-mono text-2xs text-alert-red">
          <AlertCircle className="h-3 w-3" />
          {error.message}
        </p>
      )}
    </div>
  );
}

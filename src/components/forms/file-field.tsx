'use client';

import { useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/core/button';
import { Label } from '@/components/core/label';
import { cn } from '@/lib/utils';

interface FileFieldProps {
  name: string;
  label: string;
  accept: string;
  buttonLabel: string;
  selectedLabel: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  description?: string;
}

function getErrorMessage(errors: unknown, name: string): string | null {
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

export function FileField({
  name,
  label,
  accept,
  buttonLabel,
  selectedLabel,
  required = false,
  disabled = false,
  className,
  description,
}: FileFieldProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const errorMessage = getErrorMessage(errors, name);
  const isFileValue = (value: unknown): value is File =>
    typeof File !== 'undefined' && value instanceof File;
  const inputReference = useRef<HTMLInputElement | null>(null);

  return (
    <div className={cn('space-y-2', className)}>
      <Label
        htmlFor={name}
        className="font-mono text-2xs uppercase tracking-wider text-ash"
      >
        {label} {required && <span className="text-tulpar-blue">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, ref, value } }) => {
          const describedBy = errorMessage
            ? `${name}-error`
            : description
              ? `${name}-help`
              : undefined;
          return (
            <div>
              <input
                key={isFileValue(value) ? value.name : 'empty'}
                ref={(element) => {
                  inputReference.current = element;
                  ref(element);
                }}
                id={name}
                name={name}
                type="file"
                accept={accept}
                disabled={disabled || isSubmitting}
                tabIndex={-1}
                hidden
                aria-hidden="true"
                onBlur={onBlur}
                onChange={(event) => onChange(event.target.files?.[0] ?? null)}
              />
              <Button
                type="button"
                variant="outline"
                disabled={disabled || isSubmitting}
                aria-label={`${label}: ${isFileValue(value) ? selectedLabel : buttonLabel}`}
                aria-controls={name}
                aria-describedby={describedBy}
                aria-invalid={errorMessage ? true : undefined}
                onClick={() => inputReference.current?.click()}
                className="h-11 w-full justify-start"
              >
                {isFileValue(value) ? selectedLabel : buttonLabel}
              </Button>
            </div>
          );
        }}
      />
      {description && !errorMessage && (
        <p id={`${name}-help`} className="font-mono text-2xs text-ash/60">
          {description}
        </p>
      )}
      {errorMessage && (
        <p
          id={`${name}-error`}
          className="flex items-center gap-1 font-mono text-2xs text-alert-red"
        >
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {errorMessage}
        </p>
      )}
    </div>
  );
}

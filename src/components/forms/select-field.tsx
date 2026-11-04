'use client';

import { AlertCircle } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from '@/components/core/select';
import { Label } from '@/components/core/label';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  swatchColor?: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  noneLabel?: string;
  allowNone?: boolean;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
}

export function SelectField({
  name,
  label,
  options,
  disabled,
  className,
  description,
  required = false,
  allowNone = false,
  noneLabel = 'None',
  placeholder = 'Seçiniz...',
}: SelectFieldProps) {
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
      <Label
        htmlFor={name}
        className="font-sans text-compact font-semibold tracking-tight text-titanium"
      >
        {label} {required && <span className="text-tulpar-blue">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedOption = options.find(
            (option) => option.value === String(field.value),
          );

          return (
            <Select
              value={
                field.value ? String(field.value) : allowNone ? 'none' : ''
              }
              onValueChange={(value) => {
                if (value === 'none' && allowNone) {
                  field.onChange(null);
                } else {
                  field.onChange(value);
                }
              }}
              disabled={isDisabled}
            >
              <SelectTrigger
                id={name}
                className={cn(
                  'font-sans text-body-sm font-medium text-titanium',
                  error && 'border-alert-red/60',
                )}
              >
                <div className="flex min-w-0 items-center gap-2">
                  {selectedOption?.swatchColor && (
                    <span
                      aria-hidden="true"
                      className="h-4 w-7 shrink-0 rounded-none border border-gunmetal"
                      style={{ backgroundColor: selectedOption.swatchColor }}
                    />
                  )}
                  <span className="truncate">
                    {selectedOption?.label ?? placeholder}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {allowNone && (
                  <SelectItem value="none" className="font-sans text-caption">
                    {noneLabel}
                  </SelectItem>
                )}
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className="font-sans text-caption"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      {option.swatchColor && (
                        <span
                          aria-hidden="true"
                          className="h-4 w-7 shrink-0 rounded-none border border-gunmetal"
                          style={{ backgroundColor: option.swatchColor }}
                        />
                      )}
                      <span className="truncate">{option.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
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

'use client';

import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/core/button';
import { LoadingSpinner } from '@/components/core/spinner';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children?: ReactNode;
  fullWidth?: boolean;
  disableIfNoChanges?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?:
    'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export function SubmitButton({
  icon,
  className,
  size = 'default',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  children = 'Submit',
  variant = 'default',
  disableIfNoChanges = false,
  loadingText = 'Submitting...',
}: SubmitButtonProps) {
  const {
    formState: { isSubmitting, isDirty },
  } = useFormContext();

  const loading = isSubmitting || isLoading;
  const isDisabled = disabled || loading || (disableIfNoChanges && !isDirty);

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      disabled={isDisabled}
      className={cn(fullWidth ? 'w-full' : 'w-full sm:w-auto', className)}
    >
      {isSubmitting ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          <span className="inline-flex items-center whitespace-nowrap text-xs sm:text-sm">
            {loadingText}
          </span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          <span className="inline-flex items-center whitespace-nowrap text-xs sm:text-sm">
            {children}
          </span>
        </>
      )}
    </Button>
  );
}

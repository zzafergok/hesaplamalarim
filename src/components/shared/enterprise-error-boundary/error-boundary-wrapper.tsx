'use client';

import type { ErrorInfo } from 'react';
import { EnterpriseErrorBoundary } from './enterprise-error-boundary';
import type { ErrorBoundaryWrapperProps } from './types';

export function ErrorBoundaryWrapper({
  children,
  level = 'component',
  organizationId,
  showErrorDetails = process.env.NODE_ENV === 'development',
}: ErrorBoundaryWrapperProps) {
  const handleError = (error: Error, errorInfo: ErrorInfo, errorId: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ErrorBoundaryWrapper-${errorId}]`, {
        error,
        errorInfo,
        organizationId,
      });
    }
  };

  return (
    <EnterpriseErrorBoundary
      fallbackLevel={level}
      organizationId={organizationId}
      onError={handleError}
      showErrorDetails={showErrorDetails}
      enableRetry={level !== 'page'}
    >
      {children}
    </EnterpriseErrorBoundary>
  );
}

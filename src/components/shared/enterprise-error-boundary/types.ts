import type { ReactNode, ErrorInfo } from 'react';

export interface ErrorBoundaryState {
  errorId: string;
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export interface EnterpriseErrorBoundaryProps {
  children: ReactNode;
  enableRetry?: boolean;
  organizationId?: string;
  showErrorDetails?: boolean;
  fallbackLevel?: 'page' | 'component' | 'section';
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
}

export interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  level?: 'page' | 'component' | 'section';
  organizationId?: string;
  showErrorDetails?: boolean;
}

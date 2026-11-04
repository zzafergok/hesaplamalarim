'use client';

import { Component, type ErrorInfo } from 'react';
import { ErrorFallbackView } from './error-fallback-view';
import type {
  EnterpriseErrorBoundaryProps,
  ErrorBoundaryState,
} from './types';

export class EnterpriseErrorBoundary extends Component<
  EnterpriseErrorBoundaryProps,
  ErrorBoundaryState
> {
  private retryCount = 0;
  private readonly maxRetries = 3;

  constructor(props: EnterpriseErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo, this.state.errorId);

    if (process.env.NODE_ENV === 'development') {
      console.error(`[EnterpriseErrorBoundary:${this.state.errorId}]`, {
        error,
        errorInfo,
        organizationId: this.props.organizationId,
      });
    }
  }

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: '',
      });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallbackView
          fallbackLevel={this.props.fallbackLevel ?? 'component'}
          showErrorDetails={this.props.showErrorDetails ?? false}
          enableRetry={this.props.enableRetry ?? true}
          retryCount={this.retryCount}
          maxRetries={this.maxRetries}
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorId={this.state.errorId}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

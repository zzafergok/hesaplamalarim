import { useAuthStore } from '@/stores/use-auth-store';
import {
  ApiError,
  ErrorInterceptor,
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from './types';

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    this.defaultTimeout = 15000;

    // Register built-in default interceptors
    this.registerDefaultInterceptors();
  }

  private registerDefaultInterceptors() {
    // 1. Default Request Interceptor: Inject Auth Token & Content-Type
    this.useRequestInterceptor((url, config) => {
      const headers = new Headers(config.headers);

      if (!headers.has('Content-Type') && !(config.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
      }

      if (!config.skipAuth) {
        const token = useAuthStore.getState().token;
        if (token && !headers.has('Authorization')) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }

      return {
        url,
        config: {
          ...config,
          headers,
        },
      };
    });

    // 2. Default Response Interceptor: Check HTTP status & 401 Auth handling
    this.useResponseInterceptor(async (response) => {
      if (response.status === 401) {
        // Automatic logout on 401 Unauthorized
        useAuthStore.getState().clearAuth();
      }

      if (!response.ok) {
        let errorData: unknown;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }
        throw new ApiError(
          response.status,
          response.statusText,
          errorData,
          typeof errorData === 'object' && errorData && 'message' in errorData
            ? String((errorData as { message: unknown }).message)
            : undefined,
        );
      }

      return response;
    });
  }

  // Add custom Request Interceptor
  public useRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor);
    return () => {
      this.requestInterceptors = this.requestInterceptors.filter(
        (i) => i !== interceptor,
      );
    };
  }

  // Add custom Response Interceptor
  public useResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor);
    return () => {
      this.responseInterceptors = this.responseInterceptors.filter(
        (i) => i !== interceptor,
      );
    };
  }

  // Add custom Error Interceptor
  public useErrorInterceptor(interceptor: ErrorInterceptor): () => void {
    this.errorInterceptors.push(interceptor);
    return () => {
      this.errorInterceptors = this.errorInterceptors.filter(
        (i) => i !== interceptor,
      );
    };
  }

  // Primary Request Method
  public async request<T>(
    endpoint: string,
    config: RequestConfig = {},
  ): Promise<T> {
    let fullUrl = endpoint.startsWith('http')
      ? endpoint
      : `${this.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

    // Handle Query Parameters
    if (config.params) {
      const searchParams = new URLSearchParams();
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        fullUrl += `${fullUrl.includes('?') ? '&' : '?'}${queryString}`;
      }
    }

    // Apply Request Interceptors
    let currentUrl = fullUrl;
    let currentConfig = { ...config };

    for (const interceptor of this.requestInterceptors) {
      const result = await interceptor(currentUrl, currentConfig);
      currentUrl = result.url;
      currentConfig = result.config;
    }

    // Abort Timeout Controller
    const controller = new AbortController();
    const timeout = currentConfig.timeout || this.defaultTimeout;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Build fetch options
    const { body, ...customOptions } = currentConfig;
    const fetchOptions: RequestInit = {
      ...customOptions,
      signal: controller.signal,
      body:
        body && typeof body === 'object' && !(body instanceof FormData)
          ? JSON.stringify(body)
          : (body as BodyInit),
    };

    try {
      let response = await fetch(currentUrl, fetchOptions);
      clearTimeout(timeoutId);

      // Apply Response Interceptors
      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response, currentConfig);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();
      return data as T;
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      let finalError: Error;
      if (error instanceof ApiError) {
        finalError = error;
      } else if (error instanceof Error && error.name === 'AbortError') {
        finalError = new ApiError(408, 'Request Timeout', null, 'Request timed out');
      } else {
        finalError =
          error instanceof Error
            ? error
            : new Error('An unexpected network error occurred');
      }

      // Execute Error Interceptors
      for (const interceptor of this.errorInterceptors) {
        await interceptor(finalError);
      }

      throw finalError;
    }
  }

  // Shortcut HTTP Methods
  public get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  public post<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  public put<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  public patch<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
  }

  public delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

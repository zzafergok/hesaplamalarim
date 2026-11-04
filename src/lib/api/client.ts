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

    this.registerDefaultInterceptors();
  }

  private registerDefaultInterceptors() {
    this.useRequestInterceptor((url, config) => {
      const headers = new Headers(config.headers);

      if (!headers.has('Content-Type') && !(config.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
      }

      return {
        url,
        config: {
          ...config,
          headers,
        },
      };
    });

    this.useResponseInterceptor(async (response) => {
      if (!response.ok) {
        let errorData: unknown;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }

        const message =
          typeof errorData === 'object' &&
          errorData !== null &&
          'message' in errorData
            ? String((errorData as { message: unknown }).message)
            : response.statusText || 'Bir hata oluştu';

        throw new ApiError(response.status, response.statusText, errorData, message);
      }
      return response;
    });
  }

  public useRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor);
    return () => {
      const index = this.requestInterceptors.indexOf(interceptor);
      if (index !== -1) this.requestInterceptors.splice(index, 1);
    };
  }

  public useResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor);
    return () => {
      const index = this.responseInterceptors.indexOf(interceptor);
      if (index !== -1) this.responseInterceptors.splice(index, 1);
    };
  }

  public useErrorInterceptor(interceptor: ErrorInterceptor): () => void {
    this.errorInterceptors.push(interceptor);
    return () => {
      const index = this.errorInterceptors.indexOf(interceptor);
      if (index !== -1) this.errorInterceptors.splice(index, 1);
    };
  }

  private async executeInterceptors(
    url: string,
    config: RequestConfig,
  ): Promise<{ url: string; config: RequestConfig }> {
    let currentUrl = url;
    let currentConfig = { ...config };

    for (const interceptor of this.requestInterceptors) {
      const result = await interceptor(currentUrl, currentConfig);
      currentUrl = result.url;
      currentConfig = result.config;
    }

    return { url: currentUrl, config: currentConfig };
  }

  public async request<T = unknown>(
    endpoint: string,
    config: RequestConfig = {},
  ): Promise<T> {
    const fullUrl = endpoint.startsWith('http')
      ? endpoint
      : `${this.baseUrl}${endpoint}`;

    try {
      const { url, config: finalConfig } = await this.executeInterceptors(
        fullUrl,
        config,
      );

      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        finalConfig.timeout || this.defaultTimeout,
      );

      const signal = finalConfig.signal || controller.signal;
      const { params: _params, skipAuth: _skipAuth, timeout: _timeout, body, ...fetchInit } = finalConfig;

      const preparedBody: BodyInit | null | undefined =
        body === undefined || body === null
          ? null
          : typeof body === 'string' || body instanceof FormData || body instanceof Blob
            ? (body as BodyInit)
            : JSON.stringify(body);

      let response = await fetch(url, {
        ...fetchInit,
        body: preparedBody,
        signal,
      });

      clearTimeout(timeoutId);

      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response, finalConfig);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      let finalError: Error =
        error instanceof Error ? error : new Error(String(error));

      if (finalError.name === 'AbortError') {
        finalError = new ApiError(408, 'Request Timeout', null, 'İstek zaman aşımına uğradı');
      }

      for (const interceptor of this.errorInterceptors) {
        await interceptor(finalError);
      }

      throw finalError;
    }
  }

  public get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  public post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  public put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  public delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

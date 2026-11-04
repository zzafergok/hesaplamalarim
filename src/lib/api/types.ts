export interface RequestConfig extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
  skipAuth?: boolean;
  timeout?: number;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export class ApiError extends Error {
  status: number;
  statusText: string;
  data: unknown;

  constructor(status: number, statusText: string, data: unknown, message?: string) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

export type RequestInterceptor = (
  url: string,
  config: RequestConfig,
) => { url: string; config: RequestConfig } | Promise<{ url: string; config: RequestConfig }>;

export type ResponseInterceptor = (
  response: Response,
  config: RequestConfig,
) => Response | Promise<Response>;

export type ErrorInterceptor = (error: ApiError | Error) => void | Promise<void>;

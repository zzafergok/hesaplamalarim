import { apiClient } from '@/lib/api';
import { AuthUser } from '@/stores/use-auth-store';

export interface LoginCredentials {
  email: string;
  password?: string;
  isAdmin?: boolean;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export interface UserResponse {
  user: AuthUser;
}

export const AUTH_CACHE_STRATEGY = {
  staleTime: 0, // Always fetch fresh auth data
  gcTime: 1000 * 60 * 5, // 5 minutes cache retention
};

export const authService = {
  login: (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>('/api/auth/login', credentials);
  },

  logout: (): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>('/api/auth/logout');
  },

  getCurrentUser: (): Promise<UserResponse> => {
    return apiClient.get<UserResponse>('/api/auth/me');
  },
};

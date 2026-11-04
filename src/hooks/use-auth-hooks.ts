import { useQueryClient } from '@tanstack/react-query';
import { useApiMutation, useApiQuery } from './use-api-query';
import {
  AUTH_CACHE_STRATEGY,
  authService,
  LoginCredentials,
  LoginResponse,
  UserResponse,
} from '@/services/auth-service';
import { useAuthStore } from '@/stores/use-auth-store';

export const AUTH_QUERY_KEY = ['auth', 'current-user'] as const;

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useApiMutation<LoginResponse, LoginCredentials>(
    (credentials) => authService.login(credentials),
    {
      onSuccess: (data) => {
        setAuth(data.user, data.token);
        queryClient.setQueryData(AUTH_QUERY_KEY, { user: data.user });
      },
    },
  );
}

export function useLogoutMutation() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useApiMutation<{ message: string }, void>(
    () => authService.logout(),
    {
      onSettled: () => {
        clearAuth();
        queryClient.setQueryData(AUTH_QUERY_KEY, null);
        queryClient.invalidateQueries();
      },
    },
  );
}

export function useCurrentUserQuery() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.token);

  return useApiQuery<UserResponse>(
    AUTH_QUERY_KEY,
    '/api/auth/me',
    { skipAuth: !token },
    {
      ...AUTH_CACHE_STRATEGY,
      enabled: Boolean(token),
      select: (data) => {
        if (data?.user && token) {
          setAuth(data.user, token);
        }
        return data;
      },
    },
  );
}

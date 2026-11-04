import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from '@tanstack/react-query';
import { apiClient, ApiError, RequestConfig } from '@/lib/api';

export function useApiQuery<TData = unknown, TError = ApiError>(
  queryKey: QueryKey,
  endpoint: string,
  config?: RequestConfig,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: () => apiClient.get<TData>(endpoint, config),
    ...options,
  });
}

export function useApiMutation<
  TData = unknown,
  TVariables = unknown,
  TError = ApiError,
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables>,
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
}

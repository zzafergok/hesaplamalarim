import { useApiQuery } from '@/hooks/use-api-query';
import { apiClient } from '@/lib/api';

/**
 * Service-level Cache Strategies Configuration
 * Define explicit caching behavior per service/domain instead of global defaults.
 */
export const CACHE_STRATEGIES = {
  REALTIME: { staleTime: 0, gcTime: 0 }, // Always fetch fresh, no caching
  SHORT: { staleTime: 1000 * 30, gcTime: 1000 * 60 * 5 }, // 30s cache
  MEDIUM: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 15 }, // 5m cache
  LONG: { staleTime: 1000 * 60 * 60, gcTime: 1000 * 60 * 60 * 24 }, // 1h cache (e.g., lookup data)
} as const;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Service API Methods
export const userService = {
  getProfile: () => apiClient.get<UserProfile>('/users/me'),
  getLookupCountries: () => apiClient.get<string[]>('/lookups/countries'),
};

// Custom Feature Query Hooks with explicit service-side cache strategies
export function useUserProfileQuery() {
  return useApiQuery<UserProfile>(
    ['user', 'profile'],
    '/users/me',
    {},
    {
      ...CACHE_STRATEGIES.REALTIME, // Explicitly no cache / always fresh
    },
  );
}

export function useCountryLookupsQuery() {
  return useApiQuery<string[]>(
    ['lookups', 'countries'],
    '/lookups/countries',
    {},
    {
      ...CACHE_STRATEGIES.LONG, // Explicit 1-hour cache for static reference data
    },
  );
}

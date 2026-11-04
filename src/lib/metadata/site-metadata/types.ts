import type { Locale } from '@/i18n/routing';

export type RouteRobots = {
  index: boolean;
  follow: boolean;
};

export type RouteSection = 'public' | 'auth' | 'admin';

export type MetadataRouteId =
  | 'publicHome'
  | 'publicCulture'
  | 'publicLogin'
  | 'authHome'
  | 'authWorkspace'
  | 'authSettings'
  | 'adminLogin'
  | 'adminOverview'
  | 'adminUsers'
  | 'adminSettings';

export type LocalizedRouteMetadata = {
  title: string;
  description: string;
  aiPurpose: string;
};

export type RouteMetadataDescriptor = {
  path: string;
  section: RouteSection;
  robots: RouteRobots;
  locale: Record<Locale, LocalizedRouteMetadata>;
};

export type RouteMetadataInput = {
  path: string;
  section?: RouteSection;
  robots?: RouteRobots;
  locale?: Partial<Record<Locale, Partial<LocalizedRouteMetadata>>>;
  title?: string;
  description?: string;
  aiPurpose?: string;
};

export type DynamicRouteMetadataInput = RouteMetadataInput & {
  canonicalPath?: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

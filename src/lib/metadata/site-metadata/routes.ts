import { enRouteMetadata, trRouteMetadata } from './dictionaries';
import type { MetadataRouteId, RouteMetadataDescriptor } from './types';

export const routeMetadata: Record<MetadataRouteId, RouteMetadataDescriptor> = {
  publicHome: {
    path: '/',
    section: 'public',
    robots: { index: true, follow: true },
    locale: {
      en: enRouteMetadata.publicHome,
      tr: trRouteMetadata.publicHome,
    },
  },
  hesaplamalar: {
    path: '/hesaplamalar',
    section: 'public',
    robots: { index: true, follow: true },
    locale: {
      en: enRouteMetadata.hesaplamalar,
      tr: trRouteMetadata.hesaplamalar,
    },
  },
};

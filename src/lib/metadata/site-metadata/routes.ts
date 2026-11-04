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
  publicCulture: {
    path: '/culture',
    section: 'public',
    robots: { index: true, follow: true },
    locale: {
      en: enRouteMetadata.publicCulture,
      tr: trRouteMetadata.publicCulture,
    },
  },
  publicLogin: {
    path: '/login',
    section: 'public',
    robots: { index: false, follow: false },
    locale: {
      en: enRouteMetadata.publicLogin,
      tr: trRouteMetadata.publicLogin,
    },
  },
  authHome: {
    path: '/home',
    section: 'auth',
    robots: { index: false, follow: false },
    locale: {
      en: enRouteMetadata.authHome,
      tr: trRouteMetadata.authHome,
    },
  },
  authWorkspace: {
    path: '/workspace',
    section: 'auth',
    robots: { index: false, follow: false },
    locale: {
      en: enRouteMetadata.authWorkspace,
      tr: trRouteMetadata.authWorkspace,
    },
  },
  authSettings: {
    path: '/settings',
    section: 'auth',
    robots: { index: false, follow: false },
    locale: {
      en: enRouteMetadata.authSettings,
      tr: trRouteMetadata.authSettings,
    },
  },
  adminLogin: {
    path: '/admin/login',
    section: 'admin',
    robots: { index: false, follow: false },
    locale: {
      en: enRouteMetadata.adminLogin,
      tr: trRouteMetadata.adminLogin,
    },
  },
  adminOverview: {
    path: '/admin',
    section: 'admin',
    robots: { index: false, follow: false },
    locale: {
      en: enRouteMetadata.adminOverview,
      tr: trRouteMetadata.adminOverview,
    },
  },
  adminUsers: {
    path: '/admin/users',
    section: 'admin',
    robots: { index: false, follow: false },
    locale: {
      en: enRouteMetadata.adminUsers,
      tr: trRouteMetadata.adminUsers,
    },
  },
  adminSettings: {
    path: '/admin/settings',
    section: 'admin',
    robots: { index: false, follow: false },
    locale: {
      en: enRouteMetadata.adminSettings,
      tr: trRouteMetadata.adminSettings,
    },
  },
};

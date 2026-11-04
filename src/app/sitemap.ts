import type { MetadataRoute } from 'next';

import {
  getIndexableRoutes,
  siteMetadata,
} from '@/lib/metadata/site-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexableRoutes().map((route) => ({
    url: new URL(route.path, siteMetadata.url).toString(),
    lastModified: new Date(),
    changeFrequency: route.path === '/' ? 'weekly' : 'monthly',
    priority: route.path === '/' ? 1 : 0.5,
  }));
}

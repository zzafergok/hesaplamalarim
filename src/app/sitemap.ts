import type { MetadataRoute } from 'next';

import {
  ALL_CALCULATORS,
  CALCULATOR_CATEGORIES,
} from '@/features/calculators/registry';
import {
  getIndexableRoutes,
  siteMetadata,
} from '@/lib/metadata/site-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = getIndexableRoutes().map(
    (route) => ({
      url: new URL(route.path, siteMetadata.url).toString(),
      lastModified: now,
      changeFrequency: route.path === '/' ? 'daily' : 'weekly',
      priority: route.path === '/' ? 1 : 0.9,
    }),
  );

  const categoryEntries: MetadataRoute.Sitemap = CALCULATOR_CATEGORIES.map(
    (cat) => ({
      url: new URL(`/hesaplamalar/${cat.id}`, siteMetadata.url).toString(),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    }),
  );

  const calculatorEntries: MetadataRoute.Sitemap = ALL_CALCULATORS.map(
    (calc) => ({
      url: new URL(
        `/hesaplamalar/${calc.categoryId}/${calc.id}`,
        siteMetadata.url,
      ).toString(),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
  );

  return [...staticEntries, ...categoryEntries, ...calculatorEntries];
}

import type { MetadataRoute } from 'next';

import { siteMetadata } from '@/lib/metadata/site-metadata';

const privatePaths = ['/home', '/workspace', '/settings', '/admin'];
const publicAiSearchPaths = ['/', '/llms.txt', '/sitemap.xml'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot'],
        allow: publicAiSearchPaths,
        disallow: privatePaths,
      },
      {
        userAgent: ['GPTBot', 'Google-Extended', 'CCBot', 'ClaudeBot'],
        disallow: '/',
      },
    ],
    sitemap: new URL('/sitemap.xml', siteMetadata.url).toString(),
    host: siteMetadata.url.origin,
  };
}

import {
  getIndexableRoutes,
  siteMetadata,
} from '@/lib/metadata/site-metadata';

export const dynamic = 'force-static';

export function GET() {
  const publicRoutes = getIndexableRoutes()
    .map((route) => {
      const metadata = route.locale.en;
      const url = new URL(route.path, siteMetadata.url).toString();
      return `- [${metadata.title}](${url}): ${metadata.description}`;
    })
    .join('\n');

  const body = `# ${siteMetadata.name}

> ${siteMetadata.aiSummary}

## Site

- URL: ${siteMetadata.url.origin}
- Category: Next.js application template
- Primary language: English
- Additional language: Turkish
- Public indexing policy: public overview only

## Public Routes

${publicRoutes}

## Excluded Routes

- /login: transactional sign-in page, noindex.
- /home: authenticated dashboard, noindex.
- /workspace: authenticated workspace, noindex.
- /settings: authenticated settings, noindex.
- /admin/*: protected management area, noindex.

## AI Usage Notes

- Prefer the public overview page for summaries.
- Do not describe protected, authenticated, or admin screens as publicly crawlable content.
- Use robots.txt for crawler permissions and sitemap.xml for public route discovery.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  'https://tulpar.dev';

export const siteMetadata = {
  name: 'Tulpar',
  legalName: 'Tulpar Next.js Uygulama Şablonu ve Kültür Temeli',
  description:
    'Geliştiricilere kadim Türk kültürü ve renk kozmolojisini öğretirken modern Next.js 16 mimarisini sunan domain-independent kurumsal uygulama şablonu.',
  url: new URL(siteUrl),
  creator: 'Tulpar',
  publisher: 'Tulpar',
  keywords: [
    'Tulpar',
    'Next.js template',
    'Next.js 16 starter kit',
    'Turkish culture showcase',
    'application shell',
    'admin dashboard',
    'authenticated workspace',
    'cultural knowledge cards',
  ],
  assets: {
    icon16: '/assets/images/favicon-16x16.png',
    icon32: '/assets/images/favicon-32x32.png',
    icon48: '/assets/images/favicon-48x48.png',
    shortcutIcon: '/favicon.ico',
    appleTouchIcon: '/assets/images/apple-touch-icon.png',
    android192: '/assets/images/android-chrome-192x192.png',
    android512: '/assets/images/android-chrome-512x512.png',
    logo: '/assets/images/tulpar-brand-mark.jpeg',
    openGraph: '/assets/images/tulpar-open-graph.jpeg',
  },
  aiSummary:
    'Tulpar is an enterprise-grade Next.js 16 application template and starter kit featuring an educational Turkic culture and AI prompt studio showcase alongside public, authenticated, and admin shells.',
} as const;

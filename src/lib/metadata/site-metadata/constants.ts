const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  'https://hesaplamalarim.dev';

export const siteMetadata = {
  name: 'Hesaplamalarım',
  legalName: 'Hesaplamalarım - Çevrimiçi Finans, Vergi ve Tazminat Hesaplama Platformu',
  description:
    '2026 yılı güncel yasal mevzuatına uygun kıdem tazminatı, ihbar tazminatı, brüt-net maaş ve bordro hesaplama araçları.',
  url: new URL(siteUrl),
  creator: 'Hesaplamalarım',
  publisher: 'Hesaplamalarım',
  keywords: [
    'Hesaplamalarım',
    'kıdem tazminatı hesaplama',
    'ihbar tazminatı hesaplama',
    'brütten nete maaş',
    'netten brüte maaş',
    'maaş bordrosu hesaplama',
    '2026 vergi dilimleri',
    'çevrimiçi hesaplama araçları',
  ],
  assets: {
    icon16: '/assets/images/favicon-16x16.png',
    icon32: '/assets/images/favicon-32x32.png',
    icon48: '/assets/images/favicon-48x48.png',
    shortcutIcon: '/favicon.ico',
    appleTouchIcon: '/assets/images/apple-touch-icon.png',
    android192: '/assets/images/android-chrome-192x192.png',
    android512: '/assets/images/android-chrome-512x512.png',
    logo: '/assets/images/hesaplamalarim-brand-mark.jpeg',
    openGraph: '/assets/images/hesaplamalarim-open-graph.jpeg',
  },
  aiSummary:
    'Hesaplamalarım is an online calculator suite offering up-to-date 2026 severance pay, notice indemnity, and salary/payroll calculations.',
} as const;

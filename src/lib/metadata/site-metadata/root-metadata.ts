import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';
import { siteMetadata } from './constants';
import { absoluteUrl } from './url-utils';

export function buildRootMetadata(
  locale: Locale = routing.defaultLocale,
): Metadata {
  const title =
    locale === 'tr'
      ? 'Tulpar | Next.js Uygulama Şablonu & Türk Kültür Atlası'
      : 'Tulpar | Next.js Application Template & Culture Atlas';

  return {
    metadataBase: siteMetadata.url,
    applicationName: siteMetadata.name,
    title: {
      default: title,
      template: `%s | ${siteMetadata.name}`,
    },
    description: siteMetadata.description,
    keywords: [...siteMetadata.keywords],
    authors: [{ name: siteMetadata.creator, url: siteMetadata.url }],
    creator: siteMetadata.creator,
    publisher: siteMetadata.publisher,
    category: 'technology',
    classification: 'application template',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        {
          url: siteMetadata.assets.icon16,
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: siteMetadata.assets.icon32,
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: siteMetadata.assets.icon48,
          sizes: '48x48',
          type: 'image/png',
        },
      ],
      shortcut: [
        {
          url: siteMetadata.assets.shortcutIcon,
          sizes: '48x48',
          type: 'image/x-icon',
        },
      ],
      apple: [
        {
          url: siteMetadata.assets.appleTouchIcon,
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: siteMetadata.assets.icon48,
          color: '#5d5dff',
        },
      ],
    },
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      siteName: siteMetadata.name,
      title,
      description: siteMetadata.description,
      url: '/',
      images: [
        {
          url: siteMetadata.assets.openGraph,
          width: 1024,
          height: 1024,
          alt: `${siteMetadata.name} application template brand symbol`,
        },
      ],
      locale,
      alternateLocale: routing.locales.filter((item) => item !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: siteMetadata.description,
      images: [siteMetadata.assets.openGraph],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    other: {
      'ai:site_name': siteMetadata.name,
      'ai:summary': siteMetadata.aiSummary,
      'ai:llms-txt': absoluteUrl('/llms.txt'),
    },
  };
}

import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';
import { siteMetadata } from './constants';
import { routeMetadata } from './routes';
import type {
  DynamicRouteMetadataInput,
  MetadataRouteId,
  RouteMetadataDescriptor,
  RouteMetadataInput,
} from './types';
import {
  absoluteUrl,
  humanizePath,
  inferRouteRobots,
  inferRouteSection,
  isMetadataRouteId,
} from './url-utils';

export function toRouteDescriptor(
  input: RouteMetadataInput,
): RouteMetadataDescriptor {
  const section = input.section ?? inferRouteSection(input.path);
  const robots = input.robots ?? inferRouteRobots(input.path, section);
  const fallbackTitle = input.title ?? humanizePath(input.path);
  const fallbackDescription =
    input.description ??
    `${fallbackTitle} screen in the ${siteMetadata.name} application foundation.`;
  const fallbackAiPurpose =
    input.aiPurpose ??
    `${fallbackTitle} route generated from path-level metadata defaults.`;

  return {
    path: input.path,
    section,
    robots,
    locale: {
      en: {
        title: input.locale?.en?.title ?? fallbackTitle,
        description: input.locale?.en?.description ?? fallbackDescription,
        aiPurpose: input.locale?.en?.aiPurpose ?? fallbackAiPurpose,
      },
      tr: {
        title: input.locale?.tr?.title ?? fallbackTitle,
        description: input.locale?.tr?.description ?? fallbackDescription,
        aiPurpose: input.locale?.tr?.aiPurpose ?? fallbackAiPurpose,
      },
    },
  };
}

export function resolveRouteDescriptor(
  route: MetadataRouteId | RouteMetadataInput,
) {
  return isMetadataRouteId(route)
    ? routeMetadata[route]
    : toRouteDescriptor(route);
}

export function buildPageMetadata(
  route: MetadataRouteId | RouteMetadataInput,
  locale: Locale = routing.defaultLocale,
): Metadata {
  const descriptor = resolveRouteDescriptor(route);
  const localized = descriptor.locale[locale];
  const url = absoluteUrl(descriptor.path);
  const routeId = isMetadataRouteId(route) ? route : descriptor.path;

  return {
    title: localized.title,
    description: localized.description,
    alternates: {
      canonical: descriptor.path,
    },
    openGraph: {
      type: 'website',
      siteName: siteMetadata.name,
      title: localized.title,
      description: localized.description,
      url,
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
      title: localized.title,
      description: localized.description,
      images: [siteMetadata.assets.openGraph],
    },
    robots: {
      index: descriptor.robots.index,
      follow: descriptor.robots.follow,
      nocache: !descriptor.robots.index,
      googleBot: {
        index: descriptor.robots.index,
        follow: descriptor.robots.follow,
        noimageindex: !descriptor.robots.index,
        'max-image-preview': descriptor.robots.index ? 'large' : 'none',
        'max-snippet': descriptor.robots.index ? -1 : 0,
        'max-video-preview': descriptor.robots.index ? -1 : 0,
      },
    },
    other: {
      'ai:route_id': routeId,
      'ai:section': descriptor.section,
      'ai:purpose': localized.aiPurpose,
      'ai:indexable': String(descriptor.robots.index),
    },
  };
}

export function buildDynamicPageMetadata(
  input: DynamicRouteMetadataInput,
  locale: Locale = routing.defaultLocale,
): Metadata {
  const descriptor = toRouteDescriptor({
    ...input,
    path: input.canonicalPath ?? input.path,
  });
  const metadata = buildPageMetadata(descriptor, locale);
  const imageUrl = input.image ? absoluteUrl(input.image) : undefined;

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: input.publishedTime || input.modifiedTime ? 'article' : 'website',
      images: imageUrl ? [{ url: imageUrl }] : metadata.openGraph?.images,
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
    },
  };
}

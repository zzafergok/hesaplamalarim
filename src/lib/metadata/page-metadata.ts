import type { Metadata } from 'next';

import { getCurrentLocale } from '@/lib/i18n/server-locale';
import {
  buildDynamicPageMetadata,
  buildPageMetadata,
  type DynamicRouteMetadataInput,
  type MetadataRouteId,
  type RouteMetadataInput,
} from './site-metadata';
import type { Locale } from '@/i18n/routing';

export function createStaticMetadata(
  route: MetadataRouteId | RouteMetadataInput,
) {
  return async function generateStaticMetadata(): Promise<Metadata> {
    const locale = await getCurrentLocale();
    return buildPageMetadata(route, locale);
  };
}

export function createDynamicMetadata<TParams extends Record<string, string>>(
  resolveInput: (context: {
    params: TParams;
    locale: Locale;
  }) => Promise<DynamicRouteMetadataInput> | DynamicRouteMetadataInput,
) {
  return async function generateDynamicMetadata({
    params,
  }: {
    params: Promise<TParams> | TParams;
  }): Promise<Metadata> {
    const locale = await getCurrentLocale();
    const resolvedParams = await params;
    const input = await resolveInput({ params: resolvedParams, locale });
    return buildDynamicPageMetadata(input, locale);
  };
}

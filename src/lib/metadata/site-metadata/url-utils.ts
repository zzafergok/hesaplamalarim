import { siteMetadata } from './constants';
import { routeMetadata } from './routes';
import type {
  MetadataRouteId,
  RouteMetadataInput,
  RouteRobots,
  RouteSection,
} from './types';

export function absoluteUrl(path: string): string {
  return new URL(path, siteMetadata.url).toString();
}

export function isMetadataRouteId(
  route: MetadataRouteId | RouteMetadataInput,
): route is MetadataRouteId {
  return typeof route === 'string';
}

export function humanizePath(path: string): string {
  const cleanPath = path.split('?')[0]?.replace(/^\/+|\/+$/g, '') ?? '';
  const lastSegment = cleanPath.split('/').filter(Boolean).at(-1);

  if (!lastSegment) return siteMetadata.name;

  return lastSegment
    .replace(/^\[+|\]+$/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function inferRouteSection(path: string): RouteSection {
  if (path === '/admin' || path.startsWith('/admin/')) return 'admin';
  if (path === '/home' || path === '/workspace' || path === '/settings') {
    return 'auth';
  }
  return 'public';
}

export function inferRouteRobots(path: string, section: RouteSection): RouteRobots {
  if (section !== 'public') return { index: false, follow: false };
  if (path === '/login' || path.endsWith('/login')) {
    return { index: false, follow: false };
  }
  return { index: true, follow: true };
}

export function getRouteMetadataDescriptor(routeId: MetadataRouteId) {
  return routeMetadata[routeId];
}

export function getIndexableRoutes() {
  return Object.values(routeMetadata).filter((route) => route.robots.index);
}

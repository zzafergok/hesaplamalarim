import type { LocalizedRouteMetadata, MetadataRouteId } from '../types';
import enJson from './en.json';
import trJson from './tr.json';

export const trRouteMetadata = trJson as Record<
  MetadataRouteId,
  LocalizedRouteMetadata
>;
export const enRouteMetadata = enJson as Record<
  MetadataRouteId,
  LocalizedRouteMetadata
>;

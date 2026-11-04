'use client';

import { StandardCardGrid } from './standard-card-grid';
import { StandardCardList } from './standard-card-list';
import type { StandardCardProps } from './types';

export function StandardCard({ viewMode, ...props }: StandardCardProps) {
  if (viewMode === 'grid') {
    return <StandardCardGrid {...props} />;
  }

  return <StandardCardList {...props} />;
}

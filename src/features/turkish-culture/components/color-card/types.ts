import type { TurkishCulturalColor } from '@/constants/turkish-culture';

export interface ColorCardProps {
  color: TurkishCulturalColor;
  onInspect: (color: TurkishCulturalColor) => void;
  onSelectForStudio?: (color: TurkishCulturalColor) => void;
  isSelectedInStudio?: boolean;
}

export const DIRECTION_LABELS: Record<string, { label: string; element: string }> = {
  east: { label: 'Doğu', element: 'Gök / Ağaç' },
  west: { label: 'Batı', element: 'Ak / Demir' },
  south: { label: 'Güney', element: 'Kızıl / Ateş' },
  north: { label: 'Kuzey', element: 'Kara / Su' },
  center: { label: 'Merkez', element: 'Sarı / Toprak' },
};

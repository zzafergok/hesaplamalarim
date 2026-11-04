import type { LucideIcon } from 'lucide-react';
import type { TurkishCulturalFigure } from '@/constants/turkish-culture';

export interface FigureCardProps {
  figure: TurkishCulturalFigure;
  onInspect: (figure: TurkishCulturalFigure) => void;
  onSelectForStudio?: (figure: TurkishCulturalFigure) => void;
  isSelectedInStudio?: boolean;
}

export interface CategoryVisualConfig {
  icon: LucideIcon;
  label: string;
  accentColor: string;
  topAccentBg: string;
}

export interface ImportanceVisualConfig {
  label: string;
  badgeStyle: string;
}

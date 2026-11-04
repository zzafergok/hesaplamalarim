import type {
  CulturalCategory,
  ImportanceLevel,
  TurkishCulturalColor,
  TurkishCulturalFigure,
  TurkishCulturalItem,
} from '@/constants/turkish-culture';

export type ActiveCategoryFilter = CulturalCategory | 'all';

export interface CultureFilterState {
  searchQuery: string;
  category: ActiveCategoryFilter;
  importance: ImportanceLevel | 'all';
  direction: string;
}

export type ArtStyleOption =
  | 'iznik_tile'
  | 'tezhip_gold'
  | 'kilim_woven'
  | 'miniature'
  | 'cinematic_3d'
  | 'oil_painting';

export interface ArtStyleConfig {
  id: ArtStyleOption;
  label: string;
  description: string;
  promptSuffix: string;
}

export interface PromptStudioSelection {
  selectedColorId?: string;
  selectedFigureId?: string;
  artStyle: ArtStyleOption;
}

export interface TurkishCultureShowcaseProps {
  initialCategory?: ActiveCategoryFilter;
  className?: string;
  compactMode?: boolean;
}

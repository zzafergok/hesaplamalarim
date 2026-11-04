import { TURKISH_CULTURE_COLORS } from './colors';
import { COSMOLOGICAL_DIRECTIONS } from './cosmology-directions';
import { TURKISH_CULTURE_NATURE_FIGURES } from './nature-figures';
import { TURKISH_CULTURE_ANIMAL_FIGURES } from './animal-figures';
import { TURKISH_CULTURE_MYTHOLOGY_FIGURES } from './mythology-figures';
import { TURKISH_CULTURE_CELESTIAL_FIGURES } from './celestial-figures';
import type {
  CulturalCategory,
  CulturalStatistics,
  TurkishCulturalColor,
  TurkishCulturalFigure,
  TurkishCulturalItem,
} from './types';

export * from './types';
export * from './cosmology-directions';
export * from './colors';
export * from './nature-figures';
export * from './animal-figures';
export * from './mythology-figures';
export * from './celestial-figures';

export const TURKISH_CULTURE_FIGURES: TurkishCulturalFigure[] = [
  ...TURKISH_CULTURE_NATURE_FIGURES,
  ...TURKISH_CULTURE_ANIMAL_FIGURES,
  ...TURKISH_CULTURE_MYTHOLOGY_FIGURES,
  ...TURKISH_CULTURE_CELESTIAL_FIGURES,
];

export const ALL_TURKISH_CULTURE_ITEMS: TurkishCulturalItem[] = [
  ...TURKISH_CULTURE_COLORS,
  ...TURKISH_CULTURE_FIGURES,
];

export function getCulturalStatistics(): CulturalStatistics {
  const totalColors = TURKISH_CULTURE_COLORS.length;
  const totalFigures = TURKISH_CULTURE_FIGURES.length;
  const totalMythological = TURKISH_CULTURE_MYTHOLOGY_FIGURES.length;
  const totalCelestial = TURKISH_CULTURE_CELESTIAL_FIGURES.length;

  const veryHighColorCount = TURKISH_CULTURE_COLORS.filter(
    (c) => c.cosmologicalDirection !== undefined,
  ).length;
  const veryHighFigureCount = TURKISH_CULTURE_FIGURES.filter(
    (f) => f.importance === 'very_high',
  ).length;

  return {
    totalColors,
    totalFigures,
    totalMythological,
    totalCelestial,
    totalVeryHighImportance: veryHighColorCount + veryHighFigureCount,
  };
}

export function findCulturalItemById(id: string): TurkishCulturalItem | undefined {
  return ALL_TURKISH_CULTURE_ITEMS.find((item) => item.id === id);
}

export function filterCulturalItems(params: {
  searchQuery?: string;
  category?: CulturalCategory | 'all';
  importance?: string;
  direction?: string;
}): TurkishCulturalItem[] {
  const query = params.searchQuery?.trim().toLowerCase() ?? '';
  const category = params.category ?? 'all';
  const importance = params.importance;
  const direction = params.direction;

  let items = ALL_TURKISH_CULTURE_ITEMS;

  if (category !== 'all') {
    items = items.filter((item) => item.category === category);
  }

  if (direction && direction !== 'all') {
    items = items.filter(
      (item) =>
        'cosmologicalDirection' in item &&
        item.cosmologicalDirection === direction,
    );
  }

  if (importance && importance !== 'all') {
    items = items.filter(
      (item) => 'importance' in item && item.importance === importance,
    );
  }

  if (query) {
    items = items.filter((item) => {
      const nameTrMatch = item.nameTr.toLowerCase().includes(query);
      const nameEnMatch = item.nameEn.toLowerCase().includes(query);
      const meaningMatch = item.meanings.some((m) =>
        m.toLowerCase().includes(query),
      );
      const originMatch = item.origin.toLowerCase().includes(query);
      const promptMatch = item.promptKeyword.toLowerCase().includes(query);
      const historicalMatch =
        'historicalName' in item && item.historicalName
          ? item.historicalName.toLowerCase().includes(query)
          : false;

      return (
        nameTrMatch ||
        nameEnMatch ||
        meaningMatch ||
        originMatch ||
        promptMatch ||
        historicalMatch
      );
    });
  }

  return items;
}

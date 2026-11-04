export type CulturalCategory =
  'colors' | 'nature' | 'animals' | 'mythology' | 'celestial';

export type FigureSubType =
  | 'tree'
  | 'flower'
  | 'fruit'
  | 'plant'
  | 'landscape'
  | 'mammal'
  | 'bird'
  | 'reptile'
  | 'mythological_bird'
  | 'mythological_creature'
  | 'symbolic_animal_motif'
  | 'celestial';

export type ImportanceLevel = 'very_high' | 'high' | 'medium';

export type CosmologicalDirection =
  'east' | 'west' | 'north' | 'south' | 'center';

export interface CosmologicalDirectionInfo {
  direction: CosmologicalDirection;
  directionTr: string;
  element: string;
  associatedColor: string;
  description: string;
}

export interface TurkishCulturalColor {
  id: string;
  nameTr: string;
  nameEn: string;
  historicalName?: string;
  hex: string;
  cosmologicalDirection?: CosmologicalDirection;
  meanings: string[];
  description: string;
  origin: string;
  usages: string[];
  promptKeyword: string;
  category: 'colors';
}

export interface TurkishCulturalFigure {
  id: string;
  nameTr: string;
  nameEn: string;
  category: Exclude<CulturalCategory, 'colors'>;
  subType: FigureSubType;
  importance: ImportanceLevel;
  meanings: string[];
  description: string;
  origin: string;
  promptKeyword: string;
}

export type TurkishCulturalItem = TurkishCulturalColor | TurkishCulturalFigure;

export interface CulturalStatistics {
  totalColors: number;
  totalFigures: number;
  totalMythological: number;
  totalCelestial: number;
  totalVeryHighImportance: number;
}

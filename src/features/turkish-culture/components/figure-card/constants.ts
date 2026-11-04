import { Crown, Flame, Moon, TreePine } from 'lucide-react';
import type { CategoryVisualConfig, ImportanceVisualConfig } from './types';

export const CATEGORY_CONFIG: Record<string, CategoryVisualConfig> = {
  nature: {
    icon: TreePine,
    label: 'Doğa & Ağaç',
    accentColor: 'text-tulpar-firuze',
    topAccentBg: 'bg-tulpar-firuze',
  },
  animals: {
    icon: Crown,
    label: 'Hayvan & Ongun',
    accentColor: 'text-tulpar-blue',
    topAccentBg: 'bg-tulpar-blue',
  },
  mythology: {
    icon: Flame,
    label: 'Mitoloji & Efsane',
    accentColor: 'text-alert-red',
    topAccentBg: 'bg-alert-red',
  },
  celestial: {
    icon: Moon,
    label: 'Göksel Simge',
    accentColor: 'text-tulpar-gold',
    topAccentBg: 'bg-tulpar-gold',
  },
};

export const IMPORTANCE_CONFIG: Record<string, ImportanceVisualConfig> = {
  very_high: {
    label: '⭐ Çok Yüksek',
    badgeStyle: 'bg-tulpar-gold/10 text-tulpar-gold border-tulpar-gold/30',
  },
  high: {
    label: '🔷 Yüksek',
    badgeStyle: 'bg-tulpar-gold/10 text-tulpar-gold/90 border-tulpar-gold/20',
  },
  medium: {
    label: '▫️ Orta',
    badgeStyle: 'bg-muted/60 text-muted-foreground border-border/50',
  },
};

export const DEFAULT_IMPORTANCE_CONFIG: ImportanceVisualConfig = {
  label: '▫️ Kültürel',
  badgeStyle: 'bg-muted/60 text-muted-foreground border-border/50',
};

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GamificationBadge {
  id: string;
  title: string;
  description: string;
}

export interface RecentCalculationItem {
  calcId: string;
  categoryId: string;
  title: string;
  primaryValue: string;
  timestamp: number;
}

export interface XpGainEvent {
  amount: number;
  reason: string;
  timestamp: number;
}

export const GAMIFICATION_BADGES: GamificationBadge[] = [
  {
    id: 'ilk-kivilcim',
    title: 'İlk Kıvılcım',
    description: 'İlk hesaplama görevini başarıyla tamamladın!',
  },
  {
    id: 'merakli-kasif',
    title: 'Meraklı Kaşif',
    description: '5 farklı hesaplama aracını keşfettin!',
  },
  {
    id: 'master-kasif',
    title: 'Usta Kaşif',
    description: '15 farklı hesaplama aracını deneyimledin!',
  },
  {
    id: 'seri-hesaplayici',
    title: 'Hesap Makinesi',
    description: 'Toplam 10 hesaplama barajını aştın!',
  },
  {
    id: 'favori-avcisi',
    title: 'Koleksiyoner',
    description: 'En az 3 aracı favori listenize eklediniz!',
  },
];

export interface LevelInfo {
  level: number;
  rankTitle: string;
  currentXp: number;
  nextLevelXp: number;
  progressPercent: number;
}

export function getLevelInfo(xp: number): LevelInfo {
  const tiers = [
    { level: 1, min: 0, max: 100, title: 'Hesap Çırağı' },
    { level: 2, min: 100, max: 250, title: 'Sayı Avcısı' },
    { level: 3, min: 250, max: 500, title: 'Analiz Uzmanı' },
    { level: 4, min: 500, max: 1000, title: 'Strateji Ustası' },
    { level: 5, min: 1000, max: 2500, title: 'Baş Hesap Üstadı' },
  ];

  const tier =
    tiers.find((t) => xp >= t.min && xp < t.max) ?? tiers[tiers.length - 1];
  const span = Math.max(1, tier.max - tier.min);
  const progressPercent = Math.min(
    100,
    Math.round(((xp - tier.min) / span) * 100),
  );

  return {
    level: tier.level,
    rankTitle: tier.title,
    currentXp: xp,
    nextLevelXp: tier.max,
    progressPercent,
  };
}

interface GamificationState {
  xp: number;
  totalCalculations: number;
  discoveredIds: string[];
  favoriteIds: string[];
  unlockedBadgeIds: string[];
  recentHistory: RecentCalculationItem[];
  lastXpGain: XpGainEvent | null;
  recordCalculation: (payload: {
    calcId: string;
    categoryId: string;
    title: string;
    primaryValue: string;
  }) => void;
  toggleFavorite: (calcId: string) => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set) => ({
      xp: 50,
      totalCalculations: 0,
      discoveredIds: [],
      favoriteIds: [],
      unlockedBadgeIds: [],
      recentHistory: [],
      lastXpGain: null,

      recordCalculation: ({ calcId, categoryId, title, primaryValue }) =>
        set((state) => {
          const isNewDiscovery = !state.discoveredIds.includes(calcId);
          const xpAdded = isNewDiscovery ? 75 : 25;
          const nextXp = state.xp + xpAdded;
          const nextTotal = state.totalCalculations + 1;
          const nextDiscovered = isNewDiscovery
            ? [...state.discoveredIds, calcId]
            : state.discoveredIds;

          const nextBadges = new Set(state.unlockedBadgeIds);
          if (nextTotal >= 1) nextBadges.add('ilk-kivilcim');
          if (nextDiscovered.length >= 5) nextBadges.add('merakli-kasif');
          if (nextDiscovered.length >= 15) nextBadges.add('master-kasif');
          if (nextTotal >= 10) nextBadges.add('seri-hesaplayici');

          const newEntry: RecentCalculationItem = {
            calcId,
            categoryId,
            title,
            primaryValue,
            timestamp: Date.now(),
          };
          const filteredHistory = state.recentHistory.filter(
            (item) => item.calcId !== calcId,
          );

          return {
            xp: nextXp,
            totalCalculations: nextTotal,
            discoveredIds: nextDiscovered,
            unlockedBadgeIds: Array.from(nextBadges),
            recentHistory: [newEntry, ...filteredHistory].slice(0, 6),
            lastXpGain: {
              amount: xpAdded,
              reason: isNewDiscovery
                ? `Yeni Araç Keşfi Bonusu! (+${xpAdded} XP)`
                : `Hesaplama Tamamlandı! (+${xpAdded} XP)`,
              timestamp: Date.now(),
            },
          };
        }),

      toggleFavorite: (calcId) =>
        set((state) => {
          const exists = state.favoriteIds.includes(calcId);
          const nextFavorites = exists
            ? state.favoriteIds.filter((id) => id !== calcId)
            : [...state.favoriteIds, calcId];

          const nextBadges = new Set(state.unlockedBadgeIds);
          if (nextFavorites.length >= 3) nextBadges.add('favori-avcisi');

          return {
            favoriteIds: nextFavorites,
            unlockedBadgeIds: Array.from(nextBadges),
          };
        }),
    }),
    {
      name: 'hesaplamalarim-gamification-v1',
    },
  ),
);


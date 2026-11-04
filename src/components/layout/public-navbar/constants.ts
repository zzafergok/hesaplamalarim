import {
  Activity,
  Binary,
  Briefcase,
  Calendar,
  Coins,
  Home,
  Scale,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';

import {
  ALL_CALCULATORS,
  CALCULATOR_CATEGORIES,
  CalculatorCategoryId,
} from '@/features/calculators/registry';
import type { NavCategoryGroup } from './types';

export const CATEGORY_ICONS: Record<CalculatorCategoryId, LucideIcon> = {
  finans: Coins,
  'bordro-vergi': Briefcase,
  'gunluk-alisveris': ShoppingBag,
  'saglik-beslenme': Activity,
  'gayrimenkul-hukuk': Scale,
  'zaman-takvim': Calendar,
  'matematik-muhendislik': Binary,
};

export function getCategoryIcon(categoryId: string): LucideIcon {
  return CATEGORY_ICONS[categoryId as CalculatorCategoryId] ?? Home;
}

export function getNavCategoryGroups(): NavCategoryGroup[] {
  return CALCULATOR_CATEGORIES.map((cat) => {
    const calculators = ALL_CALCULATORS.filter((c) => c.categoryId === cat.id).map(
      (calc) => ({
        id: calc.id,
        categoryId: calc.categoryId,
        title: calc.title,
        shortTitle: calc.shortTitle,
        description: calc.description,
        href: `/${calc.categoryId}/${calc.id}`,
      }),
    );

    return {
      id: cat.id,
      title: cat.title,
      shortTitle: cat.shortTitle,
      description: cat.description,
      href: `/${cat.id}`,
      calculators,
    };
  });
}

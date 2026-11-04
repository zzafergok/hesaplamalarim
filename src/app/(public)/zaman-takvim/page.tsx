import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  CALCULATOR_CATEGORIES,
  CategoryDetailScreen,
} from '@/features/calculators';

export const metadata: Metadata = {
  title: '6. Zaman, Tarih & Takvim | Hesaplamalarım',
  description: 'İki tarih arası gün farkı, resmi tatiller hariç net iş günü, askerlik şafak sayacı ve etkinlik geri sayımı.',
};

export default function ZamanTakvimCategoryPage() {
  const category = CALCULATOR_CATEGORIES.find((c) => c.id === 'zaman-takvim');
  if (!category) {
    notFound();
  }

  return (
    <CategoryDetailScreen
      categoryId="zaman-takvim"
      category={category}
    />
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  CALCULATOR_CATEGORIES,
  CategoryDetailScreen,
} from '@/features/calculators';

export const metadata: Metadata = {
  title: '1. Finans, Kredi ve Bankacılık | Hesaplamalarım',
  description: 'Kredi taksit ve amortisman, erken kapama, mevduat faizi, enflasyon ve altın/bilezik değerleme araçları.',
};

export default function FinansCategoryPage() {
  const category = CALCULATOR_CATEGORIES.find((c) => c.id === 'finans');
  if (!category) {
    notFound();
  }

  return (
    <CategoryDetailScreen
      categoryId="finans"
      category={category}
    />
  );
}

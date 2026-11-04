import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  CALCULATOR_CATEGORIES,
  CategoryDetailScreen,
} from '@/features/calculators';

export const metadata: Metadata = {
  title: '2. İş Hayatı, Bordro & Vergi | Hesaplamalarım',
  description: 'Brütten nete maaş, kıdem ve ihbar tazminatı, işsizlik maaşı, KDV tevkifatı ve SMM makbuz araçları.',
};

export default function BordroVergiCategoryPage() {
  const category = CALCULATOR_CATEGORIES.find((c) => c.id === 'bordro-vergi');
  if (!category) {
    notFound();
  }

  return (
    <CategoryDetailScreen
      categoryId="bordro-vergi"
      category={category}
    />
  );
}

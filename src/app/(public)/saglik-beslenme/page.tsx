import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  CALCULATOR_CATEGORIES,
  CategoryDetailScreen,
} from '@/features/calculators';

export const metadata: Metadata = {
  title: '4. Sağlık, Fitness & Beslenme | Hesaplamalarım',
  description: 'Vücut kitle indeksi (VKİ), bazal metabolizma (BMR/TDEE), makro besin, su ihtiyacı ve gebelik haftası.',
};

export default function SaglikBeslenmeCategoryPage() {
  const category = CALCULATOR_CATEGORIES.find((c) => c.id === 'saglik-beslenme');
  if (!category) {
    notFound();
  }

  return (
    <CategoryDetailScreen
      categoryId="saglik-beslenme"
      category={category}
    />
  );
}

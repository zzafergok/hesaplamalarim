import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  CALCULATOR_CATEGORIES,
  CategoryDetailScreen,
} from '@/features/calculators';

export const metadata: Metadata = {
  title: '7. Matematik, Geometri & Mühendislik | Hesaplamalarım',
  description: 'Birim dönüştürücüler, geometrik alan/hacim hesaplama ve üniversite vize/final GPA not ortalaması.',
};

export default function MatematikMuhendislikCategoryPage() {
  const category = CALCULATOR_CATEGORIES.find((c) => c.id === 'matematik-muhendislik');
  if (!category) {
    notFound();
  }

  return (
    <CategoryDetailScreen
      categoryId="matematik-muhendislik"
      category={category}
    />
  );
}

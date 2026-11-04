import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  CALCULATOR_CATEGORIES,
  CategoryDetailScreen,
} from '@/features/calculators';

export const metadata: Metadata = {
  title: '3. Gündelik Pratik & Alışveriş Araçları | Hesaplamalarım',
  description: 'İndirim/kampanya, market birim fiyat kıyası, yol yakıt masrafı, bahşiş bölüştürme ve yüzde hesaplayıcı.',
};

export default function GunlukAlisverisCategoryPage() {
  const category = CALCULATOR_CATEGORIES.find((c) => c.id === 'gunluk-alisveris');
  if (!category) {
    notFound();
  }

  return (
    <CategoryDetailScreen
      categoryId="gunluk-alisveris"
      category={category}
    />
  );
}

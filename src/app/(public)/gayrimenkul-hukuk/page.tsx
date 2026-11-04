import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  CALCULATOR_CATEGORIES,
  CategoryDetailScreen,
} from '@/features/calculators';

export const metadata: Metadata = {
  title: '5. Gayrimenkul, Araç & Hukuk | Hesaplamalarım',
  description: 'TÜFE kira artış oranı, %4 tapu harcı, araç MTV, yasal/temerrüt faizi ve yasal miras paylaşımı simülatörü.',
};

export default function GayrimenkulHukukCategoryPage() {
  const category = CALCULATOR_CATEGORIES.find((c) => c.id === 'gayrimenkul-hukuk');
  if (!category) {
    notFound();
  }

  return (
    <CategoryDetailScreen
      categoryId="gayrimenkul-hukuk"
      category={category}
    />
  );
}

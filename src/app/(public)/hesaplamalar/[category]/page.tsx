import { notFound } from 'next/navigation';

import {
  CALCULATOR_CATEGORIES,
  CategoryDetailScreen,
} from '@/features/calculators';
import { createDynamicMetadata } from '@/lib/metadata/page-metadata';

type CategoryPageParams = {
  category: string;
};

export function generateStaticParams(): CategoryPageParams[] {
  return CALCULATOR_CATEGORIES.map((cat) => ({
    category: cat.id,
  }));
}

export const generateMetadata = createDynamicMetadata<CategoryPageParams>(
  ({ params }) => {
    const category = CALCULATOR_CATEGORIES.find(
      (c) => c.id === params.category,
    );
    if (!category) {
      return {
        path: `/hesaplamalar/${params.category}`,
        title: 'Kategori Bulunamadı | Hesaplamalarım',
        description: 'Aradığınız hesaplama kategorisi mevcut değil.',
      };
    }

    return {
      path: `/hesaplamalar/${category.id}`,
      title: `${category.title} | Hesaplamalarım`,
      description: category.description,
    };
  },
);

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<CategoryPageParams> | CategoryPageParams;
}) {
  const resolved = await params;
  const category = CALCULATOR_CATEGORIES.find(
    (c) => c.id === resolved.category,
  );

  if (!category) {
    notFound();
  }

  return (
    <CategoryDetailScreen
      categoryId={resolved.category}
      category={category}
    />
  );
}


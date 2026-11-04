import { notFound } from 'next/navigation';

import {
  ALL_CALCULATORS,
  CalculatorDetailScreen,
} from '@/features/calculators';
import { createDynamicMetadata } from '@/lib/metadata/page-metadata';

type CalculatorPageParams = {
  category: string;
  slug: string;
};

export function generateStaticParams(): CalculatorPageParams[] {
  return ALL_CALCULATORS.map((calc) => ({
    category: calc.categoryId,
    slug: calc.id,
  }));
}

export const generateMetadata = createDynamicMetadata<CalculatorPageParams>(
  ({ params }) => {
    const calculator = ALL_CALCULATORS.find(
      (c) => c.categoryId === params.category && c.id === params.slug,
    );

    if (!calculator) {
      return {
        path: `/hesaplamalar/${params.category}/${params.slug}`,
        title: 'Hesaplama Aracı Bulunamadı | Hesaplamalarım',
        description: 'Aradığınız hesaplama aracı mevcut değil.',
      };
    }

    return {
      path: `/hesaplamalar/${calculator.categoryId}/${calculator.id}`,
      title: `${calculator.title} | Hesaplamalarım`,
      description: calculator.description,
    };
  },
);

export default async function CalculatorDetailPage({
  params,
}: {
  params: Promise<CalculatorPageParams> | CalculatorPageParams;
}) {
  const resolved = await params;
  const exists = ALL_CALCULATORS.some(
    (c) => c.categoryId === resolved.category && c.id === resolved.slug,
  );

  if (!exists) {
    notFound();
  }

  return (
    <CalculatorDetailScreen
      calculatorId={resolved.slug}
      categoryId={resolved.category}
    />
  );
}


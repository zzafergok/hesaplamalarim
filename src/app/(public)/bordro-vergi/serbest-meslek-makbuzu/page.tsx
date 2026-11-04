import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Freelance / Serbest Meslek Makbuzu (SMM) Hesaplama | Hesaplamalarım',
  description: 'Brüt ücretten veya net tahsilattan %20 gelir vergisi stopajı ve %20 KDV dahil SMM makbuz dökümü.',
};

export default function SerbestMeslekMakbuzuPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="serbest-meslek-makbuzu"
      categoryId="bordro-vergi"
    />
  );
}

import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Geometrik Alan, Çevre & Hacim Hesaplama | Hesaplamalarım',
  description: 'Daire, dikdörtgen, üçgen, silindir, küre ve koni için alan, çevre ve hacim hesaplamaları.',
};

export default function AlanHacimPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="alan-hacim"
      categoryId="matematik-muhendislik"
    />
  );
}

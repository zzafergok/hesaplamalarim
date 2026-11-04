import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'İşsizlik Maaşı Hesaplama | Hesaplamalarım',
  description: 'Son 4 aylık prime esas kazanç ortalaması ve son 3 yıldaki prim gününe göre İŞKUR işsizlik ödeneği.',
};

export default function IssizlikMaasiPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="issizlik-maasi"
      categoryId="bordro-vergi"
    />
  );
}

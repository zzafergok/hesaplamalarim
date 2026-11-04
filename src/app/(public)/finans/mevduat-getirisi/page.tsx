import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Mevduat Getirisi & Bileşik Faiz Hesaplama | Hesaplamalarım',
  description: 'Günlük ve aylık vadeli mevduatta stopaj kesintisi sonrası net faiz kazancı.',
};

export default function MevduatGetirisiPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="mevduat-getirisi"
      categoryId="finans"
    />
  );
}

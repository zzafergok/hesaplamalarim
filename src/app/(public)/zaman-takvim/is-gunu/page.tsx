import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'İş Günü & Mesai Günü Hesaplama | Hesaplamalarım',
  description: 'Hafta sonları ve resmi tatiller düşüldükten sonra iki tarih arasındaki net çalışma (iş) günü sayısı.',
};

export default function IsGunuPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="is-gunu"
      categoryId="zaman-takvim"
    />
  );
}

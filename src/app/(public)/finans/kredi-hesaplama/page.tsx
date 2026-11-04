import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Kredi Taksit & Geri Ödeme Hesaplama | Hesaplamalarım',
  description: 'İhtiyaç, konut ve taşıt kredileri için KKDF ve BSMV vergileri dahil aylık taksit ve ödeme planı dökümü.',
};

export default function KrediHesaplamaPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="kredi-hesaplama"
      categoryId="finans"
    />
  );
}

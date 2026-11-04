import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Erken Kapama & Ara Ödeme Simülatörü | Hesaplamalarım',
  description: 'Krediye toplu ara ödeme yapıldığında vade kısaltma ile taksit düşürme seçeneklerinin net faiz tasarrufu karşılaştırması.',
};

export default function ErkenKapamaPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="erken-kapama"
      categoryId="finans"
    />
  );
}

import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Kapsamlı Birim Dönüştürücü (Uzunluk, Ağırlık, Sıcaklık, Veri) | Hesaplamalarım',
  description: 'Metrik, emperyal, sıcaklık ve dijital veri depolama birimlerini anında birbirine dönüştürün.',
};

export default function BirimDonusturucuPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="birim-donusturucu"
      categoryId="matematik-muhendislik"
    />
  );
}

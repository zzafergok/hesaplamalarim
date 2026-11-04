import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Şafak & Askerlik Terhis Hesaplayıcı | Hesaplamalarım',
  description: 'Sülüs (sevk) tarihi, askerlik türü ve yol iznine göre kalan şafak günü ve resmi terhis tarihi.',
};

export default function SafakSayaciPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="safak-sayaci"
      categoryId="zaman-takvim"
    />
  );
}

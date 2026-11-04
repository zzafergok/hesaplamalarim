import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'İndirim & Kampanya Fiyat Hesaplayıcı | Hesaplamalarım',
  description: 'Etiket fiyatı üzerinden tekli veya kademeli (\"kasada ek indirim\") kampanyaların net fiyat ve gerçek indirim yüzdesi.',
};

export default function IndirimKampanyaPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="indirim-kampanya"
      categoryId="gunluk-alisveris"
    />
  );
}

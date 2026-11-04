import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Yol Masrafı & Yakıt Tüketimi Hesaplama | Hesaplamalarım',
  description: 'Gidilecek mesafe, 100 km ortalama yakıt tüketimi ve güncel akaryakıt fiyatına göre toplam ve kişi başı yol masrafı.',
};

export default function YakitTuketimiPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="yakit-tuketimi"
      categoryId="gunluk-alisveris"
    />
  );
}

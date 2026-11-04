import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'İki Tarih Arası Gün, Hafta ve Saat Farkı | Hesaplamalarım',
  description: 'Başlangıç ve bitiş tarihleri arasındaki toplam gün, hafta, saat ve Yıl/Ay/Gün kırılımı.',
};

export default function TarihFarkiPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="tarih-farki"
      categoryId="zaman-takvim"
    />
  );
}

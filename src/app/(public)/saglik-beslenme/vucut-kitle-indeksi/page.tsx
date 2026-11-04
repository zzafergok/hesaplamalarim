import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Vücut Kitle İndeksi (VKİ) & İdeal Kilo Hesaplama | Hesaplamalarım',
  description: 'Boy, kilo ve cinsiyete göre Dünya Sağlık Örgütü (WHO) VKİ kategorisi ve Devine ideal kilo aralığı.',
};

export default function VucutKitleIndeksiPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="vucut-kitle-indeksi"
      categoryId="saglik-beslenme"
    />
  );
}

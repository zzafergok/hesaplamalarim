import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Özel Gün & Sınav Geri Sayım Sayacı | Hesaplamalarım',
  description: 'Hedeflenen sınav, tatil veya etkinlik tarihine bugünden itibaren kaç gün, hafta ve saat kaldığını hesaplayın.',
};

export default function GeriSayimPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="geri-sayim"
      categoryId="zaman-takvim"
    />
  );
}

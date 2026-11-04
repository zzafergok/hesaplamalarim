import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Üniversite Vize / Final Not Ortalaması & GPA Hesaplama | Hesaplamalarım',
  description: 'Vize ve final ağırlıklarına, final geçme barajına göre dönem sonu başarı notu ve 4’lük harf karşılığı.',
};

export default function AkademikNotPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="akademik-not"
      categoryId="matematik-muhendislik"
    />
  );
}

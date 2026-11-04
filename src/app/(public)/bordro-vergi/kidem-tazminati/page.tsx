import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Kıdem Tazminatı Hesaplama | Hesaplamalarım',
  description: 'Çalışma süresi, giydirilmiş brüt ücret ve 2026 kıdem tavanına göre net kıdem tazminatı dökümü.',
};

export default function KidemTazminatiPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="kidem-tazminati"
      categoryId="bordro-vergi"
    />
  );
}

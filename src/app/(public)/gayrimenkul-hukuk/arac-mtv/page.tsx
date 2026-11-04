import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Araç MTV (Motorlu Taşıtlar Vergisi) Hesaplama | Hesaplamalarım',
  description: 'Motor silindir hacmi ve araç yaş grubuna göre yıllık MTV ve Ocak/Temmuz taksit tutarları.',
};

export default function AracMtvPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="arac-mtv"
      categoryId="gayrimenkul-hukuk"
    />
  );
}

import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Enflasyon & Satın Alma Gücü Kaybı | Hesaplamalarım',
  description: 'Paranızın enflasyon karşısındaki reel alım gücü erimesini ve gelecekteki eşdeğer maliyetini hesaplayın.',
};

export default function EnflasyonKaybiPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="enflasyon-kaybi"
      categoryId="finans"
    />
  );
}

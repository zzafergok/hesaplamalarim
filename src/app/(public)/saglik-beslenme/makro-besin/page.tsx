import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Makro Besin Dağılımı (Protein, Karbonhidrat, Yağ) | Hesaplamalarım',
  description: 'Günlük hedef kalorinize ve beslenme profilinize göre almanız gereken gramaj bazlı makro besin dağılımı.',
};

export default function MakroBesinPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="makro-besin"
      categoryId="saglik-beslenme"
    />
  );
}

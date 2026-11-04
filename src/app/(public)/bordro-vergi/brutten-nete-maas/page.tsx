import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Brütten Nete / Netten Brüte Maaş Hesaplama | Hesaplamalarım',
  description: 'Kümülatif vergi dilimleri (%15-%40), SGK işçi payı, SPEK tavanı ve asgari ücret istisnası dahil bordro dökümü.',
};

export default function BruttenNeteMaasPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="brutten-nete-maas"
      categoryId="bordro-vergi"
    />
  );
}

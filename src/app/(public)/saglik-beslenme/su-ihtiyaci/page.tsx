import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Günlük Su İhtiyacı Hesaplama | Hesaplamalarım',
  description: 'Vücut ağırlığınız ve günlük egzersiz sürenize göre tüketmeniz gereken ideal su miktarı.',
};

export default function SuIhtiyaciPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="su-ihtiyaci"
      categoryId="saglik-beslenme"
    />
  );
}

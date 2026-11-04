import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Gecikme Zammı, Yasal Faiz & Temerrüt Faizi | Hesaplamalarım',
  description: 'İcra, sözleşme veya vergi gecikmelerinde gün bazlı yasal faiz ve toplam borç hesabı.',
};

export default function YasalFaizPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="yasal-faiz"
      categoryId="gayrimenkul-hukuk"
    />
  );
}

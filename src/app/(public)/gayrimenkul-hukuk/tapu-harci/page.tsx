import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Tapu Harcı & Döner Sermaye Hesaplama | Hesaplamalarım',
  description: 'Konut, arsa ve işyeri satışlarında %2 alıcı + %2 satıcı tapu harcı ve döner sermaye masraf dökümü.',
};

export default function TapuHarciPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="tapu-harci"
      categoryId="gayrimenkul-hukuk"
    />
  );
}

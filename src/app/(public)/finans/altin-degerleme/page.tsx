import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Altın, Bilezik & Hurda Altın Değerleme | Hesaplamalarım',
  description: 'Gram, çeyrek, tam, ata altın ve 22/14 ayar bileziklerin milyem saflık oranlarına göre has altın ve nakit karşılığı.',
};

export default function AltinDegerlemePage() {
  return (
    <CalculatorDetailScreen
      calculatorId="altin-degerleme"
      categoryId="finans"
    />
  );
}

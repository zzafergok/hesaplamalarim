import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Bazal Metabolizma Hızı (BMR) & Günlük Kalori (TDEE) | Hesaplamalarım',
  description: 'Mifflin-St Jeor denklemiyle dinlenme metabolizma hızı ve kilo koruma/verme/alma kalori hedefleri.',
};

export default function BmrTdeeKaloriPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="bmr-tdee-kalori"
      categoryId="saglik-beslenme"
    />
  );
}

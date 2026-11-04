import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Bahşiş & Hesap Bölüştürme (Alman Usulü) | Hesaplamalarım',
  description: 'Restoran ve kafe adisyonlarında servis/bahşiş oranını ekleyerek kişi başı ödenecek net tutarı hesaplayın.',
};

export default function BahsisBolusturmePage() {
  return (
    <CalculatorDetailScreen
      calculatorId="bahsis-bolusturme"
      categoryId="gunluk-alisveris"
    />
  );
}

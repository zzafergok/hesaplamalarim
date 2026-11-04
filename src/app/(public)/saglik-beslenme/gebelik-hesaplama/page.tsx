import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Gebelik Haftası & Tahmini Doğum Tarihi Hesaplayıcı | Hesaplamalarım',
  description: 'Son adet tarihine (SAT) ve Naegele kuralına göre mevcut gebelik haftası, trimester ve tahmini doğum tarihi.',
};

export default function GebelikHesaplamaPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="gebelik-hesaplama"
      categoryId="saglik-beslenme"
    />
  );
}

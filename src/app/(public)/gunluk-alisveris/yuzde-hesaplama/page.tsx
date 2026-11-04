import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Çok Amaçlı Yüzde (%) Hesaplayıcı | Hesaplamalarım',
  description: 'Bir sayının yüzdesini, iki sayı arasındaki değişim oranını veya yüzde fazlasını/eksiğini tek dokunuşla bulun.',
};

export default function YuzdeHesaplamaPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="yuzde-hesaplama"
      categoryId="gunluk-alisveris"
    />
  );
}

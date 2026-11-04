import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Yasal Miras Paylaşımı (Veraset) Simülatörü | Hesaplamalarım',
  description: '4721 Sayılı Türk Medeni Kanunu zümre sistemine göre sağ kalan eş ve mirasçılar arasındaki yasal hisse dökümü.',
};

export default function MirasPaylasimiPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="miras-paylasimi"
      categoryId="gayrimenkul-hukuk"
    />
  );
}

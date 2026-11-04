import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Market Birim Fiyat Karşılaştırma | Hesaplamalarım',
  description: 'Farklı gramaj veya hacimdeki iki ürünün 1 kg / 1 Litre başına maliyetini kıyaslayarak en ekonomik olanı bulun.',
};

export default function BirimFiyatPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="birim-fiyat"
      categoryId="gunluk-alisveris"
    />
  );
}

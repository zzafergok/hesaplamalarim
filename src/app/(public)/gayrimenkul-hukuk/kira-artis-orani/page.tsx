import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'Kira Artış Oranı & TÜFE Yasal Sınır Hesaplama | Hesaplamalarım',
  description: '6098 Sayılı TBK Md. 344 uyarınca 12 aylık TÜFE ortalamasına göre yasal kira artış üst sınırı.',
};

export default function KiraArtisOraniPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="kira-artis-orani"
      categoryId="gayrimenkul-hukuk"
    />
  );
}

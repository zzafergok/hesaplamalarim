import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'İhbar Tazminatı Hesaplama | Hesaplamalarım',
  description: '4857 Sayılı İş Kanunu Md. 17 uyarınca 2, 4, 6 ve 8 haftalık ihbar bildirim süresi ve tazminatı.',
};

export default function IhbarTazminatiPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="ihbar-tazminati"
      categoryId="bordro-vergi"
    />
  );
}

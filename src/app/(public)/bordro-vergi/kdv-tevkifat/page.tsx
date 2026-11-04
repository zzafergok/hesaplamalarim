import type { Metadata } from 'next';

import { CalculatorDetailScreen } from '@/features/calculators';

export const metadata: Metadata = {
  title: 'KDV Tevkifatı & KDV Dahil / Hariç Hesaplama | Hesaplamalarım',
  description: '%1, %10, %20 KDV oranları ve 2/10, 5/10, 7/10, 9/10 tevkifat paylarıyla fatura matrahı hesaplama.',
};

export default function KdvTevkifatPage() {
  return (
    <CalculatorDetailScreen
      calculatorId="kdv-tevkifat"
      categoryId="bordro-vergi"
    />
  );
}

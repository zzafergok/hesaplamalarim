import { CalculatorHub } from '@/features/calculators';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('hesaplamalar');

export default function HesaplamalarPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <CalculatorHub />
    </div>
  );
}

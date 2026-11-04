import { PublicCultureScreen } from '@/features/routes/public/culture';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('publicCulture');

export default function PublicCulturePage() {
  return <PublicCultureScreen />;
}

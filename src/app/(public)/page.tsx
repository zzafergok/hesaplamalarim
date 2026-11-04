import { PublicHomeScreen } from '@/features/routes/public/home';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('publicHome');

export default function PublicHomePage() {
  return <PublicHomeScreen />;
}

import { AuthHomeScreen } from '@/features/routes/auth/home';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('authHome');

export default function HomePage() {
  return <AuthHomeScreen />;
}

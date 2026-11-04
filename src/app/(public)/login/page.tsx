import { PublicLoginScreen } from '@/features/routes/public/login';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('publicLogin');

export default function LoginPage() {
  return <PublicLoginScreen />;
}

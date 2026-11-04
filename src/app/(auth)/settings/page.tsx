import { AuthSettingsScreen } from '@/features/routes/auth/settings';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('authSettings');

export default function SettingsPage() {
  return <AuthSettingsScreen />;
}

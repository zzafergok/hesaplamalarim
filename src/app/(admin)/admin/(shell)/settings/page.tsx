import { AdminSettingsScreen } from '@/features/routes/admin/settings';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('adminSettings');

export default function AdminSettingsPage() {
  return <AdminSettingsScreen />;
}

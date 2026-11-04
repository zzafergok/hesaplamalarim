import { AdminOverviewScreen } from '@/features/routes/admin/overview';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('adminOverview');

export default function AdminPage() {
  return <AdminOverviewScreen />;
}

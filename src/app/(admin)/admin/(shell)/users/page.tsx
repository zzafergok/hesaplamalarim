import { AdminUsersScreen } from '@/features/routes/admin/users';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('adminUsers');

export default function AdminUsersPage() {
  return <AdminUsersScreen />;
}

import { AdminLoginScreen } from '@/features/routes/admin/login';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('adminLogin');

export default function AdminLoginPage() {
  return <AdminLoginScreen />;
}

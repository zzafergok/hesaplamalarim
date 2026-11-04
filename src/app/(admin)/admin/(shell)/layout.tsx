import { AdminShell } from '@/features/routes/_shared/layouts';

export default function AdminAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}

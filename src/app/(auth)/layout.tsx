import { AuthShell } from '@/features/routes/_shared/layouts';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthShell>{children}</AuthShell>;
}

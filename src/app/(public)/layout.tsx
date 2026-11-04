import { PublicShell } from '@/features/routes/_shared/layouts';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicShell>{children}</PublicShell>;
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { PublicShell } from '@/features/routes/_shared/layouts';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { AdminLoginForm } from './components/admin-login-form';
import { getAdminLoginCopy } from './i18n';

export async function AdminLoginScreen() {
  const locale = await getCurrentLocale();
  const copy = getAdminLoginCopy(locale);

  return (
    <PublicShell>
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center px-5 py-12">
        <Card className="w-full border-gunmetal bg-obsidian shadow-2xl">
          <CardHeader>
            <CardTitle className="uppercase tracking-tight">
              {copy.title}
            </CardTitle>
            <CardDescription>{copy.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminLoginForm copy={copy} />
          </CardContent>
        </Card>
      </section>
    </PublicShell>
  );
}

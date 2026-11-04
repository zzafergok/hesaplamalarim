import { Shield } from 'lucide-react';
import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { Link } from '@/components/core/link';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { PublicLoginForm } from './components/public-login-form';
import { getPublicLoginCopy } from './i18n';

export async function PublicLoginScreen() {
  const locale = await getCurrentLocale();
  const copy = getPublicLoginCopy(locale);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center px-5 py-12">
      <Card className="w-full border-gunmetal bg-obsidian shadow-2xl">
        <CardHeader>
          <CardTitle className="uppercase tracking-tight">
            {copy.title}
          </CardTitle>
          <CardDescription>{copy.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PublicLoginForm copy={copy} />

          <Button
            asChild
            variant="outline"
            className="w-full rounded-none font-bold uppercase tracking-widest"
          >
            <Link href="/admin/login">
              <Shield className="mr-2 h-4 w-4" />
              {copy.adminLoginLabel}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

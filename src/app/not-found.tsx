import { ArrowLeft, Compass, Home } from 'lucide-react';
import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { Link } from '@/components/core/link';
import { PublicShell } from '@/features/routes/_shared/layouts';
import { getCurrentLocale } from '@/lib/i18n/server-locale';

export default async function NotFound() {
  const locale = await getCurrentLocale();
  const isTr = locale === 'tr';

  const copy = {
    badge: isTr ? '404 • SAYFA BULUNAMADI' : '404 • PAGE NOT FOUND',
    title: isTr ? 'Kayıp Rota' : 'Lost in the Steppes',
    description: isTr
      ? 'Aradığınız sayfa silinmiş, taşınmış veya henüz inşa edilmemiş olabilir. Ana sayfaya dönebilir veya Türk kültür atlasını keşfedebilirsiniz.'
      : 'The page you are looking for might have been removed, moved, or is still under construction. Return home or explore the Turkic culture atlas.',
    homeButton: isTr ? 'Ana Sayfaya Dön' : 'Return Home',
    cultureButton: isTr ? 'Kültür Atlasını Keşfet' : 'Explore Culture Atlas',
  };

  return (
    <PublicShell>
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-16">
        <Card className="w-full max-w-lg border-gunmetal bg-obsidian text-center shadow-2xl">
          <CardHeader className="space-y-4 pb-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm border border-tulpar-blue/40 bg-tulpar-blue/10 text-tulpar-blue">
              <Compass className="h-7 w-7 animate-pulse" />
            </div>
            <div className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-tulpar-blue">
              {copy.badge}
            </div>
            <CardTitle className="text-2xl font-black uppercase tracking-tight text-titanium sm:text-3xl">
              {copy.title}
            </CardTitle>
            <CardDescription className="mx-auto max-w-md font-sans text-sm leading-relaxed text-ash">
              {copy.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="h-10 rounded-none bg-tulpar-blue font-bold uppercase tracking-wider text-white hover:bg-tulpar-blue/90"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  {copy.homeButton}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-none border-gunmetal font-bold uppercase tracking-wider text-titanium hover:bg-gunmetal/20"
              >
                <Link href="/culture">
                  <ArrowLeft className="mr-2 h-4 w-4 rotate-180" />
                  {copy.cultureButton}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicShell>
  );
}

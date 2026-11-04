'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/core/card';

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[PublicError]', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4 font-sans text-foreground">
      <Card className="w-full max-w-lg border-alert-red/50 bg-obsidian text-center shadow-2xl">
        <CardHeader className="space-y-3 pb-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm border border-alert-red/40 bg-alert-red/10 text-alert-red">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-alert-red">
            SAYFA HATASI • PUBLIC AREA ERROR
          </div>
          <CardTitle className="text-2xl font-black uppercase tracking-tight text-titanium">
            Sayfa Yüklenirken Bir Hata Oluştu
          </CardTitle>
          <CardDescription className="font-sans text-sm leading-relaxed text-ash">
            İstenen sayfa görüntülenirken bir problemle karşılaşıldı. Lütfen
            tekrar deneyin veya ana sayfaya dönün.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {error.digest && (
            <div className="rounded-sm border border-gunmetal bg-void-black p-2 font-mono text-xs text-ash/80">
              Hata Kodu (Digest): {error.digest}
            </div>
          )}

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              onClick={() => reset()}
              className="h-10 rounded-none bg-tulpar-blue font-bold uppercase tracking-wider text-white hover:bg-tulpar-blue/90"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Tekrar Dene
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-none border-gunmetal font-bold uppercase tracking-wider text-titanium hover:bg-gunmetal/20"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Ana Sayfa
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

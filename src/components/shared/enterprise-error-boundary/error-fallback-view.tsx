'use client';

import { type ErrorInfo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Home, Mail, RefreshCw } from 'lucide-react';
import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';

interface ErrorFallbackViewProps {
  fallbackLevel: 'page' | 'component' | 'section';
  showErrorDetails: boolean;
  enableRetry: boolean;
  retryCount: number;
  maxRetries: number;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
  onRetry: () => void;
  onReload?: () => void;
  onGoHome?: () => void;
}

export function ErrorFallbackView({
  fallbackLevel,
  showErrorDetails,
  enableRetry,
  retryCount,
  maxRetries,
  error,
  errorInfo,
  errorId,
  onRetry,
  onReload,
  onGoHome,
}: ErrorFallbackViewProps) {
  const router = useRouter();
  const handleRefresh = onReload ?? (() => router.refresh());
  const getFallbackContent = () => {
    switch (fallbackLevel) {
      case 'page':
        return {
          title: 'Sayfa Yüklenemedi',
          description:
            'Bu sayfada beklenmeyen bir hata oluştu. Ana sayfaya dönebilir veya sayfayı yenileyebilirsiniz.',
          actions: (
            <div className="flex justify-center gap-2">
              {onGoHome ? (
                <Button onClick={onGoHome} variant="default">
                  <Home className="mr-2 h-4 w-4" />
                  Ana Sayfaya Dön
                </Button>
              ) : (
                <Button asChild variant="default">
                  <Link href="/home">
                    <Home className="mr-2 h-4 w-4" />
                    Ana Sayfaya Dön
                  </Link>
                </Button>
              )}
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Sayfayı Yenile
              </Button>
            </div>
          ),
        };
      case 'section':
        return {
          title: 'Bölüm Yüklenemedi',
          description:
            'Bu bölümde bir hata oluştu. Sayfayı yenileyerek tekrar deneyebilirsiniz.',
          actions:
            enableRetry && retryCount < maxRetries ? (
              <Button onClick={onRetry} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Tekrar Dene ({maxRetries - retryCount} kalan)
              </Button>
            ) : (
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Sayfayı Yenile
              </Button>
            ),
        };
      default:
        return {
          title: 'Bileşen Hatası',
          description: 'Bu bileşende beklenmeyen bir hata oluştu.',
          actions:
            enableRetry && retryCount < maxRetries ? (
              <Button onClick={onRetry} variant="ghost" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Tekrar Dene
              </Button>
            ) : null,
        };
    }
  };

  const content = getFallbackContent();

  return (
    <Card
      className={
        fallbackLevel === 'page'
          ? 'mx-auto mt-20 max-w-md border-alert-red/40 bg-obsidian shadow-2xl'
          : 'w-full border-alert-red/30 bg-obsidian'
      }
    >
      <CardHeader className="pb-3 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm border border-alert-red/40 bg-alert-red/10 text-alert-red">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <CardTitle className="text-lg font-semibold text-alert-red">
          {content.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-sm text-ash/80">{content.description}</p>

        {content.actions}

        {showErrorDetails && error && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-xs text-ash/70 hover:text-titanium">
              Teknik Detaylar (ID: {errorId})
            </summary>
            <pre className="mt-2 overflow-x-auto rounded-sm border border-gunmetal bg-void-black p-2 font-mono text-xs text-titanium">
              {error.toString()}
              {errorInfo?.componentStack}
            </pre>
          </details>
        )}

        <div className="border-t border-gunmetal/60 pt-2">
          <p className="text-xs text-ash/70">
            Sorun devam ederse{' '}
            <a
              href="mailto:support@tulpar.dev"
              className="inline-flex items-center text-tulpar-blue underline hover:text-tulpar-blue/80 hover:no-underline"
            >
              <Mail className="mr-1 inline h-3 w-3" />
              support@tulpar.dev
            </a>{' '}
            adresinden iletişime geçin.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

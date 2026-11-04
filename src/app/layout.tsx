import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/core/toast';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { buildRootMetadata } from '@/lib/metadata/site-metadata';
import {
  ClientLocaleProvider,
  LocaleHtmlSync,
  QueryProvider,
  ThemeProvider,
} from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  return buildRootMetadata(locale);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getCurrentLocale();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <ClientLocaleProvider initialLocale={locale}>
          <LocaleHtmlSync />
          <ThemeProvider>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </ClientLocaleProvider>
      </body>
    </html>
  );
}

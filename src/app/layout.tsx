import type { Metadata } from 'next';
import {
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from 'next/font/google';
import './typeset.css';
import './styles/tokens-light.css';
import './styles/tokens-dark.css';
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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
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
  const fontVars = `${plusJakartaSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`;

  return (
    <html
      lang={locale}
      className={`dark ${fontVars}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-body-sm font-normal text-foreground antialiased">
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

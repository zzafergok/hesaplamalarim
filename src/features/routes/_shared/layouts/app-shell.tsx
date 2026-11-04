import { PublicNavbar } from '@/components/layout/public-navbar';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { siteMetadata } from '@/lib/metadata/site-metadata';
import { getShellCopy } from './i18n';

export async function PublicShell({ children }: { children: React.ReactNode }) {
  const locale = await getCurrentLocale();
  const copy = getShellCopy(locale);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <PublicNavbar
        brandTitle={copy.brand.title}
        brandSubtitle={copy.brand.subtitle}
        brandLogo={siteMetadata.assets.logo}
      />
      <main>{children}</main>
    </div>
  );
}

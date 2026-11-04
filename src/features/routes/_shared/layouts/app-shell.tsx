import Image from 'next/image';
import { Boxes, Home } from 'lucide-react';

import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { siteMetadata } from '@/lib/metadata/site-metadata';
import { getShellCopy } from './i18n';
import type { ShellCopy, ShellNavItem } from './types';

const navIcons = {
  home: Home,
  boxes: Boxes,
} as const;

function mapNavItems(items: ShellCopy['publicNav']): ShellNavItem[] {
  return items.map((item) => ({
    href: item.href,
    label: item.label,
    icon: navIcons[item.icon as keyof typeof navIcons] ?? navIcons.home,
  }));
}

export function BrandMark({
  compact = false,
  copy,
}: {
  compact?: boolean;
  copy: ShellCopy['brand'];
}) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gunmetal/70 bg-white p-0.5 shadow-sm">
        <Image
          src={siteMetadata.assets.logo}
          alt={`${copy.title} marka logosu`}
          width={36}
          height={36}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      {!compact && (
        <span>
          <span className="block font-display text-caption font-bold tracking-tight text-titanium">
            {copy.title}
          </span>
          <span className="block font-sans text-2xs font-normal italic text-ash">
            {copy.subtitle}
          </span>
        </span>
      )}
    </Link>
  );
}

function ShellNav({ items }: { items: ShellNavItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav className="flex items-center gap-1.5">
      {items.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="ghost"
          size="sm"
          className="font-sans text-compact font-semibold tracking-tight text-ash hover:text-titanium"
        >
          <Link href={item.href}>
            <item.icon className="mr-1.5 h-3.5 w-3.5 text-tulpar-blue" />
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

function ShellControls() {
  return (
    <div className="flex items-center gap-1">
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  );
}

export async function PublicShell({ children }: { children: React.ReactNode }) {
  const locale = await getCurrentLocale();
  const copy = getShellCopy(locale);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-40 border-b border-gunmetal/70 bg-obsidian/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <BrandMark copy={copy.brand} />
          <div className="flex items-center gap-3">
            <ShellNav items={mapNavItems(copy.publicNav)} />
            <ShellControls />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

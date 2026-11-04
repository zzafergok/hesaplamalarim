import Image from 'next/image';
import { Link } from '@/components/core/link';
import {
  Boxes,
  Home,
  LogIn,
  Settings,
  Shield,
  Users,
  Wrench,
} from 'lucide-react';

import { Button } from '@/components/core/button';
import { AdminAppShellLayout } from '@/components/layout/AdminAppShellLayout';
import { AppShellLayout } from '@/components/layout/AppShellLayout';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { cn } from '@/lib/utils';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { siteMetadata } from '@/lib/metadata/site-metadata';
import { getShellCopy } from './i18n';
import type { ShellCopy } from './types';
import type { ShellNavItem } from './types';

const navIcons = {
  boxes: Boxes,
  home: Home,
  login: LogIn,
  settings: Settings,
  shield: Shield,
  users: Users,
  wrench: Wrench,
} as const;

function mapNavItems(
  items: ReturnType<typeof getShellCopy>['publicNav'],
): ShellNavItem[];
function mapNavItems(
  items: ReturnType<typeof getShellCopy>['authNav'],
): ShellNavItem[];
function mapNavItems(
  items: ReturnType<typeof getShellCopy>['adminNav'],
): ShellNavItem[];
function mapNavItems(
  items: Array<{
    href: string;
    label: string;
    icon: string;
  }>,
): ShellNavItem[] {
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
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-white p-0.5 shadow-sm">
        <Image
          src={siteMetadata.assets.logo}
          alt={`${copy.title} brand mark`}
          width={36}
          height={36}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      {!compact && (
        <span>
          <span className="block font-mono text-2xs font-black uppercase tracking-widest text-foreground">
            {copy.title}
          </span>
          <span className="block text-xs text-muted-foreground">
            {copy.subtitle}
          </span>
        </span>
      )}
    </Link>
  );
}

function ShellNav({
  items,
  direction = 'row',
}: {
  items: ShellNavItem[];
  direction?: 'row' | 'column';
}) {
  if (items.length === 0) return null;
  return (
    <nav
      className={cn(
        'flex gap-2',
        direction === 'column' ? 'flex-col' : 'items-center',
      )}
    >
      {items.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="ghost"
          size="sm"
          className={cn(
            'rounded-none text-compact font-bold uppercase tracking-widest text-ash hover:text-titanium',
            direction === 'column' && 'justify-start',
          )}
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-3.5 w-3.5" />
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-gunmetal bg-void-black/90 backdrop-blur">
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

export async function AuthShell({ children }: { children: React.ReactNode }) {
  return <AppShellLayout>{children}</AppShellLayout>;
}

export async function AdminShell({ children }: { children: React.ReactNode }) {
  return <AdminAppShellLayout>{children}</AdminAppShellLayout>;
}

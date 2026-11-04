'use client';

import {
  Boxes,
  Crown,
  History,
  Megaphone,
  Settings,
  Shield,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

import {
  ApplicationShell,
  type ApplicationShellNavItem,
} from '@/components/layout/application-shell';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { getShellCopy } from '@/features/routes/_shared/layouts/i18n';
import { useI18n } from '@/hooks/use-i18n';

const iconMap: Record<string, LucideIcon> = {
  boxes: Boxes,
  crown: Crown,
  history: History,
  megaphone: Megaphone,
  settings: Settings,
  shield: Shield,
  users: Users,
  wrench: Wrench,
};

export function AdminAppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { copy } = useI18n(getShellCopy);
  const navItems: ApplicationShellNavItem[] = (copy.adminNav ?? []).map(
    (item) => ({
      href: item.href,
      label: item.label,
      subtitle: item.subtitle ?? copy.adminHeader?.subtitle,
      icon: iconMap[item.icon] ?? Shield,
      exact: item.href === '/admin',
    }),
  );

  return (
    <ApplicationShell
      brand={copy.brand}
      navItems={navItems}
      headerActions={
        <>
          <ThemeToggle />
          <LanguageSwitcher />
        </>
      }
    >
      {children}
    </ApplicationShell>
  );
}

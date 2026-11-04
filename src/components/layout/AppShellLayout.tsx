'use client';

import {
  Boxes,
  Home,
  LayoutDashboard,
  Settings,
  Shield,
  UserRound,
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
  home: Home,
  dashboard: LayoutDashboard,
  settings: Settings,
  shield: Shield,
  user: UserRound,
  users: Users,
  wrench: Wrench,
};

export function AppShellLayout({ children }: { children: React.ReactNode }) {
  const { copy } = useI18n(getShellCopy);
  const navItems: ApplicationShellNavItem[] = (copy.authNav ?? []).map(
    (item) => ({
      href: item.href,
      label: item.label,
      subtitle: item.subtitle ?? copy.authHeader?.subtitle,
      icon: iconMap[item.icon] ?? Home,
      exact: item.href === '/home',
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

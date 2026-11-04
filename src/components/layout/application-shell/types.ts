import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface ApplicationShellNavItem {
  href: string;
  label: string;
  subtitle?: string;
  icon: LucideIcon;
  highlight?: boolean;
  exact?: boolean;
}

export interface ApplicationShellFooterProps {
  children: ReactNode;
  placement: 'sidebar' | 'content';
  collapsed?: boolean;
}

export interface ApplicationShellProps {
  children: ReactNode;
  brand: { title: string; subtitle: string };
  footer?: ReactNode | ((props: { collapsed: boolean }) => ReactNode);
  navItems: ApplicationShellNavItem[];
  accountNavItems?: ApplicationShellNavItem[];
  headerActions?: ReactNode;
  planLabel?: string;
  contentFooter?: ReactNode;
  hidePageHeader?: boolean;
  pageHeaderTitle?: ReactNode;
  pageHeaderDescription?: ReactNode;
  pageHeaderActions?: ReactNode;
}

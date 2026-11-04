import type { LucideIcon } from 'lucide-react';

export type ShellNavItem = {
  href: string;
  label: string;
  subtitle?: string;
  icon: LucideIcon;
  highlight?: boolean;
};

export type ShellCopy = {
  brand: {
    title: string;
    subtitle: string;
  };
  publicNav: Array<
    Omit<ShellNavItem, 'icon'> & { icon: 'home' | 'boxes' | string }
  >;
  authNav?: Array<
    Omit<ShellNavItem, 'icon'> & { icon: string }
  >;
  adminNav?: Array<
    Omit<ShellNavItem, 'icon'> & { icon: string }
  >;
  preferenceControls?: {
    themeLight: string;
    themeDark: string;
    themeError: string;
    languageError: string;
  };
};

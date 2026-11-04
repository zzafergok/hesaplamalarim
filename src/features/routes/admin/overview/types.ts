import type { LucideIcon } from 'lucide-react';

export type AdminOverviewCard = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export type AdminOverviewCopy = {
  title: string;
  description: string;
  cards: Array<
    Omit<AdminOverviewCard, 'icon'> & {
      icon: 'activity' | 'shieldCheck' | 'database';
    }
  >;
};

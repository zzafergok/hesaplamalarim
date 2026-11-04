import type { LucideIcon } from 'lucide-react';

export type AuthHomeMetric = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export type AuthHomeCopy = {
  badge: string;
  title: string;
  description: string;
  actionLabel: string;
  metrics: Array<Omit<AuthHomeMetric, 'icon'> & { icon: 'boxes' | 'activity' | 'clock' }>;
};

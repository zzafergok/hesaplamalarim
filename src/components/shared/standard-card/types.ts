import React from 'react';
import { LucideIcon } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

export interface CardStat {
  label: string;
  color?: string;
  icon: LucideIcon;
  value: string | number;
}

export interface CardAction {
  label: string;
  icon: LucideIcon;
  onClick: (e: React.MouseEvent) => void;
  variant?: 'ghost' | 'destructive' | 'indigo' | 'rose';
}

export interface StandardCardProps {
  title: string;
  stats: CardStat[];
  viewMode: ViewMode;
  className?: string;
  onClick: () => void;
  description?: string;
  actions?: CardAction[];
  status?: {
    label: string;
    className?: string;
  };
  tags?: {
    label: string;
    className?: string;
  }[];
  progress?: {
    percent: number;
    label?: string;
  };
}

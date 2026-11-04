import { Activity, Database, ShieldCheck } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { getAdminOverviewCopy } from './i18n';
import type { AdminOverviewCard } from './types';

const cardIcons = {
  activity: Activity,
  shieldCheck: ShieldCheck,
  database: Database,
} as const;

export async function AdminOverviewScreen() {
  const locale = await getCurrentLocale();
  const copy = getAdminOverviewCopy(locale);
  const cards: AdminOverviewCard[] = copy.cards.map((card) => ({
    ...card,
    icon: cardIcons[card.icon],
  }));

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label} className="border-gunmetal bg-obsidian">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-ash">
              {card.label}
            </CardTitle>
            <card.icon className="h-4 w-4 text-tulpar-blue" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-black uppercase tracking-tight text-titanium">
              {card.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

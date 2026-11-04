import { Activity, Boxes, Clock3 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { getAuthHomeCopy } from './i18n';
import type { AuthHomeMetric } from './types';

const metricIcons = {
  boxes: Boxes,
  activity: Activity,
  clock: Clock3,
} as const;

export async function AuthHomeScreen() {
  const locale = await getCurrentLocale();
  const copy = getAuthHomeCopy(locale);
  const metrics: AuthHomeMetric[] = copy.metrics.map((metric) => ({
    ...metric,
    icon: metricIcons[metric.icon],
  }));

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.label} className="border-gunmetal bg-obsidian">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs uppercase tracking-widest text-ash">
              {metric.label}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-tulpar-blue" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black uppercase tracking-tight">
              {metric.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

'use client';

import {
  Layers,
  Palette,
  LayoutDashboard,
  ShieldCheck,
  Globe2,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/core/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import type { FeatureCardItem, PublicHomeCopy } from '../types';

const iconMap: Record<FeatureCardItem['icon'], LucideIcon> = {
  layers: Layers,
  palette: Palette,
  layout: LayoutDashboard,
  shield: ShieldCheck,
  globe: Globe2,
  check: CheckCircle2,
};

export function FeatureInfoCards({
  featuresSection,
}: {
  featuresSection: PublicHomeCopy['featuresSection'];
}) {
  return (
    <section className="space-y-6">
      <div className="mx-auto max-w-2xl space-y-2 text-center">
        <Badge
          variant="outline"
          className="text-2xs font-bold uppercase tracking-wider"
        >
          {featuresSection.badge}
        </Badge>
        <h2 className="font-mono text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
          {featuresSection.title}
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          {featuresSection.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuresSection.cards.map((card) => {
          const Icon = iconMap[card.icon] ?? Layers;
          return (
            <Card
              key={card.title}
              className="flex flex-col justify-between border-border/70 bg-card transition-all duration-200 hover:border-border hover:shadow-md"
            >
              <CardHeader className="space-y-3 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-muted/50 text-foreground">
                    <Icon className="h-5 w-5 text-tulpar-blue" />
                  </div>
                  <Badge variant="secondary" className="text-2xs font-semibold">
                    {card.badge}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {card.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-5 pt-0 sm:p-6">
                <ul className="space-y-2 border-t border-border/40 pt-4 text-xs text-muted-foreground">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tulpar-blue" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

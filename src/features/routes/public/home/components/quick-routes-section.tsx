'use client';

import {
  Globe2,
  Sparkles,
  User,
  Shield,
  Lock,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/core/badge';
import { Card } from '@/components/core/card';
import { Link } from '@/components/core/link';
import type { PublicHomeCopy, QuickRouteItem } from '../types';

const routeIconMap: Record<QuickRouteItem['icon'], LucideIcon> = {
  globe: Globe2,
  sparkles: Sparkles,
  user: User,
  shield: Shield,
  lock: Lock,
};

export function QuickRoutesSection({
  quickRoutesSection,
}: {
  quickRoutesSection: PublicHomeCopy['quickRoutesSection'];
}) {
  return (
    <section className="space-y-6">
      <div className="mx-auto max-w-2xl space-y-2 text-center">
        <Badge
          variant="outline"
          className="text-2xs font-bold uppercase tracking-wider"
        >
          {quickRoutesSection.badge}
        </Badge>
        <h2 className="font-mono text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
          {quickRoutesSection.title}
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          {quickRoutesSection.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickRoutesSection.routes.map((route) => {
          const Icon = routeIconMap[route.icon] ?? Globe2;
          return (
            <Link
              key={route.href}
              href={route.href}
              className="group block focus:outline-none"
            >
              <Card className="flex items-center justify-between border-border/70 bg-card p-5 transition-all duration-200 group-hover:border-tulpar-blue/50 group-hover:shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/40 text-foreground transition-colors group-hover:border-tulpar-blue/30 group-hover:text-tulpar-blue">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground transition-colors group-hover:text-tulpar-blue">
                        {route.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-3xs px-1.5 py-0 font-semibold"
                      >
                        {route.badge}
                      </Badge>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                      {route.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tulpar-blue" />
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

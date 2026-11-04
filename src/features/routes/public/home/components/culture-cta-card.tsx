'use client';

import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { Link } from '@/components/core/link';
import type { PublicHomeCopy } from '../types';

export function CultureCtaCard({
  cultureCallout,
}: {
  cultureCallout: PublicHomeCopy['cultureCallout'];
}) {
  return (
    <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card to-muted/30 shadow-sm transition-all hover:border-tulpar-blue/40">
      <CardHeader className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-tulpar-firuze/40 text-2xs font-bold uppercase tracking-wider text-tulpar-firuze"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                {cultureCallout.badge}
              </Badge>
            </div>
            <CardTitle className="font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {cultureCallout.title}
            </CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {cultureCallout.description}
            </CardDescription>
          </div>

          <div className="shrink-0">
            <Button
              asChild
              size="lg"
              className="w-full font-bold shadow-sm sm:w-auto"
            >
              <Link href="/culture">
                <span>{cultureCallout.action}</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 pt-0 sm:px-8 sm:pb-8">
        <div className="grid grid-cols-1 gap-3 border-t border-border/50 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {cultureCallout.features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-2.5 rounded-lg border border-border/40 bg-background/50 p-3 text-xs leading-snug text-foreground/90"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-tulpar-blue" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

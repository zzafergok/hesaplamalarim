'use client';

import * as React from 'react';
import { Check, Eye, Plus } from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card } from '@/components/core/card';
import {
  CATEGORY_CONFIG,
  DEFAULT_IMPORTANCE_CONFIG,
  IMPORTANCE_CONFIG,
} from './constants';
import { FigureCardContent } from './figure-card-content';
import type { FigureCardProps } from './types';

export function FigureCard({
  figure,
  onInspect,
  onSelectForStudio,
  isSelectedInStudio,
}: FigureCardProps) {
  const config = CATEGORY_CONFIG[figure.category] ?? CATEGORY_CONFIG.nature;
  const IconComponent = config.icon;
  const importance =
    IMPORTANCE_CONFIG[figure.importance] ?? DEFAULT_IMPORTANCE_CONFIG;

  return (
    <Card
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-card/95 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-950/90 ${
        isSelectedInStudio
          ? 'border-tulpar-blue ring-2 ring-tulpar-blue/50 shadow-lg shadow-tulpar-blue/10'
          : 'border-border/70 hover:border-border'
      }`}
    >
      <div>
        <div className={`h-0.5 w-full ${config.topAccentBg} opacity-60`} />

        <div className="flex items-center justify-between border-b border-border/40 bg-muted/20 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/60 shadow-sm dark:bg-zinc-900">
              <IconComponent className={`h-4 w-4 ${config.accentColor}`} />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-tulpar-blue">
                {figure.nameTr}
              </h3>
              <p className="truncate font-mono text-[11px] text-muted-foreground/80">
                {figure.nameEn}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            size="sm"
            className={`shrink-0 rounded-md font-mono text-[10px] font-semibold ${importance.badgeStyle}`}
          >
            {importance.label}
          </Badge>
        </div>

        <FigureCardContent figure={figure} config={config} />
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border/50 bg-muted/20 p-3">
        {onSelectForStudio && (
          <Button
            variant={isSelectedInStudio ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelectForStudio(figure)}
            className={`h-8 flex-1 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 ${
              isSelectedInStudio
                ? 'bg-tulpar-blue text-white hover:bg-tulpar-blue/90'
                : 'border-border/80 bg-background/80 text-foreground hover:border-tulpar-blue/40 hover:bg-muted'
            }`}
          >
            {isSelectedInStudio ? (
              <>
                <Check className="mr-1.5 h-3.5 w-3.5" />
                Seçildi
              </>
            ) : (
              <>
                <Plus className="mr-1.5 h-3.5 w-3.5 text-tulpar-blue" />
                Stüdyoya Ekle
              </>
            )}
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onInspect(figure)}
          className="h-8 rounded-lg border-border/80 bg-background/80 px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Eye className="mr-1.5 h-3.5 w-3.5" />
          İncele
        </Button>
      </div>
    </Card>
  );
}

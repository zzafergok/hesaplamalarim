'use client';

import * as React from 'react';
import {
  Check,
  Compass,
  Eye,
  Landmark,
  Plus,
} from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card, CardContent } from '@/components/core/card';
import { ColorCardHeader } from './color-card-header';
import { ColorPromptPreview } from './color-prompt-preview';
import { DIRECTION_LABELS, type ColorCardProps } from './types';

export function ColorCard({
  color,
  onInspect,
  onSelectForStudio,
  isSelectedInStudio,
}: ColorCardProps) {
  const directionInfo = color.cosmologicalDirection
    ? DIRECTION_LABELS[color.cosmologicalDirection]
    : undefined;

  return (
    <Card
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-card/95 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-950/90 ${
        isSelectedInStudio
          ? 'border-tulpar-gold shadow-lg shadow-tulpar-gold/10 ring-2 ring-tulpar-gold/50'
          : 'border-border/70 hover:border-border'
      }`}
    >
      <div>
        <div
          className="h-0.5 w-full opacity-60"
          style={{ backgroundColor: color.hex }}
        />

        <ColorCardHeader color={color} />

        <CardContent className="space-y-3 p-4">
          <div
            className="relative h-14 w-full overflow-hidden rounded-lg border border-border/40 shadow-inner"
            style={{ backgroundColor: color.hex }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
              {directionInfo ? (
                <Badge
                  variant="outline"
                  size="sm"
                  className="rounded border-black/40 bg-black/60 font-mono text-[9px] font-semibold text-white backdrop-blur-sm"
                >
                  <Compass className="mr-1 h-2.5 w-2.5 text-tulpar-gold" />
                  {directionInfo.label} • {directionInfo.element}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  size="sm"
                  className="rounded border-black/30 bg-black/50 font-mono text-[9px] text-white/90 backdrop-blur-sm"
                >
                  Kadim Türk Sanatı
                </Badge>
              )}
              <Badge
                variant="outline"
                size="sm"
                className="border-transparent font-mono text-[10px] font-bold text-white drop-shadow"
              >
                {color.hex}
              </Badge>
            </div>
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-foreground">
            {color.description}
          </p>

          <div className="flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              size="sm"
              className="rounded-md border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              Türk Rengi
            </Badge>
            {color.meanings.slice(0, 3).map((meaning) => (
              <Badge
                key={meaning}
                variant="secondary"
                size="sm"
                className="rounded-md bg-muted/40 px-2 py-0.5 text-[10px] font-normal text-muted-foreground/90"
              >
                {meaning}
              </Badge>
            ))}
          </div>

          <div
            title={color.origin}
            className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/30 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/50"
          >
            <Landmark className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span className="font-medium text-foreground/80">Köken:</span>
            <span className="flex-1 truncate text-muted-foreground/90">
              {color.origin}
            </span>
          </div>

          <ColorPromptPreview promptKeyword={color.promptKeyword} />
        </CardContent>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border/50 bg-muted/20 p-3">
        {onSelectForStudio && (
          <Button
            variant={isSelectedInStudio ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelectForStudio(color)}
            className={`h-8 flex-1 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 ${
              isSelectedInStudio
                ? 'bg-tulpar-gold text-slate-950 hover:bg-tulpar-gold/90'
                : 'border-border/80 bg-background/80 text-foreground hover:border-tulpar-gold/40 hover:bg-muted'
            }`}
          >
            {isSelectedInStudio ? (
              <>
                <Check className="mr-1.5 h-3.5 w-3.5" />
                Seçildi
              </>
            ) : (
              <>
                <Plus className="mr-1.5 h-3.5 w-3.5 text-tulpar-gold" />
                Stüdyoya Ekle
              </>
            )}
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onInspect(color)}
          className="h-8 rounded-lg border-border/80 bg-background/80 px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Eye className="mr-1.5 h-3.5 w-3.5" />
          İncele
        </Button>
      </div>
    </Card>
  );
}

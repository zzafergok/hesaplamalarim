'use client';

import * as React from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Landmark,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { CardContent } from '@/components/core/card';
import type { TurkishCulturalFigure } from '@/constants/turkish-culture';
import type { CategoryVisualConfig } from './types';

interface FigureCardContentProps {
  figure: TurkishCulturalFigure;
  config: CategoryVisualConfig;
}

export function FigureCardContent({
  figure,
  config,
}: FigureCardContentProps) {
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [copiedPrompt, setCopiedPrompt] = React.useState(false);

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(figure.promptKeyword);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 1800);
  };

  return (
    <CardContent className="space-y-3 p-4">
      <p className="line-clamp-2 text-sm leading-relaxed text-foreground">
        {figure.description}
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        <Badge
          variant="outline"
          size="sm"
          className="rounded-md border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
        >
          {config.label}
        </Badge>
        {figure.meanings.slice(0, 3).map((meaning) => (
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
        title={figure.origin}
        className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/30 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/50"
      >
        <Landmark className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
        <span className="font-medium text-foreground/80">Köken:</span>
        <span className="truncate flex-1 text-muted-foreground/90">
          {figure.origin}
        </span>
      </div>

      <div className="border-t border-border/30 pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPrompt(!showPrompt)}
          className="h-6 w-full justify-between rounded-md px-2 text-[11px] font-medium text-muted-foreground opacity-75 transition-opacity hover:opacity-100 hover:text-tulpar-blue"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-tulpar-blue/80" />
            AI Üretim Promptu
          </span>
          {showPrompt ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </Button>

        {showPrompt && (
          <div className="mt-2 rounded-lg border border-border/70 bg-void-black/90 p-2.5 shadow-inner">
            <div className="flex items-center justify-between gap-2">
              <span className="line-clamp-2 font-mono text-[10px] text-titanium/90">
                {figure.promptKeyword}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyPrompt}
                className="h-6 shrink-0 px-2 text-[10px] text-tulpar-blue hover:text-tulpar-blue/80"
              >
                {copiedPrompt ? (
                  <Check className="h-3 w-3 text-signal-green" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </CardContent>
  );
}

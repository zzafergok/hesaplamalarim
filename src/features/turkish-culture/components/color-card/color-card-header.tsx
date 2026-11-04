'use client';

import * as React from 'react';
import { Check, Copy, Palette } from 'lucide-react';
import { Button } from '@/components/core/button';
import type { TurkishCulturalColor } from '@/constants/turkish-culture';

interface ColorCardHeaderProps {
  color: TurkishCulturalColor;
}

export function ColorCardHeader({ color }: ColorCardHeaderProps) {
  const [copiedHex, setCopiedHex] = React.useState(false);

  const handleCopyHex = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color.hex);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 1800);
  };

  return (
    <div className="flex items-center justify-between border-b border-border/40 bg-muted/20 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/60 shadow-sm dark:bg-zinc-900">
          <Palette className="h-4 w-4 text-tulpar-gold" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-tulpar-blue">
            {color.nameTr}
          </h3>
          <p className="truncate font-mono text-[11px] text-muted-foreground/80">
            {color.nameEn}
            {color.historicalName ? ` • ${color.historicalName}` : ''}
          </p>
        </div>
      </div>

      <Button
        size="sm"
        variant="ghost"
        onClick={handleCopyHex}
        className="h-6 rounded-md border border-border/60 bg-background/90 px-2 font-mono text-[10px] font-bold text-foreground shadow-sm hover:bg-muted active:scale-95"
      >
        {copiedHex ? (
          <>
            <Check className="mr-1 h-3 w-3 text-signal-green" />
            Kopyalandı
          </>
        ) : (
          <>
            <Copy className="mr-1 h-3 w-3 opacity-70" />
            {color.hex}
          </>
        )}
      </Button>
    </div>
  );
}

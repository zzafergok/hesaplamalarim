'use client';

import * as React from 'react';
import { Sparkles, X } from 'lucide-react';
import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import type {
  TurkishCulturalColor,
  TurkishCulturalFigure,
} from '@/constants/turkish-culture';
import type { PromptStudioSelection } from '@/features/turkish-culture/types';

interface SelectionBadgesProps {
  selectedColor?: TurkishCulturalColor;
  selectedFigure?: TurkishCulturalFigure;
  onUpdateSelection: (updates: Partial<PromptStudioSelection>) => void;
}

export function SelectionBadges({
  selectedColor,
  selectedFigure,
  onUpdateSelection,
}: SelectionBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border/60 bg-muted/30 p-3">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Renk:
        </span>
        {selectedColor ? (
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-tulpar-gold/50 bg-tulpar-gold/10 px-3 py-1 font-mono text-xs text-tulpar-gold shadow-sm"
          >
            <div
              className="h-3 w-3 rounded-full border border-white/40 shadow-sm"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <span>{selectedColor.nameTr}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onUpdateSelection({ selectedColorId: undefined })}
              className="h-4 w-4 p-0 hover:bg-transparent hover:opacity-75 focus:outline-none"
              aria-label="Rengi temizle"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ) : (
          <span className="rounded-full border border-dashed border-border px-2.5 py-0.5 text-xs text-muted-foreground/70">
            Aşağıdan renk seçin
          </span>
        )}
      </div>

      <div className="hidden h-4 w-px bg-border sm:block" />

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Figür / Sembol:
        </span>
        {selectedFigure ? (
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full border-tulpar-blue/50 bg-tulpar-blue/10 px-3 py-1 font-mono text-xs text-tulpar-blue shadow-sm"
          >
            <Sparkles className="h-3 w-3 text-tulpar-blue" />
            <span>{selectedFigure.nameTr}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onUpdateSelection({ selectedFigureId: undefined })}
              className="h-4 w-4 p-0 hover:bg-transparent hover:opacity-75 focus:outline-none"
              aria-label="Figürü temizle"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ) : (
          <span className="rounded-full border border-dashed border-border px-2.5 py-0.5 text-xs text-muted-foreground/70">
            Aşağıdan figür seçin
          </span>
        )}
      </div>
    </div>
  );
}

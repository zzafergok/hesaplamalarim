'use client';

import * as React from 'react';
import { Wand2, X } from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card, CardContent } from '@/components/core/card';
import {
  TURKISH_CULTURE_COLORS,
  TURKISH_CULTURE_FIGURES,
} from '@/constants/turkish-culture';
import { ART_STYLES } from './constants';
import { PromptPreviewBox } from './prompt-preview-box';
import { SelectionBadges } from './selection-badges';
import { StylePicker } from './style-picker';
import type { PromptStudioBarProps } from './types';

export function PromptStudioBar({
  selection,
  onUpdateSelection,
  onResetSelection,
}: PromptStudioBarProps) {
  const selectedColor = TURKISH_CULTURE_COLORS.find(
    (c) => c.id === selection.selectedColorId,
  );
  const selectedFigure = TURKISH_CULTURE_FIGURES.find(
    (f) => f.id === selection.selectedFigureId,
  );
  const selectedStyle =
    ART_STYLES.find((s) => s.id === selection.artStyle) ?? ART_STYLES[0];

  const generatedPrompt = React.useMemo(() => {
    const parts: string[] = [];

    if (selectedFigure) {
      parts.push(selectedFigure.promptKeyword);
    } else {
      parts.push('mythical ancient Turkish cultural emblem');
    }

    if (selectedColor) {
      parts.push(`featuring ${selectedColor.promptKeyword}`);
    }

    parts.push(selectedStyle.promptSuffix);
    parts.push('--ar 16:9 --v 6.1 --style raw');

    return `/imagine prompt: ${parts.join(', ')}`;
  }, [selectedColor, selectedFigure, selectedStyle]);

  const hasSelection = Boolean(
    selection.selectedColorId || selection.selectedFigureId,
  );

  return (
    <Card className="relative overflow-hidden rounded-xl border border-tulpar-blue/30 bg-gradient-to-r from-card via-card/95 to-card/90 shadow-xl backdrop-blur-xl">
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-tulpar-blue/10 blur-2xl" />

      <CardContent className="relative z-10 space-y-4 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-tulpar-blue/40 bg-tulpar-blue/15 text-tulpar-blue shadow-inner">
              <Wand2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black uppercase tracking-tight text-foreground">
                  Yapay Zeka (AI) Prompt Stüdyosu
                </h2>
                <Badge
                  variant="outline"
                  className="rounded-full border-tulpar-blue/30 bg-tulpar-blue/10 px-2 py-0 font-mono text-[10px] text-tulpar-blue"
                >
                  LIVE STUDIO
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Kartlardan renk ve sembol seçin; sanat tarzını belirleyip anında
                üretim promptu oluşturun.
              </p>
            </div>
          </div>

          {hasSelection && (
            <Button
              variant="outline"
              size="sm"
              onClick={onResetSelection}
              className="h-8 rounded-full border-border/80 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Seçimleri Temizle
            </Button>
          )}
        </div>

        <SelectionBadges
          selectedColor={selectedColor}
          selectedFigure={selectedFigure}
          onUpdateSelection={onUpdateSelection}
        />

        <StylePicker
          artStyle={selection.artStyle}
          onUpdateSelection={onUpdateSelection}
        />

        <PromptPreviewBox prompt={generatedPrompt} />
      </CardContent>
    </Card>
  );
}

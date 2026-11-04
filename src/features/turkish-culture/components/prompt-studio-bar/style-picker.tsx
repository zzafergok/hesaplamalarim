'use client';

import * as React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/core/button';
import { ART_STYLES } from './constants';
import type { ArtStyleOption, PromptStudioSelection } from '@/features/turkish-culture/types';

interface StylePickerProps {
  artStyle: ArtStyleOption;
  onUpdateSelection: (updates: Partial<PromptStudioSelection>) => void;
}

export function StylePicker({
  artStyle,
  onUpdateSelection,
}: StylePickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Sanat & Render Tarzı:
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {ART_STYLES.map((style) => {
          const isSelected = artStyle === style.id;
          return (
            <Button
              key={style.id}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() =>
                onUpdateSelection({ artStyle: style.id as ArtStyleOption })
              }
              className={`h-8 rounded-lg text-xs transition-all duration-200 ${
                isSelected
                  ? 'bg-tulpar-blue text-white shadow-md shadow-tulpar-blue/20'
                  : 'border-border/70 hover:border-tulpar-blue/40'
              }`}
            >
              <Palette className="mr-1.5 h-3.5 w-3.5 opacity-80" />
              {style.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

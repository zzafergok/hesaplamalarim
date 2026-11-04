'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Input } from '@/components/core/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/core/tabs';
import type { ActiveCategoryFilter, CultureFilterState } from '../types';

interface FilterToolbarProps {
  filterState: CultureFilterState;
  onUpdateFilter: (updates: Partial<CultureFilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const CATEGORY_TABS: Array<{ id: ActiveCategoryFilter; label: string }> = [
  { id: 'all', label: 'Tümü' },
  { id: 'colors', label: 'Renkler & Yönler' },
  { id: 'nature', label: 'Doğa & Ağaçlar' },
  { id: 'animals', label: 'Hayvanlar & Ongunlar' },
  { id: 'mythology', label: 'Mitoloji & Efsaneler' },
  { id: 'celestial', label: 'Göksel Simgeler' },
];

const DIRECTION_FILTERS = [
  { id: 'all', label: 'Tüm Yönler' },
  { id: 'east', label: '🧭 Doğu (Gök)' },
  { id: 'west', label: '🧭 Batı (Ak)' },
  { id: 'south', label: '🧭 Güney (Kızıl)' },
  { id: 'north', label: '🧭 Kuzey (Kara)' },
  { id: 'center', label: '🧭 Merkez (Sarı)' },
];

const IMPORTANCE_FILTERS = [
  { id: 'all', label: 'Tüm Seviyeler' },
  { id: 'very_high', label: '⭐ Çok Yüksek' },
  { id: 'high', label: '🔷 Yüksek' },
  { id: 'medium', label: '▫️ Orta' },
];

export function FilterToolbar({
  filterState,
  onUpdateFilter,
  onResetFilters,
  totalResults,
}: FilterToolbarProps) {
  const hasActiveFilters =
    Boolean(filterState.searchQuery) ||
    filterState.category !== 'all' ||
    filterState.direction !== 'all' ||
    filterState.importance !== 'all';

  return (
    <div className="space-y-3 rounded-xl border border-border/70 bg-card/60 p-4 shadow-sm backdrop-blur-md">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={filterState.searchQuery}
            onChange={(e) => onUpdateFilter({ searchQuery: e.target.value })}
            placeholder="Renk, sembol, efsane, köken veya prompt ara (örn: Bozkurt, İznik, Şahmeran, #E30A17)..."
            className="h-10 rounded-lg border-border/70 bg-background/80 pl-10 pr-9 text-xs sm:text-sm placeholder:text-muted-foreground/60 shadow-inner focus-visible:border-tulpar-blue"
          />
          {filterState.searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onUpdateFilter({ searchQuery: '' })}
              className="absolute right-1 top-1 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5">
          <Badge
            variant="outline"
            className="rounded-full border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            Toplam: <strong className="ml-1 text-foreground">{totalResults}</strong>
          </Badge>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              className="h-8 rounded-full border-border/80 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Filtreleri Temizle
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={filterState.category}
          onValueChange={(val) =>
            onUpdateFilter({ category: val as ActiveCategoryFilter })
          }
          className="w-full overflow-x-auto sm:w-auto"
        >
          <TabsList className="h-auto flex-wrap justify-start gap-1 rounded-lg border border-border/50 bg-background/60 p-1">
            {CATEGORY_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-md px-3 py-1.5 text-xs font-semibold data-[state=active]:bg-tulpar-blue data-[state=active]:text-white"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap items-center gap-1.5">
          {filterState.category === 'colors' && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Yön:
              </span>
              {DIRECTION_FILTERS.map((dir) => (
                <Button
                  key={dir.id}
                  variant={
                    filterState.direction === dir.id ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => onUpdateFilter({ direction: dir.id })}
                  className={`h-7 rounded-md px-2 text-[11px] ${
                    filterState.direction === dir.id
                      ? 'bg-tulpar-gold text-slate-950 font-bold hover:bg-tulpar-gold/90'
                      : 'border-border/60 hover:border-tulpar-gold/40'
                  }`}
                >
                  {dir.label}
                </Button>
              ))}
            </div>
          )}

          {filterState.category !== 'colors' && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Önem:
              </span>
              {IMPORTANCE_FILTERS.map((imp) => (
                <Button
                  key={imp.id}
                  variant={
                    filterState.importance === imp.id ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() =>
                    onUpdateFilter({
                      importance: imp.id as CultureFilterState['importance'],
                    })
                  }
                  className={`h-7 rounded-md px-2 text-[11px] ${
                    filterState.importance === imp.id
                      ? 'bg-tulpar-blue text-white font-bold'
                      : 'border-border/60 hover:border-tulpar-blue/40'
                  }`}
                >
                  {imp.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

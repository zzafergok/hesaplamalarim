'use client';

import * as React from 'react';
import { Check, Compass, Copy, Layers, Sparkles, Tag } from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/core/dialog';
import type { TurkishCulturalItem } from '@/constants/turkish-culture';

interface DetailDialogProps {
  item: TurkishCulturalItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForStudio?: (item: TurkishCulturalItem) => void;
}

export function DetailDialog({
  item,
  isOpen,
  onClose,
  onSelectForStudio,
}: DetailDialogProps) {
  const [copiedPrompt, setCopiedPrompt] = React.useState(false);
  const [copiedHex, setCopiedHex] = React.useState(false);

  if (!item) return null;

  const isColor = item.category === 'colors';

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(item.promptKeyword);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 1800);
  };

  const handleCopyHex = () => {
    if ('hex' in item) {
      navigator.clipboard.writeText(item.hex);
      setCopiedHex(true);
      setTimeout(() => setCopiedHex(false), 1800);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-2xl backdrop-blur-2xl">
        <DialogHeader className="space-y-3 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full border-tulpar-blue/40 bg-tulpar-blue/10 px-3 py-0.5 text-xs font-semibold text-tulpar-blue"
            >
              {isColor
                ? 'Türk Rengi & Kozmoloji'
                : `Kültür Sembolü (${item.category})`}
            </Badge>
            {'importance' in item && (
              <Badge variant="warning" size="sm" className="rounded-full px-2.5">
                {item.importance === 'very_high'
                  ? '⭐ Çok Yüksek Öncelik'
                  : item.importance === 'high'
                    ? '🔷 Yüksek Öncelik'
                    : '▫️ Orta Öncelik'}
              </Badge>
            )}
            {'cosmologicalDirection' in item && item.cosmologicalDirection && (
              <Badge variant="secondary" size="sm" className="rounded-full px-2.5">
                <Compass className="mr-1 h-3 w-3 text-tulpar-gold" />
                Yön: {item.cosmologicalDirection.toUpperCase()}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
                {item.nameTr}
              </DialogTitle>
              <DialogDescription className="font-mono text-xs sm:text-sm text-muted-foreground mt-0.5">
                {item.nameEn}
                {'historicalName' in item && item.historicalName
                  ? ` • Tarihsel Adı: ${item.historicalName}`
                  : ''}
              </DialogDescription>
            </div>

            {isColor && (
              <div className="flex items-center gap-2">
                <div
                  className="h-10 w-10 shrink-0 rounded-xl border border-white/20 shadow-md"
                  style={{ backgroundColor: item.hex }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyHex}
                  className="h-8 rounded-lg font-mono text-xs"
                >
                  {copiedHex ? (
                    <Check className="mr-1 h-3 w-3 text-signal-green" />
                  ) : (
                    <Copy className="mr-1 h-3 w-3" />
                  )}
                  {item.hex}
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="my-3 space-y-4 text-sm">
          <div className="relative overflow-hidden rounded-xl border border-border/70 bg-muted/20 p-4 shadow-sm">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-tulpar-gold/10 blur-xl" />
            <h4 className="flex items-center text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-tulpar-gold" />
              Kültürel & Mitolojik Anlatı
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2 rounded-xl border border-border/50 bg-muted/15 p-3.5">
              <h5 className="flex items-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Tag className="mr-1.5 h-3.5 w-3.5" />
                Sembolik Anlamlar
              </h5>
              <div className="flex flex-wrap gap-1">
                {item.meanings.map((meaning) => (
                  <Badge
                    key={meaning}
                    variant="outline"
                    size="sm"
                    className="rounded-md border-border/60 bg-background/50 px-2 text-[10px] text-muted-foreground"
                  >
                    {meaning}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2 rounded-xl border border-border/50 bg-muted/15 p-3.5">
              <h5 className="flex items-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Layers className="mr-1.5 h-3.5 w-3.5" />
                Tarihsel Köken & Alanlar
              </h5>
              <p className="text-xs text-muted-foreground">{item.origin}</p>
              {'usages' in item && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.usages.map((u) => (
                    <Badge
                      key={u}
                      variant="secondary"
                      size="sm"
                      className="rounded-md px-2 text-[10px]"
                    >
                      {u}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-tulpar-blue/40 bg-void-black/90 p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="flex items-center font-mono text-xs font-bold text-tulpar-blue">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Yapay Zeka (AI Prompt) Anahtarı
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyPrompt}
                className="h-7 rounded-lg px-2.5 text-xs text-ash hover:text-white"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="mr-1 h-3 w-3 text-signal-green" />
                    Kopyalandı
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" />
                    Kopyala
                  </>
                )}
              </Button>
            </div>
            <p className="select-all rounded-lg border border-gunmetal/40 bg-obsidian/80 p-2.5 font-mono text-xs text-titanium/90 leading-relaxed">
              {item.promptKeyword}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 border-t border-border/50 pt-4">
          {onSelectForStudio && (
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                onSelectForStudio(item);
                onClose();
              }}
              className="rounded-lg bg-tulpar-blue px-4 text-xs font-bold text-white shadow-md hover:bg-tulpar-blue/90"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Prompt Stüdyosuna Aktar
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-lg text-xs"
          >
            Kapat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

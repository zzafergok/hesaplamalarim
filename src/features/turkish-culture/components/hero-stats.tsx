'use client';

/**
 * Tulpar Kültür Tasarım Sistemi Renk Tanımları:
 * - bg-tulpar-blue / text-tulpar-blue: Göktürk Mavisi
 * - bg-tulpar-firuze / text-tulpar-firuze: İznik Firuzesi
 * - bg-tulpar-gold / text-tulpar-gold: Hakan Altını
 * - bg-alert-red / text-alert-red: Kök Boya Kızılı
 */

import * as React from 'react';
import {
  Compass,
  Crown,
  Flame,
  Layers,
  Palette,
  Sparkles,
  TreePine,
  type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Card, CardContent } from '@/components/core/card';
import { getCulturalStatistics } from '@/constants/turkish-culture';
import type { ActiveCategoryFilter } from '../types';

interface HeroStatsProps {
  activeCategory: ActiveCategoryFilter;
  onSelectCategory: (category: ActiveCategoryFilter) => void;
}

interface StatCardConfig {
  id: ActiveCategoryFilter;
  label: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  badge: string;
}

export function HeroStats({
  activeCategory,
  onSelectCategory,
}: HeroStatsProps) {
  const stats = getCulturalStatistics();

  const statCards: StatCardConfig[] = [
    {
      id: 'colors',
      label: 'Kozmoloji & Sanat Renkleri',
      value: stats.totalColors,
      subtitle: '4 Yön, Merkez & Saray Tonları',
      icon: Palette,
      iconColor: 'text-tulpar-gold',
      badge: '16 Renk',
    },
    {
      id: 'nature',
      label: 'Doğa, Ağaç & Çiçekler',
      value: 10,
      subtitle: 'Hayat Ağacı, Lale, Gül, Çınar',
      icon: TreePine,
      iconColor: 'text-tulpar-firuze',
      badge: '10 Motif',
    },
    {
      id: 'animals',
      label: 'Hayvanlar & Savaşçı Totemleri',
      value: 14,
      subtitle: 'Bozkurt, Tulpar, Kartal, Koç',
      icon: Crown,
      iconColor: 'text-tulpar-blue',
      badge: '14 Ongun',
    },
    {
      id: 'mythology',
      label: 'Mitoloji & Destan Varlıkları',
      value: stats.totalMythological,
      subtitle: 'Şahmeran, Hüma, Zümrüdüanka',
      icon: Flame,
      iconColor: 'text-alert-red',
      badge: '6 Efsane',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-card via-card/90 to-card/60 p-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:shadow-black/40 sm:p-8">
        <div className="bg-tulpar-blue/10 pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full blur-3xl" />
        <div className="bg-tulpar-gold/10 pointer-events-none absolute -bottom-12 left-1/4 h-56 w-56 rounded-full blur-3xl" />
        <div className="bg-tulpar-firuze/10 pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full blur-2xl" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-full border-tulpar-blue/40 bg-tulpar-blue/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wide text-tulpar-blue shadow-sm"
            >
              <Layers className="h-3.5 w-3.5 text-tulpar-blue" />
              TULPAR • NEXT.JS 16 ENTERPRISE ŞABLONU
            </Badge>
            <Badge
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-full border-tulpar-gold/40 bg-tulpar-gold/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wide text-tulpar-gold shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-tulpar-gold" />
              ÖĞRETİCİ REFERANS VİTRİNİ • TÜRK KÜLTÜR ATLASI
            </Badge>
            <Badge
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-full border-tulpar-firuze/40 bg-tulpar-firuze/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wide text-tulpar-firuze shadow-sm"
            >
              <Compass className="h-3.5 w-3.5 text-tulpar-firuze" />4 YÖN RENK KOZMOLOJİSİ
            </Badge>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Tulpar Kültürü & Mitoloji Bilgi Kartları
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Bu şablonu indirip projelerinde kullanacak geliştiricilere kadim
              Türk kültürünü, renk kozmolojisini ve modern Next.js mimarisini
              öğretmek amacıyla hazırlanmış referans vitrin. Göktürk
              kozmolojisinden Selçuklu taş oymalarına 40+ otantik renk,
              mitolojik sembol ve Yapay Zeka (AI Prompt) stüdyosu içeren
              uygulama temeli.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const isSelected = activeCategory === card.id;

          return (
            <Card
              key={card.id}
              onClick={() => onSelectCategory(card.id)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-card/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                isSelected
                  ? 'border-tulpar-blue ring-2 ring-tulpar-blue/40 shadow-sm shadow-tulpar-blue/10'
                  : 'border-border/70 hover:border-border'
              }`}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {card.label}
                    </p>
                    <p className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                      {card.value}
                    </p>
                    <p className="line-clamp-1 text-xs text-muted-foreground/80">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/60 shadow-sm dark:bg-zinc-900">
                      <Icon className={`h-4 w-4 ${card.iconColor}`} />
                    </div>
                    <Badge
                      variant="outline"
                      size="sm"
                      className="rounded-md border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground"
                    >
                      {card.badge}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

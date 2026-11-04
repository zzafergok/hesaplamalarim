'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  Compass,
  Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card, CardContent } from '@/components/core/card';
import { Input } from '@/components/core/input';
import { Link } from '@/components/core/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/tabs';
import { useMounted } from '@/hooks/use-mounted';
import { useGamificationStore } from '@/stores/use-gamification-store';
import {
  ALL_CALCULATORS,
  CALCULATOR_CATEGORIES,
  CalculatorCategoryId,
} from '../registry';
import { DynamicCalculatorCard } from './dynamic-calculator-card';
import { AnimatedGeometricBackdrop, GamificationHud } from './visuals';

export function CalculatorHub() {
  const mounted = useMounted();
  const discoveredIds = useGamificationStore((s) => s.discoveredIds);

  const [activeCategory, setActiveCategory] =
    useState<CalculatorCategoryId>('finans');
  const [selectedCalcId, setSelectedCalcId] =
    useState<string>('kredi-hesaplama');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCalculators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return ALL_CALCULATORS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.shortTitle.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const activeCalculator = useMemo(() => {
    return (
      ALL_CALCULATORS.find((c) => c.id === selectedCalcId) ??
      ALL_CALCULATORS[0]
    );
  }, [selectedCalcId]);

  const handleCategoryChange = (value: string) => {
    const catId = value as CalculatorCategoryId;
    setActiveCategory(catId);
    const firstInCat = ALL_CALCULATORS.find((c) => c.categoryId === catId);
    if (firstInCat) {
      setSelectedCalcId(firstInCat.id);
    }
  };

  return (
    <div className="relative w-full space-y-8">
      <AnimatedGeometricBackdrop />

      {/* 1. Oyunlaştırma (Gamification) Oyuncu Paneli */}
      <GamificationHud />

      {/* 2. Başlık ve Anlık Arama */}
      <div className="flex flex-col justify-between gap-4 border-b border-gunmetal/60 pb-5 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant="default"
              className="font-mono text-micro font-semibold uppercase tracking-wider"
            >
              7 Kategori • {ALL_CALCULATORS.length} Özel Hesaplama Sayfası
            </Badge>
          </div>
          <h2 className="font-display text-heading font-bold tracking-tight text-titanium sm:text-3xl">
            İnteraktif Hesaplama Arenası
          </h2>
          <p className="mt-1.5 max-w-2xl font-sans text-body-sm font-normal leading-relaxed text-ash">
            İster aşağıdan anında hesaplayıp{' '}
            <span className="font-semibold italic text-hesaplamalarim-blue">
              XP kazan
            </span>
            , ister her aracın kendi özel sayfasına giderek detaylı analiz yap.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ash" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hesaplama sayfası ara (Kredi, Kıdem, VKİ)..."
            className="pl-9 font-sans text-caption font-normal"
          />
          {filteredCalculators.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-lg border border-gunmetal/80 bg-obsidian p-1.5 shadow-xl">
              {filteredCalculators.map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.categoryId}/${item.id}`}
                  onClick={() => setSearchQuery('')}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-sans text-caption text-titanium transition-colors hover:bg-void-black"
                >
                  <span className="truncate font-semibold">{item.title}</span>
                  <Badge
                    variant="secondary"
                    className="ml-2 shrink-0 font-mono text-micro italic"
                  >
                    Sayfaya Git →
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Kategori Sekmeleri, Araç Sayfası Kartları & Canlı Simülatör */}
      <Tabs
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1.5 bg-void-black/90 p-1.5">
          {CALCULATOR_CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="px-3 py-2 font-sans text-compact font-semibold"
            >
              {cat.shortTitle}
            </TabsTrigger>
          ))}
        </TabsList>

        {CALCULATOR_CATEGORIES.map((cat) => {
          const categoryTools = ALL_CALCULATORS.filter(
            (c) => c.categoryId === cat.id,
          );
          return (
            <TabsContent key={cat.id} value={cat.id} className="space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-heading-sm font-bold text-titanium">
                      {cat.title}
                    </h3>
                    <p className="font-sans text-caption font-normal italic text-ash">
                      {cat.description}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="font-sans text-compact font-semibold"
                  >
                    <Link href={`/${cat.id}`}>
                      Kategori Sayfasını Aç
                      <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryTools.map((tool) => {
                    const isSelected = activeCalculator.id === tool.id;
                    const isDiscovered =
                      mounted && discoveredIds.includes(tool.id);
                    return (
                      <motion.div
                        key={tool.id}
                        whileHover={{ y: -3 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      >
                        <Card
                          className={
                            isSelected
                              ? 'border-hesaplamalarim-blue bg-hesaplamalarim-blue/10 shadow-md'
                              : 'border-gunmetal/70 bg-obsidian/90 hover:border-hesaplamalarim-blue/50'
                          }
                        >
                          <CardContent className="flex items-center justify-between gap-2 p-3.5">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCalcId(tool.id)}
                              className="h-auto flex-1 justify-start px-1 py-0.5 text-left"
                            >
                              <Calculator className="mr-2 h-4 w-4 shrink-0 text-hesaplamalarim-blue" />
                              <div className="min-w-0">
                                <div className="truncate font-display text-caption font-bold text-titanium">
                                  {tool.shortTitle}
                                </div>
                                <div className="font-mono text-micro italic">
                                  {isDiscovered ? (
                                    <span className="inline-flex items-center gap-1 font-semibold text-signal-green">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Keşfedildi
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 font-semibold text-hesaplamalarim-blue">
                                      <Compass className="h-3 w-3" />
                                      +75 XP Keşfet
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Button>

                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="shrink-0 border-gunmetal/80 px-2.5 font-sans text-micro font-semibold"
                            >
                              <Link
                                href={`/${tool.categoryId}/${tool.id}`}
                              >
                                Sayfa
                                <ArrowUpRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <DynamicCalculatorCard
                calculator={activeCalculator}
                showFullPageLink
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

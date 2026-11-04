'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Compass,
  Share2,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card, CardContent } from '@/components/core/card';
import { Link } from '@/components/core/link';
import { useMounted } from '@/hooks/use-mounted';
import { useGamificationStore } from '@/stores/use-gamification-store';
import {
  ALL_CALCULATORS,
  CALCULATOR_CATEGORIES,
  CalculatorDefinition,
} from '../registry';
import { DynamicCalculatorCard } from './dynamic-calculator-card';
import { AnimatedGeometricBackdrop, GamificationHud } from './visuals';

interface CalculatorDetailScreenProps {
  calculatorId: string;
  categoryId?: string;
  calculator?: CalculatorDefinition;
}

export function CalculatorDetailScreen({
  calculatorId,
  categoryId,
  calculator: initialCalculator,
}: CalculatorDetailScreenProps) {
  const mounted = useMounted();
  const discoveredIds = useGamificationStore((s) => s.discoveredIds);
  const [copied, setCopied] = useState(false);

  const calculator =
    initialCalculator ??
    ALL_CALCULATORS.find(
      (c) =>
        c.id === calculatorId &&
        (!categoryId || c.categoryId === categoryId),
    ) ??
    ALL_CALCULATORS.find((c) => c.id === calculatorId) ??
    ALL_CALCULATORS[0];

  const categoryMeta =
    CALCULATOR_CATEGORIES.find((c) => c.id === calculator.categoryId) ??
    CALCULATOR_CATEGORIES[0];

  const siblingCalculators = ALL_CALCULATORS.filter(
    (c) => c.categoryId === calculator.categoryId && c.id !== calculator.id,
  );

  const handleCopyUrl = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <AnimatedGeometricBackdrop />

      {/* 1. Üst Navigasyon & Paylaşım Çubuğu */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 font-sans text-compact font-medium text-ash">
          <Link href="/" className="transition-colors hover:text-titanium">
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/hesaplamalar"
            className="transition-colors hover:text-titanium"
          >
            Hesaplamalar
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href={`/hesaplamalar/${categoryMeta.id}`}
            className="transition-colors hover:text-titanium"
          >
            {categoryMeta.shortTitle}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-bold italic text-tulpar-blue">
            {calculator.shortTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopyUrl}
            className="font-sans text-compact font-semibold"
          >
            <Share2 className="mr-1.5 h-3.5 w-3.5" />
            {copied ? 'Bağlantı Kopyalandı!' : 'Sayfa Linkini Paylaş'}
          </Button>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="font-sans text-compact font-semibold"
          >
            <Link href="/hesaplamalar">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Tüm Araçlar
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. Oyunlaştırma (Gamification) HUD Paneli */}
      <GamificationHud />

      {/* 3. Ana Hesaplama Modülü */}
      <DynamicCalculatorCard calculator={calculator} showFullPageLink={false} />

      {/* 4. Aynı Kategorideki Diğer Hesaplama Görevleri */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-heading-sm font-bold text-titanium">
              {categoryMeta.shortTitle} Kategorisindeki Diğer Görevler
            </h2>
            <p className="font-sans text-caption font-normal italic text-ash">
              Yeni araçları keşfederek +75 XP Kaşif Bonusu kazanabilirsin.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="font-sans text-compact font-semibold"
          >
            <Link href={`/hesaplamalar/${categoryMeta.id}`}>
              Kategoriyi Gör
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siblingCalculators.map((item) => {
            const isDiscovered = mounted && discoveredIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link
                  href={`/hesaplamalar/${item.categoryId}/${item.id}`}
                  className="block h-full"
                >
                  <Card className="h-full border-gunmetal/70 bg-obsidian/90 transition-colors hover:border-tulpar-blue/55">
                    <CardContent className="flex h-full flex-col justify-between p-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <Badge
                            variant={isDiscovered ? 'default' : 'outline'}
                            className="font-mono text-micro font-semibold italic"
                          >
                            {isDiscovered ? (
                              <span className="inline-flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Keşfedildi
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-tulpar-blue">
                                <Compass className="h-3 w-3" />
                                +75 XP Keşif
                              </span>
                            )}
                          </Badge>
                        </div>
                        <h3 className="font-display text-body-sm font-bold text-titanium">
                          {item.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 font-sans text-compact font-normal leading-relaxed text-ash">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-3 font-mono text-2xs font-bold italic text-tulpar-blue">
                        Hesaplama Sayfasına Git →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

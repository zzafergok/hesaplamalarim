'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Compass,
} from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card, CardContent } from '@/components/core/card';
import { Link } from '@/components/core/link';
import { useMounted } from '@/hooks/use-mounted';
import { useGamificationStore } from '@/stores/use-gamification-store';
import {
  ALL_CALCULATORS,
  CALCULATOR_CATEGORIES,
  CalculatorCategoryMeta,
} from '../registry';
import { AnimatedGeometricBackdrop, GamificationHud } from './visuals';

interface CategoryDetailScreenProps {
  categoryId?: string;
  category?: CalculatorCategoryMeta;
}

export function CategoryDetailScreen({
  categoryId,
  category: initialCategory,
}: CategoryDetailScreenProps) {
  const mounted = useMounted();
  const discoveredIds = useGamificationStore((s) => s.discoveredIds);

  const category =
    initialCategory ??
    CALCULATOR_CATEGORIES.find((c) => c.id === categoryId) ??
    CALCULATOR_CATEGORIES[0];

  const tools = ALL_CALCULATORS.filter((c) => c.categoryId === category.id);
  const discoveredInCat = tools.filter(
    (t) => mounted && discoveredIds.includes(t.id),
  ).length;

  return (
    <div className="relative mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <AnimatedGeometricBackdrop />

      {/* 1. Üst Navigasyon */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 font-sans text-compact font-medium text-ash">
          <Link href="/" className="transition-colors hover:text-titanium">
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-bold italic text-hesaplamalarim-blue">
            {category.shortTitle}
          </span>
        </div>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="font-sans text-compact font-semibold"
        >
          <Link href="/">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Ana Sayfa
          </Link>
        </Button>
      </div>

      {/* 2. Oyunlaştırma HUD */}
      <GamificationHud />

      {/* 3. Kategori Başlık Kartı */}
      <div className="relative overflow-hidden rounded-2xl border border-hesaplamalarim-blue/35 bg-gradient-to-br from-obsidian via-void-black/90 to-hesaplamalarim-blue/10 p-6 shadow-md sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <Badge
              variant="default"
              className="font-mono text-micro font-semibold italic"
            >
              Kategori Keşfi: {discoveredInCat} / {tools.length} Tamamlandı
            </Badge>
            <h1 className="font-display text-heading font-bold tracking-tight text-titanium sm:text-3xl">
              {category.title}
            </h1>
            <p className="max-w-2xl font-sans text-body-sm font-normal leading-relaxed text-ash">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Kategorideki Hesaplama Araçları (Her Biri Kendi Özel Sayfasına Gider) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => {
          const isDiscovered = mounted && discoveredIds.includes(tool.id);
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.01 }}
            >
              <Link
                href={`/${tool.categoryId}/${tool.id}`}
                className="block h-full"
              >
                <Card className="relative h-full overflow-hidden border-gunmetal/70 bg-obsidian/95 transition-all hover:border-hesaplamalarim-blue/60 hover:shadow-lg">
                  <CardContent className="flex h-full flex-col justify-between p-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hesaplamalarim-blue/40 bg-hesaplamalarim-blue/15 text-hesaplamalarim-blue">
                          <Calculator className="h-4 w-4" />
                        </span>
                        <Badge
                          variant={isDiscovered ? 'default' : 'outline'}
                          className="font-mono text-micro font-semibold italic"
                        >
                          {isDiscovered ? (
                            <span className="inline-flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Keşfedildi (+25 XP)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-hesaplamalarim-blue">
                              <Compass className="h-3 w-3" />
                              Yeni Görev (+75 XP)
                            </span>
                          )}
                        </Badge>
                      </div>

                      <div>
                        <h2 className="font-display text-heading-sm font-bold text-titanium">
                          {tool.title}
                        </h2>
                        <p className="mt-1.5 font-sans text-caption font-normal leading-relaxed text-ash">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-gunmetal/60 pt-3">
                      <span className="font-mono text-2xs font-medium italic text-ash">
                        {tool.fields.length} Parametre
                      </span>
                      <span className="font-mono text-compact font-bold text-hesaplamalarim-blue">
                        Aracı Aç →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* 5. Diğer Kategoriler Hızlı Geçiş */}
      <div className="flex flex-wrap items-center gap-2 border-t border-gunmetal/60 pt-6">
        <span className="mr-2 font-sans text-2xs font-semibold italic text-ash">
          Diğer Kategoriler:
        </span>
        {CALCULATOR_CATEGORIES.filter((c) => c.id !== category.id).map((cat) => (
          <Button
            key={cat.id}
            asChild
            variant="outline"
            size="sm"
            className="font-sans text-compact font-semibold"
          >
            <Link href={`/${cat.id}`}>{cat.shortTitle}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

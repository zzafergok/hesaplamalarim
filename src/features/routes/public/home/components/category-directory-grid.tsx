'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card, CardContent } from '@/components/core/card';
import { Link } from '@/components/core/link';
import { getCategoryIcon } from '@/components/layout/public-navbar';
import {
  ALL_CALCULATORS,
  CALCULATOR_CATEGORIES,
} from '@/features/calculators/registry';

export function CategoryDirectoryGrid() {
  return (
    <div className="w-full space-y-8">
      {/* Başlık Bölümü */}
      <div className="flex flex-col justify-between gap-3 border-b border-gunmetal/60 pb-5 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant="default"
              className="font-mono text-micro font-semibold uppercase tracking-wider"
            >
              7 Kategori • 33 Özel Hesaplama Sayfası
            </Badge>
          </div>
          <h2 className="font-display text-heading font-bold tracking-tight text-titanium sm:text-3xl">
            Tüm Hesaplama Kategorileri
          </h2>
          <p className="mt-1 max-w-2xl font-sans text-body-sm font-normal text-ash">
            Her işlem kendi bağımsız SEO uyumlu sayfasında çalışır. İlgilendiğiniz
            kategoriyi seçerek doğrudan hesaplama yapmaya başlayın.
          </p>
        </div>
      </div>

      {/* 7 Kategori Kartı Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CALCULATOR_CATEGORIES.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.id);
          const tools = ALL_CALCULATORS.filter((c) => c.categoryId === cat.id);

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Card className="flex h-full flex-col justify-between border-gunmetal/70 bg-obsidian/90 transition-colors hover:border-hesaplamalarim-blue/50 hover:shadow-lg">
                <CardContent className="flex h-full flex-col justify-between p-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-hesaplamalarim-blue/40 bg-hesaplamalarim-blue/10 text-hesaplamalarim-blue">
                        <Icon className="h-5 w-5" />
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-mono text-micro font-semibold"
                      >
                        {tools.length} Araç
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-display text-body font-bold text-titanium">
                        {cat.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 font-sans text-caption text-ash">
                        {cat.description}
                      </p>
                    </div>

                    {/* Araç Listesi */}
                    <div className="space-y-1 pt-2 border-t border-gunmetal/40">
                      {tools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={`/${tool.categoryId}/${tool.id}`}
                          className="group flex items-center justify-between rounded px-2 py-1 font-sans text-compact text-titanium transition-colors hover:bg-gunmetal/30 hover:text-hesaplamalarim-blue"
                        >
                          <span className="truncate">{tool.shortTitle}</span>
                          <span className="font-mono text-2xs text-ash transition-colors group-hover:text-hesaplamalarim-blue">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-gunmetal/30">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full justify-between font-sans text-compact font-semibold"
                    >
                      <Link href={`/${cat.id}`}>
                        <span>{cat.shortTitle} Sayfasını Aç</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


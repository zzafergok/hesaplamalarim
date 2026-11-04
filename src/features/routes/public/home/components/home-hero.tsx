'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Calculator, Sparkles, Trophy } from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import type { PublicHomeCopy } from '../types';

export function HomeHero({
  badges,
  hero,
}: {
  badges: PublicHomeCopy['badges'];
  hero: PublicHomeCopy['hero'];
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-hesaplamalarim-blue/35 bg-gradient-to-br from-obsidian via-void-black/95 to-hesaplamalarim-blue/10 p-6 shadow-xl sm:p-10 lg:p-12">
      {/* Animated Floating Geometric Shapes Inside Hero */}
      <motion.div
        animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rotate-12 rounded-3xl border border-hesaplamalarim-blue/25 bg-hesaplamalarim-blue/10"
      />
      <motion.div
        animate={{ rotate: [360, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-16 -right-12 h-64 w-64 rounded-full border border-dashed border-signal-green/25 bg-signal-green/5"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Badge
                variant={idx === 0 ? 'default' : 'secondary'}
                className="font-mono text-micro font-semibold uppercase tracking-wider"
              >
                {idx === 0 && <Sparkles className="mr-1 h-3 w-3" />}
                {badge}
              </Badge>
            </motion.div>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-display font-bold tracking-tight text-titanium"
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-3xl font-sans text-body font-normal leading-relaxed text-ash"
        >
          {hero.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mt-2 font-sans text-caption font-medium italic text-hesaplamalarim-blue"
        >
          Her hesaplama aracı kendi özel SEO sayfasında çalışır; hesaplama
          yaptıkça XP ve kaşif rozetleri kazanırsın.
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="default"
            className="bg-hesaplamalarim-blue font-sans text-body-sm font-bold text-primary-foreground shadow-md hover:bg-hesaplamalarim-blue/90"
          >
            <Link href="#hesaplama-araclari">
              <Calculator className="mr-2 h-4 w-4" />
              {hero.ctaAction}
              <ArrowDown className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>

          <Button
            asChild
            size="default"
            variant="outline"
            className="font-sans text-body-sm font-semibold"
          >
            <Link href="/finans">
              <Trophy className="mr-2 h-4 w-4 text-hesaplamalarim-gold" />
              Finans ve 33 Özel Hesaplama Sayfasını Keşfet
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

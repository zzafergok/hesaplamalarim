'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Award, Compass, Flame, Sparkles, Trophy } from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Card, CardContent } from '@/components/core/card';
import { Link } from '@/components/core/link';
import { Progress } from '@/components/core/progress';
import { useMounted } from '@/hooks/use-mounted';
import {
  GAMIFICATION_BADGES,
  getLevelInfo,
  useGamificationStore,
} from '@/stores/use-gamification-store';
import { ALL_CALCULATORS } from '../../registry';

export function GamificationHud() {
  const mounted = useMounted();
  const xp = useGamificationStore((s) => s.xp);
  const totalCalculations = useGamificationStore((s) => s.totalCalculations);
  const discoveredIds = useGamificationStore((s) => s.discoveredIds);
  const unlockedBadgeIds = useGamificationStore((s) => s.unlockedBadgeIds);
  const recentHistory = useGamificationStore((s) => s.recentHistory);
  const lastXpGain = useGamificationStore((s) => s.lastXpGain);

  const safeXp = mounted ? xp : 50;
  const levelInfo = getLevelInfo(safeXp);
  const discoveredCount = mounted ? discoveredIds.length : 0;
  const totalTools = ALL_CALCULATORS.length;
  const discoveryPercent = Math.round((discoveredCount / totalTools) * 100);

  return (
    <Card className="relative overflow-hidden border-hesaplamalarim-blue/35 bg-gradient-to-r from-obsidian via-void-black/90 to-obsidian shadow-md backdrop-blur-md">
      {/* Animated Geometric Corner Accent */}
      <motion.div
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-2xl border border-hesaplamalarim-blue/25 bg-hesaplamalarim-blue/5"
      />

      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
          {/* 1. Seviye & XP Barı */}
          <div className="flex items-center gap-3.5 lg:col-span-4">
            <motion.div
              whileHover={{ scale: 1.06, rotate: 6 }}
              className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-hesaplamalarim-blue/45 bg-hesaplamalarim-blue/15 text-hesaplamalarim-blue shadow-sm"
            >
              <span className="font-mono text-micro font-bold uppercase leading-none">
                LVL
              </span>
              <span className="font-mono text-heading-sm font-extrabold leading-tight tabular-nums text-titanium">
                {levelInfo.level}
              </span>
            </motion.div>

            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-display text-body-sm font-bold tracking-tight text-titanium">
                  {levelInfo.rankTitle}
                </span>
                <span className="font-mono text-2xs font-semibold italic tabular-nums text-hesaplamalarim-blue">
                  {levelInfo.currentXp} / {levelInfo.nextLevelXp} XP
                </span>
              </div>
              <Progress value={levelInfo.progressPercent} className="h-2" />
            </div>
          </div>

          {/* 2. Keşif & Hesaplama İstatistikleri */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:col-span-5">
            <div className="flex items-center gap-2 rounded-lg border border-gunmetal/70 bg-void-black/75 px-3 py-2">
              <Compass className="h-4 w-4 shrink-0 text-signal-green" />
              <div>
                <div className="font-sans text-2xs font-normal italic text-ash">
                  Keşif Haritası
                </div>
                <div className="font-mono text-compact font-bold tabular-nums text-titanium">
                  {discoveredCount} / {totalTools} (%{discoveryPercent})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-gunmetal/70 bg-void-black/75 px-3 py-2">
              <Flame className="h-4 w-4 shrink-0 text-hesaplamalarim-gold" />
              <div>
                <div className="font-sans text-2xs font-normal italic text-ash">
                  Toplam İşlem
                </div>
                <div className="font-mono text-compact font-bold tabular-nums text-titanium">
                  {mounted ? totalCalculations : 0} Hesap
                </div>
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-2 rounded-lg border border-gunmetal/70 bg-void-black/75 px-3 py-2 sm:col-span-1">
              <Trophy className="h-4 w-4 shrink-0 text-hesaplamalarim-blue" />
              <div>
                <div className="font-sans text-2xs font-normal italic text-ash">
                  Başarımlar
                </div>
                <div className="font-mono text-compact font-bold tabular-nums text-titanium">
                  {mounted ? unlockedBadgeIds.length : 0} /{' '}
                  {GAMIFICATION_BADGES.length} Rozet
                </div>
              </div>
            </div>
          </div>

          {/* 3. Rozetler & Canlı XP Bildirimi */}
          <div className="flex flex-wrap items-center justify-between gap-2 lg:col-span-3 lg:justify-end">
            <AnimatePresence mode="wait">
              {mounted && lastXpGain ? (
                <motion.div
                  key={lastXpGain.timestamp}
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-signal-green/45 bg-signal-green/15 px-3 py-1 font-mono text-2xs font-bold italic text-signal-green"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {lastXpGain.reason}
                </motion.div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {GAMIFICATION_BADGES.slice(0, 3).map((b) => {
                    const unlocked =
                      mounted && unlockedBadgeIds.includes(b.id);
                    return (
                      <Badge
                        key={b.id}
                        variant={unlocked ? 'default' : 'outline'}
                        className={
                          unlocked
                            ? 'border-hesaplamalarim-blue/40 bg-hesaplamalarim-blue/15 font-sans text-micro font-bold text-hesaplamalarim-blue'
                            : 'border-gunmetal/70 font-sans text-micro font-normal italic text-ash/70'
                        }
                      >
                        <Award className="mr-1 h-3 w-3" />
                        {b.title}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Son Hesaplanan Görevler Hızlı Erişim Çubuğu */}
        {mounted && recentHistory.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gunmetal/60 pt-2.5">
            <span className="font-sans text-2xs font-semibold italic text-ash">
              Son Hesaplamaların:
            </span>
            {recentHistory.slice(0, 4).map((item) => (
              <Link
                key={item.calcId}
                href={`/hesaplamalar/${item.categoryId}/${item.calcId}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-gunmetal/70 bg-void-black/80 px-2.5 py-1 text-2xs text-ash transition-colors hover:border-hesaplamalarim-blue/60 hover:text-titanium"
              >
                <span className="font-sans font-semibold text-titanium">
                  {item.title}:
                </span>
                <span className="font-mono font-bold tabular-nums text-hesaplamalarim-blue">
                  {item.primaryValue}
                </span>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

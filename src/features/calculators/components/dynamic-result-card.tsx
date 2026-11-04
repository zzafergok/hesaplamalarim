'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/core/table';
import { cn } from '@/lib/utils';
import { CalculatorExecutionResult } from '../registry/types';

interface DynamicResultCardProps {
  result: CalculatorExecutionResult;
  calculationTick?: number;
}

export function DynamicResultCard({
  result,
  calculationTick = 0,
}: DynamicResultCardProps) {
  return (
    <motion.div
      key={calculationTick}
      initial={{ opacity: 0.85, scale: 0.98, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      <Card className="relative overflow-hidden border-tulpar-blue/40 bg-obsidian/95 shadow-lg backdrop-blur-md">
        {/* Animated Geometric Decorative Shape */}
        <motion.div
          animate={{ rotate: [0, 180, 360], scale: [1, 1.12, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rotate-45 rounded-3xl border border-tulpar-blue/20 bg-tulpar-blue/5"
        />

        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-1.5 font-display text-heading-sm font-bold text-titanium">
              <Sparkles className="h-4 w-4 text-tulpar-blue" />
              Hesaplama Dökümü & Sonuç
            </CardTitle>
            {result.badge && (
              <Badge
                variant="outline"
                className="border-tulpar-blue/45 bg-tulpar-blue/10 font-mono text-micro font-semibold italic text-tulpar-blue"
              >
                {result.badge}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative overflow-hidden rounded-xl border border-tulpar-blue/30 bg-gradient-to-br from-void-black via-obsidian to-tulpar-blue/10 p-4">
            <div className="font-mono text-2xs font-semibold uppercase tracking-wider text-ash">
              {result.primaryLabel}
            </div>
            <div className="mt-1 font-mono text-metric font-extrabold tabular-nums text-tulpar-blue">
              {result.primaryValue}
            </div>
            {result.primarySubtitle && (
              <div className="mt-1.5 font-sans text-compact font-normal italic text-ash">
                {result.primarySubtitle}
              </div>
            )}
          </div>

          {result.metrics.length > 0 && (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {result.metrics.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="rounded-lg border border-gunmetal/70 bg-void-black/75 p-3 transition-colors hover:border-tulpar-blue/35"
                >
                  <span className="block font-sans text-2xs font-normal italic text-ash">
                    {metric.label}
                  </span>
                  <span
                    className={cn(
                      'mt-0.5 block font-mono text-compact font-bold tabular-nums',
                      metric.tone === 'positive' && 'text-signal-green',
                      metric.tone === 'negative' && 'text-alert-red',
                      (!metric.tone || metric.tone === 'default') &&
                        'text-titanium',
                    )}
                  >
                    {metric.value}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {result.table && result.table.rows.length > 0 && (
            <div className="overflow-hidden rounded-lg border border-gunmetal/70">
              <Table>
                <TableHeader className="bg-void-black/90">
                  <TableRow>
                    {result.table.headers.map((header) => (
                      <TableHead
                        key={header}
                        className="font-mono text-2xs font-semibold uppercase tracking-wider text-ash"
                      >
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="text-compact">
                  {result.table.rows.map((row, rowIdx) => (
                    <TableRow key={`row-${rowIdx}`}>
                      {row.map((cell, cellIdx) => (
                        <TableCell
                          key={`cell-${rowIdx}-${cellIdx}`}
                          className={cn(
                            cellIdx === 0
                              ? 'font-sans font-semibold text-titanium'
                              : 'font-mono font-normal tabular-nums text-ash',
                          )}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

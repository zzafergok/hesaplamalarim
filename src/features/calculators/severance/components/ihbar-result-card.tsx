'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { formatCurrency } from '@/lib/utils';
import { IhbarOutput } from '@/types/severance';

interface IhbarResultCardProps {
  result: IhbarOutput;
}

export function IhbarResultCard({ result }: IhbarResultCardProps) {
  return (
    <Card className="border-tulpar-blue/40 bg-obsidian/95 shadow-md backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-heading-sm font-bold text-titanium">
          İhbar Tazminatı Sonucu
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-tulpar-blue/30 bg-void-black/80 p-4">
          <div className="font-mono text-2xs font-semibold uppercase tracking-wider text-ash">
            Ödenecek Net İhbar Tazminatı
          </div>
          <div className="mt-1 font-mono text-metric font-extrabold tabular-nums text-tulpar-blue">
            {formatCurrency(result.netIhbarTazminati, 'TRY', 'tr-TR')}
          </div>
          <div className="mt-1.5 font-sans text-compact font-normal italic text-ash">
            Yasal İhbar Bildirim Süresi:{' '}
            <span className="font-semibold not-italic text-titanium">
              {result.ihbarSuresiHafta} Hafta ({result.ihbarSuresiGun} Gün)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-compact">
          <div className="rounded-lg border border-gunmetal/70 bg-void-black/70 p-2.5">
            <span className="block font-sans text-2xs font-normal italic text-ash">
              Brüt İhbar Tutarı
            </span>
            <span className="font-mono font-bold tabular-nums text-titanium">
              {formatCurrency(result.brutIhbarTazminati, 'TRY', 'tr-TR')}
            </span>
          </div>
          <div className="rounded-lg border border-gunmetal/70 bg-void-black/70 p-2.5">
            <span className="block font-sans text-2xs font-normal italic text-ash">
              Gelir Vergisi Kesintisi
            </span>
            <span className="font-mono font-bold tabular-nums text-alert-red">
              - {formatCurrency(result.gelirVergisi, 'TRY', 'tr-TR')}
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-between rounded-lg border border-gunmetal/70 bg-void-black/70 p-2.5">
            <span className="font-sans text-2xs font-normal italic text-ash">
              Damga Vergisi (‰7.59)
            </span>
            <span className="font-mono font-bold tabular-nums text-alert-red">
              - {formatCurrency(result.damgaVergisi, 'TRY', 'tr-TR')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

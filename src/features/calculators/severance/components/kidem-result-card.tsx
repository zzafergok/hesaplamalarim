'use client';

import { Badge } from '@/components/core/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { formatCurrency } from '@/lib/utils';
import { KidemOutput } from '@/types/severance';

interface KidemResultCardProps {
  result: KidemOutput;
}

export function KidemResultCard({ result }: KidemResultCardProps) {
  return (
    <Card className="border-hesaplamalarim-blue/40 bg-obsidian/95 shadow-md backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-heading-sm font-bold text-titanium">
            Kıdem Tazminatı Sonucu
          </CardTitle>
          {result.tavanUgulandiMi && (
            <Badge
              variant="outline"
              className="border-hesaplamalarim-gold/50 bg-hesaplamalarim-gold/10 font-mono text-micro font-semibold italic text-hesaplamalarim-gold"
            >
              Kıdem Tavanı Uygulandı
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-hesaplamalarim-blue/30 bg-void-black/80 p-4">
          <div className="font-mono text-2xs font-semibold uppercase tracking-wider text-ash">
            Ödenecek Net Kıdem Tazminatı
          </div>
          <div className="mt-1 font-mono text-metric font-extrabold tabular-nums text-hesaplamalarim-blue">
            {formatCurrency(result.netKidemTazminati, 'TRY', 'tr-TR')}
          </div>
          <div className="mt-1.5 font-sans text-compact font-normal italic text-ash">
            Toplam Çalışma:{' '}
            <span className="font-semibold not-italic text-titanium">
              {result.calismaSuresi.yil} Yıl {result.calismaSuresi.ay} Ay{' '}
              {result.calismaSuresi.gun} Gün
            </span>{' '}
            ({result.toplamGun} gün)
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-compact">
          <div className="rounded-lg border border-gunmetal/70 bg-void-black/70 p-2.5">
            <span className="block font-sans text-2xs font-normal italic text-ash">
              Giydirilmiş Brüt Ücret
            </span>
            <span className="font-mono font-bold tabular-nums text-titanium">
              {formatCurrency(result.giydirilmisBrutUcret, 'TRY', 'tr-TR')}
            </span>
          </div>
          <div className="rounded-lg border border-gunmetal/70 bg-void-black/70 p-2.5">
            <span className="block font-sans text-2xs font-normal italic text-ash">
              Brüt Kıdem Tutarı
            </span>
            <span className="font-mono font-bold tabular-nums text-titanium">
              {formatCurrency(result.brutKidemTazminati, 'TRY', 'tr-TR')}
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-between rounded-lg border border-gunmetal/70 bg-void-black/70 p-2.5">
            <span className="font-sans text-2xs font-normal italic text-ash">
              Damga Vergisi Kesintisi (‰7.59)
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

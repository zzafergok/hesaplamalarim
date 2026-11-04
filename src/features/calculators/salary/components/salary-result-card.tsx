'use client';

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
import { formatCurrency } from '@/lib/utils';
import { MaasOutput } from '@/types/payroll';

interface SalaryResultCardProps {
  result: MaasOutput;
  hesaplamaYonu: 'brutten-nete' | 'netten-brute';
}

export function SalaryResultCard({
  result,
  hesaplamaYonu,
}: SalaryResultCardProps) {
  const isBruttenNete = hesaplamaYonu === 'brutten-nete';

  return (
    <Card className="border-tulpar-blue/40 bg-obsidian/95 shadow-md backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-heading-sm font-bold text-titanium">
            Bordro Hesaplama Dökümü
          </CardTitle>
          {result.sgkTavaniUgulandiMi && (
            <Badge
              variant="outline"
              className="border-tulpar-gold/50 bg-tulpar-gold/10 font-mono text-micro font-semibold italic text-tulpar-gold"
            >
              SGK Tavanı Uygulandı
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-tulpar-blue/30 bg-void-black/80 p-4">
          <div className="font-mono text-2xs font-semibold uppercase tracking-wider text-ash">
            {isBruttenNete ? 'Ele Geçecek Net Maaş' : 'Gereken Brüt Maaş'}
          </div>
          <div className="mt-1 font-mono text-metric font-extrabold tabular-nums text-tulpar-blue">
            {formatCurrency(
              isBruttenNete ? result.netMaas : result.brutMaas,
              'TRY',
              'tr-TR',
            )}
          </div>
          <div className="mt-1.5 font-sans text-compact font-normal italic text-ash">
            {isBruttenNete ? 'Brüt Tutar: ' : 'Net Tutar: '}
            <span className="font-mono font-bold not-italic tabular-nums text-titanium">
              {formatCurrency(
                isBruttenNete ? result.brutMaas : result.netMaas,
                'TRY',
                'tr-TR',
              )}
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gunmetal/70">
          <Table>
            <TableHeader className="bg-void-black/90">
              <TableRow>
                <TableHead className="font-mono text-2xs font-semibold uppercase tracking-wider">
                  Kalem
                </TableHead>
                <TableHead className="text-right font-mono text-2xs font-semibold uppercase tracking-wider">
                  Tutar
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-compact">
              <TableRow>
                <TableCell className="font-sans text-ash">Brüt Ücret</TableCell>
                <TableCell className="text-right font-mono font-bold tabular-nums text-titanium">
                  {formatCurrency(result.brutMaas, 'TRY', 'tr-TR')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-sans text-ash">
                  SGK İşçi Primi (%14)
                </TableCell>
                <TableCell className="text-right font-mono font-semibold tabular-nums text-alert-red">
                  - {formatCurrency(result.sgkIsciPrimi, 'TRY', 'tr-TR')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-sans text-ash">
                  İşsizlik Primi (%1)
                </TableCell>
                <TableCell className="text-right font-mono font-semibold tabular-nums text-alert-red">
                  -{' '}
                  {formatCurrency(
                    result.issizlikSigortasiPrimi,
                    'TRY',
                    'tr-TR',
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-sans text-ash">
                  Gelir Vergisi Matrahı
                </TableCell>
                <TableCell className="text-right font-mono font-bold tabular-nums text-titanium">
                  {formatCurrency(result.gelirVergisiMatrahi, 'TRY', 'tr-TR')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-sans text-ash">
                  Gelir Vergisi (Net)
                </TableCell>
                <TableCell className="text-right font-mono font-semibold tabular-nums text-alert-red">
                  - {formatCurrency(result.gelirVergisi, 'TRY', 'tr-TR')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-sans text-ash">
                  Damga Vergisi (Net)
                </TableCell>
                <TableCell className="text-right font-mono font-semibold tabular-nums text-alert-red">
                  - {formatCurrency(result.damgaVergisi, 'TRY', 'tr-TR')}
                </TableCell>
              </TableRow>
              <TableRow className="bg-tulpar-blue/10 font-bold">
                <TableCell className="font-sans font-bold text-titanium">
                  Net Ele Geçecek
                </TableCell>
                <TableCell className="text-right font-mono font-extrabold tabular-nums text-tulpar-blue">
                  {formatCurrency(result.netMaas, 'TRY', 'tr-TR')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

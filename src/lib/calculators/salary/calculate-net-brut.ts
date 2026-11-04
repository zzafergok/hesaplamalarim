import { MaasOutput } from '@/types/payroll';
import { hesaplaBruttenNete } from './calculate-brut-net';

/**
 * MODÜL: Netten Brüte Maaş Hesaplama (Binary Search)
 * Hedef net maaş için gereken tahmini brüt maaşı 1 kuruş toleransla bulur.
 */
export function hesaplaNettenBrute(
  hedefNetMaas: number,
  kumulatifMatrah: number = 0,
): MaasOutput {
  if (hedefNetMaas <= 0) {
    return hesaplaBruttenNete(0, kumulatifMatrah);
  }

  let altSinir = hedefNetMaas;
  let ustSinir = hedefNetMaas * 3.5;
  let bulunanBrut = 0;
  let sonuc: MaasOutput | null = null;
  const tolerans = 0.01;
  const maxIterasyon = 100;
  let iterasyon = 0;

  while (altSinir <= ustSinir && iterasyon < maxIterasyon) {
    iterasyon++;
    bulunanBrut = (altSinir + ustSinir) / 2;
    sonuc = hesaplaBruttenNete(bulunanBrut, kumulatifMatrah);

    const fark = sonuc.netMaas - hedefNetMaas;
    if (Math.abs(fark) <= tolerans) {
      return sonuc;
    }

    if (fark < 0) {
      altSinir = bulunanBrut;
    } else {
      ustSinir = bulunanBrut;
    }
  }

  return sonuc || hesaplaBruttenNete(altSinir, kumulatifMatrah);
}


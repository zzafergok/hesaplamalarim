import { MEVZUAT_2026 } from '@/config/payroll';
import { roundTo } from '@/lib/utils';

export type PrimGunuKategorisi = '600' | '900' | '1080';

export interface UnemploymentInput {
  son4AyOrtalamaBrut: number;
  primGunuKategorisi: PrimGunuKategorisi;
}

export interface UnemploymentOutput {
  aylikBrutOdenek: number;
  damgaVergisi: number;
  aylikNetOdenek: number;
  hakEdilenAy: number;
  hakEdilenGun: number;
  toplamNetOdenek: number;
  tavanUgulandiMi: boolean;
}

export function hesaplaIssizlikMaasi(
  input: UnemploymentInput,
): UnemploymentOutput {
  const ortalamaBrut = Math.max(0, input.son4AyOrtalamaBrut);
  const hamBrutOdenek = ortalamaBrut * 0.4;
  const ustSinir = MEVZUAT_2026.brutAsgariUcret * 0.8;

  const tavanUgulandiMi = hamBrutOdenek > ustSinir;
  const aylikBrutOdenek = tavanUgulandiMi ? ustSinir : hamBrutOdenek;
  const damgaVergisi = aylikBrutOdenek * MEVZUAT_2026.damgaVergisiOrani;
  const aylikNetOdenek = aylikBrutOdenek - damgaVergisi;

  let hakEdilenAy = 6;
  if (input.primGunuKategorisi === '900') hakEdilenAy = 8;
  else if (input.primGunuKategorisi === '1080') hakEdilenAy = 10;

  const hakEdilenGun = hakEdilenAy * 30;
  const toplamNetOdenek = aylikNetOdenek * hakEdilenAy;

  return {
    aylikBrutOdenek: roundTo(aylikBrutOdenek, 2),
    damgaVergisi: roundTo(damgaVergisi, 2),
    aylikNetOdenek: roundTo(aylikNetOdenek, 2),
    hakEdilenAy,
    hakEdilenGun,
    toplamNetOdenek: roundTo(toplamNetOdenek, 2),
    tavanUgulandiMi,
  };
}

export interface VatWithholdingInput {
  tutar: number;
  islemYonu: 'haric' | 'dahil';
  kdvOrani: number; // %, örn: 1, 10, 20
  tevkifatPayi: number; // 0, 2, 3, 4, 5, 7, 9, 10 (Payda 10)
}

export interface VatWithholdingOutput {
  kdvHaricMatrah: number;
  hesaplananKdv: number;
  tevkifEdilenKdv: number;
  saticiyaOdenenKdv: number;
  kdvDahilToplam: number;
  faturaTahsilatTutari: number;
}

export function hesaplaKdvTevkifat(
  input: VatWithholdingInput,
): VatWithholdingOutput {
  const tutar = Math.max(0, input.tutar);
  const kdvOrani = Math.max(0, input.kdvOrani) / 100;
  const tevkifatCarpani = Math.max(0, Math.min(10, input.tevkifatPayi)) / 10;

  let matrah = tutar;
  if (input.islemYonu === 'dahil') {
    matrah = kdvOrani > 0 ? tutar / (1 + kdvOrani) : tutar;
  }

  const hesaplananKdv = matrah * kdvOrani;
  const tevkifEdilenKdv = hesaplananKdv * tevkifatCarpani;
  const saticiyaOdenenKdv = hesaplananKdv - tevkifEdilenKdv;
  const kdvDahilToplam = matrah + hesaplananKdv;
  const faturaTahsilatTutari = matrah + saticiyaOdenenKdv;

  return {
    kdvHaricMatrah: roundTo(matrah, 2),
    hesaplananKdv: roundTo(hesaplananKdv, 2),
    tevkifEdilenKdv: roundTo(tevkifEdilenKdv, 2),
    saticiyaOdenenKdv: roundTo(saticiyaOdenenKdv, 2),
    kdvDahilToplam: roundTo(kdvDahilToplam, 2),
    faturaTahsilatTutari: roundTo(faturaTahsilatTutari, 2),
  };
}

export interface SmmInput {
  tutar: number;
  hesaplamaYonu: 'brutten' | 'net-tahsilattan';
  stopajOrani: number; // %, örn: 20
  kdvOrani: number; // %, örn: 20
}

export interface SmmOutput {
  brutUcret: number;
  stopajTutari: number;
  netUcret: number;
  kdvTutari: number;
  netTahsilat: number;
}

export function hesaplaSmm(input: SmmInput): SmmOutput {
  const tutar = Math.max(0, input.tutar);
  const s = Math.max(0, input.stopajOrani) / 100;
  const k = Math.max(0, input.kdvOrani) / 100;

  let brutUcret = tutar;
  if (input.hesaplamaYonu === 'net-tahsilattan') {
    const carpan = 1 - s + k;
    brutUcret = carpan > 0 ? tutar / carpan : tutar;
  }

  const stopajTutari = brutUcret * s;
  const netUcret = brutUcret - stopajTutari;
  const kdvTutari = brutUcret * k;
  const netTahsilat = netUcret + kdvTutari;

  return {
    brutUcret: roundTo(brutUcret, 2),
    stopajTutari: roundTo(stopajTutari, 2),
    netUcret: roundTo(netUcret, 2),
    kdvTutari: roundTo(kdvTutari, 2),
    netTahsilat: roundTo(netTahsilat, 2),
  };
}


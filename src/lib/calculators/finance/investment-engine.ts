import { roundTo } from '@/lib/utils';

export interface DepositInput {
  anapara: number;
  yillikFaizOrani: number; // %
  gunSayisi: number;
  stopajOrani: number; // %, örn: 15, 12, 10
  bilesikMi: 'hayir' | 'evet';
}

export interface DepositOutput {
  brutFaizGetirisi: number;
  stopajKesintisi: number;
  netFaizGetirisi: number;
  vadeSonuNetToplam: number;
  efektifYillikGetiriOrani: number;
}

export function hesaplaMevduatGetirisi(input: DepositInput): DepositOutput {
  const anapara = Math.max(0, input.anapara);
  const oran = Math.max(0, input.yillikFaizOrani) / 100;
  const gun = Math.max(1, Math.min(3650, Math.floor(input.gunSayisi)));
  const stopaj = Math.max(0, Math.min(100, input.stopajOrani)) / 100;

  let brutFaiz = 0;
  let stopajKesintisi = 0;
  let netFaiz = 0;

  if (input.bilesikMi === 'evet' && gun >= 30) {
    const donemSayisi = Math.floor(gun / 30);
    const kalanGun = gun % 30;
    let bakiye = anapara;

    for (let i = 0; i < donemSayisi; i++) {
      const donemBrut = (bakiye * oran * 30) / 365;
      const donemStopaj = donemBrut * stopaj;
      const donemNet = donemBrut - donemStopaj;
      brutFaiz += donemBrut;
      stopajKesintisi += donemStopaj;
      bakiye += donemNet;
    }

    if (kalanGun > 0) {
      const kalanBrut = (bakiye * oran * kalanGun) / 365;
      const kalanStopaj = kalanBrut * stopaj;
      brutFaiz += kalanBrut;
      stopajKesintisi += kalanStopaj;
      bakiye += kalanBrut - kalanStopaj;
    }

    netFaiz = bakiye - anapara;
  } else {
    brutFaiz = (anapara * oran * gun) / 365;
    stopajKesintisi = brutFaiz * stopaj;
    netFaiz = brutFaiz - stopajKesintisi;
  }

  const vadeSonuNetToplam = anapara + netFaiz;
  const efektifYillik =
    anapara > 0 ? ((netFaiz / anapara) * (365 / gun)) * 100 : 0;

  return {
    brutFaizGetirisi: roundTo(brutFaiz, 2),
    stopajKesintisi: roundTo(stopajKesintisi, 2),
    netFaizGetirisi: roundTo(netFaiz, 2),
    vadeSonuNetToplam: roundTo(vadeSonuNetToplam, 2),
    efektifYillikGetiriOrani: roundTo(efektifYillik, 2),
  };
}

export interface InflationInput {
  tutar: number;
  yillikEnflasyonOrani: number; // %
  yilSayisi: number;
}

export interface InflationOutput {
  gelecektekiEsdegerTutar: number;
  reelSatinAlmaGucu: number;
  erimeTutari: number;
  satinAlmaGucuKaybiOrani: number;
}

export function hesaplaEnflasyonKaybi(input: InflationInput): InflationOutput {
  const tutar = Math.max(0, input.tutar);
  const enflasyon = Math.max(0, input.yillikEnflasyonOrani) / 100;
  const yil = Math.max(1, Math.min(100, input.yilSayisi));

  const carpan = Math.pow(1 + enflasyon, yil);
  const gelecektekiEsdegerTutar = tutar * carpan;
  const reelSatinAlmaGucu = carpan > 0 ? tutar / carpan : tutar;
  const erimeTutari = Math.max(0, tutar - reelSatinAlmaGucu);
  const kayipOrani = tutar > 0 ? (erimeTutari / tutar) * 100 : 0;

  return {
    gelecektekiEsdegerTutar: roundTo(gelecektekiEsdegerTutar, 2),
    reelSatinAlmaGucu: roundTo(reelSatinAlmaGucu, 2),
    erimeTutari: roundTo(erimeTutari, 2),
    satinAlmaGucuKaybiOrani: roundTo(kayipOrani, 2),
  };
}

export type GoldAssetType =
  | 'gram24'
  | 'bilezik22'
  | 'altin14'
  | 'ceyrek'
  | 'yarim'
  | 'tam'
  | 'ata';

export interface GoldValuationInput {
  varlikTuru: GoldAssetType;
  miktar: number; // gram veya adet
  hasAltinGramFiyati: number; // 24 ayar 1 gr fiyatı (TL)
  iscilikOrani?: number; // %
}

export interface GoldValuationOutput {
  toplamHasAltinGram: number;
  safAltinDegeri: number;
  iscilikMaliyeti: number;
  toplamPiyasaDegeri: number;
  bozdurmaHurdaDegeri: number;
}

// Darphane ve kuyumculuk standart milyem & ağırlık katsayıları (Has altın gram karşılığı)
const GOLD_PURE_FACTORS: Record<GoldAssetType, number> = {
  gram24: 1.0, // 1 gr × 1.000 milyem
  bilezik22: 0.916, // 1 gr × 0.916 milyem
  altin14: 0.585, // 1 gr × 0.585 milyem
  ceyrek: 1.75 * 0.916, // 1.603 gr has
  yarim: 3.5 * 0.916, // 3.206 gr has
  tam: 7.0 * 0.916, // 6.412 gr has
  ata: 7.216 * 0.916, // 6.610 gr has
};

export function hesaplaAltinDegerleme(
  input: GoldValuationInput,
): GoldValuationOutput {
  const miktar = Math.max(0, input.miktar);
  const hasFiyat = Math.max(0, input.hasAltinGramFiyati);
  const iscilik = Math.max(0, input.iscilikOrani ?? 0) / 100;

  const katsayi = GOLD_PURE_FACTORS[input.varlikTuru] ?? 1.0;
  const toplamHasAltinGram = miktar * katsayi;
  const safAltinDegeri = toplamHasAltinGram * hasFiyat;
  const iscilikMaliyeti = safAltinDegeri * iscilik;
  const toplamPiyasaDegeri = safAltinDegeri + iscilikMaliyeti;
  // Hurda / bozdurma değerinde işçilik düşülür ve ortalama %1.5 makas uygulanır
  const bozdurmaHurdaDegeri = safAltinDegeri * 0.985;

  return {
    toplamHasAltinGram: roundTo(toplamHasAltinGram, 3),
    safAltinDegeri: roundTo(safAltinDegeri, 2),
    iscilikMaliyeti: roundTo(iscilikMaliyeti, 2),
    toplamPiyasaDegeri: roundTo(toplamPiyasaDegeri, 2),
    bozdurmaHurdaDegeri: roundTo(bozdurmaHurdaDegeri, 2),
  };
}


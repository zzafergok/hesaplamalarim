import { roundTo } from '@/lib/utils';

export interface DiscountInput {
  etiketFiyati: number;
  birinciIndirimOrani: number; // %
  ikinciEkIndirimOrani?: number; // %
}

export interface DiscountOutput {
  odenecekNetFiyat: number;
  toplamIndirimTutari: number;
  gercekIndirimYuzdesi: number;
}

export function hesaplaIndirimKampanya(input: DiscountInput): DiscountOutput {
  const fiyat = Math.max(0, input.etiketFiyati);
  const ind1 = Math.max(0, Math.min(100, input.birinciIndirimOrani)) / 100;
  const ind2 = Math.max(0, Math.min(100, input.ikinciEkIndirimOrani ?? 0)) / 100;

  const araFiyat = fiyat * (1 - ind1);
  const odenecekNetFiyat = araFiyat * (1 - ind2);
  const toplamIndirimTutari = fiyat - odenecekNetFiyat;
  const gercekIndirimYuzdesi =
    fiyat > 0 ? (toplamIndirimTutari / fiyat) * 100 : 0;

  return {
    odenecekNetFiyat: roundTo(odenecekNetFiyat, 2),
    toplamIndirimTutari: roundTo(toplamIndirimTutari, 2),
    gercekIndirimYuzdesi: roundTo(gercekIndirimYuzdesi, 2),
  };
}

export interface UnitCompareInput {
  urun1Fiyat: number;
  urun1MiktarGrMl: number; // gr veya ml
  urun2Fiyat: number;
  urun2MiktarGrMl: number; // gr veya ml
}

export interface UnitCompareOutput {
  urun1KgLitreFiyati: number;
  urun2KgLitreFiyati: number;
  avantajliUrun: string;
  tasarrufOraniYuzde: number;
  farkTutariKgBasina: number;
}

export function hesaplaBirimFiyatKiyas(
  input: UnitCompareInput,
): UnitCompareOutput {
  const m1 = Math.max(1, input.urun1MiktarGrMl);
  const m2 = Math.max(1, input.urun2MiktarGrMl);
  const f1 = Math.max(0, input.urun1Fiyat);
  const f2 = Math.max(0, input.urun2Fiyat);

  const birim1 = (f1 / m1) * 1000;
  const birim2 = (f2 / m2) * 1000;

  const pahali = Math.max(birim1, birim2);
  const ucuz = Math.min(birim1, birim2);
  const fark = pahali - ucuz;
  const tasarrufOrani = pahali > 0 ? (fark / pahali) * 100 : 0;

  let avantajliUrun = 'İki ürünün birim fiyatı eşit';
  if (birim1 < birim2) avantajliUrun = '1. Ürün Daha Ekonomik';
  else if (birim2 < birim1) avantajliUrun = '2. Ürün Daha Ekonomik';

  return {
    urun1KgLitreFiyati: roundTo(birim1, 2),
    urun2KgLitreFiyati: roundTo(birim2, 2),
    avantajliUrun,
    tasarrufOraniYuzde: roundTo(tasarrufOrani, 2),
    farkTutariKgBasina: roundTo(fark, 2),
  };
}

export interface FuelInput {
  mesafeKm: number;
  tuketim100Km: number; // Litre
  yakitLitreFiyati: number; // TL
  yolcuSayisi?: number;
}

export interface FuelOutput {
  gerekenToplamYakitLitre: number;
  toplamYolculukMaliyeti: number;
  kmBasinaMaliyet: number;
  kisiBasiMaliyet: number;
}

export function hesaplaYakitTuketimi(input: FuelInput): FuelOutput {
  const mesafe = Math.max(0, input.mesafeKm);
  const tuketim = Math.max(0, input.tuketim100Km);
  const fiyat = Math.max(0, input.yakitLitreFiyati);
  const yolcu = Math.max(1, Math.floor(input.yolcuSayisi ?? 1));

  const toplamLitre = (mesafe / 100) * tuketim;
  const toplamMaliyet = toplamLitre * fiyat;
  const kmBasina = mesafe > 0 ? toplamMaliyet / mesafe : 0;
  const kisiBasi = toplamMaliyet / yolcu;

  return {
    gerekenToplamYakitLitre: roundTo(toplamLitre, 2),
    toplamYolculukMaliyeti: roundTo(toplamMaliyet, 2),
    kmBasinaMaliyet: roundTo(kmBasina, 2),
    kisiBasiMaliyet: roundTo(kisiBasi, 2),
  };
}

export interface TipSplitInput {
  hesapTutari: number;
  bahsisOraniYuzde: number;
  kisiSayisi: number;
}

export interface TipSplitOutput {
  toplamBahsisTutari: number;
  genelToplamTutar: number;
  kisiBasiOdeme: number;
  kisiBasiBahsis: number;
}

export function hesaplaBahsisBolusturme(input: TipSplitInput): TipSplitOutput {
  const hesap = Math.max(0, input.hesapTutari);
  const oran = Math.max(0, input.bahsisOraniYuzde) / 100;
  const kisi = Math.max(1, Math.floor(input.kisiSayisi));

  const bahsis = hesap * oran;
  const genelToplam = hesap + bahsis;

  return {
    toplamBahsisTutari: roundTo(bahsis, 2),
    genelToplamTutar: roundTo(genelToplam, 2),
    kisiBasiOdeme: roundTo(genelToplam / kisi, 2),
    kisiBasiBahsis: roundTo(bahsis / kisi, 2),
  };
}

export type PercentageMode =
  | 'oranin-degeri'
  | 'kac-yuzdesi'
  | 'degisim-orani'
  | 'artir-azalt';

export interface PercentageInput {
  islemTuru: PercentageMode;
  sayiA: number;
  sayiB: number;
}

export interface PercentageOutput {
  anaSonuc: number;
  ekSonuc: number;
  aciklama: string;
}

export function hesaplaYuzde(input: PercentageInput): PercentageOutput {
  const a = input.sayiA;
  const b = input.sayiB;

  if (input.islemTuru === 'kac-yuzdesi') {
    const oran = b !== 0 ? (a / b) * 100 : 0;
    return {
      anaSonuc: roundTo(oran, 2),
      ekSonuc: roundTo(b - a, 2),
      aciklama: `${a} sayısı, ${b} sayısının %${roundTo(oran, 2)} kadarıdır.`,
    };
  }

  if (input.islemTuru === 'degisim-orani') {
    const degisim = a !== 0 ? ((b - a) / Math.abs(a)) * 100 : 0;
    return {
      anaSonuc: roundTo(degisim, 2),
      ekSonuc: roundTo(b - a, 2),
      aciklama: `${a} değerinden ${b} değerine değişim oranı %${roundTo(degisim, 2)}.`,
    };
  }

  if (input.islemTuru === 'artir-azalt') {
    const pay = (a * b) / 100;
    return {
      anaSonuc: roundTo(a + pay, 2),
      ekSonuc: roundTo(a - pay, 2),
      aciklama: `${a} sayısının %${b} fazlası ${roundTo(a + pay, 2)}, eksiği ${roundTo(a - pay, 2)}.`,
    };
  }

  const deger = (a * b) / 100;
  return {
    anaSonuc: roundTo(deger, 2),
    ekSonuc: roundTo(a + deger, 2),
    aciklama: `${a} sayısının %${b}'si ${roundTo(deger, 2)} eder.`,
  };
}


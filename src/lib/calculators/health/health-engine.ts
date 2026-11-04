import { roundTo } from '@/lib/utils';

export interface BmiInput {
  boyCm: number;
  kiloKg: number;
  cinsiyet: 'erkek' | 'kadin';
}

export interface BmiOutput {
  vki: number;
  kategori: string;
  idealKiloKg: number;
  minSaglikliKilo: number;
  maxSaglikliKilo: number;
  hedefKiloFarki: number;
}

export function hesaplaVkiIdealKilo(input: BmiInput): BmiOutput {
  const boyCm = Math.max(50, Math.min(260, input.boyCm));
  const kilo = Math.max(10, Math.min(350, input.kiloKg));
  const boyMetre = boyCm / 100;

  const vki = kilo / (boyMetre * boyMetre);
  let kategori = 'Normal Kilolu';
  if (vki < 18.5) kategori = 'Zayıf (Düşük Kilolu)';
  else if (vki < 25) kategori = 'Normal (Sağlıklı Aralık)';
  else if (vki < 30) kategori = 'Fazla Kilolu';
  else if (vki < 35) kategori = '1. Derece Obezite';
  else kategori = '2. / 3. Derece Obezite';

  // Devine Formülü (1 inch = 2.54 cm, 5 feet = 60 inch = 152.4 cm)
  const farkInch = Math.max(0, (boyCm - 152.4) / 2.54);
  const bazKilo = input.cinsiyet === 'erkek' ? 50 : 45.5;
  const idealKiloKg = bazKilo + 2.3 * farkInch;

  const minSaglikli = 18.5 * boyMetre * boyMetre;
  const maxSaglikli = 24.9 * boyMetre * boyMetre;

  return {
    vki: roundTo(vki, 2),
    kategori,
    idealKiloKg: roundTo(idealKiloKg, 1),
    minSaglikliKilo: roundTo(minSaglikli, 1),
    maxSaglikliKilo: roundTo(maxSaglikli, 1),
    hedefKiloFarki: roundTo(kilo - idealKiloKg, 1),
  };
}

export interface BmrTdeeInput {
  cinsiyet: 'erkek' | 'kadin';
  yas: number;
  boyCm: number;
  kiloKg: number;
  aktiviteKatsayisi: number; // 1.2, 1.375, 1.55, 1.725, 1.9
}

export interface BmrTdeeOutput {
  bazalMetabolizmaBmr: number;
  gunlukKaloriTdee: number;
  kiloVermeKalori: number;
  kiloAlmaKalori: number;
}

export function hesaplaBmrTdee(input: BmrTdeeInput): BmrTdeeOutput {
  const yas = Math.max(10, Math.min(110, input.yas));
  const boy = Math.max(80, Math.min(250, input.boyCm));
  const kilo = Math.max(20, Math.min(350, input.kiloKg));
  const aktivite = Math.max(1.2, Math.min(2.2, input.aktiviteKatsayisi));

  // Mifflin-St Jeor Denklemi
  const bmr =
    10 * kilo +
    6.25 * boy -
    5 * yas +
    (input.cinsiyet === 'erkek' ? 5 : -161);
  const tdee = bmr * aktivite;

  return {
    bazalMetabolizmaBmr: Math.round(bmr),
    gunlukKaloriTdee: Math.round(tdee),
    kiloVermeKalori: Math.max(1200, Math.round(tdee - 500)),
    kiloAlmaKalori: Math.round(tdee + 450),
  };
}

export type MacroProfile =
  | 'dengeli'
  | 'yuksek-protein'
  | 'dusuk-karb'
  | 'ketojenik';

export interface MacroInput {
  gunlukKalori: number;
  diyetProfili: MacroProfile;
}

export interface MacroOutput {
  proteinGram: number;
  karbonhidratGram: number;
  yagGram: number;
  proteinKalori: number;
  karbKalori: number;
  yagKalori: number;
}

const MACRO_SPLITS: Record<
  MacroProfile,
  { p: number; c: number; f: number }
> = {
  dengeli: { p: 0.3, c: 0.4, f: 0.3 },
  'yuksek-protein': { p: 0.35, c: 0.4, f: 0.25 },
  'dusuk-karb': { p: 0.4, c: 0.2, f: 0.4 },
  ketojenik: { p: 0.25, c: 0.05, f: 0.7 },
};

export function hesaplaMakroBesin(input: MacroInput): MacroOutput {
  const kalori = Math.max(800, input.gunlukKalori);
  const split = MACRO_SPLITS[input.diyetProfili] ?? MACRO_SPLITS.dengeli;

  const pKal = kalori * split.p;
  const cKal = kalori * split.c;
  const fKal = kalori * split.f;

  return {
    proteinGram: Math.round(pKal / 4),
    karbonhidratGram: Math.round(cKal / 4),
    yagGram: Math.round(fKal / 9),
    proteinKalori: Math.round(pKal),
    karbKalori: Math.round(cKal),
    yagKalori: Math.round(fKal),
  };
}

export interface WaterInput {
  kiloKg: number;
  egzersizDakika: number;
}

export interface WaterOutput {
  gunlukSuLitre: number;
  gunlukSuMililitre: number;
  bardakSayisi250Ml: number;
}

export function hesaplaSuIhtiyaci(input: WaterInput): WaterOutput {
  const kilo = Math.max(15, input.kiloKg);
  const dakika = Math.max(0, input.egzersizDakika);

  const temelLitre = kilo * 0.033;
  const egzersizEkLitre = (dakika / 30) * 0.35;
  const toplamLitre = temelLitre + egzersizEkLitre;

  return {
    gunlukSuLitre: roundTo(toplamLitre, 2),
    gunlukSuMililitre: Math.round(toplamLitre * 1000),
    bardakSayisi250Ml: Math.ceil((toplamLitre * 1000) / 250),
  };
}

export interface PregnancyInput {
  sonAdetTarihi: string; // YYYY-MM-DD
  donguSuresiGun?: number; // Varsayılan 28
  referansBugun?: string; // Test için opsiyonel YYYY-MM-DD
}

export interface PregnancyOutput {
  tahminiDogumTarihi: string;
  gebelikHaftasi: number;
  ekGun: number;
  kalanGun: number;
  trimester: string;
}

export function hesaplaGebelik(input: PregnancyInput): PregnancyOutput {
  const [y, m, d] = input.sonAdetTarihi.split('-').map(Number);
  const satMs = Date.UTC(y || 2026, (m || 1) - 1, d || 1);
  const donguFarki = (input.donguSuresiGun ?? 28) - 28;
  const toplamGebelikGun = 280 + donguFarki;

  const dogumMs = satMs + toplamGebelikGun * 86400000;
  const dogumDate = new Date(dogumMs);
  const tahminiDogumTarihi = dogumDate.toISOString().split('T')[0];

  const bugunMs = input.referansBugun
    ? Date.parse(input.referansBugun)
    : Date.now();
  const gecenGun = Math.max(
    0,
    Math.min(toplamGebelikGun, Math.floor((bugunMs - satMs) / 86400000)),
  );

  const gebelikHaftasi = Math.floor(gecenGun / 7);
  const ekGun = gecenGun % 7;
  const kalanGun = Math.max(0, toplamGebelikGun - gecenGun);

  let trimester = '1. Trimester (1 - 13. Hafta)';
  if (gebelikHaftasi >= 27) trimester = '3. Trimester (27 - 40. Hafta)';
  else if (gebelikHaftasi >= 14) trimester = '2. Trimester (14 - 26. Hafta)';

  return {
    tahminiDogumTarihi,
    gebelikHaftasi,
    ekGun,
    kalanGun,
    trimester,
  };
}


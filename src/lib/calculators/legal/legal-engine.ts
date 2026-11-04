import { roundTo } from '@/lib/utils';

export interface RentIncreaseInput {
  mevcutKira: number;
  tufe12AylikOrtalama: number; // %
  uygulananArtisOrani?: number; // %
}

export interface RentIncreaseOutput {
  yasalUstSinirKira: number;
  yasalArtisTutari: number;
  uygulananYeniKira: number;
  uygulananArtisTutari: number;
  yasalSinirAsildiMi: boolean;
}

export function hesaplaKiraArtisi(
  input: RentIncreaseInput,
): RentIncreaseOutput {
  const kira = Math.max(0, input.mevcutKira);
  const tufe = Math.max(0, input.tufe12AylikOrtalama);
  const uygulanan =
    input.uygulananArtisOrani !== undefined
      ? Math.max(0, input.uygulananArtisOrani)
      : tufe;

  const yasalArtis = (kira * tufe) / 100;
  const uygulananArtis = (kira * uygulanan) / 100;

  return {
    yasalUstSinirKira: roundTo(kira + yasalArtis, 2),
    yasalArtisTutari: roundTo(yasalArtis, 2),
    uygulananYeniKira: roundTo(kira + uygulananArtis, 2),
    uygulananArtisTutari: roundTo(uygulananArtis, 2),
    yasalSinirAsildiMi: uygulanan > tufe,
  };
}

export interface TitleDeedInput {
  satisBedeli: number;
  donerSermayeUcreti?: number;
}

export interface TitleDeedOutput {
  aliciTapuHarci: number;
  saticiTapuHarci: number;
  toplamTapuHarci: number;
  donerSermayeUcreti: number;
  genelToplamMasraf: number;
}

export function hesaplaTapuHarci(input: TitleDeedInput): TitleDeedOutput {
  const bedel = Math.max(0, input.satisBedeli);
  const donerSermaye = Math.max(0, input.donerSermayeUcreti ?? 3549);

  // 492 Sayılı Harçlar Kanunu: Alıcı %2 + Satıcı %2 = Toplam %4
  const aliciPayi = bedel * 0.02;
  const saticiPayi = bedel * 0.02;
  const toplamHarc = aliciPayi + saticiPayi;

  return {
    aliciTapuHarci: roundTo(aliciPayi, 2),
    saticiTapuHarci: roundTo(saticiPayi, 2),
    toplamTapuHarci: roundTo(toplamHarc, 2),
    donerSermayeUcreti: roundTo(donerSermaye, 2),
    genelToplamMasraf: roundTo(toplamHarc + donerSermaye, 2),
  };
}

export type EngineSizeBand =
  | '1300-alti'
  | '1301-1600'
  | '1601-1800'
  | '1801-2000'
  | '2001-ustu';
export type VehicleAgeBand = '1-3' | '4-6' | '7-11' | '12-15' | '16-ustu';

export interface MtvInput {
  motorHacmi: EngineSizeBand;
  aracYasi: VehicleAgeBand;
}

export interface MtvOutput {
  yillikMtvTutari: number;
  ocakTaksiti: number;
  temmuzTaksiti: number;
}

const MTV_BASE_2026: Record<EngineSizeBand, number> = {
  '1300-alti': 5800,
  '1301-1600': 10120,
  '1601-1800': 17890,
  '1801-2000': 28200,
  '2001-ustu': 46500,
};

const MTV_AGE_FACTOR: Record<VehicleAgeBand, number> = {
  '1-3': 1.0,
  '4-6': 0.7,
  '7-11': 0.4,
  '12-15': 0.28,
  '16-ustu': 0.14,
};

export function hesaplaAracMtv(input: MtvInput): MtvOutput {
  const baz = MTV_BASE_2026[input.motorHacmi] ?? 10120;
  const carpan = MTV_AGE_FACTOR[input.aracYasi] ?? 1.0;
  const yillik = roundTo(baz * carpan, 2);
  const taksit = roundTo(yillik / 2, 2);

  return {
    yillikMtvTutari: yillik,
    ocakTaksiti: taksit,
    temmuzTaksiti: taksit,
  };
}

export interface LegalInterestInput {
  anapara: number;
  gecikmeGunSayisi: number;
  yillikFaizOrani: number; // % (Örn: Yasal faiz %24, Ticari %48, Amme %54)
}

export interface LegalInterestOutput {
  isleyenFaizTutari: number;
  toplamOdenecekBorc: number;
  gunlukFaizTutari: number;
}

export function hesaplaYasalFaiz(
  input: LegalInterestInput,
): LegalInterestOutput {
  const anapara = Math.max(0, input.anapara);
  const gun = Math.max(0, Math.floor(input.gecikmeGunSayisi));
  const oran = Math.max(0, input.yillikFaizOrani) / 100;

  const isleyenFaiz = (anapara * oran * gun) / 365;
  const gunlukFaiz = (anapara * oran) / 365;

  return {
    isleyenFaizTutari: roundTo(isleyenFaiz, 2),
    toplamOdenecekBorc: roundTo(anapara + isleyenFaiz, 2),
    gunlukFaizTutari: roundTo(gunlukFaiz, 2),
  };
}

export type InheritanceGroup =
  | '1-altsoy'
  | '2-anne-baba'
  | '3-buyukanne-baba'
  | 'mirasci-yok';

export interface InheritanceInput {
  terekeDegeri: number;
  sagKalanEsVarMi: 'evet' | 'hayir';
  mirasGrubu: InheritanceGroup;
  cocukVeyaMirasciSayisi: number;
}

export interface InheritanceOutput {
  esHisseOraniYuzde: number;
  esPayiTutari: number;
  zumreToplamOraniYuzde: number;
  mirasciBasinaTutar: number;
  hukukiDayanak: string;
}

export function hesaplaMirasPaylasimi(
  input: InheritanceInput,
): InheritanceOutput {
  const tereke = Math.max(0, input.terekeDegeri);
  const esVar = input.sagKalanEsVarMi === 'evet';
  const kisiSayisi = Math.max(1, Math.floor(input.cocukVeyaMirasciSayisi));

  // TMK Md. 499: Sağ kalan eşin zümrelere göre yasal miras payı
  let esOran = 0;
  if (esVar) {
    if (input.mirasGrubu === '1-altsoy') esOran = 0.25;
    else if (input.mirasGrubu === '2-anne-baba') esOran = 0.5;
    else if (input.mirasGrubu === '3-buyukanne-baba') esOran = 0.75;
    else esOran = 1.0;
  }

  const zumreOran = input.mirasGrubu === 'mirasci-yok' ? 0 : 1 - esOran;
  const esPayi = tereke * esOran;
  const zumreToplam = tereke * zumreOran;
  const mirasciBasina =
    input.mirasGrubu === 'mirasci-yok' ? 0 : zumreToplam / kisiSayisi;

  return {
    esHisseOraniYuzde: roundTo(esOran * 100, 2),
    esPayiTutari: roundTo(esPayi, 2),
    zumreToplamOraniYuzde: roundTo(zumreOran * 100, 2),
    mirasciBasinaTutar: roundTo(mirasciBasina, 2),
    hukukiDayanak: '4721 Sayılı Türk Medeni Kanunu Md. 495 - 499',
  };
}


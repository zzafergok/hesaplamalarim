import { roundTo } from '@/lib/utils';

export type LoanType = 'ihtiyac' | 'konut' | 'tasit' | 'ticari';

export interface LoanInput {
  krediTuru: LoanType;
  anapara: number;
  aylikFaizOrani: number; // % cinsinden, örn: 3.49
  vadeAy: number;
}

export interface AmortizationRow {
  taksitNo: number;
  taksitTutari: number;
  anaparaOdeme: number;
  faizOdeme: number;
  vergiOdeme: number;
  kalanAnapara: number;
}

export interface LoanOutput {
  aylikTaksit: number;
  toplamGeriOdeme: number;
  toplamFaiz: number;
  toplamVergi: number;
  efektifAylikOran: number;
  kkdfOrani: number;
  bsmvOrani: number;
  amortismanOzeti: AmortizationRow[];
}

export interface EarlyPayoffInput {
  krediTuru: LoanType;
  kalanAnapara: number;
  aylikFaizOrani: number;
  kalanVadeAy: number;
  araOdemeTutari: number;
}

export interface EarlyPayoffOutput {
  mevcutAylikTaksit: number;
  mevcutToplamKalanOdeme: number;
  erkenOdemeKomisyonu: number;
  taksitDusurmeYeniTaksit: number;
  taksitDusurmeTasarruf: number;
  vadeKisaltmaYeniVade: number;
  vadeKisaltmaTasarruf: number;
  onerilenSecenek: string;
}

const LOAN_TAX_RATES: Record<LoanType, { kkdf: number; bsmv: number }> = {
  ihtiyac: { kkdf: 0.15, bsmv: 0.15 },
  tasit: { kkdf: 0.15, bsmv: 0.05 },
  konut: { kkdf: 0, bsmv: 0 },
  ticari: { kkdf: 0, bsmv: 0.05 },
};

export function hesaplaKrediTaksit(input: LoanInput): LoanOutput {
  const anapara = Math.max(0, input.anapara);
  const vade = Math.max(1, Math.min(360, Math.floor(input.vadeAy)));
  const hamOran = Math.max(0, input.aylikFaizOrani) / 100;
  const taxes = LOAN_TAX_RATES[input.krediTuru] ?? LOAN_TAX_RATES.ihtiyac;
  const vergiCarpani = 1 + taxes.kkdf + taxes.bsmv;
  const rEff = hamOran * vergiCarpani;

  let aylikTaksit = 0;
  if (rEff === 0) {
    aylikTaksit = anapara / vade;
  } else {
    const pow = Math.pow(1 + rEff, vade);
    aylikTaksit = (anapara * (rEff * pow)) / (pow - 1);
  }

  let kalan = anapara;
  let toplamFaiz = 0;
  let toplamVergi = 0;
  const amortismanOzeti: AmortizationRow[] = [];

  for (let i = 1; i <= vade; i++) {
    const donemFaiz = kalan * hamOran;
    const donemVergi = donemFaiz * (taxes.kkdf + taxes.bsmv);
    const donemAnapara = Math.min(kalan, aylikTaksit - donemFaiz - donemVergi);
    kalan = Math.max(0, kalan - donemAnapara);

    toplamFaiz += donemFaiz;
    toplamVergi += donemVergi;

    if (i <= 12 || i === vade) {
      amortismanOzeti.push({
        taksitNo: i,
        taksitTutari: roundTo(aylikTaksit, 2),
        anaparaOdeme: roundTo(donemAnapara, 2),
        faizOdeme: roundTo(donemFaiz, 2),
        vergiOdeme: roundTo(donemVergi, 2),
        kalanAnapara: roundTo(kalan, 2),
      });
    }
  }

  return {
    aylikTaksit: roundTo(aylikTaksit, 2),
    toplamGeriOdeme: roundTo(aylikTaksit * vade, 2),
    toplamFaiz: roundTo(toplamFaiz, 2),
    toplamVergi: roundTo(toplamVergi, 2),
    efektifAylikOran: roundTo(rEff * 100, 4),
    kkdfOrani: taxes.kkdf * 100,
    bsmvOrani: taxes.bsmv * 100,
    amortismanOzeti,
  };
}

export function hesaplaErkenKapama(input: EarlyPayoffInput): EarlyPayoffOutput {
  const kalanAnapara = Math.max(1, input.kalanAnapara);
  const kalanVade = Math.max(1, Math.min(360, Math.floor(input.kalanVadeAy)));
  const araOdeme = Math.max(0, Math.min(kalanAnapara - 1, input.araOdemeTutari));

  const mevcut = hesaplaKrediTaksit({
    krediTuru: input.krediTuru,
    anapara: kalanAnapara,
    aylikFaizOrani: input.aylikFaizOrani,
    vadeAy: kalanVade,
  });

  // 6502 Sayılı TKHK Md. 37: Konut kredilerinde kalan vade <= 36 ay ise %1, > 36 ay ise %2 komisyon
  const komisyonOrani =
    input.krediTuru === 'konut' ? (kalanVade <= 36 ? 0.01 : 0.02) : 0;
  const erkenOdemeKomisyonu = roundTo(araOdeme * komisyonOrani, 2);

  const yeniAnapara = Math.max(0, kalanAnapara - araOdeme);

  // Senaryo 1: Vade Sabit, Taksit Düşürme
  const senaryoTaksit = hesaplaKrediTaksit({
    krediTuru: input.krediTuru,
    anapara: yeniAnapara,
    aylikFaizOrani: input.aylikFaizOrani,
    vadeAy: kalanVade,
  });
  const taksitDusurmeTasarruf = Math.max(
    0,
    mevcut.toplamGeriOdeme -
      (senaryoTaksit.toplamGeriOdeme + araOdeme + erkenOdemeKomisyonu),
  );

  // Senaryo 2: Taksit Sabit, Vade Kısaltma
  const rEff = mevcut.efektifAylikOran / 100;
  let yeniVade = kalanVade;
  if (rEff > 0 && yeniAnapara > 0) {
    const icDeger = 1 - (yeniAnapara * rEff) / mevcut.aylikTaksit;
    yeniVade =
      icDeger > 0
        ? Math.max(1, Math.ceil(-Math.log(icDeger) / Math.log(1 + rEff)))
        : 1;
  } else if (yeniAnapara > 0) {
    yeniVade = Math.max(1, Math.ceil(yeniAnapara / mevcut.aylikTaksit));
  }

  const senaryoVade = hesaplaKrediTaksit({
    krediTuru: input.krediTuru,
    anapara: yeniAnapara,
    aylikFaizOrani: input.aylikFaizOrani,
    vadeAy: yeniVade,
  });
  const vadeKisaltmaTasarruf = Math.max(
    0,
    mevcut.toplamGeriOdeme -
      (senaryoVade.toplamGeriOdeme + araOdeme + erkenOdemeKomisyonu),
  );

  return {
    mevcutAylikTaksit: mevcut.aylikTaksit,
    mevcutToplamKalanOdeme: mevcut.toplamGeriOdeme,
    erkenOdemeKomisyonu,
    taksitDusurmeYeniTaksit: senaryoTaksit.aylikTaksit,
    taksitDusurmeTasarruf: roundTo(taksitDusurmeTasarruf, 2),
    vadeKisaltmaYeniVade: yeniVade,
    vadeKisaltmaTasarruf: roundTo(vadeKisaltmaTasarruf, 2),
    onerilenSecenek:
      vadeKisaltmaTasarruf >= taksitDusurmeTasarruf
        ? 'Vade Kısaltma (Daha Yüksek Faiz Tasarrufu)'
        : 'Taksit Düşürme (Aylık Nakit Akışı Rahatlığı)',
  };
}


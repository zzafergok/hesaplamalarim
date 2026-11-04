import { roundTo } from '@/lib/utils';

export type UnitConversionType =
  | 'm-to-km-ft-in'
  | 'kg-to-gr-lb-oz'
  | 'c-to-f-k'
  | 'gb-to-mb-tb-gib';

export interface UnitConversionInput {
  donusumTuru: UnitConversionType;
  deger: number;
}

export interface UnitConversionOutput {
  anaCiktiDegeri: number;
  anaCiktiBirimi: string;
  ikinciCiktiDegeri: number;
  ikinciCiktiBirimi: string;
  ucuncuCiktiDegeri: number;
  ucuncuCiktiBirimi: string;
}

export function hesaplaBirimDonusumu(
  input: UnitConversionInput,
): UnitConversionOutput {
  const val = input.deger;

  if (input.donusumTuru === 'kg-to-gr-lb-oz') {
    return {
      anaCiktiDegeri: roundTo(val * 2.20462, 3),
      anaCiktiBirimi: 'Pound (lb)',
      ikinciCiktiDegeri: roundTo(val * 1000, 2),
      ikinciCiktiBirimi: 'Gram (g)',
      ucuncuCiktiDegeri: roundTo(val * 35.274, 2),
      ucuncuCiktiBirimi: 'Ons (oz)',
    };
  }

  if (input.donusumTuru === 'c-to-f-k') {
    return {
      anaCiktiDegeri: roundTo((val * 9) / 5 + 32, 2),
      anaCiktiBirimi: 'Fahrenheit (°F)',
      ikinciCiktiDegeri: roundTo(val + 273.15, 2),
      ikinciCiktiBirimi: 'Kelvin (K)',
      ucuncuCiktiDegeri: roundTo(val, 2),
      ucuncuCiktiBirimi: 'Celsius (°C)',
    };
  }

  if (input.donusumTuru === 'gb-to-mb-tb-gib') {
    return {
      anaCiktiDegeri: roundTo(val * 1024, 2),
      anaCiktiBirimi: 'Megabyte (MB)',
      ikinciCiktiDegeri: roundTo(val / 1024, 4),
      ikinciCiktiBirimi: 'Terabyte (TB)',
      ucuncuCiktiDegeri: roundTo(val * 0.93132, 3),
      ucuncuCiktiBirimi: 'Gibibyte (GiB)',
    };
  }

  // Varsayılan: Metre -> Feet, İnç, Kilometre
  return {
    anaCiktiDegeri: roundTo(val * 3.28084, 3),
    anaCiktiBirimi: 'Feet (ft)',
    ikinciCiktiDegeri: roundTo(val * 39.3701, 2),
    ikinciCiktiBirimi: 'İnç (in)',
    ucuncuCiktiDegeri: roundTo(val / 1000, 4),
    ucuncuCiktiBirimi: 'Kilometre (km)',
  };
}

export type GeometryShape =
  | 'daire'
  | 'dikdortgen'
  | 'ucgen'
  | 'silindir'
  | 'kure'
  | 'koni';

export interface GeometryInput {
  sekil: GeometryShape;
  olcu1: number; // Yarıçap (r) veya Taban (a)
  olcu2?: number; // Yükseklik (h) veya Kenar (b)
}

export interface GeometryOutput {
  anaSonucDegeri: number;
  anaSonucEtiketi: string;
  ikinciSonucDegeri: number;
  ikinciSonucEtiketi: string;
  formulBilgisi: string;
}

export function hesaplaGeometri(input: GeometryInput): GeometryOutput {
  const a = Math.max(0, input.olcu1);
  const b = Math.max(0, input.olcu2 ?? 0);
  const pi = Math.PI;

  switch (input.sekil) {
    case 'dikdortgen':
      return {
        anaSonucDegeri: roundTo(a * b, 2),
        anaSonucEtiketi: 'Dikdörtgen Alanı',
        ikinciSonucDegeri: roundTo(2 * (a + b), 2),
        ikinciSonucEtiketi: 'Çevre Uzunluğu',
        formulBilgisi: 'Alan = a × b | Çevre = 2(a + b)',
      };
    case 'ucgen':
      return {
        anaSonucDegeri: roundTo((a * b) / 2, 2),
        anaSonucEtiketi: 'Üçgen Alanı',
        ikinciSonucDegeri: roundTo(Math.hypot(a, b), 2),
        ikinciSonucEtiketi: 'Hipotenüs (Dik Üçgen)',
        formulBilgisi: 'Alan = (Taban × Yükseklik) / 2',
      };
    case 'silindir':
      return {
        anaSonucDegeri: roundTo(pi * a * a * b, 2),
        anaSonucEtiketi: 'Silindir Hacmi',
        ikinciSonucDegeri: roundTo(2 * pi * a * (a + b), 2),
        ikinciSonucEtiketi: 'Toplam Yüzey Alanı',
        formulBilgisi: 'Hacim = πr²h | Yüzey = 2πr(r + h)',
      };
    case 'kure':
      return {
        anaSonucDegeri: roundTo((4 / 3) * pi * Math.pow(a, 3), 2),
        anaSonucEtiketi: 'Küre Hacmi',
        ikinciSonucDegeri: roundTo(4 * pi * a * a, 2),
        ikinciSonucEtiketi: 'Yüzey Alanı',
        formulBilgisi: 'Hacim = (4/3)πr³ | Yüzey = 4πr²',
      };
    case 'koni': {
      const yanal = Math.hypot(a, b);
      return {
        anaSonucDegeri: roundTo((1 / 3) * pi * a * a * b, 2),
        anaSonucEtiketi: 'Koni Hacmi',
        ikinciSonucDegeri: roundTo(pi * a * (a + yanal), 2),
        ikinciSonucEtiketi: 'Toplam Yüzey Alanı',
        formulBilgisi: 'Hacim = (1/3)πr²h',
      };
    }
    case 'daire':
    default:
      return {
        anaSonucDegeri: roundTo(pi * a * a, 2),
        anaSonucEtiketi: 'Daire Alanı',
        ikinciSonucDegeri: roundTo(2 * pi * a, 2),
        ikinciSonucEtiketi: 'Çember Çevresi',
        formulBilgisi: 'Alan = πr² | Çevre = 2πr',
      };
  }
}

export interface AcademicGradeInput {
  vizeNotu: number;
  vizeAgirligiYuzde: number; // Örn: 40
  finalNotu: number;
  finalBaraji?: number; // Örn: 50
}

export interface AcademicGradeOutput {
  agirlikliOrtalama: number;
  harfNotu: string;
  dortlukKatsayi: number;
  gecmeDurumu: string;
}

export function hesaplaAkademikNot(
  input: AcademicGradeInput,
): AcademicGradeOutput {
  const vize = Math.max(0, Math.min(100, input.vizeNotu));
  const finalNot = Math.max(0, Math.min(100, input.finalNotu));
  const vizeOran = Math.max(0, Math.min(100, input.vizeAgirligiYuzde)) / 100;
  const finalOran = 1 - vizeOran;
  const baraj = Math.max(0, Math.min(100, input.finalBaraji ?? 50));

  const ort = roundTo(vize * vizeOran + finalNot * finalOran, 2);

  if (finalNot < baraj) {
    return {
      agirlikliOrtalama: ort,
      harfNotu: 'FF',
      dortlukKatsayi: 0.0,
      gecmeDurumu: `Kaldı (Final Notu ${baraj} Barajının Altında)`,
    };
  }

  if (ort >= 90)
    return { agirlikliOrtalama: ort, harfNotu: 'AA', dortlukKatsayi: 4.0, gecmeDurumu: 'Pekiyi (Geçti)' };
  if (ort >= 85)
    return { agirlikliOrtalama: ort, harfNotu: 'BA', dortlukKatsayi: 3.5, gecmeDurumu: 'İyi - Pekiyi (Geçti)' };
  if (ort >= 80)
    return { agirlikliOrtalama: ort, harfNotu: 'BB', dortlukKatsayi: 3.0, gecmeDurumu: 'İyi (Geçti)' };
  if (ort >= 75)
    return { agirlikliOrtalama: ort, harfNotu: 'CB', dortlukKatsayi: 2.5, gecmeDurumu: 'Orta - İyi (Geçti)' };
  if (ort >= 70)
    return { agirlikliOrtalama: ort, harfNotu: 'CC', dortlukKatsayi: 2.0, gecmeDurumu: 'Orta (Geçti)' };
  if (ort >= 65)
    return { agirlikliOrtalama: ort, harfNotu: 'DC', dortlukKatsayi: 1.5, gecmeDurumu: 'Şartlı Geçti' };
  if (ort >= 60)
    return { agirlikliOrtalama: ort, harfNotu: 'DD', dortlukKatsayi: 1.0, gecmeDurumu: 'Şartlı Geçti' };

  return {
    agirlikliOrtalama: ort,
    harfNotu: 'FF',
    dortlukKatsayi: 0.0,
    gecmeDurumu: 'Başarısız (Kaldı)',
  };
}


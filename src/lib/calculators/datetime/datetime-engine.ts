export interface DateDiffInput {
  baslangicTarihi: string; // YYYY-MM-DD
  bitisTarihi: string; // YYYY-MM-DD
}

export interface DateDiffOutput {
  toplamGun: number;
  toplamHafta: number;
  kalanGunHaftadan: number;
  toplamSaat: number;
  yil: number;
  ay: number;
  gun: number;
}

function parseUtcDate(str: string): number {
  const [y, m, d] = str.split('-').map(Number);
  return Date.UTC(y || 2026, (m || 1) - 1, d || 1);
}

export function hesaplaTarihFarki(input: DateDiffInput): DateDiffOutput {
  const t1 = parseUtcDate(input.baslangicTarihi);
  const t2 = parseUtcDate(input.bitisTarihi);
  const diffMs = Math.abs(t2 - t1);
  const toplamGun = Math.floor(diffMs / 86400000);

  const yil = Math.floor(toplamGun / 365);
  const kalanYildan = toplamGun % 365;
  const ay = Math.floor(kalanYildan / 30);
  const gun = kalanYildan % 30;

  return {
    toplamGun,
    toplamHafta: Math.floor(toplamGun / 7),
    kalanGunHaftadan: toplamGun % 7,
    toplamSaat: toplamGun * 24,
    yil,
    ay,
    gun,
  };
}

export interface BusinessDaysInput {
  baslangicTarihi: string;
  bitisTarihi: string;
  cumartesiCalismaMi: 'hayir' | 'evet';
  resmiTatilGunSayisi?: number;
}

export interface BusinessDaysOutput {
  toplamTakvimGunu: number;
  haftaSonuGunu: number;
  resmiTatilGunu: number;
  netIsGunu: number;
}

export function hesaplaIsGunu(input: BusinessDaysInput): BusinessDaysOutput {
  const t1 = parseUtcDate(input.baslangicTarihi);
  const t2 = parseUtcDate(input.bitisTarihi);
  const start = Math.min(t1, t2);
  const end = Math.max(t1, t2);

  const toplamTakvimGunu = Math.floor((end - start) / 86400000) + 1;
  let haftaSonuGunu = 0;

  // Güvenli döngü (max 3650 gün = 10 yıl)
  const sinirGun = Math.min(toplamTakvimGunu, 3650);
  for (let i = 0; i < sinirGun; i++) {
    const current = new Date(start + i * 86400000);
    const dayOfWeek = current.getUTCDay(); // 0 = Pazar, 6 = Cumartesi
    if (dayOfWeek === 0) {
      haftaSonuGunu++;
    } else if (dayOfWeek === 6 && input.cumartesiCalismaMi === 'hayir') {
      haftaSonuGunu++;
    }
  }

  const resmiTatil = Math.max(0, Math.floor(input.resmiTatilGunSayisi ?? 0));
  const netIsGunu = Math.max(
    0,
    sinirGun - haftaSonuGunu - resmiTatil,
  );

  return {
    toplamTakvimGunu: sinirGun,
    haftaSonuGunu,
    resmiTatilGunu: resmiTatil,
    netIsGunu,
  };
}

export type MilitaryServiceType = '6-ay' | 'bedelli' | 'yedek-subay';

export interface MilitaryDawnInput {
  sulusTarihi: string; // YYYY-MM-DD
  askerlikTuru: MilitaryServiceType;
  kullanilanIzinGunu?: number;
  yolIzniGunu?: number;
  referansBugun?: string;
}

export interface MilitaryDawnOutput {
  toplamHizmetGunu: number;
  terhisTarihi: string;
  gecenGun: number;
  kalanSafakGunu: number;
  durumMesaji: string;
}

const MILITARY_DAYS: Record<MilitaryServiceType, number> = {
  '6-ay': 180,
  bedelli: 28,
  'yedek-subay': 365,
};

export function hesaplaSafak(input: MilitaryDawnInput): MilitaryDawnOutput {
  const sulusMs = parseUtcDate(input.sulusTarihi);
  const bazGun = MILITARY_DAYS[input.askerlikTuru] ?? 180;
  const kullanilanIzin = Math.max(0, Math.floor(input.kullanilanIzinGunu ?? 0));
  const yolIzni = Math.max(0, Math.floor(input.yolIzniGunu ?? 0));

  // Yol izni toplam süreden düşer, fazla izin terhisi uzatabilir; pratik şafak hesabında yol izni düşülür
  const netHizmetGunu = Math.max(1, bazGun - yolIzni - kullanilanIzin);
  const terhisMs = sulusMs + netHizmetGunu * 86400000;
  const terhisTarihi = new Date(terhisMs).toISOString().split('T')[0];

  const bugunMs = input.referansBugun
    ? parseUtcDate(input.referansBugun)
    : Date.now();
  const gecenGun = Math.max(
    0,
    Math.min(netHizmetGunu, Math.floor((bugunMs - sulusMs) / 86400000)),
  );
  const kalanSafakGunu = Math.max(0, netHizmetGunu - gecenGun);

  let durumMesaji = `Şafak: ${kalanSafakGunu} gün`;
  if (kalanSafakGunu === 0) durumMesaji = 'Hayırlı Teskereler! (Terhis)';
  else if (kalanSafakGunu <= 81)
    durumMesaji = `Plakalardasınız! (Şafak ${kalanSafakGunu})`;

  return {
    toplamHizmetGunu: netHizmetGunu,
    terhisTarihi,
    gecenGun,
    kalanSafakGunu,
    durumMesaji,
  };
}

export interface CountdownInput {
  hedefTarih: string; // YYYY-MM-DD
  referansBugun?: string;
}

export interface CountdownOutput {
  kalanGun: number;
  kalanHafta: number;
  kalanSaat: number;
  gecmisMi: boolean;
}

export function hesaplaGeriSayim(input: CountdownInput): CountdownOutput {
  const hedefMs = parseUtcDate(input.hedefTarih);
  const bugunMs = input.referansBugun
    ? parseUtcDate(input.referansBugun)
    : Date.now();

  const farkGun = Math.ceil((hedefMs - bugunMs) / 86400000);
  const gecmisMi = farkGun < 0;
  const mutlakGun = Math.abs(farkGun);

  return {
    kalanGun: mutlakGun,
    kalanHafta: Math.floor(mutlakGun / 7),
    kalanSaat: mutlakGun * 24,
    gecmisMi,
  };
}


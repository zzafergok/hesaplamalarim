import { MEVZUAT_2026 } from '@/config/payroll/mevzuat-2026';
import { KidemInput, KidemOutput } from '@/types/severance';
import { hesaplaCalismaSuresi } from './date-utils';

/**
 * MODÜL: Kıdem Tazminatı Hesaplama
 * 4857 Sayılı İş Kanunu ve ilgili mevzuat uyarınca kıdem tazminatını hesaplar.
 */
export function hesaplaKidemTazminati(
  input: KidemInput,
  tavanUcret: number = MEVZUAT_2026.kidemTavani,
): KidemOutput {
  const calismaSuresi = hesaplaCalismaSuresi(
    input.iseGirisTarihi,
    input.istenCikisTarihi,
    input.dusulecekGunSayisi || 0,
  );
  const toplamGun = calismaSuresi.toplamGun;

  // 1 yıldan (365 gün) az çalışanlar kıdem tazminatına hak kazanamaz
  if (toplamGun < 365) {
    return {
      toplamGun,
      calismaSuresi,
      giydirilmisBrutUcret: 0,
      tavanUgulandiMi: false,
      brutKidemTazminati: 0,
      damgaVergisi: 0,
      netKidemTazminati: 0,
    };
  }

  const hamGiydirilmis = input.aylikBrutMaas + input.aylikDuzenliYanHaklar;
  const tavanUgulandiMi = hamGiydirilmis > tavanUcret;
  const giydirilmisBrutUcret = tavanUgulandiMi ? tavanUcret : hamGiydirilmis;

  const brutKidemTazminati = (giydirilmisBrutUcret * toplamGun) / 365;
  const damgaVergisi = brutKidemTazminati * MEVZUAT_2026.damgaVergisiOrani;
  const netKidemTazminati = brutKidemTazminati - damgaVergisi;

  return {
    toplamGun,
    calismaSuresi,
    giydirilmisBrutUcret,
    tavanUgulandiMi,
    brutKidemTazminati: Math.round(brutKidemTazminati * 100) / 100,
    damgaVergisi: Math.round(damgaVergisi * 100) / 100,
    netKidemTazminati: Math.round(netKidemTazminati * 100) / 100,
  };
}


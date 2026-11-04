import { MEVZUAT_2026 } from '@/config/payroll/mevzuat-2026';
import { IhbarInput, IhbarOutput } from '@/types/severance';

/**
 * MODÜL: İhbar Tazminatı Hesaplama
 * 4857 Sayılı İş Kanunu Madde 17 uyarınca ihbar tazminatını hesaplar.
 */
export function hesaplaIhbarTazminati(
  input: IhbarInput,
  gelirVergisiOrani: number = 0.15,
): IhbarOutput {
  let hafta = 2;
  if (input.toplamGun >= 180 && input.toplamGun < 540) {
    hafta = 4;
  } else if (input.toplamGun >= 540 && input.toplamGun < 1095) {
    hafta = 6;
  } else if (input.toplamGun >= 1095) {
    hafta = 8;
  }

  const ihbarSuresiGun = hafta * 7;
  const gunlukGiydirilmisBrut = input.giydirilmisBrutUcret / 30;
  const brutIhbarTazminati = gunlukGiydirilmisBrut * ihbarSuresiGun;

  const gelirVergisi = brutIhbarTazminati * gelirVergisiOrani;
  const damgaVergisi = brutIhbarTazminati * MEVZUAT_2026.damgaVergisiOrani;
  const netIhbarTazminati = brutIhbarTazminati - (gelirVergisi + damgaVergisi);

  return {
    ihbarSuresiHafta: hafta,
    ihbarSuresiGun,
    brutIhbarTazminati: Math.round(brutIhbarTazminati * 100) / 100,
    gelirVergisi: Math.round(gelirVergisi * 100) / 100,
    damgaVergisi: Math.round(damgaVergisi * 100) / 100,
    netIhbarTazminati: Math.round(netIhbarTazminati * 100) / 100,
  };
}


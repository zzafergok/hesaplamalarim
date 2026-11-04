import { MEVZUAT_2026 } from '@/config/payroll/mevzuat-2026';
import { MaasOutput } from '@/types/payroll';

/**
 * MODÜL: Brütten Nete Maaş Hesaplama
 * SGK tavanı, kümülatif vergi dilimleri ve asgari ücret istisnası dahil.
 */
export function hesaplaBruttenNete(
  brutMaas: number,
  kumulatifMatrah: number = 0,
): MaasOutput {
  const sgkTavani =
    MEVZUAT_2026.brutAsgariUcret * MEVZUAT_2026.sgkTavanKatsayisi;
  const sgkTavaniUgulandiMi = brutMaas > sgkTavani;
  const sgkEsasKazanc = sgkTavaniUgulandiMi ? sgkTavani : brutMaas;

  const sgkIsciPrimi = sgkEsasKazanc * MEVZUAT_2026.sgkIsciOrani;
  const issizlikSigortasiPrimi = sgkEsasKazanc * MEVZUAT_2026.issizlikIsciOrani;
  const gelirVergisiMatrahi =
    brutMaas - (sgkIsciPrimi + issizlikSigortasiPrimi);

  // Kademeli Gelir Vergisi
  let kalanMatrah = Math.max(0, gelirVergisiMatrahi);
  let geciciKumulatif = Math.max(0, kumulatifMatrah);
  let hamGelirVergisi = 0;

  for (const dilim of MEVZUAT_2026.vergiDilimleri) {
    if (kalanMatrah <= 0) break;

    if (geciciKumulatif < dilim.limit) {
      const dilimKapasite = dilim.limit - geciciKumulatif;
      const dilimeGiren = Math.min(kalanMatrah, dilimKapasite);

      hamGelirVergisi += dilimeGiren * dilim.oran;
      kalanMatrah -= dilimeGiren;
      geciciKumulatif += dilimeGiren;
    }
  }

  const hamDamgaVergisi = brutMaas * MEVZUAT_2026.damgaVergisiOrani;

  // Asgari Ücret Vergi İstisnası
  const nihaiGelirVergisi = Math.max(
    0,
    hamGelirVergisi - MEVZUAT_2026.asgariUcretGelirIstisnasi,
  );
  const nihaiDamgaVergisi = Math.max(
    0,
    hamDamgaVergisi - MEVZUAT_2026.asgariUcretDamgaIstisnasi,
  );

  const netMaas =
    brutMaas -
    (sgkIsciPrimi +
      issizlikSigortasiPrimi +
      nihaiGelirVergisi +
      nihaiDamgaVergisi);

  return {
    brutMaas: Math.round(brutMaas * 100) / 100,
    sgkIsciPrimi: Math.round(sgkIsciPrimi * 100) / 100,
    issizlikSigortasiPrimi: Math.round(issizlikSigortasiPrimi * 100) / 100,
    gelirVergisiMatrahi: Math.round(gelirVergisiMatrahi * 100) / 100,
    gelirVergisi: Math.round(nihaiGelirVergisi * 100) / 100,
    damgaVergisi: Math.round(nihaiDamgaVergisi * 100) / 100,
    netMaas: Math.round(netMaas * 100) / 100,
    kumulatifMatrahSonrasi:
      Math.round((kumulatifMatrah + gelirVergisiMatrahi) * 100) / 100,
    sgkTavaniUgulandiMi,
  };
}


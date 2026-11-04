import { describe, expect, it } from 'vitest';

import {
  ALL_CALCULATORS,
  CALCULATOR_CATEGORIES,
} from '@/features/calculators/registry';
import {
  hesaplaAkademikNot,
  hesaplaAltinDegerleme,
  hesaplaAracMtv,
  hesaplaBahsisBolusturme,
  hesaplaBirimDonusumu,
  hesaplaBirimFiyatKiyas,
  hesaplaBmrTdee,
  hesaplaEnflasyonKaybi,
  hesaplaErkenKapama,
  hesaplaGebelik,
  hesaplaGeometri,
  hesaplaGeriSayim,
  hesaplaIndirimKampanya,
  hesaplaIsGunu,
  hesaplaIssizlikMaasi,
  hesaplaKdvTevkifat,
  hesaplaKiraArtisi,
  hesaplaKrediTaksit,
  hesaplaMakroBesin,
  hesaplaMevduatGetirisi,
  hesaplaMirasPaylasimi,
  hesaplaSafak,
  hesaplaSmm,
  hesaplaSuIhtiyaci,
  hesaplaTapuHarci,
  hesaplaTarihFarki,
  hesaplaVkiIdealKilo,
  hesaplaYakitTuketimi,
  hesaplaYasalFaiz,
  hesaplaYuzde,
} from '@/lib/calculators';

describe('7 Kategori ve 33 Hesaplama Aracı Kapsamlı Test Paketi', () => {
  it('1. Finans: Kredi taksit, erken kapama, mevduat, enflasyon ve altın hesaplar', () => {
    const kredi = hesaplaKrediTaksit({
      krediTuru: 'ihtiyac',
      anapara: 100000,
      aylikFaizOrani: 3.5,
      vadeAy: 12,
    });
    expect(kredi.aylikTaksit).toBeGreaterThan(10000);
    expect(kredi.toplamGeriOdeme).toBeGreaterThan(100000);

    const erken = hesaplaErkenKapama({
      krediTuru: 'konut',
      kalanAnapara: 500000,
      aylikFaizOrani: 3.0,
      kalanVadeAy: 48,
      araOdemeTutari: 100000,
    });
    expect(erken.vadeKisaltmaTasarruf).toBeGreaterThan(0);
    expect(erken.erkenOdemeKomisyonu).toBe(2000); // > 36 ay %2

    const mevduat = hesaplaMevduatGetirisi({
      anapara: 100000,
      yillikFaizOrani: 45,
      gunSayisi: 32,
      stopajOrani: 15,
      bilesikMi: 'hayir',
    });
    expect(mevduat.netFaizGetirisi).toBeLessThan(mevduat.brutFaizGetirisi);

    const enflasyon = hesaplaEnflasyonKaybi({
      tutar: 100000,
      yillikEnflasyonOrani: 50,
      yilSayisi: 2,
    });
    expect(enflasyon.gelecektekiEsdegerTutar).toBe(225000);

    const altin = hesaplaAltinDegerleme({
      varlikTuru: 'bilezik22',
      miktar: 10,
      hasAltinGramFiyati: 3000,
    });
    expect(altin.toplamHasAltinGram).toBe(9.16);
  });

  it('2. Bordro & Vergi: İşsizlik maaşı, KDV tevkifatı ve SMM hesaplar', () => {
    const issizlik = hesaplaIssizlikMaasi({
      son4AyOrtalamaBrut: 40000,
      primGunuKategorisi: '900',
    });
    expect(issizlik.hakEdilenAy).toBe(8);
    expect(issizlik.aylikNetOdenek).toBeGreaterThan(0);

    const kdv = hesaplaKdvTevkifat({
      tutar: 10000,
      islemYonu: 'haric',
      kdvOrani: 20,
      tevkifatPayi: 5,
    });
    expect(kdv.hesaplananKdv).toBe(2000);
    expect(kdv.tevkifEdilenKdv).toBe(1000);
    expect(kdv.faturaTahsilatTutari).toBe(11000);

    const smm = hesaplaSmm({
      tutar: 20000,
      hesaplamaYonu: 'brutten',
      stopajOrani: 20,
      kdvOrani: 20,
    });
    expect(smm.netTahsilat).toBe(20000);
  });

  it('3. Gündelik & Alışveriş: İndirim, birim fiyat, yakıt, bahşiş ve yüzde hesaplar', () => {
    const indirim = hesaplaIndirimKampanya({
      etiketFiyati: 1000,
      birinciIndirimOrani: 20,
      ikinciEkIndirimOrani: 10,
    });
    expect(indirim.odenecekNetFiyat).toBe(720);
    expect(indirim.gercekIndirimYuzdesi).toBe(28);

    const birim = hesaplaBirimFiyatKiyas({
      urun1Fiyat: 100,
      urun1MiktarGrMl: 500,
      urun2Fiyat: 180,
      urun2MiktarGrMl: 1000,
    });
    expect(birim.avantajliUrun).toContain('2. Ürün');

    const yakit = hesaplaYakitTuketimi({
      mesafeKm: 200,
      tuketim100Km: 7,
      yakitLitreFiyati: 40,
      yolcuSayisi: 2,
    });
    expect(yakit.toplamYolculukMaliyeti).toBe(560);
    expect(yakit.kisiBasiMaliyet).toBe(280);

    const bahsis = hesaplaBahsisBolusturme({
      hesapTutari: 1000,
      bahsisOraniYuzde: 10,
      kisiSayisi: 2,
    });
    expect(bahsis.kisiBasiOdeme).toBe(550);

    const yuzde = hesaplaYuzde({
      islemTuru: 'oranin-degeri',
      sayiA: 500,
      sayiB: 15,
    });
    expect(yuzde.anaSonuc).toBe(75);
  });

  it('4. Sağlık: VKİ, BMR/TDEE, makro, su ve gebelik hesaplar', () => {
    const vki = hesaplaVkiIdealKilo({
      boyCm: 180,
      kiloKg: 75,
      cinsiyet: 'erkek',
    });
    expect(vki.vki).toBeCloseTo(23.15, 1);

    const bmr = hesaplaBmrTdee({
      cinsiyet: 'erkek',
      yas: 30,
      boyCm: 180,
      kiloKg: 80,
      aktiviteKatsayisi: 1.55,
    });
    expect(bmr.gunlukKaloriTdee).toBeGreaterThan(bmr.bazalMetabolizmaBmr);

    const makro = hesaplaMakroBesin({
      gunlukKalori: 2000,
      diyetProfili: 'dengeli',
    });
    expect(makro.proteinGram).toBe(150);

    const su = hesaplaSuIhtiyaci({ kiloKg: 70, egzersizDakika: 30 });
    expect(su.gunlukSuLitre).toBeCloseTo(2.66, 1);

    const gebelik = hesaplaGebelik({
      sonAdetTarihi: '2026-01-01',
      referansBugun: '2026-03-12',
    });
    expect(gebelik.gebelikHaftasi).toBe(10);
  });

  it('5-7. Hukuk, Tarih ve Matematik hesaplamaları ile Kayıt Defteri tam uyumludur', () => {
    expect(hesaplaKiraArtisi({ mevcutKira: 10000, tufe12AylikOrtalama: 50 }).yasalUstSinirKira).toBe(15000);
    expect(hesaplaTapuHarci({ satisBedeli: 1000000, donerSermayeUcreti: 3000 }).toplamTapuHarci).toBe(40000);
    expect(hesaplaAracMtv({ motorHacmi: '1301-1600', aracYasi: '1-3' }).yillikMtvTutari).toBeGreaterThan(0);
    expect(hesaplaYasalFaiz({ anapara: 100000, gecikmeGunSayisi: 365, yillikFaizOrani: 24 }).isleyenFaizTutari).toBe(24000);
    expect(
      hesaplaMirasPaylasimi({
        terekeDegeri: 1000000,
        sagKalanEsVarMi: 'evet',
        mirasGrubu: '1-altsoy',
        cocukVeyaMirasciSayisi: 3,
      }).mirasciBasinaTutar,
    ).toBe(250000);

    expect(hesaplaTarihFarki({ baslangicTarihi: '2026-01-01', bitisTarihi: '2026-01-15' }).toplamGun).toBe(14);
    expect(hesaplaIsGunu({ baslangicTarihi: '2026-01-05', bitisTarihi: '2026-01-09', cumartesiCalismaMi: 'hayir' }).netIsGunu).toBe(5);
    expect(hesaplaSafak({ sulusTarihi: '2026-01-01', askerlikTuru: 'bedelli', referansBugun: '2026-01-11' }).kalanSafakGunu).toBe(18);
    expect(hesaplaGeriSayim({ hedefTarih: '2026-12-31', referansBugun: '2026-12-01' }).kalanGun).toBe(30);

    expect(hesaplaBirimDonusumu({ donusumTuru: 'c-to-f-k', deger: 0 }).anaCiktiDegeri).toBe(32);
    expect(hesaplaGeometri({ sekil: 'dikdortgen', olcu1: 5, olcu2: 10 }).anaSonucDegeri).toBe(50);
    expect(hesaplaAkademikNot({ vizeNotu: 80, vizeAgirligiYuzde: 40, finalNotu: 90 }).harfNotu).toBe('BA');

    expect(CALCULATOR_CATEGORIES.length).toBe(7);
    expect(ALL_CALCULATORS.length).toBe(33);
    for (const calc of ALL_CALCULATORS) {
      const defaults: Record<string, string | number> = {};
      for (const f of calc.fields) defaults[f.name] = f.defaultValue;
      const out = calc.calculate(defaults);
      expect(out.primaryValue).toBeTruthy();
    }
  });
});


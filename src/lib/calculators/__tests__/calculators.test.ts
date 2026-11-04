import { describe, expect, it } from 'vitest';

import { MEVZUAT_2026 } from '@/config/payroll';
import {
  hesaplaCalismaSuresi,
  hesaplaIhbarTazminati,
  hesaplaKidemTazminati,
} from '@/lib/calculators/severance';
import {
  hesaplaBruttenNete,
  hesaplaNettenBrute,
} from '@/lib/calculators/salary';
import {
  hesaplaKidemTazminati as servisKidem,
  hesaplaIhbarTazminati as servisIhbar,
} from '@/services/tazminatService';

describe('Tazminat & Maaş Hesaplama Motoru Testleri', () => {
  describe('Çalışma Süresi ve Tarih Yardımcısı (date-utils)', () => {
    it('1 yıldan az çalışma süresini doğru ayrıştırır', () => {
      const sonuc = hesaplaCalismaSuresi('2024-01-01', '2024-07-01');
      expect(sonuc.yil).toBe(0);
      expect(sonuc.toplamGun).toBe(182);
    });

    it('2 yıl ve artık günleri doğru hesaplar', () => {
      const sonuc = hesaplaCalismaSuresi('2022-01-01', '2024-01-01');
      expect(sonuc.yil).toBe(2);
      expect(sonuc.toplamGun).toBe(730);
    });

    it('Düşülecek gün sayısını toplam süreden çıkarır', () => {
      const sonuc = hesaplaCalismaSuresi('2022-01-01', '2024-01-01', 30);
      expect(sonuc.toplamGun).toBe(700);
    });
  });

  describe('Kıdem Tazminatı Hesaplama', () => {
    it('1 yıldan az çalışanlar kıdem tazminatı alamaz', () => {
      const sonuc = hesaplaKidemTazminati({
        iseGirisTarihi: '2024-01-01',
        istenCikisTarihi: '2024-06-01',
        aylikBrutMaas: 50000,
        aylikDuzenliYanHaklar: 0,
      });

      expect(sonuc.brutKidemTazminati).toBe(0);
      expect(sonuc.netKidemTazminati).toBe(0);
      expect(sonuc.damgaVergisi).toBe(0);
    });

    it('1 yıl çalışan için brüt maaş üzerinden damga vergisi kesilir', () => {
      const sonuc = hesaplaKidemTazminati({
        iseGirisTarihi: '2023-01-01',
        istenCikisTarihi: '2024-01-01', // 365 gün
        aylikBrutMaas: 40000,
        aylikDuzenliYanHaklar: 0,
      });

      expect(sonuc.giydirilmisBrutUcret).toBe(40000);
      expect(sonuc.tavanUgulandiMi).toBe(false);
      expect(sonuc.brutKidemTazminati).toBe(40000);
      const beklenenDamga = 40000 * MEVZUAT_2026.damgaVergisiOrani;
      expect(sonuc.damgaVergisi).toBeCloseTo(beklenenDamga, 1);
      expect(sonuc.netKidemTazminati).toBeCloseTo(40000 - beklenenDamga, 1);
    });

    it('Tavanı aşan giydirilmiş ücrette kıdem tavanı uygulanır', () => {
      const sonuc = hesaplaKidemTazminati({
        iseGirisTarihi: '2023-01-01',
        istenCikisTarihi: '2024-01-01',
        aylikBrutMaas: 100000,
        aylikDuzenliYanHaklar: 20000,
      });

      expect(sonuc.tavanUgulandiMi).toBe(true);
      expect(sonuc.giydirilmisBrutUcret).toBe(MEVZUAT_2026.kidemTavani);
      expect(sonuc.brutKidemTazminati).toBeCloseTo(MEVZUAT_2026.kidemTavani, 1);
    });
  });

  describe('İhbar Tazminatı Hesaplama', () => {
    it('180 günden az çalışanlar için 2 hafta ihbar süresi hesaplanır', () => {
      const sonuc = hesaplaIhbarTazminati({
        toplamGun: 100,
        giydirilmisBrutUcret: 30000,
      });

      expect(sonuc.ihbarSuresiHafta).toBe(2);
      expect(sonuc.ihbarSuresiGun).toBe(14);
      expect(sonuc.brutIhbarTazminati).toBe(14000);
      expect(sonuc.gelirVergisi).toBe(14000 * 0.15);
      expect(sonuc.netIhbarTazminati).toBeLessThan(sonuc.brutIhbarTazminati);
    });

    it('3 yıldan fazla çalışanlar için 8 hafta (56 gün) ihbar süresi hesaplanır', () => {
      const sonuc = hesaplaIhbarTazminati({
        toplamGun: 1200,
        giydirilmisBrutUcret: 60000,
      });

      expect(sonuc.ihbarSuresiHafta).toBe(8);
      expect(sonuc.ihbarSuresiGun).toBe(56);
      expect(sonuc.brutIhbarTazminati).toBeCloseTo((60000 / 30) * 56, 1);
    });
  });

  describe('Maaş Bordro ve Netten Brüte Çevrim', () => {
    it('Brütten nete maaş hesabı SGK, işsizlik ve vergileri düşer', () => {
      const sonuc = hesaplaBruttenNete(60000, 0);

      expect(sonuc.brutMaas).toBe(60000);
      expect(sonuc.sgkIsciPrimi).toBe(60000 * 0.14);
      expect(sonuc.issizlikSigortasiPrimi).toBe(60000 * 0.01);
      expect(sonuc.netMaas).toBeGreaterThan(0);
      expect(sonuc.netMaas).toBeLessThan(sonuc.brutMaas);
    });

    it('Netten brüte ikili arama hedef net maaşı kuruş hassasiyetinde bulur', () => {
      const hedefNet = 42500;
      const sonuc = hesaplaNettenBrute(hedefNet, 0);

      expect(Math.abs(sonuc.netMaas - hedefNet)).toBeLessThanOrEqual(0.05);
    });

    it('Servis adaptörü de aynı doğruluğu sağlar', () => {
      const sonuc1 = servisKidem({
        iseGirisTarihi: '2023-01-01',
        istenCikisTarihi: '2024-01-01',
        aylikBrutMaas: 40000,
        aylikDuzenliYanHaklar: 0,
      });
      const sonuc2 = servisIhbar({
        toplamGun: 200,
        giydirilmisBrutUcret: 30000,
      });

      expect(sonuc1.netKidemTazminati).toBeGreaterThan(0);
      expect(sonuc2.netIhbarTazminati).toBeGreaterThan(0);
    });
  });
});


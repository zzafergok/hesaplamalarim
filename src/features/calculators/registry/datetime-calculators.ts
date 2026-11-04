import {
  MilitaryServiceType,
  hesaplaGeriSayim,
  hesaplaIsGunu,
  hesaplaSafak,
  hesaplaTarihFarki,
} from '@/lib/calculators/datetime';
import { parseAmountInput } from '@/lib/utils';
import { CalculatorDefinition } from './types';

function num(v: string | number | undefined, fallback = 0): number {
  if (typeof v === 'number') return Number.isFinite(v) ? v : fallback;
  if (!v) return fallback;
  const parsed = parseAmountInput(String(v));
  return parsed !== null && Number.isFinite(parsed) ? parsed : Number(v) || fallback;
}

export const DATETIME_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'tarih-farki',
    categoryId: 'zaman-takvim',
    title: 'İki Tarih Arası Gün, Hafta ve Saat Farkı',
    shortTitle: 'İki Tarih Arası Fark',
    description: 'Başlangıç ve bitiş tarihleri arasındaki toplam gün, hafta, saat ve Yıl/Ay/Gün kırılımı.',
    fields: [
      { name: 'baslangicTarihi', label: 'Başlangıç Tarihi', type: 'date', defaultValue: '2025-01-01', required: true },
      { name: 'bitisTarihi', label: 'Bitiş Tarihi', type: 'date', defaultValue: '2026-11-04', required: true },
    ],
    calculate: (v) => {
      const res = hesaplaTarihFarki({
        baslangicTarihi: String(v.baslangicTarihi || '2025-01-01'),
        bitisTarihi: String(v.bitisTarihi || '2026-11-04'),
      });
      return {
        primaryLabel: 'Toplam Gün Farkı',
        primaryValue: `${res.toplamGun} Gün`,
        primarySubtitle: `${res.yil} Yıl, ${res.ay} Ay, ${res.gun} Gün`,
        metrics: [
          { label: 'Hafta Cinsinden', value: `${res.toplamHafta} Hafta + ${res.kalanGunHaftadan} Gün` },
          { label: 'Saat Cinsinden', value: `${res.toplamSaat.toLocaleString('tr-TR')} Saat` },
        ],
      };
    },
  },
  {
    id: 'is-gunu',
    categoryId: 'zaman-takvim',
    title: 'İş Günü & Mesai Günü Hesaplama',
    shortTitle: 'İş Günü Hesaplama',
    description: 'Hafta sonları ve resmi tatiller düşüldükten sonra iki tarih arasındaki net çalışma (iş) günü sayısı.',
    fields: [
      { name: 'baslangicTarihi', label: 'Başlangıç Tarihi', type: 'date', defaultValue: '2026-01-01', required: true },
      { name: 'bitisTarihi', label: 'Bitiş Tarihi', type: 'date', defaultValue: '2026-01-31', required: true },
      {
        name: 'cumartesiCalismaMi',
        label: 'Cumartesi Çalışma Durumu',
        type: 'select',
        defaultValue: 'hayir',
        options: [
          { value: 'hayir', label: 'Cumartesi Tatil (Haftada 5 İş Günü)' },
          { value: 'evet', label: 'Cumartesi Mesai Günü (Haftada 6 İş Günü)' },
        ],
      },
      { name: 'resmiTatilGunSayisi', label: 'Dönem İçindeki Resmi Tatil Gün Sayısı', type: 'number', defaultValue: 1, min: 0, max: 60 },
    ],
    calculate: (v) => {
      const res = hesaplaIsGunu({
        baslangicTarihi: String(v.baslangicTarihi || '2026-01-01'),
        bitisTarihi: String(v.bitisTarihi || '2026-01-31'),
        cumartesiCalismaMi: String(v.cumartesiCalismaMi || 'hayir') as 'hayir' | 'evet',
        resmiTatilGunSayisi: num(v.resmiTatilGunSayisi, 1),
      });
      return {
        primaryLabel: 'Net İş / Mesai Günü Sayısı',
        primaryValue: `${res.netIsGunu} İş Günü`,
        primarySubtitle: `Toplam Takvim Süresi: ${res.toplamTakvimGunu} Gün`,
        metrics: [
          { label: 'Hafta Sonu Tatil Günleri', value: `${res.haftaSonuGunu} Gün`, tone: 'negative' },
          { label: 'Düşülen Resmi Tatil', value: `${res.resmiTatilGunu} Gün`, tone: 'negative' },
        ],
      };
    },
  },
  {
    id: 'safak-sayaci',
    categoryId: 'zaman-takvim',
    title: 'Şafak & Askerlik Terhis Hesaplayıcı',
    shortTitle: 'Şafak / Askerlik',
    description: 'Sülüs (sevk) tarihi, askerlik türü ve yol iznine göre kalan şafak günü ve resmi terhis tarihi.',
    fields: [
      { name: 'sulusTarihi', label: 'Sülüs / Sevk Başlangıç Tarihi', type: 'date', defaultValue: '2026-08-01', required: true },
      {
        name: 'askerlikTuru',
        label: 'Askerlik Hizmet Türü',
        type: 'select',
        defaultValue: '6-ay',
        options: [
          { value: '6-ay', label: 'Erbaş / Er (6 Ay - 180 Gün)' },
          { value: 'bedelli', label: 'Bedelli Askerlik (28 Gün)' },
          { value: 'yedek-subay', label: 'Yedek Subay / Astsubay (12 Ay - 365 Gün)' },
        ],
      },
      { name: 'yolIzniGunu', label: 'Yol İzni (Gün)', type: 'number', defaultValue: 2, min: 0, max: 15 },
    ],
    calculate: (v) => {
      const res = hesaplaSafak({
        sulusTarihi: String(v.sulusTarihi || '2026-08-01'),
        askerlikTuru: String(v.askerlikTuru || '6-ay') as MilitaryServiceType,
        yolIzniGunu: num(v.yolIzniGunu, 2),
      });
      return {
        primaryLabel: 'Kalan Şafak Sayısı',
        primaryValue: `${res.kalanSafakGunu} Gün`,
        primarySubtitle: `Terhis Tarihi: ${res.terhisTarihi}`,
        badge: res.durumMesaji,
        metrics: [
          { label: 'Tamamlanan Hizmet', value: `${res.gecenGun} Gün`, tone: 'positive' },
          { label: 'Net Hizmet Süresi', value: `${res.toplamHizmetGunu} Gün` },
        ],
      };
    },
  },
  {
    id: 'geri-sayim',
    categoryId: 'zaman-takvim',
    title: 'Özel Gün & Sınav Geri Sayım Sayacı',
    shortTitle: 'Geri Sayım Sayacı',
    description: 'Hedeflenen sınav, tatil veya etkinlik tarihine bugünden itibaren kaç gün, hafta ve saat kaldığını hesaplayın.',
    fields: [
      { name: 'hedefTarih', label: 'Hedef Etkinlik / Sınav Tarihi', type: 'date', defaultValue: '2027-01-01', required: true },
    ],
    calculate: (v) => {
      const res = hesaplaGeriSayim({
        hedefTarih: String(v.hedefTarih || '2027-01-01'),
      });
      return {
        primaryLabel: res.gecmisMi ? 'Tarihten Bu Yana Geçen Süre' : 'Hedef Tarihe Kalan Süre',
        primaryValue: `${res.kalanGun} Gün`,
        primarySubtitle: `Hedef Tarih: ${String(v.hedefTarih || '2027-01-01')}`,
        metrics: [
          { label: 'Tam Hafta Karşılığı', value: `${res.kalanHafta} Hafta` },
          { label: 'Toplam Saat Karşılığı', value: `${res.kalanSaat.toLocaleString('tr-TR')} Saat` },
        ],
      };
    },
  },
];


import {
  GeometryShape,
  UnitConversionType,
  hesaplaAkademikNot,
  hesaplaBirimDonusumu,
  hesaplaGeometri,
} from '@/lib/calculators/math';
import { parseAmountInput } from '@/lib/utils';
import { CalculatorDefinition } from './types';

function num(v: string | number | undefined, fallback = 0): number {
  if (typeof v === 'number') return Number.isFinite(v) ? v : fallback;
  if (!v) return fallback;
  const parsed = parseAmountInput(String(v));
  return parsed !== null && Number.isFinite(parsed) ? parsed : Number(v) || fallback;
}

export const MATH_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'birim-donusturucu',
    categoryId: 'matematik-muhendislik',
    title: 'Kapsamlı Birim Dönüştürücü (Uzunluk, Ağırlık, Sıcaklık, Veri)',
    shortTitle: 'Birim Dönüştürücü',
    description: 'Metrik, emperyal, sıcaklık ve dijital veri depolama birimlerini anında birbirine dönüştürün.',
    fields: [
      {
        name: 'donusumTuru',
        label: 'Dönüşüm Kategorisi',
        type: 'select',
        defaultValue: 'm-to-km-ft-in',
        options: [
          { value: 'm-to-km-ft-in', label: 'Uzunluk: Metre (m) → Feet, İnç, Km' },
          { value: 'kg-to-gr-lb-oz', label: 'Ağırlık: Kilogram (kg) → Pound (lb), Gram, Ons' },
          { value: 'c-to-f-k', label: 'Sıcaklık: Celsius (°C) → Fahrenheit (°F), Kelvin (K)' },
          { value: 'gb-to-mb-tb-gib', label: 'Veri: Gigabyte (GB) → MB, TB, GiB' },
        ],
      },
      { name: 'deger', label: 'Dönüştürülecek Değer', type: 'number', defaultValue: 100, required: true },
    ],
    calculate: (v) => {
      const res = hesaplaBirimDonusumu({
        donusumTuru: String(v.donusumTuru || 'm-to-km-ft-in') as UnitConversionType,
        deger: num(v.deger, 100),
      });
      return {
        primaryLabel: res.anaCiktiBirimi,
        primaryValue: `${res.anaCiktiDegeri} ${res.anaCiktiBirimi}`,
        metrics: [
          { label: res.ikinciCiktiBirimi, value: String(res.ikinciCiktiDegeri) },
          { label: res.ucuncuCiktiBirimi, value: String(res.ucuncuCiktiDegeri) },
        ],
      };
    },
  },
  {
    id: 'alan-hacim',
    categoryId: 'matematik-muhendislik',
    title: 'Geometrik Alan, Çevre & Hacim Hesaplama',
    shortTitle: 'Alan & Hacim',
    description: 'Daire, dikdörtgen, üçgen, silindir, küre ve koni için alan, çevre ve hacim hesaplamaları.',
    fields: [
      {
        name: 'sekil',
        label: 'Geometrik Şekil / Cisim',
        type: 'select',
        defaultValue: 'daire',
        options: [
          { value: 'daire', label: 'Daire (Yarıçap r)' },
          { value: 'dikdortgen', label: 'Dikdörtgen (Kenar a ve b)' },
          { value: 'ucgen', label: 'Üçgen (Taban a ve Yükseklik h)' },
          { value: 'silindir', label: 'Silindir (Yarıçap r ve Yükseklik h)' },
          { value: 'kure', label: 'Küre (Yarıçap r)' },
          { value: 'koni', label: 'Koni (Yarıçap r ve Yükseklik h)' },
        ],
      },
      { name: 'olcu1', label: '1. Ölçü: Yarıçap (r) veya Taban (a)', type: 'number', defaultValue: 10, min: 0.01, required: true },
      { name: 'olcu2', label: '2. Ölçü: Yükseklik (h) veya Kenar (b)', type: 'number', defaultValue: 20, min: 0 },
    ],
    calculate: (v) => {
      const res = hesaplaGeometri({
        sekil: String(v.sekil || 'daire') as GeometryShape,
        olcu1: num(v.olcu1, 10),
        olcu2: num(v.olcu2, 20),
      });
      return {
        primaryLabel: res.anaSonucEtiketi,
        primaryValue: String(res.anaSonucDegeri),
        primarySubtitle: res.formulBilgisi,
        metrics: [
          { label: res.ikinciSonucEtiketi, value: String(res.ikinciSonucDegeri) },
        ],
      };
    },
  },
  {
    id: 'akademik-not',
    categoryId: 'matematik-muhendislik',
    title: 'Üniversite Vize / Final Not Ortalaması & GPA Hesaplama',
    shortTitle: 'Vize / Final & GPA',
    description: 'Vize ve final ağırlıklarına, final geçme barajına göre dönem sonu başarı notu ve 4’lük harf karşılığı.',
    fields: [
      { name: 'vizeNotu', label: 'Vize Notu (0 - 100)', type: 'number', defaultValue: 75, min: 0, max: 100, required: true },
      { name: 'vizeAgirligiYuzde', label: 'Vize Etki Ağırlığı (%)', type: 'number', defaultValue: 40, min: 10, max: 90, required: true },
      { name: 'finalNotu', label: 'Final / Bütünleme Notu (0 - 100)', type: 'number', defaultValue: 82, min: 0, max: 100, required: true },
      { name: 'finalBaraji', label: 'Final Geçme Barajı', type: 'number', defaultValue: 50, min: 0, max: 100 },
    ],
    calculate: (v) => {
      const res = hesaplaAkademikNot({
        vizeNotu: num(v.vizeNotu, 75),
        vizeAgirligiYuzde: num(v.vizeAgirligiYuzde, 40),
        finalNotu: num(v.finalNotu, 82),
        finalBaraji: num(v.finalBaraji, 50),
      });
      return {
        primaryLabel: 'Dönem Sonu Ağırlıklı Başarı Ortalaması',
        primaryValue: `${res.agirlikliOrtalama} (${res.harfNotu})`,
        primarySubtitle: res.gecmeDurumu,
        badge: `GPA Katsayısı: ${res.dortlukKatsayi.toFixed(2)} / 4.00`,
        metrics: [
          { label: 'Harf Notu Karşılığı', value: res.harfNotu, tone: res.dortlukKatsayi >= 2 ? 'positive' : 'negative' },
          { label: '4.00 Sistem Katsayısı', value: res.dortlukKatsayi.toFixed(2) },
        ],
      };
    },
  },
];


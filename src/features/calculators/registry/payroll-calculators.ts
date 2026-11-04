import {
  PrimGunuKategorisi,
  hesaplaIssizlikMaasi,
  hesaplaKdvTevkifat,
  hesaplaSmm,
} from '@/lib/calculators/payroll';
import { formatCurrency, parseAmountInput } from '@/lib/utils';
import { SALARY_SEVERANCE_CALCULATORS } from './salary-severance-calculators';
import { CalculatorDefinition } from './types';

function num(v: string | number | undefined, fallback = 0): number {
  if (typeof v === 'number') return Number.isFinite(v) ? v : fallback;
  if (!v) return fallback;
  const parsed = parseAmountInput(String(v));
  return parsed !== null && Number.isFinite(parsed) ? parsed : Number(v) || fallback;
}

const tl = (amount: number) => formatCurrency(amount, 'TRY', 'tr-TR');

export const PAYROLL_CALCULATORS: CalculatorDefinition[] = [
  ...SALARY_SEVERANCE_CALCULATORS,
  {
    id: 'issizlik-maasi',
    categoryId: 'bordro-vergi',
    title: 'İşsizlik Maaşı Hesaplama',
    shortTitle: 'İşsizlik Maaşı',
    description:
      'Son 4 aylık prime esas kazanç ortalaması ve son 3 yıldaki prim gününe göre İŞKUR işsizlik ödeneği.',
    legalNote:
      '4447 Sayılı Kanun: Aylık işsizlik ödeneği brüt asgari ücretin %80’ini aşamaz.',
    fields: [
      {
        name: 'son4AyOrtalamaBrut',
        label: 'Son 4 Aylık Ortalama Brüt Maaş (TL)',
        type: 'amount',
        defaultValue: 45000,
        min: 1000,
        required: true,
      },
      {
        name: 'primGunuKategorisi',
        label: 'Son 3 Yıldaki SGK Prim Gün Sayısı',
        type: 'select',
        defaultValue: '900',
        options: [
          { value: '600', label: '600 - 899 Gün (6 Ay / 180 Gün Maaş)' },
          { value: '900', label: '900 - 1079 Gün (8 Ay / 240 Gün Maaş)' },
          { value: '1080', label: '1080 Gün ve Üzeri (10 Ay / 300 Gün Maaş)' },
        ],
      },
    ],
    calculate: (v) => {
      const res = hesaplaIssizlikMaasi({
        son4AyOrtalamaBrut: num(v.son4AyOrtalamaBrut, 45000),
        primGunuKategorisi: String(
          v.primGunuKategorisi || '900',
        ) as PrimGunuKategorisi,
      });
      return {
        primaryLabel: 'Aylık Net İşsizlik Maaşı',
        primaryValue: tl(res.aylikNetOdenek),
        primarySubtitle: `Hak Edilen Süre: ${res.hakEdilenAy} Ay (${res.hakEdilenGun} Gün)`,
        badge: res.tavanUgulandiMi
          ? '%80 Asgari Ücret Tavanı Uygulandı'
          : 'Standart %40 Oran',
        metrics: [
          {
            label: 'Toplam Alınacak Net Ödenek',
            value: tl(res.toplamNetOdenek),
            tone: 'positive',
          },
          { label: 'Aylık Brüt Ödenek', value: tl(res.aylikBrutOdenek) },
          {
            label: 'Damga Vergisi Kesintisi',
            value: tl(res.damgaVergisi),
            tone: 'negative',
          },
        ],
      };
    },
  },
  {
    id: 'kdv-tevkifat',
    categoryId: 'bordro-vergi',
    title: 'KDV Tevkifatı & KDV Dahil / Hariç Hesaplama',
    shortTitle: 'KDV & Tevkifat',
    description:
      '%1, %10, %20 KDV oranları ve 2/10, 5/10, 7/10, 9/10 tevkifat paylarıyla fatura matrahı hesaplama.',
    fields: [
      {
        name: 'tutar',
        label: 'Tutar (TL)',
        type: 'amount',
        defaultValue: 50000,
        min: 1,
        required: true,
      },
      {
        name: 'islemYonu',
        label: 'Hesaplama Yönü',
        type: 'select',
        defaultValue: 'haric',
        options: [
          { value: 'haric', label: 'KDV Hariç Tutardan Hesapla' },
          { value: 'dahil', label: 'KDV Dahil Tutardan Ayıkla' },
        ],
      },
      {
        name: 'kdvOrani',
        label: 'KDV Oranı (%)',
        type: 'select',
        defaultValue: '20',
        options: [
          { value: '20', label: '%20 (Genel Oran)' },
          { value: '10', label: '%10 (İndirimli Oran)' },
          { value: '1', label: '%1 (Temel Gıda / Özel)' },
        ],
      },
      {
        name: 'tevkifatPayi',
        label: 'Tevkifat Oranı',
        type: 'select',
        defaultValue: '5',
        options: [
          { value: '0', label: 'Tevkifatsız (0/10)' },
          { value: '2', label: '2/10 Tevkifat' },
          { value: '5', label: '5/10 Tevkifat' },
          { value: '7', label: '7/10 Tevkifat' },
          { value: '9', label: '9/10 Tevkifat' },
        ],
      },
    ],
    calculate: (v) => {
      const res = hesaplaKdvTevkifat({
        tutar: num(v.tutar, 50000),
        islemYonu: String(v.islemYonu || 'haric') as 'haric' | 'dahil',
        kdvOrani: num(v.kdvOrani, 20),
        tevkifatPayi: num(v.tevkifatPayi, 5),
      });
      return {
        primaryLabel: 'Satıcıya Ödenecek (Tahsil Edilecek) Toplam',
        primaryValue: tl(res.faturaTahsilatTutari),
        primarySubtitle: `KDV Hariç Matrah: ${tl(res.kdvHaricMatrah)}`,
        metrics: [
          { label: 'Hesaplanan Toplam KDV', value: tl(res.hesaplananKdv) },
          {
            label: 'Tevkif Edilen KDV (Alıcı Öder)',
            value: tl(res.tevkifEdilenKdv),
            tone: 'negative',
          },
          {
            label: 'Satıcıya Ödenen KDV',
            value: tl(res.saticiyaOdenenKdv),
            tone: 'positive',
          },
          { label: 'KDV Dahil Genel Toplam', value: tl(res.kdvDahilToplam) },
        ],
      };
    },
  },
  {
    id: 'serbest-meslek-makbuzu',
    categoryId: 'bordro-vergi',
    title: 'Freelance / Serbest Meslek Makbuzu (SMM) Hesaplama',
    shortTitle: 'SMM / Freelance',
    description:
      'Brüt ücretten veya net tahsilattan %20 gelir vergisi stopajı ve %20 KDV dahil SMM makbuz dökümü.',
    fields: [
      {
        name: 'hesaplamaYonu',
        label: 'Hesaplama Bazı',
        type: 'select',
        defaultValue: 'brutten',
        options: [
          { value: 'brutten', label: 'Brüt Ücretten Hesapla' },
          {
            value: 'net-tahsilattan',
            label: 'Ele Geçecek Net Tahsilattan Hesapla',
          },
        ],
      },
      {
        name: 'tutar',
        label: 'Tutar (TL)',
        type: 'amount',
        defaultValue: 30000,
        min: 1,
        required: true,
      },
      {
        name: 'stopajOrani',
        label: 'Stopaj Oranı (%)',
        type: 'number',
        defaultValue: 20,
        min: 0,
        max: 50,
      },
      {
        name: 'kdvOrani',
        label: 'KDV Oranı (%)',
        type: 'number',
        defaultValue: 20,
        min: 0,
        max: 50,
      },
    ],
    calculate: (v) => {
      const res = hesaplaSmm({
        tutar: num(v.tutar, 30000),
        hesaplamaYonu: String(v.hesaplamaYonu || 'brutten') as
          | 'brutten'
          | 'net-tahsilattan',
        stopajOrani: num(v.stopajOrani, 20),
        kdvOrani: num(v.kdvOrani, 20),
      });
      return {
        primaryLabel: 'Müşteriden Tahsil Edilecek Toplam',
        primaryValue: tl(res.netTahsilat),
        primarySubtitle: `Brüt Ücret: ${tl(res.brutUcret)}`,
        metrics: [
          {
            label: 'Stopaj Kesintisi (Muhtasar)',
            value: tl(res.stopajTutari),
            tone: 'negative',
          },
          { label: 'Net Ücret (Stopaj Sonrası)', value: tl(res.netUcret) },
          {
            label: 'Eklenen KDV Tutarı',
            value: tl(res.kdvTutari),
            tone: 'positive',
          },
        ],
      };
    },
  },
];

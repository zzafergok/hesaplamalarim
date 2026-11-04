import {
  hesaplaBruttenNete,
  hesaplaNettenBrute,
} from '@/lib/calculators/salary';
import {
  hesaplaIhbarTazminati,
  hesaplaKidemTazminati,
} from '@/lib/calculators/severance';
import { formatCurrency, parseAmountInput } from '@/lib/utils';
import { CalculatorDefinition } from './types';

function num(v: string | number | undefined, fallback = 0): number {
  if (typeof v === 'number') return Number.isFinite(v) ? v : fallback;
  if (!v) return fallback;
  const parsed = parseAmountInput(String(v));
  return parsed !== null && Number.isFinite(parsed) ? parsed : Number(v) || fallback;
}

const tl = (amount: number) => formatCurrency(amount, 'TRY', 'tr-TR');

export const SALARY_SEVERANCE_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'brutten-nete-maas',
    categoryId: 'bordro-vergi',
    title: 'Brütten Nete / Netten Brüte Maaş Hesaplama',
    shortTitle: 'Maaş & Bordro',
    description:
      'Kümülatif vergi dilimleri (%15-%40), SGK işçi payı, SPEK tavanı ve asgari ücret istisnası dahil bordro dökümü.',
    legalNote: '193 Sayılı GVK ve 5510 Sayılı SSGSSK 2026 yılı parametreleriyle hesaplanır.',
    fields: [
      {
        name: 'yon',
        label: 'Hesaplama Yönü',
        type: 'select',
        defaultValue: 'brutten-nete',
        options: [
          { value: 'brutten-nete', label: 'Brütten Nete Maaş Hesaplama' },
          { value: 'netten-brute', label: 'Netten Brüte Maaş Hesaplama' },
        ],
      },
      { name: 'tutar', label: 'Aylık Maaş Tutarı (TL)', type: 'amount', defaultValue: 60000, min: 1000, required: true },
      { name: 'kumulatifMatrah', label: 'Yıl İçi Kümülatif Vergi Matrahı (TL)', type: 'amount', defaultValue: 0, min: 0 },
    ],
    calculate: (v) => {
      const yon = String(v.yon || 'brutten-nete');
      const res =
        yon === 'brutten-nete'
          ? hesaplaBruttenNete(num(v.tutar, 60000), num(v.kumulatifMatrah, 0))
          : hesaplaNettenBrute(num(v.tutar, 60000), num(v.kumulatifMatrah, 0));
      return {
        primaryLabel: yon === 'brutten-nete' ? 'Ele Geçecek Net Maaş' : 'Gereken Brüt Maaş',
        primaryValue: tl(yon === 'brutten-nete' ? res.netMaas : res.brutMaas),
        primarySubtitle: `Brüt: ${tl(res.brutMaas)} | Net: ${tl(res.netMaas)}`,
        badge: res.sgkTavaniUgulandiMi ? 'SGK Tavanı Uygulandı' : '2026 Bordro',
        metrics: [
          { label: 'SGK İşçi Primi (%14)', value: tl(res.sgkIsciPrimi), tone: 'negative' },
          { label: 'İşsizlik Sigortası (%1)', value: tl(res.issizlikSigortasiPrimi), tone: 'negative' },
          { label: 'Gelir Vergisi (İstisna Sonrası)', value: tl(res.gelirVergisi), tone: 'negative' },
          { label: 'Damga Vergisi (İstisna Sonrası)', value: tl(res.damgaVergisi), tone: 'negative' },
        ],
      };
    },
  },
  {
    id: 'kidem-tazminati',
    categoryId: 'bordro-vergi',
    title: 'Kıdem Tazminatı Hesaplama',
    shortTitle: 'Kıdem Tazminatı',
    description: 'Çalışma süresi, giydirilmiş brüt ücret ve 2026 kıdem tavanına göre net kıdem tazminatı dökümü.',
    legalNote: '1475 Sayılı İş Kanunu Md. 14 | 2026 Kıdem Tavanı: 73.729,87 TL',
    fields: [
      { name: 'iseGirisTarihi', label: 'İşe Giriş Tarihi', type: 'date', defaultValue: '2022-01-15', required: true },
      { name: 'istenCikisTarihi', label: 'İşten Çıkış Tarihi', type: 'date', defaultValue: '2026-06-15', required: true },
      { name: 'aylikBrutMaas', label: 'Son Aylık Brüt Maaş (TL)', type: 'amount', defaultValue: 50000, min: 1000, required: true },
      { name: 'aylikDuzenliYanHaklar', label: 'Aylık Düzenli Yan Haklar (TL)', type: 'amount', defaultValue: 5000, min: 0 },
    ],
    calculate: (v) => {
      const res = hesaplaKidemTazminati({
        iseGirisTarihi: String(v.iseGirisTarihi || '2022-01-15'),
        istenCikisTarihi: String(v.istenCikisTarihi || '2026-06-15'),
        aylikBrutMaas: num(v.aylikBrutMaas, 50000),
        aylikDuzenliYanHaklar: num(v.aylikDuzenliYanHaklar, 5000),
      });
      return {
        primaryLabel: 'Net Kıdem Tazminatı',
        primaryValue: tl(res.netKidemTazminati),
        primarySubtitle: `Hizmet Süresi: ${res.calismaSuresi.yil} Yıl ${res.calismaSuresi.ay} Ay ${res.calismaSuresi.gun} Gün (${res.toplamGun} gün)`,
        badge: res.tavanUgulandiMi ? 'Kıdem Tavanı Uygulandı' : 'Yasal Hesaplama',
        metrics: [
          { label: 'Baz Alınan Giydirilmiş Brüt', value: tl(res.giydirilmisBrutUcret) },
          { label: 'Brüt Kıdem Tazminatı', value: tl(res.brutKidemTazminati) },
          { label: 'Damga Vergisi (‰7.59)', value: tl(res.damgaVergisi), tone: 'negative' },
        ],
      };
    },
  },
  {
    id: 'ihbar-tazminati',
    categoryId: 'bordro-vergi',
    title: 'İhbar Tazminatı Hesaplama',
    shortTitle: 'İhbar Tazminatı',
    description: '4857 Sayılı İş Kanunu Md. 17 uyarınca 2, 4, 6 ve 8 haftalık ihbar bildirim süresi ve tazminatı.',
    fields: [
      { name: 'toplamGun', label: 'Toplam Çalışılan Gün Sayısı', type: 'number', defaultValue: 800, min: 1, required: true },
      { name: 'giydirilmisBrutUcret', label: 'Giydirilmiş Aylık Brüt Ücret (TL)', type: 'amount', defaultValue: 55000, min: 1000, required: true },
    ],
    calculate: (v) => {
      const res = hesaplaIhbarTazminati({
        toplamGun: num(v.toplamGun, 800),
        giydirilmisBrutUcret: num(v.giydirilmisBrutUcret, 55000),
      });
      return {
        primaryLabel: 'Net İhbar Tazminatı',
        primaryValue: tl(res.netIhbarTazminati),
        primarySubtitle: `İhbar Süresi: ${res.ihbarSuresiHafta} Hafta (${res.ihbarSuresiGun} Gün)`,
        metrics: [
          { label: 'Brüt İhbar Tazminatı', value: tl(res.brutIhbarTazminati) },
          { label: 'Gelir Vergisi Kesintisi (%15)', value: tl(res.gelirVergisi), tone: 'negative' },
          { label: 'Damga Vergisi (‰7.59)', value: tl(res.damgaVergisi), tone: 'negative' },
        ],
      };
    },
  },
];


import {
  PercentageMode,
  hesaplaBahsisBolusturme,
  hesaplaBirimFiyatKiyas,
  hesaplaIndirimKampanya,
  hesaplaYakitTuketimi,
  hesaplaYuzde,
} from '@/lib/calculators/daily';
import { formatCurrency, parseAmountInput } from '@/lib/utils';
import { CalculatorDefinition } from './types';

function num(v: string | number | undefined, fallback = 0): number {
  if (typeof v === 'number') return Number.isFinite(v) ? v : fallback;
  if (!v) return fallback;
  const parsed = parseAmountInput(String(v));
  return parsed !== null && Number.isFinite(parsed) ? parsed : Number(v) || fallback;
}

const tl = (amount: number) => formatCurrency(amount, 'TRY', 'tr-TR');

export const DAILY_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'indirim-kampanya',
    categoryId: 'gunluk-alisveris',
    title: 'İndirim & Kampanya Fiyat Hesaplayıcı',
    shortTitle: 'İndirim & Kampanya',
    description: 'Etiket fiyatı üzerinden tekli veya kademeli ("kasada ek indirim") kampanyaların net fiyat ve gerçek indirim yüzdesi.',
    fields: [
      { name: 'etiketFiyati', label: 'Ürün Etiket Fiyatı (TL)', type: 'amount', defaultValue: 2500, min: 1, required: true },
      { name: 'birinciIndirimOrani', label: '1. İndirim Oranı (%)', type: 'number', defaultValue: 35, min: 0, max: 100, required: true },
      { name: 'ikinciEkIndirimOrani', label: 'Varsa Kasada Ek 2. İndirim (%)', type: 'number', defaultValue: 10, min: 0, max: 100 },
    ],
    calculate: (v) => {
      const res = hesaplaIndirimKampanya({
        etiketFiyati: num(v.etiketFiyati, 2500),
        birinciIndirimOrani: num(v.birinciIndirimOrani, 35),
        ikinciEkIndirimOrani: num(v.ikinciEkIndirimOrani, 0),
      });
      return {
        primaryLabel: 'Ödenecek İndirimli Net Fiyat',
        primaryValue: tl(res.odenecekNetFiyat),
        primarySubtitle: `Efektif Gerçek İndirim Oranı: %${res.gercekIndirimYuzdesi}`,
        badge: `%${res.gercekIndirimYuzdesi} Kazanç`,
        metrics: [
          { label: 'Toplam Cepte Kalan Tutar', value: tl(res.toplamIndirimTutari), tone: 'positive' },
        ],
      };
    },
  },
  {
    id: 'birim-fiyat',
    categoryId: 'gunluk-alisveris',
    title: 'Market Birim Fiyat Karşılaştırma',
    shortTitle: 'Birim Fiyat Kıyas',
    description: 'Farklı gramaj veya hacimdeki iki ürünün 1 kg / 1 Litre başına maliyetini kıyaslayarak en ekonomik olanı bulun.',
    fields: [
      { name: 'urun1Fiyat', label: '1. Ürün Fiyatı (TL)', type: 'amount', defaultValue: 185, min: 1, required: true },
      { name: 'urun1MiktarGrMl', label: '1. Ürün Gramaj / Hacim (gr veya ml)', type: 'number', defaultValue: 650, min: 1, required: true },
      { name: 'urun2Fiyat', label: '2. Ürün Fiyatı (TL)', type: 'amount', defaultValue: 260, min: 1, required: true },
      { name: 'urun2MiktarGrMl', label: '2. Ürün Gramaj / Hacim (gr veya ml)', type: 'number', defaultValue: 1000, min: 1, required: true },
    ],
    calculate: (v) => {
      const res = hesaplaBirimFiyatKiyas({
        urun1Fiyat: num(v.urun1Fiyat, 185),
        urun1MiktarGrMl: num(v.urun1MiktarGrMl, 650),
        urun2Fiyat: num(v.urun2Fiyat, 260),
        urun2MiktarGrMl: num(v.urun2MiktarGrMl, 1000),
      });
      return {
        primaryLabel: 'Karşılaştırma Sonucu',
        primaryValue: res.avantajliUrun,
        primarySubtitle: `Birim Fiyat Avantajı: %${res.tasarrufOraniYuzde}`,
        metrics: [
          { label: '1. Ürün (1 Kg / 1 L Fiyatı)', value: tl(res.urun1KgLitreFiyati) },
          { label: '2. Ürün (1 Kg / 1 L Fiyatı)', value: tl(res.urun2KgLitreFiyati) },
          { label: 'Kg / Litre Başına Fark', value: tl(res.farkTutariKgBasina), tone: 'positive' },
        ],
      };
    },
  },
  {
    id: 'yakit-tuketimi',
    categoryId: 'gunluk-alisveris',
    title: 'Yol Masrafı & Yakıt Tüketimi Hesaplama',
    shortTitle: 'Yol & Yakıt Masrafı',
    description: 'Gidilecek mesafe, 100 km ortalama yakıt tüketimi ve güncel akaryakıt fiyatına göre toplam ve kişi başı yol masrafı.',
    fields: [
      { name: 'mesafeKm', label: 'Toplam Mesafe (Km)', type: 'number', defaultValue: 450, min: 1, required: true },
      { name: 'tuketim100Km', label: '100 Km Ortalama Tüketim (Litre)', type: 'number', defaultValue: 6.8, min: 0.5, max: 50, required: true },
      { name: 'yakitLitreFiyati', label: 'Akaryakıt Litre Fiyatı (TL)', type: 'amount', defaultValue: 44.5, min: 1, required: true },
      { name: 'yolcuSayisi', label: 'Araçtaki Kişi Sayısı', type: 'number', defaultValue: 3, min: 1, max: 50 },
    ],
    calculate: (v) => {
      const res = hesaplaYakitTuketimi({
        mesafeKm: num(v.mesafeKm, 450),
        tuketim100Km: num(v.tuketim100Km, 6.8),
        yakitLitreFiyati: num(v.yakitLitreFiyati, 44.5),
        yolcuSayisi: num(v.yolcuSayisi, 3),
      });
      return {
        primaryLabel: 'Toplam Yolculuk Yakıt Maliyeti',
        primaryValue: tl(res.toplamYolculukMaliyeti),
        primarySubtitle: `Gereken Toplam Yakıt: ${res.gerekenToplamYakitLitre} Litre`,
        metrics: [
          { label: 'Kilometre Başına Maliyet', value: tl(res.kmBasinaMaliyet) },
          { label: 'Kişi Başına Düşen Pay', value: tl(res.kisiBasiMaliyet), tone: 'positive' },
        ],
      };
    },
  },
  {
    id: 'bahsis-bolusturme',
    categoryId: 'gunluk-alisveris',
    title: 'Bahşiş & Hesap Bölüştürme (Alman Usulü)',
    shortTitle: 'Bahşiş & Hesap Bölme',
    description: 'Restoran ve kafe adisyonlarında servis/bahşiş oranını ekleyerek kişi başı ödenecek net tutarı hesaplayın.',
    fields: [
      { name: 'hesapTutari', label: 'Toplam Adisyon Tutarı (TL)', type: 'amount', defaultValue: 3200, min: 1, required: true },
      { name: 'bahsisOraniYuzde', label: 'Bahşiş / Servis Oranı (%)', type: 'number', defaultValue: 10, min: 0, max: 100 },
      { name: 'kisiSayisi', label: 'Masadaki Kişi Sayısı', type: 'number', defaultValue: 4, min: 1, max: 100, required: true },
    ],
    calculate: (v) => {
      const res = hesaplaBahsisBolusturme({
        hesapTutari: num(v.hesapTutari, 3200),
        bahsisOraniYuzde: num(v.bahsisOraniYuzde, 10),
        kisiSayisi: num(v.kisiSayisi, 4),
      });
      return {
        primaryLabel: 'Kişi Başı Ödenecek Toplam Tutar',
        primaryValue: tl(res.kisiBasiOdeme),
        primarySubtitle: `Bahşiş Dahil Masa Toplamı: ${tl(res.genelToplamTutar)}`,
        metrics: [
          { label: 'Toplam Bahşiş Tutarı', value: tl(res.toplamBahsisTutari) },
          { label: 'Kişi Başı Bahşiş Payı', value: tl(res.kisiBasiBahsis) },
        ],
      };
    },
  },
  {
    id: 'yuzde-hesaplama',
    categoryId: 'gunluk-alisveris',
    title: 'Çok Amaçlı Yüzde (%) Hesaplayıcı',
    shortTitle: 'Yüzde Hesaplayıcı',
    description: 'Bir sayının yüzdesini, iki sayı arasındaki değişim oranını veya yüzde fazlasını/eksiğini tek dokunuşla bulun.',
    fields: [
      {
        name: 'islemTuru',
        label: 'Hesaplama Modu',
        type: 'select',
        defaultValue: 'oranin-degeri',
        options: [
          { value: 'oranin-degeri', label: 'A sayısının %B kadarı kaçtır?' },
          { value: 'kac-yuzdesi', label: 'A sayısı, B sayısının yüzde kaçıdır?' },
          { value: 'degisim-orani', label: 'A değerinden B değerine değişim yüzdesi nedir?' },
          { value: 'artir-azalt', label: 'A sayısının %B fazlası ve eksiği nedir?' },
        ],
      },
      { name: 'sayiA', label: 'A Sayısı (İlk Değer)', type: 'number', defaultValue: 1500, required: true },
      { name: 'sayiB', label: 'B Sayısı (Oran veya İkinci Değer)', type: 'number', defaultValue: 20, required: true },
    ],
    calculate: (v) => {
      const res = hesaplaYuzde({
        islemTuru: String(v.islemTuru || 'oranin-degeri') as PercentageMode,
        sayiA: num(v.sayiA, 1500),
        sayiB: num(v.sayiB, 20),
      });
      return {
        primaryLabel: 'Hesaplanan Ana Sonuç',
        primaryValue: String(res.anaSonuc),
        primarySubtitle: res.aciklama,
        metrics: [
          { label: 'İkincil / Tamamlayıcı Sonuç', value: String(res.ekSonuc) },
        ],
      };
    },
  },
];


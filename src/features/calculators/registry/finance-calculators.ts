import {
  GoldAssetType,
  LoanType,
  hesaplaAltinDegerleme,
  hesaplaEnflasyonKaybi,
  hesaplaErkenKapama,
  hesaplaKrediTaksit,
  hesaplaMevduatGetirisi,
} from '@/lib/calculators/finance';
import { formatCurrency, parseAmountInput } from '@/lib/utils';
import { CalculatorDefinition } from './types';

function num(v: string | number | undefined, fallback = 0): number {
  if (typeof v === 'number') return Number.isFinite(v) ? v : fallback;
  if (!v) return fallback;
  const parsed = parseAmountInput(String(v));
  return parsed !== null && Number.isFinite(parsed) ? parsed : Number(v) || fallback;
}

const tl = (amount: number) => formatCurrency(amount, 'TRY', 'tr-TR');

export const FINANCE_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'kredi-hesaplama',
    categoryId: 'finans',
    title: 'Kredi Taksit & Geri Ödeme Hesaplama',
    shortTitle: 'Kredi Taksit',
    description:
      'İhtiyaç, konut ve taşıt kredileri için KKDF ve BSMV vergileri dahil aylık taksit ve ödeme planı dökümü.',
    legalNote: 'İhtiyaç: %15 KKDF + %15 BSMV | Taşıt: %15 KKDF + %5 BSMV | Konut: %0 Vergi',
    fields: [
      {
        name: 'krediTuru',
        label: 'Kredi Türü',
        type: 'select',
        defaultValue: 'ihtiyac',
        options: [
          { value: 'ihtiyac', label: 'İhtiyaç Kredisi (%15 KKDF + %15 BSMV)' },
          { value: 'konut', label: 'Konut Kredisi (%0 Vergi Muafiyetli)' },
          { value: 'tasit', label: 'Taşıt Kredisi (%15 KKDF + %5 BSMV)' },
          { value: 'ticari', label: 'Ticari Kredi (%0 KKDF + %5 BSMV)' },
        ],
      },
      { name: 'anapara', label: 'Kredi Tutarı (TL)', type: 'amount', defaultValue: 250000, min: 1000, required: true },
      { name: 'aylikFaizOrani', label: 'Aylık Akdi Faiz Oranı (%)', type: 'number', defaultValue: 3.49, min: 0, max: 30, required: true },
      { name: 'vadeAy', label: 'Vade (Ay)', type: 'number', defaultValue: 24, min: 1, max: 360, required: true },
    ],
    calculate: (v) => {
      const res = hesaplaKrediTaksit({
        krediTuru: String(v.krediTuru || 'ihtiyac') as LoanType,
        anapara: num(v.anapara, 250000),
        aylikFaizOrani: num(v.aylikFaizOrani, 3.49),
        vadeAy: num(v.vadeAy, 24),
      });
      return {
        primaryLabel: 'Aylık Taksit Tutarı',
        primaryValue: tl(res.aylikTaksit),
        primarySubtitle: `Toplam Geri Ödeme: ${tl(res.toplamGeriOdeme)}`,
        badge: `Efektif Oran: %${res.efektifAylikOran}`,
        metrics: [
          { label: 'Toplam Faiz Ödemesi', value: tl(res.toplamFaiz), tone: 'negative' },
          { label: 'Toplam KKDF + BSMV', value: tl(res.toplamVergi), tone: 'negative' },
        ],
        table: {
          headers: ['Ay', 'Taksit', 'Anapara', 'Faiz + Vergi', 'Kalan Borç'],
          rows: res.amortismanOzeti.slice(0, 6).map((r) => [
            `${r.taksitNo}. Ay`,
            tl(r.taksitTutari),
            tl(r.anaparaOdeme),
            tl(r.faizOdeme + r.vergiOdeme),
            tl(r.kalanAnapara),
          ]),
        },
      };
    },
  },
  {
    id: 'erken-kapama',
    categoryId: 'finans',
    title: 'Erken Kapama & Ara Ödeme Simülatörü',
    shortTitle: 'Ara Ödeme Simülatörü',
    description:
      'Krediye toplu ara ödeme yapıldığında vade kısaltma ile taksit düşürme seçeneklerinin net faiz tasarrufu karşılaştırması.',
    legalNote: '6502 Sayılı TKHK Md. 37 uyarınca konut kredilerinde %1 / %2 erken ödeme tazminatı hesaplanır.',
    fields: [
      {
        name: 'krediTuru',
        label: 'Kredi Türü',
        type: 'select',
        defaultValue: 'konut',
        options: [
          { value: 'konut', label: 'Konut Kredisi' },
          { value: 'ihtiyac', label: 'İhtiyaç Kredisi' },
          { value: 'tasit', label: 'Taşıt Kredisi' },
        ],
      },
      { name: 'kalanAnapara', label: 'Kalan Anapara Borcu (TL)', type: 'amount', defaultValue: 1000000, min: 1000, required: true },
      { name: 'aylikFaizOrani', label: 'Mevcut Aylık Faiz (%)', type: 'number', defaultValue: 3.09, min: 0.01, max: 30, required: true },
      { name: 'kalanVadeAy', label: 'Kalan Vade (Ay)', type: 'number', defaultValue: 60, min: 2, max: 360, required: true },
      { name: 'araOdemeTutari', label: 'Yapılacak Ara Ödeme (TL)', type: 'amount', defaultValue: 250000, min: 100, required: true },
    ],
    calculate: (v) => {
      const res = hesaplaErkenKapama({
        krediTuru: String(v.krediTuru || 'konut') as LoanType,
        kalanAnapara: num(v.kalanAnapara, 1000000),
        aylikFaizOrani: num(v.aylikFaizOrani, 3.09),
        kalanVadeAy: num(v.kalanVadeAy, 60),
        araOdemeTutari: num(v.araOdemeTutari, 250000),
      });
      return {
        primaryLabel: 'Vade Kısaltma İle Net Faiz Tasarrufu',
        primaryValue: tl(res.vadeKisaltmaTasarruf),
        primarySubtitle: `Yeni Vade: ${res.vadeKisaltmaYeniVade} Ay | Öneri: ${res.onerilenSecenek}`,
        badge: res.erkenOdemeKomisyonu > 0 ? `Komisyon: ${tl(res.erkenOdemeKomisyonu)}` : 'Komisyonsuz',
        metrics: [
          { label: 'Mevcut Aylık Taksit', value: tl(res.mevcutAylikTaksit) },
          { label: 'Taksit Düşürmede Yeni Taksit', value: tl(res.taksitDusurmeYeniTaksit), tone: 'positive' },
          { label: 'Taksit Düşürme Tasarrufu', value: tl(res.taksitDusurmeTasarruf), tone: 'positive' },
          { label: 'Vade Kısaltma Tasarrufu', value: tl(res.vadeKisaltmaTasarruf), tone: 'positive' },
        ],
      };
    },
  },
  {
    id: 'mevduat-getirisi',
    categoryId: 'finans',
    title: 'Mevduat Getirisi & Bileşik Faiz Hesaplama',
    shortTitle: 'Mevduat & Bileşik Faiz',
    description: 'Günlük ve aylık vadeli mevduatta stopaj kesintisi sonrası net faiz kazancı.',
    fields: [
      { name: 'anapara', label: 'Yatırılacak Anapara (TL)', type: 'amount', defaultValue: 500000, min: 100, required: true },
      { name: 'yillikFaizOrani', label: 'Yıllık Brüt Mevduat Faizi (%)', type: 'number', defaultValue: 48, min: 0.1, max: 200, required: true },
      { name: 'gunSayisi', label: 'Vade Gün Sayısı', type: 'number', defaultValue: 32, min: 1, max: 3650, required: true },
      { name: 'stopajOrani', label: 'Stopaj Vergi Oranı (%)', type: 'number', defaultValue: 15, min: 0, max: 50, required: true },
      {
        name: 'bilesikMi',
        label: 'Getiri Türü',
        type: 'select',
        defaultValue: 'hayir',
        options: [
          { value: 'hayir', label: 'Basit Faiz (Tek Dönem)' },
          { value: 'evet', label: 'Bileşik Faiz (Aylık Yenilemeli)' },
        ],
      },
    ],
    calculate: (v) => {
      const res = hesaplaMevduatGetirisi({
        anapara: num(v.anapara, 500000),
        yillikFaizOrani: num(v.yillikFaizOrani, 48),
        gunSayisi: num(v.gunSayisi, 32),
        stopajOrani: num(v.stopajOrani, 15),
        bilesikMi: String(v.bilesikMi || 'hayir') as 'hayir' | 'evet',
      });
      return {
        primaryLabel: 'Net Faiz Kazancı',
        primaryValue: tl(res.netFaizGetirisi),
        primarySubtitle: `Vade Sonu Toplam Bakiye: ${tl(res.vadeSonuNetToplam)}`,
        badge: `Efektif Yıllık Net: %${res.efektifYillikGetiriOrani}`,
        metrics: [
          { label: 'Brüt Faiz Tutarı', value: tl(res.brutFaizGetirisi) },
          { label: 'Stopaj Vergisi Kesintisi', value: tl(res.stopajKesintisi), tone: 'negative' },
        ],
      };
    },
  },
  {
    id: 'enflasyon-kaybi',
    categoryId: 'finans',
    title: 'Enflasyon & Satın Alma Gücü Kaybı',
    shortTitle: 'Enflasyon & Alım Gücü',
    description: 'Paranızın enflasyon karşısındaki reel alım gücü erimesini ve gelecekteki eşdeğer maliyetini hesaplayın.',
    fields: [
      { name: 'tutar', label: 'Mevcut Tutar (TL)', type: 'amount', defaultValue: 100000, min: 1, required: true },
      { name: 'yillikEnflasyonOrani', label: 'Yıllık Ortalama Enflasyon (%)', type: 'number', defaultValue: 42, min: 0.1, max: 300, required: true },
      { name: 'yilSayisi', label: 'Süre (Yıl)', type: 'number', defaultValue: 3, min: 1, max: 50, required: true },
    ],
    calculate: (v) => {
      const res = hesaplaEnflasyonKaybi({
        tutar: num(v.tutar, 100000),
        yillikEnflasyonOrani: num(v.yillikEnflasyonOrani, 42),
        yilSayisi: num(v.yilSayisi, 3),
      });
      return {
        primaryLabel: 'Bugünkü Reel Satın Alma Gücü Karşılığı',
        primaryValue: tl(res.reelSatinAlmaGucu),
        primarySubtitle: `Alım Gücü Kaybı Oranı: %${res.satinAlmaGucuKaybiOrani}`,
        metrics: [
          { label: 'Aynı Alım Gücü İçin Gereken Tutar', value: tl(res.gelecektekiEsdegerTutar), tone: 'negative' },
          { label: 'Reel Değer Erimesi', value: tl(res.erimeTutari), tone: 'negative' },
        ],
      };
    },
  },
  {
    id: 'altin-degerleme',
    categoryId: 'finans',
    title: 'Altın, Bilezik & Hurda Altın Değerleme',
    shortTitle: 'Altın & Bilezik',
    description: 'Gram, çeyrek, tam, ata altın ve 22/14 ayar bileziklerin milyem saflık oranlarına göre has altın ve nakit karşılığı.',
    fields: [
      {
        name: 'varlikTuru',
        label: 'Altın / Ziynet Türü',
        type: 'select',
        defaultValue: 'bilezik22',
        options: [
          { value: 'gram24', label: '24 Ayar Has Gram Altın (0.995/1.000)' },
          { value: 'bilezik22', label: '22 Ayar Bilezik - Gram (0.916 Milyem)' },
          { value: 'altin14', label: '14 Ayar Takı / Altın - Gram (0.585 Milyem)' },
          { value: 'ceyrek', label: 'Çeyrek Altın - Adet (1.75 gr / 22 Ayar)' },
          { value: 'yarim', label: 'Yarım Altın - Adet (3.50 gr / 22 Ayar)' },
          { value: 'tam', label: 'Tam Ziynet Altın - Adet (7.00 gr / 22 Ayar)' },
          { value: 'ata', label: 'Ata Cumhuriyet Altını - Adet (7.216 gr / 22 Ayar)' },
        ],
      },
      { name: 'miktar', label: 'Gram veya Adet Miktarı', type: 'number', defaultValue: 20, min: 0.1, required: true },
      { name: 'hasAltinGramFiyati', label: '24 Ayar Has Altın Gram Fiyatı (TL)', type: 'amount', defaultValue: 3450, min: 1, required: true },
      { name: 'iscilikOrani', label: 'Varsa İşçilik Oranı (%)', type: 'number', defaultValue: 2, min: 0, max: 50 },
    ],
    calculate: (v) => {
      const res = hesaplaAltinDegerleme({
        varlikTuru: String(v.varlikTuru || 'bilezik22') as GoldAssetType,
        miktar: num(v.miktar, 20),
        hasAltinGramFiyati: num(v.hasAltinGramFiyati, 3450),
        iscilikOrani: num(v.iscilikOrani, 0),
      });
      return {
        primaryLabel: 'Saf Altın Karşılığı Değeri',
        primaryValue: tl(res.safAltinDegeri),
        primarySubtitle: `İçerdiği 24 Ayar Has Altın: ${res.toplamHasAltinGram} gr`,
        metrics: [
          { label: 'Tahmini Kuyumcu Bozdurma (Hurda)', value: tl(res.bozdurmaHurdaDegeri), tone: 'positive' },
          { label: 'İşçilik Dahil Satış Değeri', value: tl(res.toplamPiyasaDegeri) },
        ],
      };
    },
  },
];


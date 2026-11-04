import {
  MacroProfile,
  hesaplaBmrTdee,
  hesaplaGebelik,
  hesaplaMakroBesin,
  hesaplaSuIhtiyaci,
  hesaplaVkiIdealKilo,
} from '@/lib/calculators/health';
import { parseAmountInput } from '@/lib/utils';
import { CalculatorDefinition } from './types';

function num(v: string | number | undefined, fallback = 0): number {
  if (typeof v === 'number') return Number.isFinite(v) ? v : fallback;
  if (!v) return fallback;
  const parsed = parseAmountInput(String(v));
  return parsed !== null && Number.isFinite(parsed) ? parsed : Number(v) || fallback;
}

export const HEALTH_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'vucut-kitle-indeksi',
    categoryId: 'saglik-beslenme',
    title: 'Vücut Kitle İndeksi (VKİ) & İdeal Kilo Hesaplama',
    shortTitle: 'VKİ & İdeal Kilo',
    description: 'Boy, kilo ve cinsiyete göre Dünya Sağlık Örgütü (WHO) VKİ kategorisi ve Devine ideal kilo aralığı.',
    fields: [
      {
        name: 'cinsiyet',
        label: 'Cinsiyet',
        type: 'select',
        defaultValue: 'erkek',
        options: [
          { value: 'erkek', label: 'Erkek' },
          { value: 'kadin', label: 'Kadın' },
        ],
      },
      { name: 'boyCm', label: 'Boy (cm)', type: 'number', defaultValue: 176, min: 80, max: 250, required: true },
      { name: 'kiloKg', label: 'Kilo (kg)', type: 'number', defaultValue: 78, min: 15, max: 350, required: true },
    ],
    calculate: (v) => {
      const res = hesaplaVkiIdealKilo({
        cinsiyet: String(v.cinsiyet || 'erkek') as 'erkek' | 'kadin',
        boyCm: num(v.boyCm, 176),
        kiloKg: num(v.kiloKg, 78),
      });
      return {
        primaryLabel: 'Vücut Kitle İndeksi (BMI)',
        primaryValue: `${res.vki} kg/m²`,
        primarySubtitle: `Durum: ${res.kategori}`,
        badge: `İdeal Kilo: ${res.idealKiloKg} kg`,
        metrics: [
          { label: 'Sağlıklı Kilo Alt Sınırı', value: `${res.minSaglikliKilo} kg` },
          { label: 'Sağlıklı Kilo Üst Sınırı', value: `${res.maxSaglikliKilo} kg` },
          { label: 'İdeal Kiloya Uzaklık', value: `${res.hedefKiloFarki > 0 ? '+' : ''}${res.hedefKiloFarki} kg` },
        ],
      };
    },
  },
  {
    id: 'bmr-tdee-kalori',
    categoryId: 'saglik-beslenme',
    title: 'Bazal Metabolizma Hızı (BMR) & Günlük Kalori (TDEE)',
    shortTitle: 'BMR & Kalori (TDEE)',
    description: 'Mifflin-St Jeor denklemiyle dinlenme metabolizma hızı ve kilo koruma/verme/alma kalori hedefleri.',
    fields: [
      {
        name: 'cinsiyet',
        label: 'Cinsiyet',
        type: 'select',
        defaultValue: 'erkek',
        options: [
          { value: 'erkek', label: 'Erkek' },
          { value: 'kadin', label: 'Kadın' },
        ],
      },
      { name: 'yas', label: 'Yaş', type: 'number', defaultValue: 30, min: 10, max: 105, required: true },
      { name: 'boyCm', label: 'Boy (cm)', type: 'number', defaultValue: 175, min: 80, max: 250, required: true },
      { name: 'kiloKg', label: 'Kilo (kg)', type: 'number', defaultValue: 75, min: 20, max: 350, required: true },
      {
        name: 'aktiviteKatsayisi',
        label: 'Fiziksel Aktivite Düzeyi',
        type: 'select',
        defaultValue: '1.55',
        options: [
          { value: '1.2', label: 'Hareketsiz (Masa başı, egzersiz yok)' },
          { value: '1.375', label: 'Az Hareketli (Haftada 1-3 gün hafif spor)' },
          { value: '1.55', label: 'Orta Hareketli (Haftada 3-5 gün orta spor)' },
          { value: '1.725', label: 'Çok Hareketli (Haftada 6-7 gün yoğun spor)' },
          { value: '1.9', label: 'Profesyonel Sporcu / Ağır Fiziksel İş' },
        ],
      },
    ],
    calculate: (v) => {
      const res = hesaplaBmrTdee({
        cinsiyet: String(v.cinsiyet || 'erkek') as 'erkek' | 'kadin',
        yas: num(v.yas, 30),
        boyCm: num(v.boyCm, 175),
        kiloKg: num(v.kiloKg, 75),
        aktiviteKatsayisi: num(v.aktiviteKatsayisi, 1.55),
      });
      return {
        primaryLabel: 'Günlük Kalori İhtiyacı (TDEE - Kilo Koruma)',
        primaryValue: `${res.gunlukKaloriTdee} kcal`,
        primarySubtitle: `Bazal Metabolizma Hızı (BMR): ${res.bazalMetabolizmaBmr} kcal`,
        metrics: [
          { label: 'Sağlıklı Kilo Verme (-500 kcal)', value: `${res.kiloVermeKalori} kcal / gün`, tone: 'positive' },
          { label: 'Hacim / Kilo Alma (+450 kcal)', value: `${res.kiloAlmaKalori} kcal / gün` },
        ],
      };
    },
  },
  {
    id: 'makro-besin',
    categoryId: 'saglik-beslenme',
    title: 'Makro Besin Dağılımı (Protein, Karbonhidrat, Yağ)',
    shortTitle: 'Makro Besin Dağılımı',
    description: 'Günlük hedef kalorinize ve beslenme profilinize göre almanız gereken gramaj bazlı makro besin dağılımı.',
    fields: [
      { name: 'gunlukKalori', label: 'Hedef Günlük Kalori (kcal)', type: 'number', defaultValue: 2200, min: 800, max: 8000, required: true },
      {
        name: 'diyetProfili',
        label: 'Beslenme / Diyet Modeli',
        type: 'select',
        defaultValue: 'dengeli',
        options: [
          { value: 'dengeli', label: 'Dengeli (%30 Protein / %40 Karb / %30 Yağ)' },
          { value: 'yuksek-protein', label: 'Yüksek Protein (%35 Protein / %40 Karb / %25 Yağ)' },
          { value: 'dusuk-karb', label: 'Düşük Karbonhidrat (%40 Protein / %20 Karb / %40 Yağ)' },
          { value: 'ketojenik', label: 'Ketojenik (%25 Protein / %5 Karb / %70 Yağ)' },
        ],
      },
    ],
    calculate: (v) => {
      const res = hesaplaMakroBesin({
        gunlukKalori: num(v.gunlukKalori, 2200),
        diyetProfili: String(v.diyetProfili || 'dengeli') as MacroProfile,
      });
      return {
        primaryLabel: 'Günlük Makro Hedefi',
        primaryValue: `${res.proteinGram}g P | ${res.karbonhidratGram}g K | ${res.yagGram}g Y`,
        primarySubtitle: '1g Protein = 4 kcal, 1g Karb = 4 kcal, 1g Yağ = 9 kcal',
        metrics: [
          { label: 'Günlük Protein', value: `${res.proteinGram} gr (${res.proteinKalori} kcal)`, tone: 'positive' },
          { label: 'Günlük Karbonhidrat', value: `${res.karbonhidratGram} gr (${res.karbKalori} kcal)` },
          { label: 'Günlük Sağlıklı Yağ', value: `${res.yagGram} gr (${res.yagKalori} kcal)` },
        ],
      };
    },
  },
  {
    id: 'su-ihtiyaci',
    categoryId: 'saglik-beslenme',
    title: 'Günlük Su İhtiyacı Hesaplama',
    shortTitle: 'Günlük Su İhtiyacı',
    description: 'Vücut ağırlığınız ve günlük egzersiz sürenize göre tüketmeniz gereken ideal su miktarı.',
    fields: [
      { name: 'kiloKg', label: 'Vücut Ağırlığı (kg)', type: 'number', defaultValue: 75, min: 15, max: 300, required: true },
      { name: 'egzersizDakika', label: 'Günlük Spor / Egzersiz Süresi (Dakika)', type: 'number', defaultValue: 30, min: 0, max: 360 },
    ],
    calculate: (v) => {
      const res = hesaplaSuIhtiyaci({
        kiloKg: num(v.kiloKg, 75),
        egzersizDakika: num(v.egzersizDakika, 30),
      });
      return {
        primaryLabel: 'Günlük İdeal Su Tüketimi',
        primaryValue: `${res.gunlukSuLitre} Litre`,
        primarySubtitle: `Yaklaşık ${res.bardakSayisi250Ml} Su Bardağı (250 ml)`,
        metrics: [
          { label: 'Mililitre Karşılığı', value: `${res.gunlukSuMililitre} ml` },
          { label: 'Standart Su Bardağı Adedi', value: `${res.bardakSayisi250Ml} Bardak`, tone: 'positive' },
        ],
      };
    },
  },
  {
    id: 'gebelik-hesaplama',
    categoryId: 'saglik-beslenme',
    title: 'Gebelik Haftası & Tahmini Doğum Tarihi Hesaplayıcı',
    shortTitle: 'Gebelik & Doğum',
    description: 'Son adet tarihine (SAT) ve Naegele kuralına göre mevcut gebelik haftası, trimester ve tahmini doğum tarihi.',
    fields: [
      { name: 'sonAdetTarihi', label: 'Son Adet Tarihi (SAT Başlangıcı)', type: 'date', defaultValue: '2026-05-01', required: true },
      { name: 'donguSuresiGun', label: 'Ortalama Adet Döngüsü (Gün)', type: 'number', defaultValue: 28, min: 21, max: 40 },
    ],
    calculate: (v) => {
      const res = hesaplaGebelik({
        sonAdetTarihi: String(v.sonAdetTarihi || '2026-05-01'),
        donguSuresiGun: num(v.donguSuresiGun, 28),
      });
      return {
        primaryLabel: 'Tahmini Doğum Tarihi',
        primaryValue: res.tahminiDogumTarihi,
        primarySubtitle: `Mevcut Gebelik: ${res.gebelikHaftasi} Hafta + ${res.ekGun} Gün`,
        badge: res.trimester,
        metrics: [
          { label: 'Doğuma Kalan Tahmini Süre', value: `${res.kalanGun} Gün` },
          { label: 'Dönem (Trimester)', value: res.trimester },
        ],
      };
    },
  },
];


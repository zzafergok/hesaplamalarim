import {
  EngineSizeBand,
  InheritanceGroup,
  VehicleAgeBand,
  hesaplaAracMtv,
  hesaplaKiraArtisi,
  hesaplaMirasPaylasimi,
  hesaplaTapuHarci,
  hesaplaYasalFaiz,
} from '@/lib/calculators/legal';
import { formatCurrency, parseAmountInput } from '@/lib/utils';
import { CalculatorDefinition } from './types';

function num(v: string | number | undefined, fallback = 0): number {
  if (typeof v === 'number') return Number.isFinite(v) ? v : fallback;
  if (!v) return fallback;
  const parsed = parseAmountInput(String(v));
  return parsed !== null && Number.isFinite(parsed) ? parsed : Number(v) || fallback;
}

const tl = (amount: number) => formatCurrency(amount, 'TRY', 'tr-TR');

export const LEGAL_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'kira-artis-orani',
    categoryId: 'gayrimenkul-hukuk',
    title: 'Kira Artış Oranı & TÜFE Yasal Sınır Hesaplama',
    shortTitle: 'Kira Artış Oranı',
    description: '6098 Sayılı TBK Md. 344 uyarınca 12 aylık TÜFE ortalamasına göre yasal kira artış üst sınırı.',
    fields: [
      { name: 'mevcutKira', label: 'Mevcut Aylık Kira Bedeli (TL)', type: 'amount', defaultValue: 20000, min: 100, required: true },
      { name: 'tufe12AylikOrtalama', label: 'TÜİK 12 Aylık TÜFE Ortalaması (%)', type: 'number', defaultValue: 48.5, min: 0, max: 200, required: true },
      { name: 'uygulananArtisOrani', label: 'Anlaşılan / Uygulanan Artış Oranı (%)', type: 'number', defaultValue: 48.5, min: 0, max: 200 },
    ],
    calculate: (v) => {
      const res = hesaplaKiraArtisi({
        mevcutKira: num(v.mevcutKira, 20000),
        tufe12AylikOrtalama: num(v.tufe12AylikOrtalama, 48.5),
        uygulananArtisOrani: num(v.uygulananArtisOrani, num(v.tufe12AylikOrtalama, 48.5)),
      });
      return {
        primaryLabel: 'Yasal Üst Sınır Yeni Kira Bedeli',
        primaryValue: tl(res.yasalUstSinirKira),
        primarySubtitle: `Yasal Aylık Artış Tutarı: +${tl(res.yasalArtisTutari)}`,
        badge: res.yasalSinirAsildiMi ? 'Yasal TÜFE Sınırı Aşıldı!' : 'TBK Md. 344 Uyumlu',
        metrics: [
          { label: 'Uygulanan Yeni Kira', value: tl(res.uygulananYeniKira) },
          { label: 'Uygulanan Artış Tutarı', value: tl(res.uygulananArtisTutari) },
        ],
      };
    },
  },
  {
    id: 'tapu-harci',
    categoryId: 'gayrimenkul-hukuk',
    title: 'Tapu Harcı & Döner Sermaye Hesaplama',
    shortTitle: 'Tapu Harcı (%4)',
    description: 'Konut, arsa ve işyeri satışlarında %2 alıcı + %2 satıcı tapu harcı ve döner sermaye masraf dökümü.',
    legalNote: '492 Sayılı Harçlar Kanunu uyarınca tapu devir harcı toplam binde 40 (%4) oranındadır.',
    fields: [
      { name: 'satisBedeli', label: 'Tapuda Beyan Edilen Satış Bedeli (TL)', type: 'amount', defaultValue: 3500000, min: 1000, required: true },
      { name: 'donerSermayeUcreti', label: 'Tapu Döner Sermaye Hizmet Bedeli (TL)', type: 'amount', defaultValue: 3549, min: 0 },
    ],
    calculate: (v) => {
      const res = hesaplaTapuHarci({
        satisBedeli: num(v.satisBedeli, 3500000),
        donerSermayeUcreti: num(v.donerSermayeUcreti, 3549),
      });
      return {
        primaryLabel: 'Döner Sermaye Dahil Toplam Tapu Masrafı',
        primaryValue: tl(res.genelToplamMasraf),
        primarySubtitle: `Toplam %4 Tapu Harcı: ${tl(res.toplamTapuHarci)}`,
        metrics: [
          { label: 'Alıcı Tapu Harcı Payı (%2)', value: tl(res.aliciTapuHarci), tone: 'negative' },
          { label: 'Satıcı Tapu Harcı Payı (%2)', value: tl(res.saticiTapuHarci), tone: 'negative' },
          { label: 'Döner Sermaye Bedeli', value: tl(res.donerSermayeUcreti) },
        ],
      };
    },
  },
  {
    id: 'arac-mtv',
    categoryId: 'gayrimenkul-hukuk',
    title: 'Araç MTV (Motorlu Taşıtlar Vergisi) Hesaplama',
    shortTitle: 'Araç MTV',
    description: 'Motor silindir hacmi ve araç yaş grubuna göre yıllık MTV ve Ocak/Temmuz taksit tutarları.',
    fields: [
      {
        name: 'motorHacmi',
        label: 'Motor Silindir Hacmi (cm³)',
        type: 'select',
        defaultValue: '1301-1600',
        options: [
          { value: '1300-alti', label: '1300 cm³ ve Aşağısı' },
          { value: '1301-1600', label: '1301 - 1600 cm³ Arası' },
          { value: '1601-1800', label: '1601 - 1800 cm³ Arası' },
          { value: '1801-2000', label: '1801 - 2000 cm³ Arası' },
          { value: '2001-ustu', label: '2001 cm³ ve Yukarısı' },
        ],
      },
      {
        name: 'aracYasi',
        label: 'Araç Yaş Grubu',
        type: 'select',
        defaultValue: '1-3',
        options: [
          { value: '1-3', label: '1 - 3 Yaş' },
          { value: '4-6', label: '4 - 6 Yaş' },
          { value: '7-11', label: '7 - 11 Yaş' },
          { value: '12-15', label: '12 - 15 Yaş' },
          { value: '16-ustu', label: '16 Yaş ve Üzeri' },
        ],
      },
    ],
    calculate: (v) => {
      const res = hesaplaAracMtv({
        motorHacmi: String(v.motorHacmi || '1301-1600') as EngineSizeBand,
        aracYasi: String(v.aracYasi || '1-3') as VehicleAgeBand,
      });
      return {
        primaryLabel: 'Yıllık Toplam MTV Tutarı',
        primaryValue: tl(res.yillikMtvTutari),
        primarySubtitle: 'Ocak ve Temmuz aylarında 2 eşit taksitte ödenir.',
        metrics: [
          { label: '1. Taksit (Ocak)', value: tl(res.ocakTaksiti), tone: 'negative' },
          { label: '2. Taksit (Temmuz)', value: tl(res.temmuzTaksiti), tone: 'negative' },
        ],
      };
    },
  },
  {
    id: 'yasal-faiz',
    categoryId: 'gayrimenkul-hukuk',
    title: 'Gecikme Zammı, Yasal Faiz & Temerrüt Faizi',
    shortTitle: 'Yasal Faiz & Gecikme',
    description: 'İcra, sözleşme veya vergi gecikmelerinde gün bazlı yasal faiz ve toplam borç hesabı.',
    fields: [
      { name: 'anapara', label: 'Alacak / Borç Anaparası (TL)', type: 'amount', defaultValue: 100000, min: 1, required: true },
      { name: 'gecikmeGunSayisi', label: 'Gecikme Süresi (Gün)', type: 'number', defaultValue: 180, min: 1, max: 10000, required: true },
      { name: 'yillikFaizOrani', label: 'Uygulanacak Yıllık Faiz Oranı (%)', type: 'number', defaultValue: 24, min: 0.1, max: 200, required: true },
    ],
    calculate: (v) => {
      const res = hesaplaYasalFaiz({
        anapara: num(v.anapara, 100000),
        gecikmeGunSayisi: num(v.gecikmeGunSayisi, 180),
        yillikFaizOrani: num(v.yillikFaizOrani, 24),
      });
      return {
        primaryLabel: 'Faiz Dahil Toplam Alacak / Borç',
        primaryValue: tl(res.toplamOdenecekBorc),
        primarySubtitle: `İşleyen Toplam Faiz: ${tl(res.isleyenFaizTutari)}`,
        metrics: [
          { label: 'Günlük İşleyen Faiz', value: tl(res.gunlukFaizTutari) },
          { label: 'Toplam Faiz Tutarı', value: tl(res.isleyenFaizTutari), tone: 'negative' },
        ],
      };
    },
  },
  {
    id: 'miras-paylasimi',
    categoryId: 'gayrimenkul-hukuk',
    title: 'Yasal Miras Paylaşımı (Veraset) Simülatörü',
    shortTitle: 'Miras Paylaşımı',
    description: '4721 Sayılı Türk Medeni Kanunu zümre sistemine göre sağ kalan eş ve mirasçılar arasındaki yasal hisse dökümü.',
    legalNote: 'TMK Md. 499: Sağ kalan eş; 1. zümre (çocuklar) ile 1/4, 2. zümre (anne-baba) ile 1/2, 3. zümre ile 3/4 pay alır.',
    fields: [
      { name: 'terekeDegeri', label: 'Toplam Miras (Tereke) Değeri (TL)', type: 'amount', defaultValue: 4000000, min: 100, required: true },
      {
        name: 'sagKalanEsVarMi',
        label: 'Sağ Kalan Yasal Eş Var mı?',
        type: 'select',
        defaultValue: 'evet',
        options: [
          { value: 'evet', label: 'Evet, Sağ Kalan Eş Var' },
          { value: 'hayir', label: 'Hayır, Sağ Kalan Eş Yok' },
        ],
      },
      {
        name: 'mirasGrubu',
        label: 'Mirasçı Zümresi',
        type: 'select',
        defaultValue: '1-altsoy',
        options: [
          { value: '1-altsoy', label: '1. Zümre: Çocuklar / Altsoy (Eş 1/4 alır)' },
          { value: '2-anne-baba', label: '2. Zümre: Anne ve Baba / Kardeşler (Eş 1/2 alır)' },
          { value: '3-buyukanne-baba', label: '3. Zümre: Büyükanne ve Büyükbaba (Eş 3/4 alır)' },
          { value: 'mirasci-yok', label: 'Zümre Mirasçısı Yok (Eş Tamamını Alır)' },
        ],
      },
      { name: 'cocukVeyaMirasciSayisi', label: 'Zümredeki Çocuk / Mirasçı Kişi Sayısı', type: 'number', defaultValue: 2, min: 1, max: 30 },
    ],
    calculate: (v) => {
      const res = hesaplaMirasPaylasimi({
        terekeDegeri: num(v.terekeDegeri, 4000000),
        sagKalanEsVarMi: String(v.sagKalanEsVarMi || 'evet') as 'evet' | 'hayir',
        mirasGrubu: String(v.mirasGrubu || '1-altsoy') as InheritanceGroup,
        cocukVeyaMirasciSayisi: num(v.cocukVeyaMirasciSayisi, 2),
      });
      return {
        primaryLabel: 'Mirasçı (Çocuk) Başına Düşen Pay',
        primaryValue: tl(res.mirasciBasinaTutar),
        primarySubtitle: res.hukukiDayanak,
        metrics: [
          { label: `Sağ Kalan Eş Payı (%${res.esHisseOraniYuzde})`, value: tl(res.esPayiTutari), tone: 'positive' },
          { label: `Zümre Toplam Oranı (%${res.zumreToplamOraniYuzde})`, value: tl(num(v.terekeDegeri, 4000000) - res.esPayiTutari) },
        ],
      };
    },
  },
];


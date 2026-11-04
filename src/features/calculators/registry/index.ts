import { DAILY_CALCULATORS } from './daily-calculators';
import { DATETIME_CALCULATORS } from './datetime-calculators';
import { FINANCE_CALCULATORS } from './finance-calculators';
import { HEALTH_CALCULATORS } from './health-calculators';
import { LEGAL_CALCULATORS } from './legal-calculators';
import { MATH_CALCULATORS } from './math-calculators';
import { PAYROLL_CALCULATORS } from './payroll-calculators';
import { CalculatorCategoryMeta, CalculatorDefinition } from './types';

export * from './types';

export const CALCULATOR_CATEGORIES: CalculatorCategoryMeta[] = [
  {
    id: 'finans',
    title: '1. Finans, Kredi ve Bankacılık',
    shortTitle: 'Finans & Kredi',
    description:
      'Kredi taksit ve amortisman, erken kapama, mevduat faizi, enflasyon ve altın/bilezik değerleme araçları.',
  },
  {
    id: 'bordro-vergi',
    title: '2. İş Hayatı, Bordro & Vergi',
    shortTitle: 'Bordro & Vergi',
    description:
      'Brütten nete maaş, kıdem ve ihbar tazminatı, işsizlik maaşı, KDV tevkifatı ve SMM makbuz araçları.',
  },
  {
    id: 'gunluk-alisveris',
    title: '3. Gündelik Pratik & Alışveriş Araçları',
    shortTitle: 'Gündelik & Alışveriş',
    description:
      'İndirim/kampanya, market birim fiyat kıyası, yol yakıt masrafı, bahşiş bölüştürme ve yüzde hesaplayıcı.',
  },
  {
    id: 'saglik-beslenme',
    title: '4. Sağlık, Fitness & Beslenme',
    shortTitle: 'Sağlık & Beslenme',
    description:
      'Vücut kitle indeksi (VKİ), bazal metabolizma (BMR/TDEE), makro besin, su ihtiyacı ve gebelik haftası.',
  },
  {
    id: 'gayrimenkul-hukuk',
    title: '5. Gayrimenkul, Araç & Hukuk',
    shortTitle: 'Gayrimenkul & Hukuk',
    description:
      'TÜFE kira artış oranı, %4 tapu harcı, araç MTV, yasal/temerrüt faizi ve yasal miras paylaşımı simülatörü.',
  },
  {
    id: 'zaman-takvim',
    title: '6. Zaman, Tarih & Takvim',
    shortTitle: 'Tarih & Zaman',
    description:
      'İki tarih arası gün farkı, resmi tatiller hariç net iş günü, askerlik şafak sayacı ve etkinlik geri sayımı.',
  },
  {
    id: 'matematik-muhendislik',
    title: '7. Matematik, Geometri & Mühendislik',
    shortTitle: 'Matematik & Not',
    description:
      'Birim dönüştürücüler, geometrik alan/hacim hesaplama ve üniversite vize/final GPA not ortalaması.',
  },
];

export const ALL_CALCULATORS: CalculatorDefinition[] = [
  ...FINANCE_CALCULATORS,
  ...PAYROLL_CALCULATORS,
  ...DAILY_CALCULATORS,
  ...HEALTH_CALCULATORS,
  ...LEGAL_CALCULATORS,
  ...DATETIME_CALCULATORS,
  ...MATH_CALCULATORS,
];

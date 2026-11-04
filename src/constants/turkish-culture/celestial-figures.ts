import type { TurkishCulturalFigure } from './types';

export const TURKISH_CULTURE_CELESTIAL_FIGURES: TurkishCulturalFigure[] = [
  {
    id: 'ay-yildiz',
    nameTr: 'Ay Yıldız (Hilal ve Yıldız)',
    nameEn: 'Crescent and Star',
    category: 'celestial',
    subType: 'celestial',
    importance: 'very_high',
    meanings: ['bağımsızlık', 'egemenlik', 'devlet', 'aydınlık', 'millet'],
    description:
      'Türk bayrağının ve kimliğinin en köklü göksel simgesi; Göktürk sikkelerinden Osmanlı sancaklarına ve Türkiye Cumhuriyeti bayrağına uzanan kutsal hilal ve yıldız birlikteliği.',
    origin: 'Göktürk paraları, Selçuklu sancakları, Türk bayrak geleneği',
    promptKeyword:
      'glowing silver crescent moon embracing bright star in deep crimson night sky, sacred national emblem',
  },
  {
    id: 'gunes',
    nameTr: 'Güneş (Kün)',
    nameEn: 'Sun Emblem (Kün)',
    category: 'celestial',
    subType: 'celestial',
    importance: 'high',
    meanings: ['yaşam', 'güç', 'aydınlık', 'hükümdarlık', 'gündüz'],
    description:
      "Eski Türklerde 'Kün Ana' olarak saygı duyulan yaşam ve ışık kaynağı; hükümdarlık otağlarının tepesinde ve Cumhurbaşkanlığı Forsu'ndaki 16 Türk devletinin merkezinde yer alır.",
    origin:
      'Orta Asya Türk kozmolojisi, Kün Ana inancı, Cumhurbaşkanlığı Forsu',
    promptKeyword:
      'radiant 16-ray golden sun emblem, majestic solar corona, ancient imperial crest',
  },
  {
    id: 'ay',
    nameTr: 'Ay (Hilal / Dolunay)',
    nameEn: 'Moon (Ay Ata)',
    category: 'celestial',
    subType: 'celestial',
    importance: 'very_high',
    meanings: ['gökyüzü', 'zaman', 'gece', 'devlet sembolizmi', 'şefkat'],
    description:
      "Eski Türk inancında 'Ay Ata' olarak zamanın ve takvimin yöneticisi kabul edilen göksel varlık; geceyi aydınlatan rehber ve İslam estetiğinde hilal formuyla cami alemlerinin tacı.",
    origin: 'Orta Asya Ay Ata kültü, Osmanlı mimari alem geleneği',
    promptKeyword:
      'luminous silvery crescent moon resting on ancient mosque dome finial, starry velvet sky',
  },
  {
    id: 'yildiz',
    nameTr: 'Yıldız (Kutup Yıldızı / Çolpan)',
    nameEn: 'Guiding Star (Demirkazık)',
    category: 'celestial',
    subType: 'celestial',
    importance: 'very_high',
    meanings: ['yol göstericilik', 'bağımsızlık', 'istikrar', 'gökyüzü direği'],
    description:
      "Eski Türklerin 'Demirkazık' dediği Kutup Yıldızı, evrenin etrafında döndüğü sabit merkez kabul edilirdi. Çolpan (Venüs) ise sabahın müjdecisi ve yol göstericisi olarak kutsandı.",
    origin: 'Orta Asya gökbilimi ve yön bulma kültürü (Demirkazık yıldızı)',
    promptKeyword:
      'brilliant eight-pointed northern guide star, radiant geometric beams, crystal clear steppe night',
  },
];

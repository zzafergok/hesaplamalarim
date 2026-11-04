import type { TurkishCulturalFigure } from './types';

export const TURKISH_CULTURE_MYTHOLOGY_FIGURES: TurkishCulturalFigure[] = [
  {
    id: 'sahmeran',
    nameTr: 'Şahmeran',
    nameEn: 'Shahmaran',
    category: 'mythology',
    subType: 'mythological_creature',
    importance: 'very_high',
    meanings: ['bilgelik', 'şifa', 'koruyuculuk', 'sır saklama', 'sadakat'],
    description:
      'Yarı kadın yarı yılan olan yılanların şahı; şifalı bitkilerin sırrına vakıf olan, Doğu ve Güneydoğu Anadolu evlerinin duvarlarına koruma ve bereket için asılan efsanevi varlık.',
    origin:
      'Mardin ve Güneydoğu Anadolu halk anlatısı, Lokman Hekim efsaneleri',
    promptKeyword:
      'mystical Shahmaran half-woman half-serpent queen, ornate crown, emerald scales, healing wisdom',
  },
  {
    id: 'huma-kusu',
    nameTr: 'Hüma Kuşu',
    nameEn: 'Huma Bird of Fortune',
    category: 'mythology',
    subType: 'mythological_bird',
    importance: 'very_high',
    meanings: ['talih', 'devlet', 'mutluluk', 'yücelik', 'hükümdarlık'],
    description:
      'Hiç yere konmadığına, gölgesi başına düşen kişiyi hükümdar ve bahtiyar kılacağına inanılan cennet kuşu; Osmanlı sarayında devlet kuşu olarak anılmıştır.',
    origin:
      'Türk-İslam mitolojisi, Osmanlı hükümdarlık sembolizmi, Divan edebiyatı',
    promptKeyword:
      'celestial Huma bird of paradise soaring in golden skies, iridescent glowing plumage, divine aura',
  },
  {
    id: 'zumruduanka',
    nameTr: 'Zümrüdüanka (Simurg)',
    nameEn: 'Phoenix (Simurgh)',
    category: 'mythology',
    subType: 'mythological_bird',
    importance: 'high',
    meanings: [
      'yeniden doğuş',
      'bilgelik',
      'küllerinden doğma',
      'hakikat arayışı',
    ],
    description:
      "Kaf Dağı'nın ardında yaşayan, tüm kuşların padişahı ve kendi küllerinden yeniden doğan efsanevi kuş; nefis terbiyesi ve hakikate ulaşmanın simgesi.",
    origin: "Mantıku't-Tayr (Kuş Dili), Türk masalları ve Kaf Dağı efsaneleri",
    promptKeyword:
      'magnificent Phoenix Simurgh rising from radiant embers, fiery golden wings, mystical mountain peak',
  },
  {
    id: 'tepegoz',
    nameTr: 'Tepegöz',
    nameEn: 'One-Eyed Steppe Giant',
    category: 'mythology',
    subType: 'mythological_creature',
    importance: 'high',
    meanings: [
      'meydan okuma',
      'kahramanlık destanı',
      'doğaüstü güç',
      'mücadele',
    ],
    description:
      "Dede Korkut Kitabı'nda Basat'ın alt ettiği, alnında tek bir gözü bulunan yenilmez dev; cesaret ve yiğitliğin sınavını temsil eden destansı figür.",
    origin: "Dede Korkut Destanları (Basat'ın Tepegöz'ü Öldürdüğü Boy)",
    promptKeyword:
      'formidable one-eyed ancient steppe giant from Dede Korkut legends, monumental stature, rocky landscape',
  },
  {
    id: 'ejderha',
    nameTr: 'Ejderha (Evren)',
    nameEn: 'Turkic Dragon (Ebren)',
    category: 'mythology',
    subType: 'mythological_creature',
    importance: 'high',
    meanings: [
      'kozmik düzen',
      'güç',
      'yer ve gök dengesi',
      'su kaynakları',
      'koruyucu',
    ],
    description:
      'Eski Türk mitolojisinde evreni çeviren, su kaynaklarını koruyan ve gök gürültüsünü yöneten kudretli varlık; Selçuklu kabartmalarında kuyrukları düğümlü motiflerle işlenmiştir.',
    origin:
      'Eski Türk evren tasavvuru, Selçuklu çini ve taş kabartmaları (Kubadabad Sarayı)',
    promptKeyword:
      'ancient Turkic serpent-dragon Ebren guarding sacred spring, intricate knotted tail, celestial power',
  },
  {
    id: 'yilan',
    nameTr: 'Yılan',
    nameEn: 'Serpent / Snake',
    category: 'mythology',
    subType: 'reptile',
    importance: 'medium',
    meanings: [
      'yenilenme',
      'deri değiştirme',
      'tıp ve şifa',
      'yeraltı bilgeliği',
    ],
    description:
      'Deri değiştirmesiyle ölümsüzlük ve yenilenmeyi, zehri ve panzehriyle hekimlik ve şifayı simgeler; Selçuklu darüşşifalarının amblemidir.',
    origin:
      'Selçuklu tıp tarihi (Çankırı ve Gevher Nesibe Darüşşifaları), Anadolu halk inancı',
    promptKeyword:
      'coiled serpent around healing rod, ancient stone relief, medical wisdom emblem',
  },
];

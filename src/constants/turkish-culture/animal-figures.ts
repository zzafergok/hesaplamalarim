import type { TurkishCulturalFigure } from './types';

export const TURKISH_CULTURE_ANIMAL_FIGURES: TurkishCulturalFigure[] = [
  {
    id: 'bozkurt',
    nameTr: 'Bozkurt',
    nameEn: 'Grey Wolf',
    category: 'animals',
    subType: 'mammal',
    importance: 'very_high',
    meanings: ['yol göstericilik', 'bağımsızlık', 'cesaret', 'hürriyet', 'soy'],
    description:
      'Ergenekon destanındaki Asena ve türeyiş mitleriyle Türk milletinin köken ve kurtuluş totemi; esarete boyun eğmeyen bağımsızlık sembolü.',
    origin: 'Orta Asya Türk mitolojisi, Ergenekon ve Türeyiş Destanları',
    promptKeyword:
      'majestic grey wolf howling, steppe guardian totem, noble wild wolf spirit',
  },
  {
    id: 'kartal',
    nameTr: 'Kartal',
    nameEn: 'Eagle',
    category: 'animals',
    subType: 'bird',
    importance: 'very_high',
    meanings: ['güç', 'hükümdarlık', 'gökyüzü', 'özgürlük', 'hakimiyet'],
    description:
      'Yükseklerde uçması ve keskin bakışlarıyla göksel egemenliği temsil eder; pek çok Türk boyu ve devleti ongun/arma olarak seçmiştir.',
    origin: 'Türk boy ongunları, göçebe avcılık kültürü, devlet sancakları',
    promptKeyword:
      'soaring golden eagle, wide powerful wings, piercing regal gaze, high mountains',
  },
  {
    id: 'cift-basli-kartal',
    nameTr: 'Çift Başlı Kartal',
    nameEn: 'Double-Headed Eagle',
    category: 'animals',
    subType: 'mythological_bird',
    importance: 'very_high',
    meanings: [
      'devlet gücü',
      'doğu ve batı hakimiyeti',
      'koruyuculuk',
      'denge',
    ],
    description:
      'Biri doğuya diğeri batıya bakan başlarıyla cihan hakimiyetini, dünyevi ve uhrevi iktidarın dengesini simgeleyen Selçuklu devlet arması.',
    origin:
      'Büyük Selçuklu ve Anadolu Selçuklu Devleti resmi arması, taş kabartmalar',
    promptKeyword:
      'imperial double-headed Seljuk eagle, stone relief carving, heraldic majestic crest',
  },
  {
    id: 'tulpar',
    nameTr: 'Tulpar (Kanatlı Gökatı)',
    nameEn: 'Tulpar (Winged Celestial Steed)',
    category: 'animals',
    subType: 'mammal',
    importance: 'very_high',
    meanings: ['gök rüzgarı', 'hız', 'kahramanlık', 'ilahi kanatlar', 'özgürlük'],
    description:
      'Gök Tengri ve Tanrıların kahramanlara bahşettiği, rüzgardan hızlı koşan ve kanatlarıyla gök katlarını aşan ilahi kanatlı at.',
    origin: 'Manas Destanı, Türk ve Altay mitolojisi, Kazakistan ve Başkurt armaları',
    promptKeyword:
      'mythical winged celestial horse Tulpar with glowing feathered wings, soaring through starry skies, divine energy',
  },
  {
    id: 'at',
    nameTr: 'At',
    nameEn: 'Horse',
    category: 'animals',
    subType: 'mammal',
    importance: 'very_high',
    meanings: [
      'özgürlük',
      'savaşçılık',
      'yolculuk',
      'yoldaşlık',
      'bozkır kültürü',
    ],
    description:
      "Türk'ün kanadı olarak görülen, bozkır medeniyetini şekillendiren sadık can yoldaşı; hızın, rüzgarın ve fethin timsalidir.",
    origin:
      'Orta Asya bozkır/göçebe yaşam tarzı, Dede Korkut anlatıları, Tulpar efsanesi',
    promptKeyword:
      'spirited steppe stallion, wind-swept black mane, galloping across open plains',
  },
  {
    id: 'dogan',
    nameTr: 'Doğan / Şahin',
    nameEn: 'Falcon / Hawk',
    category: 'animals',
    subType: 'bird',
    importance: 'high',
    meanings: ['savaşçılık', 'avcılık', 'hız', 'gökyüzü', 'asalet'],
    description:
      'Selçuklu ve Osmanlı saraylarında doğancılık geleneğinin merkezi kuşu; çeviklik, yüksek asalet ve av yeteneğinin sembolü.',
    origin: 'Osmanlı/Selçuklu doğancılık geleneği, hükümdar avları',
    promptKeyword:
      'regal hunting falcon on leather glove, sharp golden eyes, agile predatory poise',
  },
  {
    id: 'turna',
    nameTr: 'Turna',
    nameEn: 'Crane',
    category: 'animals',
    subType: 'bird',
    importance: 'high',
    meanings: ['sadakat', 'sevgi', 'haber', 'yolculuk', 'hasret'],
    description:
      'Tek eşli yaşamıyla sadakati, göç yollarıyla hasreti ve gurbetten haber getirmeyi simgeler; Anadolu türkülerinde en çok anılan kuştur.',
    origin:
      'Anadolu halk müziği, türküler, semah ritüelleri ve Alevi-Bektaşi sembolizmi',
    promptKeyword:
      'graceful white crane taking flight, mist over Anatolian lake, poetic folk symbol',
  },
  {
    id: 'geyik',
    nameTr: 'Geyik (Alageyik)',
    nameEn: 'Sacred Deer',
    category: 'animals',
    subType: 'mammal',
    importance: 'high',
    meanings: ['kutsallık', 'doğa', 'rehberlik', 'zarafet', 'şamanik kılavuz'],
    description:
      'Ormanın kutsal efendisi sayılan geyik; tasavvufta Geyikli Baba efsanesiyle dervişlerin dostu ve yol göstericisi olmuştur.',
    origin: 'Orta Asya şamanizmi, Geyikli Baba menkıbesi, Türk kaya resimleri',
    promptKeyword:
      'mystical stag with radiant glowing antlers, enchanted ancient forest, spiritual guide',
  },
  {
    id: 'koc-boynuzu',
    nameTr: 'Koç Boynuzu',
    nameEn: 'Ram Horn Motif',
    category: 'animals',
    subType: 'symbolic_animal_motif',
    importance: 'very_high',
    meanings: ['güç', 'kahramanlık', 'bereket', 'erkeklik', 'korunma'],
    description:
      'Anadolu kilim dokumacılığının en karakteristik motifi; koçun gücünü, erkeğin kahramanlığını ve kem gözlerden korunmayı temsil eder.',
    origin: 'Anadolu Yörük ve Türkmen kilim dokuma kültürü',
    promptKeyword:
      'traditional Anatolian ram horn kilim pattern, geometric tribal woven textile',
  },
  {
    id: 'koc',
    nameTr: 'Koç',
    nameEn: 'Ram',
    category: 'animals',
    subType: 'mammal',
    importance: 'high',
    meanings: ['güç', 'liderlik', 'cesaret', 'bereket', 'kurban'],
    description:
      'Sürünün öncüsü, gücün ve cesaretin timsali; Türk mezar taşlarında (Koç başlı mezar taşları) yiğitliği simgelemek için yontulmuştur.',
    origin:
      'Akkoyunlu ve Karakoyunlu dönemi, Doğu Anadolu koç başlı mezar taşları',
    promptKeyword:
      'curved horned mountain ram standing proud, rocky cliff, stone totem heritage',
  },
  {
    id: 'aslan',
    nameTr: 'Aslan',
    nameEn: 'Lion',
    category: 'animals',
    subType: 'mammal',
    importance: 'high',
    meanings: ['güç', 'hükümdarlık', 'cesaret', 'koruyuculuk', 'adalet'],
    description:
      'Cesaret ve saltanatın simgesi; Türk hükümdar isimlerinde (Alparslan, Kılıçarslan) ve Selçuklu kervansaray kapılarında koruyucu figür olarak yer almıştır.',
    origin:
      'Selçuklu kervansaray mimarisi, İslam öncesi ve sonrası hükümdar adları',
    promptKeyword:
      'mighty Anatolian lion stone guardian, regal mane, ancient palace portal carving',
  },
  {
    id: 'pars',
    nameTr: 'Pars (Leopar)',
    nameEn: 'Steppe Leopard',
    category: 'animals',
    subType: 'mammal',
    importance: 'high',
    meanings: ['savaşçılık', 'güç', 'çeviklik', 'hakimiyet', 'kamufle'],
    description:
      'Eski Türk takvimindeki 12 hayvandan biri; savaşçıların çevikliğini, korkusuzluğunu ve avdaki ustalığını temsil eder.',
    origin: '12 Hayvanlı Türk Takvimi, Hun ve Göktürk maden sanatı',
    promptKeyword:
      'agile Anatolian leopard stalking through steppe rocks, golden spotted coat, fierce stealth',
  },
  {
    id: 'guvercin',
    nameTr: 'Güvercin',
    nameEn: 'Dove / Pigeon',
    category: 'animals',
    subType: 'bird',
    importance: 'medium',
    meanings: ['barış', 'haberleşme', 'masumiyet', 'Hacı Bektaş velayeti'],
    description:
      "Hacı Bektaş-ı Veli'nin Anadolu'ya güvercin donunda (şeklinde) geldiğine inanılır; barışı, manevi arılığı ve kardeşliği simgeler.",
    origin: 'Vilayetnâme-i Hacı Bektaş-ı Veli, Osmanlı kuş sarayları geleneği',
    promptKeyword:
      'pure white dove hovering gently, golden olive light, sacred Sufi peace symbol',
  },
  {
    id: 'kelebek',
    nameTr: 'Kelebek (Pervane)',
    nameEn: 'Moth / Butterfly',
    category: 'animals',
    subType: 'symbolic_animal_motif',
    importance: 'medium',
    meanings: ['ilahi aşk', 'dönüşüm', 'fedakarlık', 'vuslat'],
    description:
      'Tasavvufta şem (mum) ışığının etrafında dönerek kendini ateşe adayan pervane; ilahi aşkta yok olma (fenafillah) metaforudur.',
    origin: 'Mevlevi ve Divan edebiyatı (Şem ü Pervane mesnevileri)',
    promptKeyword:
      'delicate moth drawn to candlelight flame, mystic Sufi transformation allegory',
  },
  {
    id: 'ari',
    nameTr: 'Arı',
    nameEn: 'Bee',
    category: 'animals',
    subType: 'symbolic_animal_motif',
    importance: 'medium',
    meanings: ['çalışkanlık', 'düzen', 'toplumsal uyum', 'şifa', 'emek'],
    description:
      'Toplumsal ahenk, çalışkanlık ve helal emeğin simgesi; halk kültüründe peteğe benzetilen düzenli nizamı temsil eder.',
    origin: 'Anadolu arıcılık ve yayla kültürü, halk bilgeliği deyişleri',
    promptKeyword:
      'golden honeybee dusted in pollen on Anatolian wildflower, industrious sunlight',
  },
];

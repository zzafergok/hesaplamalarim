import type { TurkishCulturalFigure } from './types';

export const TURKISH_CULTURE_NATURE_FIGURES: TurkishCulturalFigure[] = [
  {
    id: 'hayat-agaci',
    nameTr: 'Hayat Ağacı',
    nameEn: 'Tree of Life',
    category: 'nature',
    subType: 'tree',
    importance: 'very_high',
    meanings: [
      'yaşam',
      'soy',
      'evren',
      'yer ile gök arasındaki bağ',
      'ölümsüzlük',
    ],
    description:
      'Kökleri yer altına inen, dalları göğe uzanan ve evrenin katmanlarını birbirine bağlayan kadim şamanik ve Türk kozmolojisi simgesi.',
    origin:
      'Orta Asya Türk şamanizmi, Selçuklu taş oymacılığı, Anadolu kilimleri',
    promptKeyword:
      'ancient mythical Tree of Life, cosmic branches touching heavens, sacred rooted tree',
  },
  {
    id: 'cinar',
    nameTr: 'Çınar Ağacı',
    nameEn: 'Plane Tree',
    category: 'nature',
    subType: 'tree',
    importance: 'high',
    meanings: ['devlet', 'uzun ömür', 'güç', 'köklülük', 'adalet'],
    description:
      "Uzun ömür, kudret ve himayeyi simgeler; Osmanlı'da devletin adaletle büyümesi ve gölgesi altına alması 'çınar rüyası' metaforuyla anlatılır.",
    origin:
      "Osman Gazi'nin rüyası, Osmanlı siyasi metaforu, Anadolu meydan kültürü",
    promptKeyword:
      'ancient monumental plane tree, majestic sprawling canopy, timeless shelter symbol',
  },
  {
    id: 'servi',
    nameTr: 'Servi (Selvi)',
    nameEn: 'Cypress',
    category: 'nature',
    subType: 'tree',
    importance: 'high',
    meanings: ['sonsuzluk', 'ölümsüzlük', 'zarafet', 'tevazu', 'sabır'],
    description:
      'Ömrünün uzunluğu ve dimdik duruşuyla ebediyeti simgeler; Osmanlı mezarlık ve bahçe mimarisinde, Divan şiirinde sevgilinin boyuna teşbih edilir.',
    origin: 'Osmanlı mezarlık/bahçe mimarisi, Divan şiiri, çini motifleri',
    promptKeyword:
      'slender graceful cypress tree, eternal garden sentinel, tall elegant silhouette',
  },
  {
    id: 'lale',
    nameTr: 'Lale',
    nameEn: 'Tulip',
    category: 'nature',
    subType: 'flower',
    importance: 'very_high',
    meanings: [
      'zarafet',
      'güzellik',
      'Osmanlı estetiği',
      'ilahi aşk',
      'vahdet',
    ],
    description:
      "Osmanlı'da 'Lale Devri'ne adını veren sembol; tasavvufta Arapça yazılışının 'Allah' kelimesiyle aynı ebced değerine ve harflere sahip olmasıyla kutsal kabul edilir.",
    origin: 'Osmanlı dönemi (Lale Devri), tasavvuf sembolizmi, İznik çinileri',
    promptKeyword:
      'classical Ottoman tulip, elegant curved red petals, imperial ceramic flower motif',
  },
  {
    id: 'gul',
    nameTr: 'Gül',
    nameEn: 'Rose',
    category: 'nature',
    subType: 'flower',
    importance: 'high',
    meanings: ['aşk', 'güzellik', 'masumiyet', 'muhabbet', 'maneviyat'],
    description:
      'Divan edebiyatında bülbülün meftun olduğu sevgilinin simgesidir; gül suyu geleneği ve İslam tasavvufunda peygamber remzi olarak kabul edilir.',
    origin: 'Divan şiiri, Osmanlı koku kültürü, minyatür sanatı',
    promptKeyword:
      'classical mystical rose, poetic beloved bloom, delicate velvety petals',
  },
  {
    id: 'karanfil',
    nameTr: 'Karanfil',
    nameEn: 'Carnation',
    category: 'nature',
    subType: 'flower',
    importance: 'high',
    meanings: ['güzellik', 'sevgi', 'bereket', 'sadakat', 'zarafet'],
    description:
      'Osmanlı klasik süsleme sanatının dört ana çiçeğinden biri; çini, kumaş ve ferman tezhiplerinde zarafet ve sevgiyi betimler.',
    origin: 'Osmanlı tezhip ve çini sanatı, saray kumaşları',
    promptKeyword:
      'stylized Ottoman carnation, serrated petal fan, intricate botanical motif',
  },
  {
    id: 'nar',
    nameTr: 'Nar',
    nameEn: 'Pomegranate',
    category: 'nature',
    subType: 'fruit',
    importance: 'very_high',
    meanings: ['bereket', 'bolluk', 'doğurganlık', 'birlik', 'çoklukta teklik'],
    description:
      'Dışındaki tek kabuk içinde binlerce taneyi barındırmasıyla çokluktaki birliği, bereketi ve refahı simgeler.',
    origin:
      'Antik Anadolu bereket kültü, Anadolu halk sanatı, kilim dokumaları',
    promptKeyword:
      'ripe split pomegranate, glowing ruby seeds, ancient Anatolian fertility icon',
  },
  {
    id: 'bugday-basagi',
    nameTr: 'Buğday Başağı',
    nameEn: 'Wheat Ear',
    category: 'nature',
    subType: 'plant',
    importance: 'high',
    meanings: ['bereket', 'üretim', 'toprak', 'yaşam', 'emek'],
    description:
      'Anadolu toprağının can damarı olan buğday; alın terini, rızkı, bereketi ve yaşamın sürekliliğini temsil eder.',
    origin: 'Anadolu tarım kültürü, hasat şenlikleri ve halk sembolizmi',
    promptKeyword:
      'golden wheat sheaf, sunlit grain ears, fertile Anatolian field symbol',
  },
  {
    id: 'dag',
    nameTr: 'Kutsal Dağ',
    nameEn: 'Sacred Mountain',
    category: 'nature',
    subType: 'landscape',
    importance: 'high',
    meanings: ['kutsallık', 'güç', 'yükseklik', 'özgürlük', 'sığınak'],
    description:
      'Ötüken, Tanrı Dağları ve Ağrı gibi dağlar; göğe en yakın yer olarak kutsal sayılmış, gücün ve korumanın sembolü olmuştur.',
    origin: 'Orta Asya Türk dağ kültü (Ötüken), destanlar ve halk anlatıları',
    promptKeyword:
      'majestic sacred mountain peak, soaring above clouds, mythic steppe stronghold',
  },
  {
    id: 'zeytin-dali',
    nameTr: 'Zeytin Dalı',
    nameEn: 'Olive Branch',
    category: 'nature',
    subType: 'plant',
    importance: 'high',
    meanings: ['barış', 'sürdürülebilirlik', 'sağlık', 'uzun ömür', 'bilgelik'],
    description:
      'Ege ve Akdeniz uygarlıklarının kadim simgesi; barış, doğayla kurulan ahenk ve ölümsüz yaşam döngüsünü temsil eder.',
    origin: 'Ege bölgesi doğa ve barış kültürü, zeytin ziraati mirası',
    promptKeyword:
      'peaceful olive branch, silvery-green foliage, ripe dark olives, harmonious light',
  },
];

import type { ArtStyleConfig } from '@/features/turkish-culture/types';

export const ART_STYLES: ArtStyleConfig[] = [
  {
    id: 'iznik_tile',
    label: 'İznik Çinisi',
    description: 'Klasik Osmanlı sırlı seramik ve kobalt çini estetiği',
    promptSuffix:
      'classical Ottoman Iznik ceramic tile composition, vibrant cobalt glaze, intricate floral arabesque borders, museum masterpiece',
  },
  {
    id: 'tezhip_gold',
    label: 'Tezhip & Altın',
    description: 'Saray fermanı tezhip ve varak altın işlemeciliği',
    promptSuffix:
      'royal Ottoman illumination manuscript art, 24k gold leaf filigree, fine imperial calligraphy framing, opulent details',
  },
  {
    id: 'kilim_woven',
    label: 'Kilim Dokuması',
    description: 'Anadolu Yörük ve Türkmen geometrik yün dokuma sanatı',
    promptSuffix:
      'authentic Anatolian tribal kilim textile pattern, rich woven woolen texture, geometric sacred totems, earthy rustic tones',
  },
  {
    id: 'miniature',
    label: 'Klasik Minyatür',
    description: 'Osmanlı nakkaşhane el yazması minyatür tarzı',
    promptSuffix:
      'classical Ottoman miniature painting style, Levni manuscript aesthetics, vibrant historical narrative, delicate gold accents',
  },
  {
    id: 'cinematic_3d',
    label: 'Epik 3D Sinematik',
    description: 'Dramatik hacimsel ışıklandırma ve modern render',
    promptSuffix:
      'epic cinematic fantasy 3D render, dramatic volumetric rim lighting, photorealistic textures, Unreal Engine 5, 8k resolution',
  },
];

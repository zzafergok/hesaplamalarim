export interface CalismaSuresi {
  yil: number;
  ay: number;
  gun: number;
  toplamGun: number;
}

export interface KidemInput {
  iseGirisTarihi: string; // YYYY-MM-DD
  istenCikisTarihi: string; // YYYY-MM-DD
  aylikBrutMaas: number;
  aylikDuzenliYanHaklar: number;
  dusulecekGunSayisi?: number;
}

export interface KidemOutput {
  toplamGun: number;
  calismaSuresi: CalismaSuresi;
  giydirilmisBrutUcret: number;
  tavanUgulandiMi: boolean;
  brutKidemTazminati: number;
  damgaVergisi: number;
  netKidemTazminati: number;
}

export interface IhbarInput {
  toplamGun: number;
  giydirilmisBrutUcret: number;
}

export interface IhbarOutput {
  ihbarSuresiHafta: number;
  ihbarSuresiGun: number;
  brutIhbarTazminati: number;
  gelirVergisi: number;
  damgaVergisi: number;
  netIhbarTazminati: number;
}


export interface VergiDilimiConfig {
  limit: number;
  oran: number;
}

export interface PayrollMevzuatConfig {
  yil: number;
  kidemTavani: number;
  damgaVergisiOrani: number;
  sgkIsciOrani: number;
  issizlikIsciOrani: number;
  sgkTavanKatsayisi: number; // Asgari ücretin katı (örn. 7.5)
  brutAsgariUcret: number;
  asgariUcretGelirIstisnasi: number;
  asgariUcretDamgaIstisnasi: number;
  vergiDilimleri: VergiDilimiConfig[];
}


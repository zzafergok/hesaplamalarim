import { PayrollMevzuatConfig } from './types';

export const MEVZUAT_2026: PayrollMevzuatConfig = {
  yil: 2026,
  kidemTavani: 73729.87,
  damgaVergisiOrani: 0.00759,
  sgkIsciOrani: 0.14,
  issizlikIsciOrani: 0.01,
  sgkTavanKatsayisi: 7.5,
  brutAsgariUcret: 33030,
  asgariUcretGelirIstisnasi: 4000,
  asgariUcretDamgaIstisnasi: 150,
  vergiDilimleri: [
    { limit: 150000, oran: 0.15 },
    { limit: 380000, oran: 0.2 },
    { limit: 1100000, oran: 0.27 },
    { limit: 4300000, oran: 0.35 },
    { limit: Infinity, oran: 0.4 },
  ],
};


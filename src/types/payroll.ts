export interface VergiDilimi {
  limit: number;
  oran: number;
}

export interface MaasInput {
  brutMaas: number;
  kumulatifMatrah?: number;
}

export interface MaasOutput {
  brutMaas: number;
  sgkIsciPrimi: number;
  issizlikSigortasiPrimi: number;
  gelirVergisiMatrahi: number;
  gelirVergisi: number;
  damgaVergisi: number;
  netMaas: number;
  kumulatifMatrahSonrasi: number;
  sgkTavaniUgulandiMi: boolean;
}

export interface NettenBruteInput {
  hedefNetMaas: number;
  kumulatifMatrah?: number;
}


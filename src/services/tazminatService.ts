import { MEVZUAT_2026 } from '@/config/payroll';
import {
  hesaplaCalismaSuresi,
  hesaplaIhbarTazminati,
  hesaplaKidemTazminati,
} from '@/lib/calculators/severance';
import {
  hesaplaBruttenNete,
  hesaplaNettenBrute,
} from '@/lib/calculators/salary';

export {
  MEVZUAT_2026,
  hesaplaCalismaSuresi as gunHesapla,
  hesaplaKidemTazminati,
  hesaplaIhbarTazminati,
  hesaplaBruttenNete,
  hesaplaNettenBrute,
};


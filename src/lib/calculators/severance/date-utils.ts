import { CalismaSuresi } from '@/types/severance';

/**
 * İki YYYY-MM-DD tarihi arasındaki çalışma süresini saat dilimi sapması olmadan hesaplar.
 */
export function hesaplaCalismaSuresi(
  giris: string,
  cikis: string,
  dusulecekGun: number = 0,
): CalismaSuresi {
  const [y1, m1, d1] = giris.split('-').map(Number);
  const [y2, m2, d2] = cikis.split('-').map(Number);

  if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) {
    return { yil: 0, ay: 0, gun: 0, toplamGun: 0 };
  }

  const t1 = Date.UTC(y1, m1 - 1, d1);
  const t2 = Date.UTC(y2, m2 - 1, d2);

  if (t2 < t1) {
    return { yil: 0, ay: 0, gun: 0, toplamGun: 0 };
  }

  const diffMs = t2 - t1;
  const hamGun = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const toplamGun = Math.max(0, hamGun - dusulecekGun);

  const yil = Math.floor(toplamGun / 365);
  const artanGun = toplamGun % 365;
  const ay = Math.floor(artanGun / 30);
  const gun = artanGun % 30;

  return {
    yil,
    ay,
    gun,
    toplamGun,
  };
}


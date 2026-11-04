import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { PublicHomeClient } from './components/public-home-client';
import { getPublicHomeCopy } from './i18n';

export async function PublicHomeScreen() {
  const locale = await getCurrentLocale();
  return <PublicHomeClient copy={getPublicHomeCopy(locale)} />;
}

import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { PublicCultureClient } from './components/public-culture-client';
import { getPublicCultureCopy } from './i18n';

export async function PublicCultureScreen() {
  const locale = await getCurrentLocale();
  return <PublicCultureClient copy={getPublicCultureCopy(locale)} />;
}

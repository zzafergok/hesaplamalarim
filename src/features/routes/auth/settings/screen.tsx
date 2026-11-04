import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { AuthSettingsForm } from './components/auth-settings-form';
import { getAuthSettingsCopy } from './i18n';

export async function AuthSettingsScreen() {
  const locale = await getCurrentLocale();
  const copy = getAuthSettingsCopy(locale);

  return (
    <div className="max-w-3xl">
      <Card className="border-gunmetal bg-obsidian">
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-widest">
            {copy.cardTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuthSettingsForm copy={copy} />
        </CardContent>
      </Card>
    </div>
  );
}

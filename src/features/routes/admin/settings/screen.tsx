import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { AdminSettingsForm } from './components/admin-settings-form';
import { getAdminSettingsCopy } from './i18n';

export async function AdminSettingsScreen() {
  const locale = await getCurrentLocale();
  const copy = getAdminSettingsCopy(locale);

  return (
    <div className="max-w-3xl">
      <Card className="border-gunmetal bg-obsidian">
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-widest">
            {copy.cardTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AdminSettingsForm copy={copy} />
        </CardContent>
      </Card>
    </div>
  );
}

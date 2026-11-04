import { describe, expect, it } from 'vitest';
import { getShellCopy } from '@/features/routes/_shared/layouts/i18n';
import { getAdminLoginCopy } from '@/features/routes/admin/login/i18n';
import { getAdminOverviewCopy } from '@/features/routes/admin/overview/i18n';
import { getAdminSettingsCopy } from '@/features/routes/admin/settings/i18n';
import { getAdminUsersCopy } from '@/features/routes/admin/users/i18n';
import { getAuthHomeCopy } from '@/features/routes/auth/home/i18n';
import { getAuthSettingsCopy } from '@/features/routes/auth/settings/i18n';
import { getAuthWorkspaceCopy } from '@/features/routes/auth/workspace/i18n';
import { getPublicCultureCopy } from '@/features/routes/public/culture/i18n';
import { getPublicHomeCopy } from '@/features/routes/public/home/i18n';
import { getPublicLoginCopy } from '@/features/routes/public/login/i18n';
import {
  enRouteMetadata,
  routeMetadata,
  trRouteMetadata,
} from '@/lib/metadata/site-metadata';

describe('i18n JSON Dictionaries & Copy Loaders', () => {
  const locales = ['tr', 'en'] as const;

  it('loads shell copy for all locales without missing keys', () => {
    for (const locale of locales) {
      const copy = getShellCopy(locale);
      expect(copy).toBeDefined();
      expect(copy.brand.title).toBe('Tulpar');
      expect(copy.authNav.length).toBeGreaterThan(0);
      expect(copy.adminNav.length).toBeGreaterThan(0);
      expect(copy.preferenceControls?.themeLight).toBeTruthy();
      expect(copy.preferenceControls?.themeDark).toBeTruthy();
    }
  });

  it('loads admin route copies with identical structure for tr and en', () => {
    for (const locale of locales) {
      const login = getAdminLoginCopy(locale);
      expect(login.title).toBeTruthy();
      expect(login.emailLabel).toBeTruthy();
      expect(login.passwordLabel).toBeTruthy();
      expect(login.submitLabel).toBeTruthy();

      const overview = getAdminOverviewCopy(locale);
      expect(overview.title).toBeTruthy();
      expect(overview.cards.length).toBe(3);

      const settings = getAdminSettingsCopy(locale);
      expect(settings.title).toBeTruthy();
      expect(settings.appNameLabel).toBeTruthy();
      expect(settings.submitLabel).toBeTruthy();

      const users = getAdminUsersCopy(locale);
      expect(users.title).toBeTruthy();
      expect(users.users.length).toBe(3);
      expect(users.columns.name).toBeTruthy();
    }
  });

  it('loads auth route copies with valid content for tr and en', () => {
    for (const locale of locales) {
      const home = getAuthHomeCopy(locale);
      expect(home.title).toBeTruthy();
      expect(home.metrics.length).toBe(3);

      const settings = getAuthSettingsCopy(locale);
      expect(settings.title).toBeTruthy();
      expect(settings.displayNameLabel).toBeTruthy();

      const workspace = getAuthWorkspaceCopy(locale);
      expect(workspace.title).toBeTruthy();
      expect(workspace.lanes.length).toBe(3);
    }
  });

  it('loads public route copies with rich content for tr and en', () => {
    for (const locale of locales) {
      const culture = getPublicCultureCopy(locale);
      expect(culture.title).toBeTruthy();
      expect(culture.badge).toBeTruthy();

      const home = getPublicHomeCopy(locale);
      expect(home.hero.title).toBeTruthy();
      expect(home.featuresSection.cards.length).toBe(6);
      expect(home.quickRoutesSection.routes.length).toBe(5);

      const login = getPublicLoginCopy(locale);
      expect(login.title).toBeTruthy();
      expect(login.emailLabel).toBeTruthy();
      expect(login.submitLabel).toBeTruthy();
    }
  });

  it('validates site metadata dictionaries in JSON format', () => {
    const routeKeys = Object.keys(routeMetadata);
    expect(routeKeys.length).toBeGreaterThan(0);

    for (const key of routeKeys) {
      const trMeta = trRouteMetadata[key as keyof typeof trRouteMetadata];
      const enMeta = enRouteMetadata[key as keyof typeof enRouteMetadata];

      expect(trMeta).toBeDefined();
      expect(enMeta).toBeDefined();
      expect(trMeta.title).toBeTruthy();
      expect(enMeta.title).toBeTruthy();
      expect(trMeta.description).toBeTruthy();
      expect(enMeta.description).toBeTruthy();
    }
  });
});

import { describe, expect, it } from 'vitest';

import { getShellCopy } from '@/features/routes/_shared/layouts/i18n';
import { getPublicHomeCopy } from '@/features/routes/public/home/i18n';
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
      expect(copy.brand.title).toBe('Hesaplamalarım');
      expect(copy.publicNav.length).toBeGreaterThan(0);
      expect(copy.preferenceControls?.themeLight).toBeTruthy();
      expect(copy.preferenceControls?.themeDark).toBeTruthy();
    }
  });

  it('loads public home copy with valid badges and hero for all locales', () => {
    for (const locale of locales) {
      const home = getPublicHomeCopy(locale);
      expect(home.badges.length).toBeGreaterThan(0);
      expect(home.hero.title).toBeTruthy();
      expect(home.hero.description).toBeTruthy();
      expect(home.hero.ctaAction).toBeTruthy();
    }
  });

  it('contains consistent route metadata for indexable routes', () => {
    expect(routeMetadata.publicHome.path).toBe('/');
    expect(trRouteMetadata.publicHome.title).toBeTruthy();
    expect(enRouteMetadata.publicHome.title).toBeTruthy();
  });
});

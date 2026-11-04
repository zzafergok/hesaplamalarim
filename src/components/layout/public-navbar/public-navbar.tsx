import Image from 'next/image';

import { Link } from '@/components/core/link';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { getNavCategoryGroups } from './constants';
import { DesktopNav } from './desktop-nav';
import { MobileNav } from './mobile-nav';
import type { PublicNavbarProps } from './types';

export function PublicNavbar({
  brandTitle,
  brandSubtitle,
  brandLogo,
}: PublicNavbarProps) {
  const groups = getNavCategoryGroups();

  return (
    <header className="sticky top-0 z-40 border-b border-gunmetal/70 bg-obsidian/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gunmetal/70 bg-white p-0.5 shadow-sm">
            <Image
              src={brandLogo}
              alt={`${brandTitle} logosu`}
              width={36}
              height={36}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="hidden sm:block">
            <span className="block font-display text-caption font-bold tracking-tight text-titanium">
              {brandTitle}
            </span>
            <span className="block font-sans text-2xs font-normal italic text-ash">
              {brandSubtitle}
            </span>
          </span>
        </Link>

        {/* Desktop Menü Grupları */}
        <DesktopNav groups={groups} />

        {/* Sağ Kontroller & Mobil Açılır Menü */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <MobileNav groups={groups} />
        </div>
      </div>
    </header>
  );
}


'use client';

import { Calculator, ChevronDown, ExternalLink } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/core/dropdown-menu';
import { Link } from '@/components/core/link';
import { cn } from '@/lib/utils';
import { getCategoryIcon } from './constants';
import type { NavCategoryGroup } from './types';

interface DesktopNavProps {
  groups: NavCategoryGroup[];
}

export function DesktopNav({ groups }: DesktopNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 3 sütunlu dengeli dağılım
  const col1 = groups.filter((g) => ['finans', 'gayrimenkul-hukuk'].includes(g.id));
  const col2 = groups.filter((g) => ['bordro-vergi', 'zaman-takvim'].includes(g.id));
  const col3 = groups.filter((g) =>
    ['gunluk-alisveris', 'saglik-beslenme', 'matematik-muhendislik'].includes(g.id),
  );

  const isCalculatorPage =
    pathname !== '/' &&
    groups.some(
      (g) => pathname === g.href || pathname.startsWith(`${g.href}/`),
    );

  const renderGroup = (group: NavCategoryGroup) => {
    const Icon = getCategoryIcon(group.id);
    const isCatActive =
      pathname === group.href || pathname.startsWith(`${group.href}/`);

    return (
      <div key={group.id} className="space-y-1.5">
        <div className="flex items-center justify-between border-b border-gunmetal/40 pb-1">
          <Link
            href={group.href}
            onClick={() => setOpen(false)}
            className={cn(
              'group/title flex items-center gap-1.5 font-display text-caption font-bold transition-colors',
              isCatActive
                ? 'text-hesaplamalarim-blue'
                : 'text-titanium hover:text-hesaplamalarim-blue',
            )}
          >
            <Icon className="h-3.5 w-3.5 text-hesaplamalarim-blue" />
            <span>{group.shortTitle}</span>
          </Link>
          <Link
            href={group.href}
            onClick={() => setOpen(false)}
            className="text-2xs text-ash hover:text-titanium"
            title={`${group.shortTitle} Sayfası`}
          >
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <ul className="space-y-0.5">
          {group.calculators.map((calc) => {
            const isItemActive = pathname === calc.href;
            return (
              <li key={calc.id}>
                <Link
                  href={calc.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'group/link flex items-center justify-between rounded-md px-2 py-1 text-left font-sans text-compact transition-colors',
                    isItemActive
                      ? 'bg-hesaplamalarim-blue/15 font-semibold text-hesaplamalarim-blue'
                      : 'text-ash hover:bg-gunmetal/30 hover:text-titanium',
                  )}
                >
                  <span className="truncate">{calc.shortTitle}</span>
                  <span className="font-mono text-micro opacity-0 transition-opacity group-hover/link:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <nav aria-label="Ana Gezinim" className="hidden items-center gap-2 md:flex">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={cn(
          'font-sans text-body-sm font-semibold tracking-tight',
          pathname === '/'
            ? 'bg-gunmetal/30 text-titanium'
            : 'text-ash hover:text-titanium',
        )}
      >
        <Link href="/">Ana Sayfa</Link>
      </Button>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'gap-2 font-sans text-body-sm font-semibold tracking-tight transition-colors',
              isCalculatorPage
                ? 'border border-hesaplamalarim-blue/40 bg-hesaplamalarim-blue/10 text-titanium'
                : 'text-ash hover:text-titanium',
            )}
          >
            <Calculator className="h-4 w-4 text-hesaplamalarim-blue" />
            <span>Hesaplama Araçları</span>
            <Badge
              variant="outline"
              className="ml-0.5 border-gunmetal/70 px-1.5 py-0 font-mono text-2xs text-hesaplamalarim-blue"
            >
              33
            </Badge>
            <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          sideOffset={8}
          className="w-[920px] max-w-[94vw] border-gunmetal/80 bg-obsidian/95 p-5 shadow-2xl backdrop-blur-md"
        >
          <div className="mb-4 flex items-center justify-between border-b border-gunmetal/50 pb-3">
            <div>
              <h3 className="font-display text-body-sm font-bold text-titanium">
                Tüm Hesaplama Kategorileri & İşlemleri
              </h3>
              <p className="font-sans text-2xs text-ash">
                Her hesaplama aracı kendi bağımsız SEO sayfasında çalışır.
              </p>
            </div>
            <Badge
              variant="default"
              className="font-mono text-micro font-semibold"
            >
              7 Kategori • 33 Özel Sayfa
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">{col1.map(renderGroup)}</div>
            <div className="space-y-4">{col2.map(renderGroup)}</div>
            <div className="space-y-4">{col3.map(renderGroup)}</div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

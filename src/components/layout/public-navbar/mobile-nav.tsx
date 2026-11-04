'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/core/accordion';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/core/sheet';
import { getCategoryIcon } from './constants';
import type { NavCategoryGroup } from './types';

interface MobileNavProps {
  groups: NavCategoryGroup[];
}

export function MobileNav({ groups }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Menüyü Aç"
            className="text-ash hover:text-titanium"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex w-full max-w-sm flex-col overflow-y-auto border-gunmetal/80 bg-obsidian p-5"
        >
          <SheetHeader className="pb-3 text-left">
            <SheetTitle className="font-display text-body-sm font-bold text-titanium">
              Hesaplama Menüsü
            </SheetTitle>
            <SheetDescription className="font-sans text-2xs text-ash">
              Kategori ve hesaplama aracınızı seçin
            </SheetDescription>
          </SheetHeader>

          <div className="mb-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              className="w-full justify-start font-sans text-compact font-semibold"
            >
              <Link href="/">Ana Sayfa</Link>
            </Button>
          </div>

          <Accordion type="multiple" className="w-full space-y-2">
            {groups.map((group) => {
              const Icon = getCategoryIcon(group.id);
              return (
                <AccordionItem
                  key={group.id}
                  value={group.id}
                  className="rounded-lg border border-gunmetal/60 bg-void-black/70 px-3"
                >
                  <AccordionTrigger className="py-2.5 font-sans text-compact font-semibold text-titanium hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-hesaplamalarim-blue" />
                      <span>{group.shortTitle}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-2 pt-1">
                    <div className="mb-2">
                      <Link
                        href={group.href}
                        onClick={() => setOpen(false)}
                        className="inline-block font-mono text-micro font-semibold text-hesaplamalarim-blue hover:underline"
                      >
                        {group.shortTitle} Ana Sayfası →
                      </Link>
                    </div>

                    <div className="space-y-1">
                      {group.calculators.map((calc) => (
                        <Link
                          key={calc.id}
                          href={calc.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-2 py-1.5 font-sans text-compact text-titanium transition-colors hover:bg-gunmetal/40"
                        >
                          <div className="font-medium text-titanium">
                            {calc.shortTitle}
                          </div>
                          <div className="line-clamp-1 font-sans text-2xs text-ash">
                            {calc.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
}


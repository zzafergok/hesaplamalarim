'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import { siteMetadata } from '@/lib/metadata/site-metadata';

interface SidebarBrandProps {
  brand: { title: string; subtitle: string };
  collapsed?: boolean;
  planLabel?: string;
  onCloseMobile: () => void;
}

export function SidebarBrand({
  brand,
  collapsed = false,
  planLabel,
  onCloseMobile,
}: SidebarBrandProps) {
  return (
    <div
      className={`flex h-16 items-center border-b border-border ${
        collapsed ? 'justify-center px-2' : 'justify-between px-5'
      }`}
    >
      <Link
        href="/"
        className={`flex min-w-0 items-center ${
          collapsed ? 'justify-center' : 'flex-1 gap-3'
        }`}
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-white p-0.5 shadow-sm">
          <Image
            src={siteMetadata.assets.logo}
            alt={`${brand.title} brand mark`}
            width={36}
            height={36}
            className="h-full w-full object-contain"
            priority
          />
        </span>
        {!collapsed && (
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 font-mono text-sm font-black uppercase tracking-widest text-foreground">
              <span className="truncate">{brand.title}</span>
              {planLabel && (
                <span className="shrink-0 border border-border bg-background px-1.5 py-0.5 text-micro text-muted-foreground">
                  {planLabel}
                </span>
              )}
            </span>
            <span
              className="block truncate font-mono text-2xs text-muted-foreground"
              title={brand.subtitle}
            >
              {brand.subtitle}
            </span>
          </span>
        )}
      </Link>
      <Button
        onClick={onCloseMobile}
        variant="ghost"
        size="icon"
        aria-label="Menüyü kapat"
        className="ml-auto h-8 w-8 shrink-0 p-1 text-ash hover:text-titanium lg:hidden"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}

'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import { TurkishCultureShowcase } from '@/features/turkish-culture';
import type { PublicCultureCopy } from '../types';

export function PublicCultureClient({ copy }: { copy: PublicCultureCopy }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Button asChild variant="outline" size="sm" className="gap-2 text-xs">
          <Link href="/">
            <ArrowLeft className="h-3.5 w-3.5" />
            {copy.backToHome}
          </Link>
        </Button>
      </div>

      <TurkishCultureShowcase />
    </div>
  );
}

'use client';

import { CalculatorHub } from '@/features/calculators';
import { HomeHero } from './home-hero';
import type { PublicHomeCopy } from '../types';

export function PublicHomeClient({ copy }: { copy: PublicHomeCopy }) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 px-4 py-8 sm:space-y-16 sm:px-6 lg:px-8">
      {/* 1. Hero Section */}
      <HomeHero badges={copy.badges} hero={copy.hero} />

      {/* 2. Canlı Hesaplama Araçları Merkezi */}
      <section id="hesaplama-araclari" className="scroll-mt-16">
        <CalculatorHub />
      </section>
    </div>
  );
}

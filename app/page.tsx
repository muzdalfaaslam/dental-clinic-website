import { StickyNav } from '@/components/layout/StickyNav';
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA';
import { Hero } from '@/components/sections/Hero';
import { Video } from '@/components/sections/Video';
import { ProblemBlock } from '@/components/sections/ProblemBlock';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { TheMath } from '@/components/sections/TheMath';
import { SocialProof } from '@/components/sections/SocialProof';
import { QualificationForm } from '@/components/sections/QualificationForm';
import { ReassuranceStrip } from '@/components/sections/ReassuranceStrip';
import { Footer } from '@/components/sections/Footer';

/**
 * The single landing page — nine sections composed in the brief's exact order.
 * All copy comes from config/content.ts; all brand values from config/theme.ts.
 */
export default function Page() {
  return (
    <>
      <StickyNav />
      <main>
        {/* 1 */} <Hero />
        {/* 2 */} <Video />
        {/* 3 */} <ProblemBlock />
        {/* 4 */} <WhatWeBuild />
        {/* 5 */} <TheMath />
        {/* 6 */} <SocialProof />
        {/* 7 */} <QualificationForm />
        {/* 8 */} <ReassuranceStrip />
      </main>
      {/* 9 */} <Footer />
      <StickyMobileCTA />
    </>
  );
}

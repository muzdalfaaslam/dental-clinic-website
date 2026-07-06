import { StickyNav } from '@/components/layout/StickyNav';
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA';
import { Hero } from '@/components/sections/Hero';
import { Video } from '@/components/sections/Video';
import { ProblemBlock } from '@/components/sections/ProblemBlock';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { PlatformThemeShowcase } from '@/components/sections/PlatformThemeShowcase';
import { TheMath } from '@/components/sections/TheMath';
import { SocialProof } from '@/components/sections/SocialProof';
import { QualifyFlow } from '@/components/sections/QualifyFlow';
import { ReassuranceStrip } from '@/components/sections/ReassuranceStrip';
import { Footer } from '@/components/sections/Footer';

/**
 * The single landing page — ten sections composed in order. All copy comes
 * from config/content.ts; all brand values from config/theme.ts.
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
        {/* 5 */} <PlatformThemeShowcase />
        {/* 6 */} <TheMath />
        {/* 7 */} <SocialProof />
        {/* 8 */} <QualifyFlow />
        {/* 9 */} <ReassuranceStrip />
      </main>
      {/* 10 */} <Footer />
      <StickyMobileCTA />
    </>
  );
}

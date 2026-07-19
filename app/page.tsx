import { StickyNav } from '@/components/layout/StickyNav';
import { Hero } from '@/components/sections/Hero';
import { TrustBadges } from '@/components/sections/TrustBadges';
import { Video } from '@/components/sections/Video';
import { WhyFamilies } from '@/components/sections/WhyFamilies';
import { ProblemBlock } from '@/components/sections/ProblemBlock';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { PlatformThemeShowcase } from '@/components/sections/PlatformThemeShowcase';
import { TheMath } from '@/components/sections/TheMath';
import { MeetDentist } from '@/components/sections/MeetDentist';
import { Testimonials } from '@/components/sections/Testimonials';
import { BoldCta } from '@/components/sections/BoldCta';
import { FAQ } from '@/components/sections/FAQ';
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
        {/* 1b */} <TrustBadges />
        {/* 2 */} <Video />
        {/* 2b */} <WhyFamilies />
        {/* 3 */} <ProblemBlock />
        {/* 4 */} <WhatWeBuild />
        {/* 5 */} <PlatformThemeShowcase />
        {/* 6 */} <TheMath />
        {/* 6b */} <MeetDentist />
        {/* 7 */} <Testimonials />
        {/* 7b */} <BoldCta />
        {/* 7c */} <FAQ />
        {/* 8 */} <QualifyFlow />
        {/* 9 */} <ReassuranceStrip />
      </main>
      {/* 10 */} <Footer />
    </>
  );
}
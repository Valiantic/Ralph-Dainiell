
'use client';

import { PORTFOLIO_DATA } from './constants/portfolio';
import { ProfileHero } from './components/ProfileHero';
import { BioSection } from './components/BioSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificatesSection } from './components/CertificatesSection';

export default function Home() {
  return (
    <main style={{
      padding: 'clamp(16px, 4vw, 40px)',
      maxWidth: '1600px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(20px, 5vw, 32px)',
      overflowX: 'hidden'
    }}>
      <ProfileHero data={PORTFOLIO_DATA} />

      <div className="bento-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 'clamp(16px, 3vw, 24px)',
        '--bento-height': '650px'
      } as any}>
        <div style={{ gridColumn: 'span 6' }} className="mobile-span-12">
          <BioSection bio={PORTFOLIO_DATA.bio} />
        </div>
        <div style={{ gridColumn: 'span 3' }} className="mobile-span-12">
          <SkillsSection skills={PORTFOLIO_DATA.skills} />
        </div>
        <div style={{ gridColumn: 'span 3' }} className="mobile-span-12">
          <ExperienceSection experiences={PORTFOLIO_DATA.experiences} />
        </div>
      </div>

      <CertificatesSection certificates={PORTFOLIO_DATA.certificates} />

      <style jsx global>{`
        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .mobile-span-12 {
            grid-column: span 12 !important;
            width: 100% !important;
          }
          .mobile-span-12 > * {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </main>
  );
}

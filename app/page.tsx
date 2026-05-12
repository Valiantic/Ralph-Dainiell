'use client';

import { PORTFOLIO_DATA } from './constants/portfolio';
import { ProfileHero } from './components/ProfileHero';
import { BioSection } from './components/BioSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificatesSection } from './components/CertificatesSection';
import ProjectsSection from './components/ProjectsSection';

export default function Home() {
  return (
    <main
      style={{
        padding: 'clamp(16px, 4vw, 40px)',
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(20px, 5vw, 32px)',
      }}
    >
      <div className="portfolio-reveal reveal-hero">
        <ProfileHero data={PORTFOLIO_DATA} />
      </div>

      <div
        className="bento-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(16px, 3vw, 24px)',
          '--bento-height': '650px',
        } as any}
      >
        <div
          style={{ gridColumn: 'span 6' }}
          className="mobile-span-12 portfolio-reveal reveal-bio"
        >
          <BioSection bio={PORTFOLIO_DATA.bio} />
        </div>

        <div
          style={{ gridColumn: 'span 3' }}
          className="mobile-span-12 portfolio-reveal reveal-skills"
        >
          <SkillsSection skills={PORTFOLIO_DATA.skills} />
        </div>

        <div
          style={{ gridColumn: 'span 3' }}
          className="mobile-span-12 portfolio-reveal reveal-experience"
        >
          <ExperienceSection experiences={PORTFOLIO_DATA.experiences} />
        </div>
      </div>

      <div className="portfolio-reveal reveal-projects">
        <ProjectsSection />
      </div>

      <div className="portfolio-reveal reveal-certificates">
        <CertificatesSection certificates={PORTFOLIO_DATA.certificates} />
      </div>

      <style jsx global>{`
        .portfolio-reveal {
          opacity: 0;
          transform: translateY(22px);
          filter: blur(6px);
          animation-name: portfolioRevealIn;
          animation-duration: 0.78s;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: forwards;
          will-change: opacity, transform, filter;
        }

        .reveal-hero {
          animation-delay: 0.06s;
        }

        .reveal-bio {
          animation-delay: 0.18s;
        }

        .reveal-skills {
          animation-delay: 0.28s;
        }

        .reveal-experience {
          animation-delay: 0.38s;
        }

        .reveal-projects {
          animation-delay: 0.48s;
        }

        .reveal-certificates {
          animation-delay: 0.58s;
        }

        @keyframes portfolioRevealIn {
          0% {
            opacity: 0;
            transform: translateY(22px);
            filter: blur(6px);
          }

          60% {
            opacity: 1;
            filter: blur(1px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .mobile-span-12 {
            grid-column: span 12 !important;
            width: 100% !important;
          }

          .mobile-span-12 > * {
            width: 100% !important;
            max-width: 100% !important;
          }

          .portfolio-reveal {
            transform: translateY(18px);
          }
        }

        @media (max-width: 480px) {
          .portfolio-reveal {
            transform: translateY(14px);
            filter: blur(4px);
            animation-duration: 0.68s;
          }

          .reveal-hero {
            animation-delay: 0.04s;
          }

          .reveal-bio {
            animation-delay: 0.12s;
          }

          .reveal-skills {
            animation-delay: 0.18s;
          }

          .reveal-experience {
            animation-delay: 0.24s;
          }

          .reveal-projects {
            animation-delay: 0.30s;
          }

          .reveal-certificates {
            animation-delay: 0.36s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-reveal {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PortfolioData } from '../types/portfolio';
import { GoFileZip } from 'react-icons/go';
import { LuPhone, LuMail, LuMapPin } from 'react-icons/lu';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

interface ProfileHeroProps {
  data: PortfolioData;
}

type SocialKey = 'facebook' | 'instagram' | 'youtube' | 'linkedin';

const socialItems: {
  key: SocialKey;
  label: string;
  href?: string;
  icon: React.ReactNode;
}[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    href: '',
    icon: <FaFacebookF size={18} />,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: '',
    icon: <FaInstagram size={18} />,
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: '',
    icon: <FaYoutube size={18} />,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: '',
    icon: <FaLinkedinIn size={18} />,
  },
];

export const ProfileHero = ({ data }: ProfileHeroProps) => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const socials = [
    { ...socialItems[0], href: data.socials.facebook || '#' },
    { ...socialItems[1], href: data.socials.instagram || '#' },
    { ...socialItems[2], href: data.socials.youtube || '#' },
    { ...socialItems[3], href: data.socials.linkedin || '#' },
  ];

  return (
    <section className="profileHero">
      <div className="heroShell">
        {/* Top Profile Card */}
        <div className="topCard">
          <div className="topRow">
            <div className="avatarWrap">
              {data.profileImage ? (
                <Image
                  src={data.profileImage}
                  alt={data.name}
                  fill
                  sizes="120px"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
              ) : (
                <span className="avatarFallback">Image</span>
              )}
            </div>

            <div className="topInfo">
              <h1>{data.name}</h1>

              <div className="locationRow">
                <LuMapPin size={15} />
                <span>{data.location}</span>
              </div>

              <p className="roleText">{data.roles?.[0] || 'Data Analyst'}</p>
            </div>
          </div>
        </div>

        {/* Download CV */}
        <Link
          href="/resume/GonzagaRalphDainiellCVresume_.pdf"
          target="_blank"
          download
          className="primaryButton"
        >
          <GoFileZip size={18} />
          <span>Download CV</span>
        </Link>

        {/* Phone */}
        <div className="phoneCard">
          <LuPhone size={20} />
          <span>{data.contact.phone}</span>
        </div>

        {/* Contact + Social */}
        <div className="mainCard">
          <div className="emailCard">
            <div className="emailLeft">
              <LuMail size={20} />
              <span>{data.contact.email}</span>
            </div>

            <Link
              href={`https://mail.google.com/mail/?view=cm&to=${data.contact.email}`}
              target="_blank"
              className="sendEmailBtn"
            >
              SEND EMAIL
            </Link>
          </div>

          <div className="socialGrid">
            {socials.map((social) => (
              <Link
                key={social.key}
                href={social.href || '#'}
                target="_blank"
                className={`socialItem ${hoveredSocial === social.key ? 'isHovered' : ''}`}
                onMouseEnter={() => setHoveredSocial(social.key)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <span className="socialIcon">{social.icon}</span>
                <span>{social.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Opportunities Card */}
        <div className="opportunityCard">
          <div className="statusPill">
            <span className="statusDot" />
            <span>Available For Opportunities</span>
          </div>

          <h2>Turning Data into Actionable Insights</h2>

          <p>
            Open to internships and work opportunities.
            <br />
            I&apos;m ready to contribute, learn, and deliver real impact.
          </p>

          <Link href={`mailto:${data.contact.email}`} className="workBtn">
            WORK WITH ME
          </Link>
        </div>
      </div>

      <style jsx>{`
        .profileHero {
          width: 100%;
        }

        .heroShell {
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .topCard,
        .phoneCard,
        .mainCard,
        .opportunityCard {
          background: #fff;
          border: 2px solid #111;
          border-radius: 28px;
        }

        .topCard {
          padding: 18px;
        }

        .topRow {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .avatarWrap {
          width: 96px;
          height: 96px;
          border-radius: 26px;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          border: 2px solid #111;
          background: #f3f3f3;
        }

        .avatarFallback {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          font-size: 12px;
          color: #777;
        }

        .topInfo {
          min-width: 0;
          flex: 1;
        }

        .topInfo h1 {
          margin: 0 0 6px;
          font-size: 1.9rem;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #111;
        }

        .locationRow {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #4b4b4b;
          font-size: 0.92rem;
          margin-bottom: 8px;
        }

        .roleText {
          margin: 0;
          font-size: 1.65rem;
          line-height: 1.1;
          font-weight: 700;
          color: #111;
        }

        .primaryButton {
          width: 100%;
          min-height: 58px;
          border-radius: 20px;
          background: #3f6df2;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 1rem;
          font-weight: 700;
          border: 2px solid #2d59d7;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .primaryButton:hover {
          transform: translateY(-1px);
          opacity: 0.96;
        }

        .phoneCard {
          min-height: 58px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          color: #111;
        }

        .mainCard {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .emailCard {
          border: 2px solid #111;
          border-radius: 20px;
          padding: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .emailLeft {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          flex: 1;
        }

        .emailLeft span {
          font-size: 1rem;
          font-weight: 700;
          color: #111;
          word-break: break-word;
        }

        .sendEmailBtn {
          flex-shrink: 0;
          text-decoration: none;
          color: #111;
          border: 2px solid #111;
          border-radius: 999px;
          padding: 10px 16px;
          font-size: 0.8rem;
          font-weight: 800;
          transition: all 0.2s ease;
          background: #fff;
        }

        .sendEmailBtn:hover {
          background: #111;
          color: #fff;
        }

        .socialGrid {
          border: 2px solid #111;
          border-radius: 20px;
          padding: 12px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .socialItem {
          min-height: 72px;
          border-radius: 16px;
          border: 1.5px solid #e4e4e4;
          background: #fafafa;
          text-decoration: none;
          color: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          font-weight: 700;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .socialItem:hover,
        .socialItem.isHovered {
          transform: translateY(-1px);
          background: #f2f2f2;
          border-color: #d4d4d4;
        }

        .socialIcon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .opportunityCard {
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .statusPill {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: #eef8ee;
          color: #3b7c41;
          font-size: 0.88rem;
          font-weight: 800;
        }

        .statusDot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #69b96f;
        }

        .opportunityCard h2 {
          margin: 0;
          color: #111;
          font-size: 2rem;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .opportunityCard p {
          margin: 0;
          color: #666;
          font-size: 1rem;
          line-height: 1.7;
        }

        .workBtn {
          width: fit-content;
          min-width: 170px;
          text-decoration: none;
          background: #111;
          color: #fff;
          border-radius: 16px;
          padding: 14px 20px;
          font-size: 0.95rem;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .workBtn:hover {
          transform: translateY(-1px);
          opacity: 0.96;
        }

        @media (max-width: 640px) {
          .heroShell {
            max-width: 100%;
            gap: 12px;
          }

          .topCard,
          .mainCard,
          .opportunityCard {
            border-radius: 24px;
          }

          .topInfo h1 {
            font-size: 1.65rem;
          }

          .roleText {
            font-size: 1.3rem;
          }

          .emailCard {
            flex-direction: column;
            align-items: stretch;
          }

          .sendEmailBtn {
            width: fit-content;
            align-self: flex-end;
          }

          .socialGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .socialItem {
            min-height: 64px;
            font-size: 0.95rem;
          }

          .opportunityCard h2 {
            font-size: 1.75rem;
          }
        }

        @media (min-width: 768px) {
          .heroShell {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
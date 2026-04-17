'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PortfolioData } from '../types/portfolio';
import { GoFileZip } from 'react-icons/go';
import { LuPhone } from 'react-icons/lu';
import { IoLocationOutline } from 'react-icons/io5';

interface ProfileHeroProps {
  data: PortfolioData;
}

export const ProfileHero = ({ data }: ProfileHeroProps) => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredSendEmail, setHoveredSendEmail] = useState(false);
  const [hoveredContact, setHoveredContact] = useState(false);

  return (
    <section className="profile-hero">
      {/* TOP ROW */}
      <div className="top-row">
        {/* PROFILE CARD */}
        <div className="profile-main-card">
          <div className="hero-img-container">
            {data.profileImage ? (
              <Image
                src={data.profileImage}
                alt={data.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            ) : (
              <span className="image-placeholder">image here</span>
            )}
          </div>

          <div className="hero-info">
            <h1>{data.name}</h1>

            <div className="location-row">
              <IoLocationOutline size={18} color="#000" />
              <span>{data.location}</span>
            </div>

            <div className="role-text">
              {data.roles?.length ? data.roles.join(' \\ ') : 'Data Analyst'}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE BUTTONS ON DESKTOP / STACKED ON MOBILE */}
        <div className="hero-buttons-block">
          <Link
            href="/resume/GonzagaRalphDainiellCVresume_.pdf"
            target="_blank"
            download
            className="cv-button"
          >
            <GoFileZip size={18} color="#fff" />
            <span>Download CV</span>
          </Link>

          <div className="phone-card">
            <LuPhone size={20} color="#000" />
            <span>{data.contact.phone}</span>
          </div>
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="bottom-row">
        {/* CONTACT CARD */}
        <div className="contact-card">
          <div className="email-box">
            <div className="email-left">
              <div className="email-icon-wrap">
                <Image
                  src="/Images/Icons/email icon.png"
                  alt="Email"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <span className="email-text">{data.contact.email}</span>
            </div>

            <Link
              href={`https://mail.google.com/mail/?view=cm&to=${data.contact.email}`}
              target="_blank"
              onMouseEnter={() => setHoveredSendEmail(true)}
              onMouseLeave={() => setHoveredSendEmail(false)}
              className={`send-email-btn ${hoveredSendEmail ? 'active' : ''}`}
            >
              SEND EMAIL
            </Link>
          </div>

          <div className="social-box">
            <Link
              href={data.socials.facebook || '#'}
              target="_blank"
              onMouseEnter={() => setHoveredSocial('facebook')}
              onMouseLeave={() => setHoveredSocial(null)}
              className={`social-item ${hoveredSocial === 'facebook' ? 'facebook-hover' : ''}`}
            >
              <div className="social-icon-wrap">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill={hoveredSocial === 'facebook' ? '#fff' : '#555'}
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
              <span>Facebook</span>
            </Link>

            <Link
              href={data.socials.instagram || '#'}
              target="_blank"
              onMouseEnter={() => setHoveredSocial('instagram')}
              onMouseLeave={() => setHoveredSocial(null)}
              className={`social-item ${hoveredSocial === 'instagram' ? 'instagram-hover' : ''}`}
            >
              <div className="social-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    stroke={hoveredSocial === 'instagram' ? '#fff' : '#555'}
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke={hoveredSocial === 'instagram' ? '#fff' : '#555'}
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1.5"
                    fill={hoveredSocial === 'instagram' ? '#fff' : '#555'}
                  />
                </svg>
              </div>
              <span>Instagram</span>
            </Link>

            <Link
              href={data.socials.youtube || '#'}
              target="_blank"
              onMouseEnter={() => setHoveredSocial('youtube')}
              onMouseLeave={() => setHoveredSocial(null)}
              className={`social-item ${hoveredSocial === 'youtube' ? 'youtube-hover' : ''}`}
            >
              <div className="social-icon-wrap">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill={hoveredSocial === 'youtube' ? '#fff' : '#555'}
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <span>YouTube</span>
            </Link>

            <Link
              href={data.socials.linkedin || '#'}
              target="_blank"
              onMouseEnter={() => setHoveredSocial('linkedin')}
              onMouseLeave={() => setHoveredSocial(null)}
              className={`social-item ${hoveredSocial === 'linkedin' ? 'linkedin-hover' : ''}`}
            >
              <div className="social-icon-wrap">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill={hoveredSocial === 'linkedin' ? '#fff' : '#555'}
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>

        {/* OPPORTUNITIES CARD */}
        <div className="opportunities-card">
          <div className="availability-pill">
            <div className="availability-dot" />
            <span>Available For Opportunities</span>
          </div>

          <p className="opportunity-title">Turning Data into Actionable Insights</p>

          <p className="opportunity-description">
            Open to internships and work opportunities.
            <br />
            I&apos;m ready to contribute, learn, and deliver real impact.
          </p>

          <Link
            href={`mailto:${data.contact.email}`}
            target="_blank"
            onMouseEnter={() => setHoveredContact(true)}
            onMouseLeave={() => setHoveredContact(false)}
            className={`work-button ${hoveredContact ? 'active' : ''}`}
          >
            WORK WITH ME
          </Link>
        </div>
      </div>

      <style jsx>{`
        .profile-hero {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .top-row {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(260px, 0.7fr);
          gap: 16px;
          align-items: stretch;
        }

        .profile-main-card {
          border: 1.5px solid #000;
          border-radius: 32px;
          padding: 20px;
          background: #fff;
          display: flex;
          align-items: center;
          gap: 20px;
          min-width: 0;
        }

        .hero-img-container {
          width: 150px;
          height: 150px;
          border-radius: 28px;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          border: 1.5px solid #000;
        }

        .image-placeholder {
          font-size: 12px;
          opacity: 0.5;
        }

        .hero-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .hero-info h1 {
          margin: 0;
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1;
          color: #000;
        }

        .location-row {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #000;
          font-size: 15px;
        }

        .role-text {
          font-size: 24px;
          font-weight: 500;
          color: #000;
          margin-top: 4px;
        }

        .hero-buttons-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
        }

        .cv-button {
          background: #2b6ef2;
          color: #fff;
          padding: 0 24px;
          border-radius: 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
          font-size: 15px;
          min-height: 62px;
          box-sizing: border-box;
          border: 1.5px solid #2b6ef2;
          transition: all 0.25s ease;
        }

        .cv-button:hover {
          background: #1f5fe0;
          border-color: #1f5fe0;
          transform: translateY(-1px);
        }

        .phone-card {
          padding: 0 20px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 700;
          font-size: 16px;
          min-height: 62px;
          box-sizing: border-box;
          border: 1.5px solid #000;
          background: #fff;
        }

        .bottom-row {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
          gap: 16px;
          align-items: stretch;
        }

        .contact-card {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-radius: 24px;
          border: 1.5px solid #000;
          background: #fff;
          box-sizing: border-box;
        }

        .email-box {
          border: 1.5px solid #000;
          border-radius: 18px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          gap: 12px;
          background: #fff;
        }

        .email-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          flex: 1;
        }

        .email-icon-wrap {
          width: 24px;
          height: 24px;
          position: relative;
          flex-shrink: 0;
        }

        .email-text {
          font-size: 14px;
          font-weight: 700;
          word-break: break-word;
          color: #000;
        }

        .send-email-btn {
          font-size: 11px;
          font-weight: 700;
          color: #000;
          background: transparent;
          border: 1.5px solid #000;
          border-radius: 20px;
          padding: 7px 12px;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .send-email-btn.active,
        .send-email-btn:hover {
          color: #fff;
          background: #000;
        }

        .social-box {
          border: 1.5px solid #000;
          border-radius: 18px;
          padding: 12px 14px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          box-sizing: border-box;
          background: #fff;
        }

        .social-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border: 1px solid #e5e5e5;
          border-radius: 14px;
          text-decoration: none;
          background: #fff;
          transition: all 0.25s ease;
          min-width: 0;
        }

        .social-item span {
          font-size: 13px;
          font-weight: 600;
          color: #333;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .social-icon-wrap {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .facebook-hover {
          background: #1877f2;
          border-color: transparent;
        }

        .instagram-hover {
          background: linear-gradient(45deg, #f77737, #fd1d1d, #833ab4);
          border-color: transparent;
        }

        .youtube-hover {
          background: #ff0000;
          border-color: transparent;
        }

        .linkedin-hover {
          background: #0a66c2;
          border-color: transparent;
        }

        .facebook-hover span,
        .instagram-hover span,
        .youtube-hover span,
        .linkedin-hover span {
          color: #fff;
        }

        .opportunities-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border-radius: 24px;
          border: 1.5px solid #000;
          background: #fff;
          justify-content: center;
          box-sizing: border-box;
        }

        .availability-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e8f5e9;
          border-radius: 20px;
          padding: 4px 12px;
          width: fit-content;
        }

        .availability-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4caf50;
          flex-shrink: 0;
        }

        .availability-pill span {
          font-size: 12px;
          font-weight: 700;
          color: #2e7d32;
        }

        .opportunity-title {
          font-size: 18px;
          font-weight: 800;
          color: #000;
          margin: 0;
          line-height: 1.3;
        }

        .opportunity-description {
          font-size: 13px;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        .work-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 28px;
          border-radius: 12px;
          text-decoration: none;
          width: fit-content;
          transition: all 0.25s ease;
          transform: translateY(0);
        }

        .work-button.active,
        .work-button:hover {
          background: #333;
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .top-row {
            grid-template-columns: 1fr;
          }

          .bottom-row {
            grid-template-columns: 1fr;
          }

          .hero-buttons-block {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .profile-hero {
            gap: 14px;
          }

          .profile-main-card {
            padding: 16px;
            border-radius: 28px;
            gap: 14px;
            align-items: flex-start;
          }

          .hero-img-container {
            width: 100px;
            height: 100px;
            border-radius: 22px;
          }

          .hero-info h1 {
            font-size: 28px;
            line-height: 1.05;
          }

          .location-row {
            font-size: 14px;
          }

          .role-text {
            font-size: 18px;
            margin-top: 2px;
          }

          .hero-buttons-block {
            gap: 10px;
          }

          .cv-button,
          .phone-card {
            width: 100%;
            min-height: 58px;
            border-radius: 18px;
          }

          .contact-card,
          .opportunities-card {
            width: 100%;
            padding: 16px;
          }

          .email-box {
            flex-direction: row;
            align-items: center;
          }

          .social-box {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }

          .social-item {
            padding: 12px 10px;
            justify-content: flex-start;
          }

          .social-item span {
            font-size: 12px;
          }
        }

        @media (max-width: 520px) {
          .profile-main-card {
            align-items: center;
          }

          .hero-img-container {
            width: 92px;
            height: 92px;
            border-radius: 20px;
          }

          .hero-info h1 {
            font-size: 24px;
          }

          .role-text {
            font-size: 16px;
          }

          .location-row {
            font-size: 13px;
          }

          .cv-button {
            justify-content: flex-start;
            padding: 0 18px;
          }

          .phone-card {
            justify-content: center;
            font-size: 15px;
            padding: 0 16px;
          }

          .email-box {
            flex-direction: column;
            align-items: stretch;
          }

          .send-email-btn {
            width: fit-content;
            align-self: flex-end;
          }

          .social-box {
            padding: 10px;
          }

          .social-item {
            min-height: 58px;
            padding: 10px;
            gap: 8px;
          }

          .social-icon-wrap {
            width: 24px;
            height: 24px;
          }

          .opportunity-title {
            font-size: 16px;
          }

          .opportunity-description {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
};
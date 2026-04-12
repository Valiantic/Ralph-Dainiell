'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PortfolioData } from '../types/portfolio';
import { GoFileZip } from 'react-icons/go';
import { LuPhone } from 'react-icons/lu';
import { IoLocationOutline } from 'react-icons/io5';

interface ProfileHeroProps {
    data: PortfolioData;
}

export const ProfileHero = ({ data }: ProfileHeroProps) => {
    return (
        <section className="profile-hero" style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            width: '100%',
            flexWrap: 'wrap'
        }}>
            {/* 1. Profile Pic */}
            <div className="hero-img-container" style={{
                width: '180px',
                height: '180px',
                borderRadius: '32px',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                border: '1.5px solid #000'
            }}>
                {data.profileImage ? (
                    <Image src={data.profileImage} alt={data.name} fill style={{ objectFit: 'cover' }} />
                ) : (
                    <span style={{ fontSize: '12px', opacity: 0.5 }}>image here</span>
                )}
            </div>

            {/* 2. Main Bio Info */}
            <div className="hero-info" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '300px' }}>
                <h1 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1, color: '#000' }}>{data.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#000', fontSize: '15px' }}>
                    <IoLocationOutline size={18} color="#000" />
                    {data.location}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 500, color: '#000', marginBottom: '8px' }}>
                    {data.roles.join(' \\ ')}
                </div>
                <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link
                        href="/resume/GonzagaRalphDainiellCVresume_.pdf"
                        target="_blank"
                        download
                        className="cv-button"
                        style={{
                            background: '#2b6ef2', color: '#fff', padding: '12px 24px',
                            borderRadius: '16px', fontWeight: 700, display: 'flex',
                            alignItems: 'center', gap: '10px', textDecoration: 'none',
                            fontSize: '15px', height: '52px', boxSizing: 'border-box'
                        }}
                    >
                        <GoFileZip size={18} color="#fff" />
                        Download CV
                    </Link>
                    <div className="card phone-card" style={{
                        padding: '12px 20px', borderRadius: '16px', display: 'flex',
                        alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '16px',
                        height: '52px', boxSizing: 'border-box', border: '1.5px solid #000'
                    }}>
                        <LuPhone size={18} color="#000" />
                        {data.contact.phone}
                    </div>
                </div>
            </div>

            <div className="hero-cards-wrapper" style={{ display: 'flex', gap: '16px', flex: '1 1 600px', flexWrap: 'wrap', alignItems: 'stretch' }}>

                {/* 3. LEFT CARD — Email + Socials */}
                <div className="card contact-card" style={{
                    padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px',
                    flex: '1 1 300px', borderRadius: '24px', border: '1.5px solid #000',
                    justifyContent: 'center', boxSizing: 'border-box'
                }}>
                    {/* Email */}
                    <div style={{
                        border: '1.5px solid #000', borderRadius: '14px', padding: '12px 16px',
                        display: 'flex', alignItems: 'center', boxSizing: 'border-box', gap: '10px'
                    }}>
                        <div style={{ width: '24px', height: '24px', position: 'relative', flexShrink: 0 }}>
                            <Image src="/Images/Icons/email icon.png" alt="Email" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 700, wordBreak: 'break-all', flex: 1 }}>{data.contact.email}</span>
                        <Link
                            href={`https://mail.google.com/mail/?view=cm&to=${data.contact.email}`}
                            target="_blank"
                            className="send-email-btn"
                            style={{
                                fontSize: '11px', fontWeight: 700, color: '#000',
                                border: '1.5px solid #000', borderRadius: '20px',
                                padding: '4px 10px', textDecoration: 'none',
                                whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.3s ease'
                            }}
                        >
                            SEND EMAIL
                        </Link>
                    </div>

                    {/* Social Media — 2x2 gray style */}
                    <div style={{
                        border: '1.5px solid #000', borderRadius: '14px', padding: '12px 14px',
                        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px',
                        boxSizing: 'border-box'
                    }}>
                        <Link href={data.socials.facebook || '#'} target="_blank" className="social-pill" style={{
                            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                            border: '1px solid #e5e5e5', borderRadius: '12px', textDecoration: 'none',
                            background: '#fff'
                        }}>
                            <div style={{ width: '28px', height: '28px', background: '#555', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="14" height="14" viewBox="0 0 10 18" fill="white">
                                    <path d="M6.5 3H9V0H6.5C4.57 0 3 1.57 3 3.5V5H1V8H3V18H6V8H8.5L9 5H6V3.5C6 3.22 6.22 3 6.5 3Z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>Facebook</span>
                        </Link>

                        <Link href={data.socials.instagram || '#'} target="_blank" className="social-pill" style={{
                            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                            border: '1px solid #e5e5e5', borderRadius: '12px', textDecoration: 'none',
                            background: '#fff'
                        }}>
                            <div style={{ width: '28px', height: '28px', background: '#555', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                                    <circle cx="12" cy="12" r="4"/>
                                    <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>Instagram</span>
                        </Link>

                        <Link href={data.socials.youtube || '#'} target="_blank" className="social-pill" style={{
                            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                            border: '1px solid #e5e5e5', borderRadius: '12px', textDecoration: 'none',
                            background: '#fff'
                        }}>
                            <div style={{ width: '28px', height: '28px', background: '#555', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>YouTube</span>
                        </Link>

                        <Link href={data.socials.linkedin || '#'} target="_blank" className="social-pill" style={{
                            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                            border: '1px solid #e5e5e5', borderRadius: '12px', textDecoration: 'none',
                            background: '#fff'
                        }}>
                            <div style={{ width: '28px', height: '28px', background: '#555', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>LinkedIn</span>
                        </Link>
                    </div>
                </div>

                {/* 4. RIGHT CARD — Open to Opportunities */}
                <div className="card opportunities-card" style={{
                    padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px',
                    flex: '1 1 240px', borderRadius: '24px', border: '1.5px solid #000',
                    background: '#fff', justifyContent: 'center', boxSizing: 'border-box'
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: '#e8f5e9', borderRadius: '20px', padding: '4px 12px', width: 'fit-content'
                    }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4caf50', flexShrink: 0 }} />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#2e7d32' }}>Open to Opportunities</span>
                    </div>

                    <p style={{ fontSize: '18px', fontWeight: 800, color: '#000', margin: 0, lineHeight: 1.3 }}>
                        Turning Data into Actionable Insights
                    </p>

                    <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: 1.6 }}>
                        Available for internships and freelance work.<br />
                        Let&apos;s build something impactful together.
                    </p>

                    <Link
                        href={`https://mail.google.com/mail/?view=cm&to=${data.contact.email}`}
                        target="_blank"
                        className="contact-btn"
                        style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: '#1a1a1a', color: '#fff', fontWeight: 700, fontSize: '14px',
                            padding: '12px 28px', borderRadius: '12px', textDecoration: 'none',
                            width: 'fit-content', transition: 'all 0.3s ease'
                        }}
                    >
                        Contact me
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .send-email-btn:hover {
                    background: #000 !important;
                    color: #fff !important;
                }
                .contact-btn:hover {
                    background: #333 !important;
                    transform: translateY(-2px);
                }
                .social-pill:hover {
                    border-color: #bbb !important;
                    background: #f0f0f0 !important;
                }
                @media (max-width: 1024px) {
                    .profile-hero {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        gap: 16px !important;
                    }
                    .hero-img-container {
                        width: 100% !important;
                        height: 220px !important;
                        border-radius: 24px !important;
                    }
                    .hero-info {
                        width: 100% !important;
                        min-width: 0 !important;
                        flex: none !important;
                    }
                    .hero-info h1 {
                        font-size: 32px !important;
                    }
                    .hero-buttons {
                        flex-direction: column !important;
                        gap: 10px !important;
                    }
                    .cv-button {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                    .phone-card {
                        width: 100% !important;
                        justify-content: center !important;
                        height: auto !important;
                        padding: 10px !important;
                    }
                    .hero-cards-wrapper {
                        width: 100% !important;
                        flex: none !important;
                        flex-direction: column !important;
                        gap: 12px !important;
                    }
                    .contact-card, .opportunities-card {
                        width: 100% !important;
                        flex: none !important;
                        height: auto !important;
                        padding: 16px !important;
                    }
                }
            `}</style>
        </section>
    );
};
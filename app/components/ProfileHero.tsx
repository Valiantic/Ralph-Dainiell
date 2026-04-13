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
                            onMouseEnter={() => setHoveredSendEmail(true)}
                            onMouseLeave={() => setHoveredSendEmail(false)}
                            style={{
                                fontSize: '11px', fontWeight: 700,
                                color: hoveredSendEmail ? '#fff' : '#000',
                                background: hoveredSendEmail ? '#000' : 'transparent',
                                border: '1.5px solid #000', borderRadius: '20px',
                                padding: '4px 10px', textDecoration: 'none',
                                whiteSpace: 'nowrap', flexShrink: 0,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            SEND EMAIL
                        </Link>
                    </div>

                    {/* Social Media — 2x2 gray style with hover */}
                    <div style={{
                        border: '1.5px solid #000', borderRadius: '14px', padding: '12px 14px',
                        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px',
                        boxSizing: 'border-box'
                    }}>
                        {/* Facebook */}
                        <Link
                            href={data.socials.facebook || '#'}
                            target="_blank"
                            onMouseEnter={() => setHoveredSocial('facebook')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: hoveredSocial === 'facebook' ? '1px solid transparent' : '1px solid #e5e5e5',
                                borderRadius: '12px', textDecoration: 'none',
                                background: hoveredSocial === 'facebook' ? '#1877F2' : '#fff',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ width: '28px', height: '28px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'facebook' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'facebook' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>Facebook</span>
                        </Link>

                        {/* Instagram */}
                        <Link
                            href={data.socials.instagram || '#'}
                            target="_blank"
                            onMouseEnter={() => setHoveredSocial('instagram')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: hoveredSocial === 'instagram' ? '1px solid transparent' : '1px solid #e5e5e5',
                                borderRadius: '12px', textDecoration: 'none',
                                background: hoveredSocial === 'instagram' ? 'linear-gradient(45deg, #F77737, #FD1D1D, #833AB4)' : '#fff',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ width: '28px', height: '28px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'all 0.3s ease' }}>
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke={hoveredSocial === 'instagram' ? '#fff' : '#555'} strokeWidth="2" fill="none"/>
                                    <circle cx="12" cy="12" r="4" stroke={hoveredSocial === 'instagram' ? '#fff' : '#555'} strokeWidth="2" fill="none"/>
                                    <circle cx="17.5" cy="6.5" r="1.5" fill={hoveredSocial === 'instagram' ? '#fff' : '#555'}/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'instagram' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>Instagram</span>
                        </Link>

                        {/* YouTube */}
                        <Link
                            href={data.socials.youtube || '#'}
                            target="_blank"
                            onMouseEnter={() => setHoveredSocial('youtube')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: hoveredSocial === 'youtube' ? '1px solid transparent' : '1px solid #e5e5e5',
                                borderRadius: '12px', textDecoration: 'none',
                                background: hoveredSocial === 'youtube' ? '#FF0000' : '#fff',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ width: '28px', height: '28px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'youtube' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'youtube' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>YouTube</span>
                        </Link>

                        {/* LinkedIn */}
                        <Link
                            href={data.socials.linkedin || '#'}
                            target="_blank"
                            onMouseEnter={() => setHoveredSocial('linkedin')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: hoveredSocial === 'linkedin' ? '1px solid transparent' : '1px solid #e5e5e5',
                                borderRadius: '12px', textDecoration: 'none',
                                background: hoveredSocial === 'linkedin' ? '#0A66C2' : '#fff',
                                transition: 'all 0.3s ease'
                            }}
                        >
                           <div style={{ width: '28px', height: '28px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'linkedin' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'linkedin' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>LinkedIn</span>
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
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#2e7d32' }}>AVAILABLE FOR OPPORTUNITIES</span>
                    </div>

                    <p style={{ fontSize: '18px', fontWeight: 800, color: '#000', margin: 0, lineHeight: 1.3 }}>
                        Turning Data into Actionable Insights
                    </p>

                    <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: 1.6 }}>
                        Open to internships and work opportunities.<br />
                        I’m ready to contribute, learn, and deliver real impact.
                    </p>

                    <Link
                        href={`mailto:${data.contact.email}`}
                        target="_blank"
                        onMouseEnter={() => setHoveredContact(true)}
                        onMouseLeave={() => setHoveredContact(false)}
                        style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: hoveredContact ? '#333' : '#1a1a1a',
                            color: '#fff', fontWeight: 700, fontSize: '14px',
                            padding: '12px 28px', borderRadius: '12px', textDecoration: 'none',
                            width: 'fit-content', transition: 'all 0.3s ease',
                            transform: hoveredContact ? 'translateY(-2px)' : 'translateY(0)'
                        }}
                    >
                        WORK WITH ME
                    </Link>
                </div>
            </div>

            <style jsx>{`
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
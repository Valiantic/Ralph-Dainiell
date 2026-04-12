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
                    <Image
                        src={data.profileImage}
                        alt={data.name}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '12px', opacity: 0.5 }}>image here</span>
                    </div>
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
                            background: '#2b6ef2',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '16px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            textDecoration: 'none',
                            fontSize: '15px',
                            height: '52px',
                            boxSizing: 'border-box'
                        }}
                    >
                        <GoFileZip size={18} color="#fff" />
                        Download CV
                    </Link>
                    <div className="card phone-card" style={{
                        padding: '12px 20px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: 700,
                        fontSize: '16px',
                        height: '52px',
                        boxSizing: 'border-box',
                        border: '1.5px solid #000'
                    }}>
                        <LuPhone size={18} color="#000" />
                        {data.contact.phone}
                    </div>
                </div>
            </div>

            <div className="hero-cards-wrapper" style={{ display: 'flex', gap: '16px', flex: '1 1 600px', flexWrap: 'wrap' }}>
                {/* 3. Contact Badges Card */}
                <div className="card contact-card" style={{
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    flex: '1 1 300px',
                    borderRadius: '24px',
                    border: '1.5px solid #000',
                    justifyContent: 'center'
                }}>
                    {/* Email */}
                    <div style={{
                        width: '100%',
                        border: '1.5px solid #000',
                        borderRadius: '14px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ width: '24px', height: '24px', position: 'relative', marginRight: '12px', flexShrink: 0 }}>
                            <Image src="/Images/Icons/email icon.png" alt="Email" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 700, wordBreak: 'break-all' }}>{data.contact.email}</span>
                    </div>

                    {/* University */}
                    <div style={{
                        width: '100%',
                        border: '1.5px solid #000',
                        borderRadius: '14px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ width: '30px', height: '24px', position: 'relative', marginRight: '11px', flexShrink: 0 }}>
                            <Image src="/Images/Icons/school icon.png" alt="Uni" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.2 }}>{data.contact.university}</span>
                    </div>
                </div>

                {/* 4. Socials Group Card */}
                <div className="card socials-card" style={{
                    padding: '16px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    flex: '1 1 240px',
                    borderRadius: '24px',
                    border: '1.5px solid #000',
                    background: '#fff'
                }}>
                    {/* Facebook - #1877F2 official */}
                    <Link href={data.socials.facebook || '#'} target="_blank" style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 14px', border: 'none',
                        borderRadius: '14px', textDecoration: 'none',
                        background: '#1877F2'
                    }}>
                        <div style={{ width: '28px', height: '28px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="18" height="18" viewBox="0 0 10 18" fill="#1877F2"><path d="M6.5 3H9V0H6.5C4.57 0 3 1.57 3 3.5V5H1V8H3V18H6V8H8.5L9 5H6V3.5C6 3.22 6.22 3 6.5 3Z"/></svg>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', flex: 1 }}>Facebook</span>
                    </Link>

                    {/* Instagram - official gradient #833AB4 #FD1D1D #F77737 */}
                    <Link href={data.socials.instagram || '#'} target="_blank" style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 14px', border: 'none',
                        borderRadius: '14px', textDecoration: 'none',
                        background: 'linear-gradient(45deg, #F77737, #FD1D1D, #833AB4)'
                    }}>
                        <div style={{ width: '28px', height: '28px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                        </svg>  
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', flex: 1 }}>Instagram</span>
                    </Link>

                    {/* YouTube - #FF0000 official */}
                    <Link href={data.socials.youtube || '#'} target="_blank" style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 14px', border: 'none',
                        borderRadius: '14px', textDecoration: 'none',
                        background: '#FF0000'
                    }}>
                        <div style={{ width: '28px', height: '28px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', flex: 1 }}>Youtube</span>
                    </Link>

                    {/* LinkedIn - #0A66C2 official */}
                    <Link href={data.socials.linkedin || '#'} target="_blank" style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 14px', border: 'none',
                        borderRadius: '14px', textDecoration: 'none',
                        background: '#0A66C2'
                    }}>
                        <div style={{ width: '28px', height: '28px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', flex: 1 }}>LinkedIn</span>
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
                        text-align: left !important;
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
                    .contact-card, .socials-card {
                        width: 100% !important;
                        flex: none !important;
                        height: auto !important;
                        padding: 12px !important;
                    }
                    .socials-card {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 8px !important;
                    }
                }
            `}</style>
        </section>
    );
};
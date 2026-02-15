
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PortfolioData } from '../types/portfolio';

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontSize: '15px' }}>
                    <span style={{ fontSize: '18px' }}>📍</span> {data.location}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 500, color: '#000', marginBottom: '8px' }}>
                    {data.roles.join(' \\ ')}
                </div>
                <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link
                        href="/resume/GonzagaRalphDainiell_CVresume.pdf"
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
                            height: '48px',
                            boxSizing: 'border-box'
                        }}
                    >
                        <div style={{ background: '#fff', color: '#2b6ef2', borderRadius: '4px', padding: '1px 3px', fontSize: '10px', fontWeight: 900 }}>PDF</div>
                        Download CV
                    </Link>
                    <div className="card phone-card" style={{
                        padding: '12px 20px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: 700,
                        fontSize: '14px',
                        height: '48px',
                        boxSizing: 'border-box',
                        border: '1.5px solid #000'
                    }}>
                        <span style={{ fontSize: '18px' }}>📞</span> {data.contact.phone}
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
                    <div className="pill" style={{ width: '100%', justifyContent: 'flex-start', border: '1.5px solid #000', borderRadius: '14px', padding: '10px 16px', height: 'auto' }}>
                        <span style={{ marginRight: '10px' }}>✉️</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, borderBottom: '1.5px solid #000', wordBreak: 'break-all' }}>{data.contact.email}</span>
                    </div>
                    <div className="pill" style={{ width: '100%', justifyContent: 'flex-start', border: '1.5px solid #000', borderRadius: '14px', padding: '10px 16px', height: 'auto' }}>
                        <span style={{ marginRight: '10px' }}>🎓</span>
                        <span style={{ fontSize: '10px', fontWeight: 600, lineHeight: 1.2 }}>{data.contact.university}</span>
                    </div>
                </div>

                {/* 4. Socials Group Card */}
                <div className="card socials-card" style={{
                    padding: '16px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    flex: '1 1 240px',
                    borderRadius: '24px',
                    border: '1.5px solid #000',
                    background: '#fff'
                }}>
                    <Link href={data.socials.facebook || '#'} target="_blank" style={{ background: '#1877F2', color: '#fff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 800, justifyContent: 'center' }}>
                        <span style={{ background: '#fff', color: '#1877F2', borderRadius: '3px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>f</span> Facebook
                    </Link>
                    <Link href={data.socials.instagram || '#'} target="_blank" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 800, justifyContent: 'center' }}>
                        📸 Instagram
                    </Link>
                    <Link href={data.socials.youtube || '#'} target="_blank" style={{ background: '#FF0000', color: '#fff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 800, justifyContent: 'center' }}>
                        ▶ Youtube
                    </Link>
                    <Link href={data.socials.linkedin || '#'} target="_blank" style={{ background: '#0077B5', color: '#fff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 800, justifyContent: 'center' }}>
                        <span style={{ background: '#fff', color: '#0077B5', borderRadius: '3px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>in</span> LinkedIn
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
                    .socials-card :global(a) {
                        padding: 8px !important;
                        font-size: 11px !important;
                    }
                }
            `}</style>
        </section>
    );
};

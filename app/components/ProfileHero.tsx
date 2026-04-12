'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PortfolioData } from '../types/portfolio';
import { GoFileZip } from 'react-icons/go';
import { LuPhone } from 'react-icons/lu';
import { IoLocationOutline } from 'react-icons/io5';
import { FaFacebookSquare, FaLinkedin } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { IoLogoYoutube } from 'react-icons/io';

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '15px' }}>
                    <IoLocationOutline size={18} color="#666" />
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
                    gap: '12px',
                    flex: '1 1 240px',
                    borderRadius: '24px',
                    border: '1.5px solid #000',
                    background: '#fff'
                }}>
                    <Link href={data.socials.facebook || '#'} target="_blank" style={{ background: '#1877F2', padding: '8px 12px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '11px', color: '#fff', fontWeight: 700, justifyContent: 'center' }}>
                        <FaFacebookSquare size={16} color="#fff" />
                        Facebook
                    </Link>
                    <Link href={data.socials.instagram || '#'} target="_blank" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', padding: '8px 12px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '11px', color: '#fff', fontWeight: 700, justifyContent: 'center' }}>
                        <FiInstagram size={16} color="#fff" />
                        Instagram
                    </Link>
                    <Link href={data.socials.youtube || '#'} target="_blank" style={{ background: '#FF0000', padding: '8px 12px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '11px', color: '#fff', fontWeight: 700, justifyContent: 'center' }}>
                        <IoLogoYoutube size={16} color="#fff" />
                        Youtube
                    </Link>
                    <Link href={data.socials.linkedin || '#'} target="_blank" style={{ background: '#0077B5', padding: '8px 12px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '11px', color: '#fff', fontWeight: 700, justifyContent: 'center' }}>
                        <FaLinkedin size={16} color="#fff" />
                        LinkedIn
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
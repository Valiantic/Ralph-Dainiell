'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { PortfolioData } from '../types/portfolio';
import { GoFileZip } from 'react-icons/go';
import { IoLocationOutline } from 'react-icons/io5';

interface ProfileHeroProps {
    data: PortfolioData;
}

type SlideDetail = {
    label: string;
    value: string;
};

type Slide =
    | { type: 'greeting'; duration: number }
    | {
          type: 'content';
          label: string;
          title: string;
          description: string;
          details?: SlideDetail[];
          duration: number;
      };

const SLIDES: Slide[] = [
    {
        type: 'greeting',
        duration: 2000,
    },
    {
        type: 'content',
        label: 'STUDENT DEVELOPER',
        title: 'Building My Skills in Native iOS Development',
        description:
            'Learning Swift, SwiftUI, app structure, and clean UI design through consistent practice and portfolio projects.',
        duration: 4000,
    },
    {
        type: 'content',
        label: 'CAREER DIRECTION',
        title: 'Open to Voluntary OJT and Learning Opportunities',
        description:
            'Available for voluntary OJT, internships, and beginner-friendly opportunities where I can learn, contribute, and grow.',
        duration: 4000,
    },
    {
        type: 'content',
        label: 'WORK SETUP',
        title: 'Flexible for Hybrid, Remote, or On-Site Setup',
        description:
            'Ready for hybrid, remote, or on-site opportunities with a stable setup, strong Wi-Fi, and personal devices for learning and development tasks.',
        details: [
            { label: 'Device', value: 'Acer Helios 16 / MacBook Neo' },
            { label: 'Setup', value: 'Hybrid · Remote · On-Site' },
            { label: 'Connection', value: 'Strong Wi-Fi Signal' },
        ],
        duration: 4000,
    },
    {
        type: 'content',
        label: 'LEARNING JOURNEY',
        title: 'Learning With Consistency and Purpose',
        description:
            'Continuously improving through hands-on practice, portfolio development, and focused learning in iOS development.',
        duration: 4000,
    },
];

export const ProfileHero = ({ data }: ProfileHeroProps) => {
    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
    const [hoveredGithub, setHoveredGithub] = useState(false);
    const [hoveredCvButton, setHoveredCvButton] = useState(false);
    const [hoveredContactCard, setHoveredContactCard] = useState(false);
    const [hoveredOpportunities, setHoveredOpportunities] = useState(false);

    const [hasCursor, setHasCursor] = useState(false);
    const [emailHovered, setEmailHovered] = useState(false);

    const [slideIndex, setSlideIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [displayedSlide, setDisplayedSlide] = useState<Slide>(SLIDES[0]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
        setHasCursor(mq.matches);
        const handler = (e: MediaQueryListEvent) => {
            setHasCursor(e.matches);
            if (!e.matches) setEmailHovered(false);
        };
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        const currentSlide = SLIDES[slideIndex];

        timerRef.current = setTimeout(() => {
            setVisible(false);
            setTimeout(() => {
                const next = (slideIndex + 1) % SLIDES.length;
                setSlideIndex(next);
                setDisplayedSlide(SLIDES[next]);
                setVisible(true);
            }, 400);
        }, currentSlide.duration);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [slideIndex]);

    const touchPillStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        fontSize: '11px',
        fontWeight: 700,
        color: '#000',
        border: '1.5px solid #000',
        borderRadius: '20px',
        padding: '4px 10px',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        textDecoration: 'none',
    };

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
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    />
                ) : (
                    <span style={{ fontSize: '12px', opacity: 0.5 }}>image here</span>
                )}
            </div>

            {/* 2. Main Bio Info */}
            <div className="hero-info" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '300px' }}>
                <h1 style={{ fontSize: '38px', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, color: '#000' }}>
                    {data.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1px', color: '#000', fontSize: '15px' }}>
                    <IoLocationOutline size={18} color="#000" />
                    <span style={{ paddingTop: '2px' }}>{data.location}</span>
                </div>
                <div style={{ fontSize: '22px', fontWeight: 500, color: '#000', marginBottom: '8px' }}>
                    {data.roles.join(' \\ ')}
                </div>

                <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {/* Download CV */}
                    <a
                        href="/resume/GonzagaRalphDainiellCVresume-.pdf"
                        target="_blank"
                        download
                        className="cv-button"
                        onMouseEnter={() => setHoveredCvButton(true)}
                        onMouseLeave={() => setHoveredCvButton(false)}
                        style={{
                            background: '#2b6ef2', color: '#fff', padding: '12px 24px',
                            borderRadius: '16px', fontWeight: 700, display: 'flex',
                            alignItems: 'center', gap: '10px', textDecoration: 'none',
                            fontSize: '15px', height: '52px', boxSizing: 'border-box'
                        }}
                    >
                        <GoFileZip size={18} color="#fff" />
                        Download CV
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/Dainiell"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredGithub(true)}
                        onMouseLeave={() => setHoveredGithub(false)}
                        className="card github-btn"
                        style={{
                            padding: '12px 20px', borderRadius: '16px', display: 'flex',
                            alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '16px',
                            height: '52px', boxSizing: 'border-box',
                            border: '1.5px solid #000', textDecoration: 'none',
                            background: hoveredGithub ? '#000' : '#fff',
                            color: hoveredGithub ? '#fff' : '#000',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <svg
                            width="20" height="20" viewBox="0 0 24 24"
                            fill={hoveredGithub ? '#fff' : '#000'}
                            style={{ transition: 'fill 0.3s ease', flexShrink: 0 }}
                        >
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>

            {/* 3. Cards Row */}
            <div className="hero-cards-wrapper" style={{ display: 'flex', gap: '16px', flex: '1 1 600px', flexWrap: 'wrap', alignItems: 'stretch' }}>

                {/* LEFT CARD — Contact card */}
                <div
                    className="no-lift contact-card"
                    onMouseEnter={() => { if (hasCursor) setHoveredContactCard(true); }}
                    onMouseLeave={() => setHoveredContactCard(false)}
                    style={{
                        padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px',
                        flex: '1 1 300px', borderRadius: '24px', border: '1.5px solid #000',
                        justifyContent: 'center', boxSizing: 'border-box',
                        overflow: 'visible',
                        transform: hasCursor && hoveredContactCard ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: hasCursor && hoveredContactCard ? '0 12px 32px rgba(0,0,0,0.18)' : 'none',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'default',
                    }}
                >
                    <div
                        onMouseEnter={(e) => { e.stopPropagation(); if (hasCursor) setEmailHovered(true); }}
                        onMouseLeave={(e) => { e.stopPropagation(); setEmailHovered(false); }}
                        style={{
                            borderRadius: '14px',
                            transform: hasCursor && emailHovered ? 'translateY(-4px)' : 'translateY(0)',
                            boxShadow: hasCursor && emailHovered ? '0 8px 20px rgba(0,0,0,0.12)' : 'none',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                    >
                        <div
                            style={{
                                border: '1.5px solid #000',
                                borderRadius: '14px',
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                boxSizing: 'border-box',
                                gap: '10px',
                                position: 'relative',
                                overflow: 'hidden',
                                width: '100%',
                            }}
                        >
                            <div style={{ width: '24px', height: '24px', position: 'relative', flexShrink: 0 }}>
                                <Image
                                    src="/Images/Icons/email icon.png"
                                    alt="Email"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>

                            <span style={{
                                fontSize: '13px',
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                flex: 1,
                                minWidth: 0,
                            }}>
                                {data.contact.email}
                            </span>

                            {!hasCursor && (
                                <a href={`mailto:${data.contact.email}`} style={touchPillStyle}>
                                    SEND EMAIL
                                </a>
                            )}

                            {hasCursor && (
                                <a
                                    href={`mailto:${data.contact.email}`}
                                    aria-label="Send Email"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#000',
                                        color: '#fff',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        letterSpacing: '1px',
                                        textDecoration: 'none',
                                        borderRadius: '12px',
                                        transform: emailHovered ? 'translateX(0%)' : 'translateX(-100%)',
                                        pointerEvents: emailHovered ? 'auto' : 'none',
                                        transition: 'transform 0.35s ease',
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                    }}
                                >
                                    SEND EMAIL
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Social Media Grid */}
                    <div style={{
                        border: '1.5px solid #000', borderRadius: '14px', padding: '12px 14px',
                        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px',
                        boxSizing: 'border-box',
                        overflow: 'visible',
                    }}>
                        {/* Facebook */}
                        <Link
                            href={data.socials.facebook || '#'}
                            target="_blank" rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('facebook')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: hoveredSocial === 'facebook' ? '1px solid transparent' : '1px solid #e5e5e5',
                                borderRadius: '12px', textDecoration: 'none',
                                background: hoveredSocial === 'facebook' ? '#1877F2' : '#fff',
                                transform: hasCursor && hoveredSocial === 'facebook' ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hasCursor && hoveredSocial === 'facebook' ? '0 8px 20px rgba(0,0,0,0.12)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'facebook' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'facebook' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>Facebook</span>
                        </Link>

                        {/* Instagram */}
                        <Link
                            href={data.socials.instagram || '#'}
                            target="_blank" rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('instagram')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: 'none',
                                borderRadius: '12px', textDecoration: 'none',
                                overflow: 'hidden',
                                background: hoveredSocial === 'instagram' ? 'linear-gradient(to right, #8134af, #dd2a7b, #f58529)' : '#fff',
                                transform: hasCursor && hoveredSocial === 'instagram' ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hoveredSocial === 'instagram' ? hasCursor ? '0 8px 20px rgba(0,0,0,0.12)' : 'none' : 'inset 0 0 0 1px #e5e5e5',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease'
                            }}
                        >
                            <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transition: 'all 0.3s ease' }}>
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
                            target="_blank" rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('youtube')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: hoveredSocial === 'youtube' ? '1px solid transparent' : '1px solid #e5e5e5',
                                borderRadius: '12px', textDecoration: 'none',
                                background: hoveredSocial === 'youtube' ? '#FF0000' : '#fff',
                                transform: hasCursor && hoveredSocial === 'youtube' ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hasCursor && hoveredSocial === 'youtube' ? '0 8px 20px rgba(0,0,0,0.12)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'youtube' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'youtube' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>YouTube</span>
                        </Link>

                        {/* LinkedIn */}
                        <Link
                            href={data.socials.linkedin || '#'}
                            target="_blank" rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('linkedin')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: hoveredSocial === 'linkedin' ? '1px solid transparent' : '1px solid #e5e5e5',
                                borderRadius: '12px', textDecoration: 'none',
                                background: hoveredSocial === 'linkedin' ? '#0A66C2' : '#fff',
                                transform: hasCursor && hoveredSocial === 'linkedin' ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hasCursor && hoveredSocial === 'linkedin' ? '0 8px 20px rgba(0,0,0,0.12)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'linkedin' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'linkedin' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>LinkedIn</span>
                        </Link>
                    </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────────
                    RIGHT CARD — Rotating Content Card
                    FIX: Fixed height + position:absolute on inner content
                    so the card NEVER resizes when slides change.
                ───────────────────────────────────────────────────────────────── */}
                <div
                    className="card opportunities-card"
                    onMouseEnter={() => { if (hasCursor) setHoveredOpportunities(true); }}
                    onMouseLeave={() => setHoveredOpportunities(false)}
                    style={{
                        flex: '1 1 240px',
                        borderRadius: '24px',
                        border: '1.5px solid #000',
                        background: '#fff',
                        boxSizing: 'border-box',
                        /* overflow:hidden clips the absolutely-positioned slide content */
                        overflow: 'hidden',
                        /* Fixed height — card never grows or shrinks between slides */
                        height: '290px',
                        /* position:relative is the anchor for the absolute inner div */
                        position: 'relative',
                        transform: hasCursor && hoveredOpportunities ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: hasCursor && hoveredOpportunities ? '0 12px 32px rgba(0,0,0,0.18)' : 'none',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'default',
                    }}
                >
                    {/*
                        Animated content wrapper.
                        position:absolute + inset:0 makes it fill the fixed-height parent
                        exactly — no height negotiation, no layout shift.
                        Only opacity and translateY are animated (no layout properties).
                    */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            padding: '28px 26px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: displayedSlide.type === 'greeting' ? 'center' : 'flex-start',
                            alignItems: displayedSlide.type === 'greeting' ? 'center' : 'flex-start',
                            /* Animate only opacity + translateY — zero layout impact */
                            opacity: visible ? 1 : 0,
                            transform: visible
                                ? 'translateY(0px)'
                                : 'translateY(8px)',
                            transition: 'opacity 0.38s cubic-bezier(0.4, 0, 0.2, 1), transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
                            willChange: 'opacity, transform',
                        }}
                    >
                        {displayedSlide.type === 'greeting' ? (
                            /* ── GREETING SLIDE ── */
                            <p style={{
                                fontSize: 'clamp(18px, 3vw, 24px)',
                                fontWeight: 800,
                                color: '#000',
                                margin: 0,
                                letterSpacing: '-0.5px',
                                textAlign: 'center',
                                lineHeight: 1.2,
                            }}>
                                GLAD YOU&apos;RE HERE!
                            </p>
                        ) : (
                            /* ── CONTENT SLIDES ── */
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>

                                {/* Label */}
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '1.8px',
                                    color: '#999',
                                    textTransform: 'uppercase',
                                    lineHeight: 1,
                                }}>
                                    {(displayedSlide as Extract<Slide, { type: 'content' }>).label}
                                </span>

                                {/* Title */}
                                <p style={{
                                    fontSize: 'clamp(14px, 1.8vw, 17px)',
                                    fontWeight: 800,
                                    color: '#000',
                                    margin: 0,
                                    lineHeight: 1.3,
                                    letterSpacing: '-0.3px',
                                }}>
                                    {(displayedSlide as Extract<Slide, { type: 'content' }>).title}
                                </p>

                                {/* Divider */}
                                <div style={{
                                    width: '32px',
                                    height: '1.5px',
                                    background: '#e0e0e0',
                                    borderRadius: '2px',
                                    margin: '2px 0',
                                    flexShrink: 0,
                                }} />

                                {/* Description */}
                                <p style={{
                                    fontSize: 'clamp(11px, 1.3vw, 12.5px)',
                                    color: '#666',
                                    margin: 0,
                                    lineHeight: 1.65,
                                    fontWeight: 400,
                                }}>
                                    {(displayedSlide as Extract<Slide, { type: 'content' }>).description}
                                </p>

                                {/* Details (Work Setup slide only) */}
                                {(displayedSlide as Extract<Slide, { type: 'content' }>).details && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0',
                                        marginTop: '4px',
                                        borderTop: '1px solid #f0f0f0',
                                        paddingTop: '10px',
                                        width: '100%',
                                    }}>
                                        {(displayedSlide as Extract<Slide, { type: 'content' }>).details!.map((detail, i, arr) => (
                                            <div
                                                key={detail.label}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '7px 0',
                                                    borderBottom: i < arr.length - 1 ? '1px solid #f5f5f5' : 'none',
                                                    gap: '12px',
                                                }}
                                            >
                                                <span style={{
                                                    fontSize: '10px',
                                                    fontWeight: 600,
                                                    color: '#aaa',
                                                    letterSpacing: '1px',
                                                    textTransform: 'uppercase',
                                                    flexShrink: 0,
                                                    lineHeight: 1,
                                                }}>
                                                    {detail.label}
                                                </span>
                                                <span style={{
                                                    fontSize: '11.5px',
                                                    fontWeight: 600,
                                                    color: '#111',
                                                    textAlign: 'right',
                                                    lineHeight: 1.3,
                                                }}>
                                                    {detail.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {/* ── END RIGHT CARD ── */}

            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .profile-hero {
                        display: grid !important;
                        grid-template-columns: 90px 1fr !important;
                        column-gap: 14px !important;
                        row-gap: 16px !important;
                        align-items: start !important;
                    }
                    .hero-img-container {
                        grid-column: 1 !important;
                        grid-row: 1 !important;
                        width: 90px !important;
                        height: 90px !important;
                        border-radius: 20px !important;
                        flex-shrink: 0 !important;
                        align-self: flex-start !important;
                    }
                    .hero-info {
                        grid-column: 2 !important;
                        grid-row: 1 !important;
                        width: 100% !important;
                        min-width: 0 !important;
                        flex: none !important;
                    }
                    .hero-info h1 {
                        font-size: 26px !important;
                        letter-spacing: -0.5px !important;
                        line-height: 1.1 !important;
                    }
                    .hero-buttons {
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 10px !important;
                        width: calc(100% + 104px) !important;
                        margin-left: -104px !important;
                    }
                    .cv-button {
                        width: 100% !important;
                        justify-content: center !important;
                        display: flex !important;
                        align-items: center !important;
                        text-align: center !important;
                    }
                    .github-btn {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                    .hero-cards-wrapper {
                        grid-column: 1 / -1 !important;
                        grid-row: 3 !important;
                        width: 100% !important;
                        flex: none !important;
                        flex-direction: column !important;
                        gap: 12px !important;
                        margin-top: -8px !important;
                    }
                    .contact-card, .opportunities-card {
                        width: 100% !important;
                        flex: none !important;
                        /* Keep a stable fixed height on mobile too — no auto sizing */
                        height: 290px !important;
                        padding: 0 !important;
                    }
                }
            `}</style>
        </section>
    );
};
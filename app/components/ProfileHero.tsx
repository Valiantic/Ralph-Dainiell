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
    { type: 'greeting', duration: 2000 },
    {
        type: 'content',
        label: 'STUDENT DEVELOPER',
        title: 'Building My Skills in Native iOS Development',
        description: 'Learning Swift, SwiftUI, app structure, and clean UI design through consistent practice and portfolio projects.',
        duration: 4000,
    },
    {
        type: 'content',
        label: 'CAREER DIRECTION',
        title: 'Open to Voluntary OJT and Learning Opportunities',
        description: 'Available for voluntary OJT, internships, and beginner-friendly opportunities where I can learn, contribute, and grow.',
        duration: 4000,
    },
    {
        type: 'content',
        label: 'WORK SETUP',
        title: 'Flexible for Hybrid, Remote, or On-Site Setup',
        description: 'Ready for hybrid, remote, or on-site opportunities with personal devices prepared for learning and development tasks.',
        details: [
            { label: 'Device', value: 'Acer Helios 16 / MacBook Neo' },
            { label: 'Setup', value: 'Hybrid / Remote / On-Site' },
            { label: 'Availability', value: 'Voluntary OJT / Internship / Learning Opportunities' },
        ],
        duration: 4000,
    },
    {
        type: 'content',
        label: 'LEARNING JOURNEY',
        title: 'Learning With Consistency and Purpose',
        description: 'Continuously improving through hands-on practice, portfolio development, and focused learning in iOS development.',
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
    const [isPaused, setIsPaused] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
    const [contentLifted, setContentLifted] = useState(false);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const elapsedRef = useRef(0);
    const startTimeRef = useRef<number>(0);
    const cardRef = useRef<HTMLDivElement>(null);

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
        if (isPaused) {
            if (timerRef.current) clearTimeout(timerRef.current);
            elapsedRef.current += Date.now() - startTimeRef.current;
            return;
        }

        const currentSlide = SLIDES[slideIndex];
        const remaining = currentSlide.duration - elapsedRef.current;
        startTimeRef.current = Date.now();

        timerRef.current = setTimeout(() => {
            setVisible(false);
            setTimeout(() => {
                const next = (slideIndex + 1) % SLIDES.length;
                elapsedRef.current = 0;
                setSlideIndex(next);
                setDisplayedSlide(SLIDES[next]);
                setVisible(true);
            }, 440);
        }, remaining > 0 ? remaining : 0);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [slideIndex, isPaused]);

    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setCursorPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleOpportunitiesEnter = () => {
        if (hasCursor) {
            setHoveredOpportunities(true);
            setIsPaused(true);
            setContentLifted(true);
        }
    };

    const handleOpportunitiesLeave = () => {
        setHoveredOpportunities(false);
        setIsPaused(false);
        setContentLifted(false);
    };

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
            flexWrap: 'wrap',
        }}>

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
                border: '1.5px solid #000',
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

            <div className="hero-info" style={{
                flex: '1 1 300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                minWidth: '300px',
            }}>
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
                            fontSize: '15px', height: '52px', boxSizing: 'border-box',
                        }}
                    >
                        <GoFileZip size={18} color="#fff" />
                        Download CV
                    </a>
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
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24"
                            fill={hoveredGithub ? '#fff' : '#000'}
                            style={{ transition: 'fill 0.3s ease', flexShrink: 0 }}>
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>

            <div
                className="hero-cards-wrapper"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    flex: '1 1 600px',
                }}
            >

                <div
                    className="no-lift contact-card"
                    onMouseEnter={() => { if (hasCursor) setHoveredContactCard(true); }}
                    onMouseLeave={() => setHoveredContactCard(false)}
                    style={{
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        borderRadius: '24px',
                        border: '1.5px solid #000',
                        background: '#fff',
                        boxSizing: 'border-box',
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
                        <div style={{
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
                        }}>
                            <div style={{ width: '24px', height: '24px', position: 'relative', flexShrink: 0 }}>
                                <Image src="/Images/Icons/email icon.png" alt="Email" fill style={{ objectFit: 'contain' }} />
                            </div>
                            <span style={{
                                fontSize: '13px', fontWeight: 700,
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                flex: 1, minWidth: 0,
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
                                        position: 'absolute', inset: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: '#000', color: '#fff',
                                        fontSize: '12px', fontWeight: 700, letterSpacing: '1px',
                                        textDecoration: 'none', borderRadius: '12px',
                                        transform: emailHovered ? 'translateX(0%)' : 'translateX(-100%)',
                                        pointerEvents: emailHovered ? 'auto' : 'none',
                                        transition: 'transform 0.35s ease',
                                        cursor: 'pointer', userSelect: 'none',
                                    }}
                                >
                                    SEND EMAIL
                                </a>
                            )}
                        </div>
                    </div>

                    <div style={{
                        border: '1.5px solid #000',
                        borderRadius: '14px',
                        padding: '12px 14px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '8px',
                        boxSizing: 'border-box',
                    }}>
                        <Link href={data.socials.facebook || '#'} target="_blank" rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('facebook')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: hoveredSocial === 'facebook' ? '1px solid transparent' : '1px solid #e5e5e5',
                                borderRadius: '12px', textDecoration: 'none',
                                background: hoveredSocial === 'facebook' ? '#1877F2' : '#fff',
                                transform: hasCursor && hoveredSocial === 'facebook' ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hasCursor && hoveredSocial === 'facebook' ? '0 8px 20px rgba(0,0,0,0.12)' : 'none',
                                transition: 'all 0.3s ease',
                            }}>
                            <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'facebook' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'facebook' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>Facebook</span>
                        </Link>

                        <Link href={data.socials.instagram || '#'} target="_blank" rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('instagram')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: 'none', borderRadius: '12px', textDecoration: 'none', overflow: 'hidden',
                                background: hoveredSocial === 'instagram' ? 'linear-gradient(to right, #8134af, #dd2a7b, #f58529)' : '#fff',
                                transform: hasCursor && hoveredSocial === 'instagram' ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hoveredSocial === 'instagram' ? hasCursor ? '0 8px 20px rgba(0,0,0,0.12)' : 'none' : 'inset 0 0 0 1px #e5e5e5',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                            }}>
                            <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transition: 'all 0.3s ease' }}>
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke={hoveredSocial === 'instagram' ? '#fff' : '#555'} strokeWidth="2" fill="none"/>
                                    <circle cx="12" cy="12" r="4" stroke={hoveredSocial === 'instagram' ? '#fff' : '#555'} strokeWidth="2" fill="none"/>
                                    <circle cx="17.5" cy="6.5" r="1.5" fill={hoveredSocial === 'instagram' ? '#fff' : '#555'}/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'instagram' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>Instagram</span>
                        </Link>

                        <Link href={data.socials.youtube || '#'} target="_blank" rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('youtube')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: hoveredSocial === 'youtube' ? '1px solid transparent' : '1px solid #e5e5e5',
                                borderRadius: '12px', textDecoration: 'none',
                                background: hoveredSocial === 'youtube' ? '#FF0000' : '#fff',
                                transform: hasCursor && hoveredSocial === 'youtube' ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hasCursor && hoveredSocial === 'youtube' ? '0 8px 20px rgba(0,0,0,0.12)' : 'none',
                                transition: 'all 0.3s ease',
                            }}>
                            <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'youtube' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'youtube' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>YouTube</span>
                        </Link>

                        <Link href={data.socials.linkedin || '#'} target="_blank" rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('linkedin')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                                border: hoveredSocial === 'linkedin' ? '1px solid transparent' : '1px solid #e5e5e5',
                                borderRadius: '12px', textDecoration: 'none',
                                background: hoveredSocial === 'linkedin' ? '#0A66C2' : '#fff',
                                transform: hasCursor && hoveredSocial === 'linkedin' ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hasCursor && hoveredSocial === 'linkedin' ? '0 8px 20px rgba(0,0,0,0.12)' : 'none',
                                transition: 'all 0.3s ease',
                            }}>
                            <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'linkedin' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'linkedin' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>LinkedIn</span>
                        </Link>
                    </div>
                </div>

                <div
                    ref={cardRef}
                    className="card opportunities-card"
                    onMouseEnter={handleOpportunitiesEnter}
                    onMouseLeave={handleOpportunitiesLeave}
                    onMouseMove={handleCardMouseMove}
                    style={{
                        borderRadius: '24px',
                        border: '1.5px solid #000',
                        background: '#fff',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        position: 'relative',
                        transform: hasCursor && hoveredOpportunities ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: hasCursor && hoveredOpportunities
                            ? '0 12px 32px rgba(0,0,0,0.14), inset 0 0 0 0.5px rgba(0,0,0,0.06)'
                            : 'none',
                        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                        cursor: 'default',
                    }}
                >
                    <svg
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            zIndex: 0,
                            opacity: hoveredOpportunities ? 0.045 : 0,
                            transition: 'opacity 0.5s ease',
                        }}
                    >
                        <defs>
                            <pattern id="dotgrid" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                                <circle cx="1.5" cy="1.5" r="1.5" fill="#000" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dotgrid)" />
                    </svg>

                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none',
                            zIndex: 1,
                            borderRadius: '22px',
                            opacity: hasCursor && hoveredOpportunities ? 1 : 0,
                            background: `radial-gradient(ellipse 180px 140px at ${cursorPos.x}% ${cursorPos.y}%, rgba(0,0,0,0.055) 0%, transparent 70%)`,
                            transition: 'opacity 0.4s ease',
                        }}
                    />

                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none',
                            zIndex: 2,
                            borderRadius: '22px',
                            opacity: hasCursor && hoveredOpportunities ? 1 : 0,
                            background: `radial-gradient(ellipse 90px 70px at ${cursorPos.x}% ${cursorPos.y}%, rgba(255,255,255,0.55) 0%, transparent 65%)`,
                            transition: 'opacity 0.35s ease',
                        }}
                    />

                    <div
                        className="slide-inner"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            padding: '28px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 3,
                            opacity: visible ? 1 : 0,
                            transform: visible
                                ? contentLifted
                                    ? 'translateY(-4px) scale(1.012)'
                                    : 'translateY(0px) scale(1)'
                                : 'translateY(11px) scale(0.965)',
                            filter: visible ? 'blur(0px)' : 'blur(2px)',
                            transition: 'opacity 0.44s cubic-bezier(0.4,0,0.2,1), transform 0.44s cubic-bezier(0.4,0,0.2,1), filter 0.44s cubic-bezier(0.4,0,0.2,1)',
                            willChange: 'opacity, transform, filter',
                        }}
                    >
                        {displayedSlide.type === 'greeting' ? (

                            <p style={{
                                fontSize: 'clamp(20px, 2.6vw, 27px)',
                                fontWeight: 800,
                                color: '#000',
                                margin: 0,
                                letterSpacing: '-0.6px',
                                textAlign: 'center',
                                lineHeight: 1.2,
                            }}>
                                GLAD YOU'RE HERE!
                            </p>

                        ) : (

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px',
                                width: '100%',
                                maxWidth: '260px',
                                textAlign: 'center',
                            }}>
                                <span style={{
                                    fontSize: '9px',
                                    fontWeight: 700,
                                    letterSpacing: '2.2px',
                                    color: '#b0b0b0',
                                    textTransform: 'uppercase',
                                    lineHeight: 1,
                                    textAlign: 'center',
                                }}>
                                    {(displayedSlide as Extract<Slide, { type: 'content' }>).label}
                                </span>

                                <p style={{
                                    fontSize: 'clamp(13px, 1.45vw, 16px)',
                                    fontWeight: 800,
                                    color: '#000',
                                    margin: 0,
                                    lineHeight: 1.3,
                                    letterSpacing: '-0.4px',
                                    textAlign: 'center',
                                }}>
                                    {(displayedSlide as Extract<Slide, { type: 'content' }>).title}
                                </p>

                                <div style={{
                                    width: '28px',
                                    height: '1.5px',
                                    background: '#e2e2e2',
                                    borderRadius: '2px',
                                    flexShrink: 0,
                                }} />

                                <p style={{
                                    fontSize: 'clamp(10.5px, 0.95vw, 12px)',
                                    color: '#787878',
                                    margin: 0,
                                    lineHeight: 1.65,
                                    fontWeight: 400,
                                    textAlign: 'center',
                                }}>
                                    {(displayedSlide as Extract<Slide, { type: 'content' }>).description}
                                </p>

                                {(displayedSlide as Extract<Slide, { type: 'content' }>).details && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginTop: '2px',
                                        borderTop: '1px solid #efefef',
                                        paddingTop: '10px',
                                        width: '100%',
                                        gap: 0,
                                    }}>
                                        {(displayedSlide as Extract<Slide, { type: 'content' }>).details!.map((detail, i, arr) => (
                                            <div key={detail.label} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '5px 0',
                                                borderBottom: i < arr.length - 1 ? '1px solid #f6f6f6' : 'none',
                                                gap: '10px',
                                            }}>
                                                <span style={{
                                                    fontSize: '9px',
                                                    fontWeight: 600,
                                                    color: '#c0c0c0',
                                                    letterSpacing: '1px',
                                                    textTransform: 'uppercase',
                                                    flexShrink: 0,
                                                    lineHeight: 1,
                                                    textAlign: 'left',
                                                }}>
                                                    {detail.label}
                                                </span>
                                                <span style={{
                                                    fontSize: '10px',
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
                        display: grid !important;
                        grid-template-columns: 1fr !important;
                        gap: 12px !important;
                        margin-top: -8px !important;
                    }
                    .contact-card {
                        width: 100% !important;
                        height: auto !important;
                        padding: 14px !important;
                    }
                    .opportunities-card {
                        width: 100% !important;
                        height: 230px !important;
                    }
                    .slide-inner {
                        padding: 20px !important;
                    }
                }

                @media (max-width: 480px) {
                    .opportunities-card {
                        height: 220px !important;
                    }
                    .contact-card {
                        padding: 12px !important;
                    }
                    .slide-inner {
                        padding: 18px !important;
                    }
                }

                @media (max-width: 375px) {
                    .opportunities-card {
                        height: 210px !important;
                    }
                    .contact-card {
                        padding: 10px !important;
                    }
                    .slide-inner {
                        padding: 16px !important;
                    }
                }

            `}</style>
        </section>
    );
};
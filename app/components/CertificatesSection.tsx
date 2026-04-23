'use client';

import { Certificate } from '../types/portfolio';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { createPortal } from 'react-dom';

interface CertificatesSectionProps {
    certificates: Certificate[];
}

const getIssuerColor = (issuer: string) => {
    if (issuer.toLowerCase().includes('datacamp')) return '#03EF62';
    if (issuer.toLowerCase().includes('hackerrank')) return '#2EC866';
    if (issuer.toLowerCase().includes('cisco')) return '#0a84ff';
    return '#636366';
};

export const CertificatesSection = ({ certificates }: CertificatesSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [hasFineCursor, setHasFineCursor] = useState(false);
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Detect fine pointer (mouse) vs coarse (touch)
    useEffect(() => {
        const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
        setHasFineCursor(mq.matches);
        const handler = (e: MediaQueryListEvent) => setHasFineCursor(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // Scroll-in animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setAtStart(scrollLeft <= 10);
            setAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition();
            return () => el.removeEventListener('scroll', checkScrollPosition);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedCert]);

    // Apple-style carousel scroll
    const animFrameRef = useRef<number | null>(null);
    const isHoveringRef = useRef(false);
    const mouseXRef = useRef(0);

    const handleCarouselMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseXRef.current = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    };

    const handleCarouselMouseEnter = () => {
        if (!hasFineCursor) return;
        isHoveringRef.current = true;
        const tick = () => {
            if (!isHoveringRef.current || !scrollRef.current) return;
            const x = mouseXRef.current;
            const deadZone = 0.25;
            let speed = 0;
            if (x > deadZone) speed = ((x - deadZone) / (1 - deadZone)) * 8;
            else if (x < -deadZone) speed = ((x + deadZone) / (1 - deadZone)) * 8;
            if (speed !== 0) scrollRef.current.scrollLeft += speed;
            animFrameRef.current = requestAnimationFrame(tick);
        };
        animFrameRef.current = requestAnimationFrame(tick);
    };

    const handleCarouselMouseLeave = () => {
        isHoveringRef.current = false;
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -370 : 370,
                behavior: 'smooth'
            });
        }
    };

    const showNav = !hasFineCursor && certificates.length > 3;

    // Compute section transform: scroll-in takes priority, then hover lift
    const getSectionTransform = () => {
        if (!visible) return 'translateY(32px)';
        if (hovered) return 'translateY(-2px)';
        return 'translateY(0px)';
    };

    return (
        <section
            ref={sectionRef}
            className="card"
            onMouseEnter={() => { if (visible) setHovered(true); }}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: '100%',
                background: '#fff',
                opacity: visible ? 1 : 0,
                transform: getSectionTransform(),
                boxShadow: hovered && visible ? '0 8px 24px rgba(0,0,0,0.06)' : 'none',
                transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease',
            }}
        >
            {/* HEADER */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '32px', position: 'relative' }}>
                    <Image src="/Images/Icons/certificate icon.png" alt="Certificates" fill style={{ objectFit: 'contain' }} />
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Certificates</h2>
            </div>

            {/* MOBILE LIST VIEW */}
            {isMobile ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {certificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            onClick={() => setSelectedCert(cert)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '14px 4px',
                                borderBottom: index < certificates.length - 1 ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
                                cursor: 'pointer', background: '#fff',
                            }}
                        >
                            <div style={{
                                width: '8px', height: '8px', borderRadius: '50%',
                                background: getIssuerColor(cert.issuer), flexShrink: 0
                            }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '15px', fontWeight: 700, color: '#000', lineHeight: 1.3 }}>
                                    {cert.title}
                                </div>
                                <div style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>
                                    {cert.issuer}
                                </div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </div>
                    ))}
                </div>
            ) : (
                /* DESKTOP / TABLET SCROLL ROW */
                <div
                    style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}
                    onMouseMove={hasFineCursor ? handleCarouselMouseMove : undefined}
                    onMouseEnter={hasFineCursor ? handleCarouselMouseEnter : undefined}
                    onMouseLeave={hasFineCursor ? handleCarouselMouseLeave : undefined}
                >
                    {showNav && (
                        <button onClick={() => scroll('left')} style={{
                            background: 'none', border: 'none', zIndex: 2,
                            opacity: atStart ? 0.2 : 1, cursor: 'pointer'
                        }}>
                            <FiChevronLeft size={32} />
                        </button>
                    )}

                    <div
                        ref={scrollRef}
                        style={{
                            display: 'flex',
                            gap: '16px',
                            overflowX: 'auto',
                            padding: '10px 4px',
                            flex: 1,
                            scrollSnapType: 'x mandatory',
                            cursor: hasFineCursor ? 'default' : 'grab',
                            // Hide scrollbar cross-browser
                            scrollbarWidth: 'none' as React.CSSProperties['scrollbarWidth'],
                        } as React.CSSProperties}
                    >
                        {certificates.map((cert) => (
                            <div
                                key={cert.id}
                                onClick={() => setSelectedCert(cert)}
                                style={{
                                    minWidth: 'clamp(260px, 75vw, 340px)',
                                    borderRadius: '20px',
                                    border: '0.5px solid rgba(0,0,0,0.1)',
                                    background: '#fff',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    scrollSnapAlign: 'start',
                                    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                }}
                            >
                                <div style={{ position: 'relative', height: '220px', background: '#f2f2f7' }}>
                                    <Image
                                        src={cert.imageUrl}
                                        alt={cert.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        unoptimized
                                    />
                                </div>
                                <div style={{
                                    padding: '12px 14px', display: 'flex',
                                    alignItems: 'center', gap: '8px',
                                    borderTop: '0.5px solid rgba(0,0,0,0.06)'
                                }}>
                                    <div style={{
                                        width: '8px', height: '8px', borderRadius: '50%',
                                        background: getIssuerColor(cert.issuer), flexShrink: 0
                                    }} />
                                    <span style={{ fontSize: '13px', fontWeight: 600, flex: 1, lineHeight: 1.3 }}>
                                        {cert.title}
                                    </span>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 600,
                                        border: '1.5px solid #000',
                                        padding: '4px 10px', borderRadius: '20px',
                                        whiteSpace: 'nowrap', flexShrink: 0
                                    }}>
                                        {cert.issuer}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {showNav && (
                        <button onClick={() => scroll('right')} style={{
                            background: 'none', border: 'none', zIndex: 2,
                            opacity: atEnd ? 0.2 : 1, cursor: 'pointer'
                        }}>
                            <FiChevronRight size={32} />
                        </button>
                    )}
                </div>
            )}

            {/* PORTAL MODAL */}
            {selectedCert && typeof window !== 'undefined' &&
                createPortal(
                    <>
                        <style>{`
                            @keyframes certZoomIn {
                                from { opacity: 0; transform: scale(0.92); }
                                to { opacity: 1; transform: scale(1); }
                            }
                            @keyframes certFadeIn {
                                from { opacity: 0; }
                                to { opacity: 1; }
                            }
                        `}</style>
                        <div
                            onClick={() => setSelectedCert(null)}
                            style={{
                                position: 'fixed', top: 0, left: 0,
                                width: '100vw', height: '100vh',
                                background: 'rgba(0,0,0,0.55)',
                                backdropFilter: 'blur(12px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                zIndex: 9999, padding: '16px', boxSizing: 'border-box',
                                animation: 'certFadeIn 0.25s ease',
                            }}
                        >
                            <div
                                onClick={e => e.stopPropagation()}
                                style={{
                                    background: '#fff', borderRadius: '28px',
                                    maxWidth: '780px', width: '100%',
                                    maxHeight: 'calc(100vh - 32px)',
                                    display: 'flex', flexDirection: 'column',
                                    overflow: 'hidden', position: 'relative',
                                    boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
                                    animation: 'certZoomIn 0.25s ease forwards',
                                }}
                            >
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.15)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
                                    style={{
                                        position: 'absolute', top: '16px', right: '16px',
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        border: 'none', background: 'rgba(0,0,0,0.06)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', zIndex: 10, flexShrink: 0,
                                        transition: 'background 0.2s ease',
                                    }}
                                >
                                    <FiX size={16} />
                                </button>

                                <div style={{
                                    padding: '20px 24px 16px',
                                    display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0
                                }}>
                                    <div style={{
                                        width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                                        background: getIssuerColor(selectedCert.issuer)
                                    }} />
                                    <div>
                                        <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{selectedCert.title}</h3>
                                        <p style={{ fontSize: '12px', color: '#8e8e93', margin: '2px 0 0' }}>{selectedCert.issuer}</p>
                                    </div>
                                </div>

                                <div style={{
                                    position: 'relative', width: '100%',
                                    flex: '1 1 auto', minHeight: '480px', maxHeight: '70vh',
                                    background: '#f2f2f7',
                                }}>
                                    <Image
                                        src={selectedCert.imageUrl}
                                        alt={selectedCert.title}
                                        fill
                                        style={{ objectFit: 'contain', padding: '24px' }}
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </div>
                    </>,
                    document.getElementById('modal-root')!
                )
            }
        </section>
    );
};

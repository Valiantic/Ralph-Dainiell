'use client';

import { Certificate } from '../types/portfolio';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

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
    const sectionRef = useRef<HTMLElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isHoveredRef = useRef(false);
    const lockedScrollYRef = useRef(0);

    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
    const [isSmartphone, setIsSmartphone] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hasMouse, setHasMouse] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [visible, setVisible] = useState(false);

    const xVal = useMotionValue(0);
    const x = useSpring(xVal, { stiffness: 80, damping: 20, mass: 0.5 });

    const selectedIndex = selectedCert ? certificates.findIndex((cert) => cert.id === selectedCert.id) : -1;
    const canNavigate = certificates.length > 1 && selectedIndex !== -1;
    const isModalOpen = selectedCert !== null;

    const openCertificate = (cert: Certificate) => {
        setSelectedCert(cert);
    };

    const showPreviousCertificate = () => {
        if (!canNavigate) return;
        const previousIndex = selectedIndex === 0 ? certificates.length - 1 : selectedIndex - 1;
        setSelectedCert(certificates[previousIndex]);
    };

    const showNextCertificate = () => {
        if (!canNavigate) return;
        const nextIndex = selectedIndex === certificates.length - 1 ? 0 : selectedIndex + 1;
        setSelectedCert(certificates[nextIndex]);
    };

    useEffect(() => {
        const check = () => {
            setIsSmartphone(window.innerWidth <= 480);
            setIsMobile(window.innerWidth <= 768);
        };

        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
        setHasMouse(mq.matches);

        const handler = (e: MediaQueryListEvent) => {
            setHasMouse(e.matches);
            if (!e.matches) {
                isHoveredRef.current = false;
                setIsHovered(false);
            }
        };

        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

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
        if (!hasMouse) return;

        const el = sectionRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (!isHoveredRef.current) return;

            e.preventDefault();

            const track = trackRef.current;
            const outer = outerRef.current;
            if (!track || !outer) return;

            const maxX = -(track.scrollWidth - outer.clientWidth);
            const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
            const next = Math.max(maxX, Math.min(0, xVal.get() - delta));

            xVal.set(next);
        };

        el.addEventListener('wheel', onWheel, { passive: false });

        return () => el.removeEventListener('wheel', onWheel);
    }, [hasMouse, xVal]);

    useEffect(() => {
        if (!hasMouse) return;

        const onResize = () => {
            const track = trackRef.current;
            const outer = outerRef.current;
            if (!track || !outer) return;

            const maxX = -(track.scrollWidth - outer.clientWidth);
            if (xVal.get() < maxX) xVal.set(maxX);
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, [hasMouse, xVal]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };

        window.addEventListener('keydown', handler);

        return () => window.removeEventListener('keydown', handler);
    }, []);

    useEffect(() => {
        if (!isModalOpen) return;

        const html = document.documentElement;
        const body = document.body;

        const previousHtmlOverflow = html.style.overflow;
        const previousHtmlOverscrollBehavior = html.style.overscrollBehavior;
        const previousBodyOverflow = body.style.overflow;
        const previousBodyOverscrollBehavior = body.style.overscrollBehavior;
        const previousBodyPosition = body.style.position;
        const previousBodyTop = body.style.top;
        const previousBodyLeft = body.style.left;
        const previousBodyRight = body.style.right;
        const previousBodyWidth = body.style.width;

        lockedScrollYRef.current = window.scrollY;

        html.style.overflow = 'hidden';
        html.style.overscrollBehavior = 'none';
        body.style.overflow = 'hidden';
        body.style.overscrollBehavior = 'none';
        body.style.position = 'fixed';
        body.style.top = `-${lockedScrollYRef.current}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';

        return () => {
            html.style.overflow = previousHtmlOverflow;
            html.style.overscrollBehavior = previousHtmlOverscrollBehavior;
            body.style.overflow = previousBodyOverflow;
            body.style.overscrollBehavior = previousBodyOverscrollBehavior;
            body.style.position = previousBodyPosition;
            body.style.top = previousBodyTop;
            body.style.left = previousBodyLeft;
            body.style.right = previousBodyRight;
            body.style.width = previousBodyWidth;

            window.scrollTo(0, lockedScrollYRef.current);
        };
    }, [isModalOpen]);

    const handleMouseEnter = () => {
        if (hasMouse) {
            isHoveredRef.current = true;
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        isHoveredRef.current = false;
        setIsHovered(false);
    };

    const renderCard = (cert: Certificate) => (
        <div
            key={cert.id}
            className="cert-card"
            onClick={() => openCertificate(cert)}
            style={{
                minWidth: 'clamp(260px, 75vw, 340px)',
                borderRadius: '20px',
                border: '0.5px solid rgba(0,0,0,0.1)',
                background: '#fff',
                cursor: 'pointer',
                overflow: 'hidden',
                flexShrink: 0,
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

            <div
                style={{
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderTop: '0.5px solid rgba(0,0,0,0.06)',
                }}
            >
                <div
                    style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: getIssuerColor(cert.issuer),
                        flexShrink: 0,
                    }}
                />

                <span style={{ fontSize: '13px', fontWeight: 600, flex: 1, lineHeight: 1.3 }}>
                    {cert.title}
                </span>

                <span
                    style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        border: '1.5px solid #000',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                    }}
                >
                    {cert.issuer}
                </span>
            </div>
        </div>
    );

    return (
        <>
            <section
                ref={sectionRef}
                className="card cert-section"
                style={{
                    width: '100%',
                    background: '#fff',
                    opacity: visible ? 1 : 0,
                    transform: visible
                        ? hasMouse && isHovered
                            ? 'translateY(-2px)'
                            : 'translateY(0px)'
                        : 'translateY(32px)',
                    boxShadow: hasMouse && isHovered ? '0 12px 32px rgba(0, 0, 0, 0.13)' : 'none',
                    transition: visible
                        ? 'transform 0.3s ease, box-shadow 0.3s ease'
                        : 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
                    <div style={{ width: '39px', height: '40px', position: 'relative' }}>
                        <Image
                            src="/Images/Icons/certificate icon.png"
                            alt="Certificates"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    <h2 style={{ fontSize: '22px', fontWeight: 700, paddingTop: '2px' }}>
                        Certificates
                    </h2>
                </div>

                {isSmartphone ? (
                    <div
                        className="no-scrollbar"
                        style={{
                            height: '520px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            paddingRight: '2px',
                            boxSizing: 'border-box',
                        }}
                    >
                        {certificates.map((cert) => (
                            <div
                                key={cert.id}
                                className="cert-card"
                                onClick={() => openCertificate(cert)}
                                style={{
                                    width: '100%',
                                    borderRadius: '20px',
                                    border: '0.5px solid rgba(0,0,0,0.1)',
                                    background: '#fff',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    boxSizing: 'border-box',
                                    flexShrink: 0,
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '180px',
                                        background: '#f2f2f7',
                                    }}
                                >
                                    <Image
                                        src={cert.imageUrl}
                                        alt={cert.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        unoptimized
                                    />
                                </div>

                                <div
                                    style={{
                                        padding: '12px 14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        borderTop: '1px solid rgba(0,0,0,0.06)',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: getIssuerColor(cert.issuer),
                                            flexShrink: 0,
                                        }}
                                    />

                                    <span
                                        style={{
                                            fontSize: '13px',
                                            fontWeight: 700,
                                            flex: 1,
                                            lineHeight: 1.3,
                                            color: '#000',
                                            minWidth: 0,
                                        }}
                                    >
                                        {cert.title}
                                    </span>

                                    <span
                                        style={{
                                            fontSize: '10px',
                                            fontWeight: 600,
                                            border: '1.5px solid #000',
                                            padding: '3px 9px',
                                            borderRadius: '20px',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0,
                                            color: '#000',
                                        }}
                                    >
                                        {cert.issuer}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isMobile ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {certificates.map((cert, index) => (
                            <div
                                key={cert.id}
                                className="cert-card"
                                onClick={() => openCertificate(cert)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '14px 4px',
                                    borderBottom: index < certificates.length - 1 ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
                                    cursor: 'pointer',
                                    background: '#fff',
                                }}
                            >
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: getIssuerColor(cert.issuer),
                                        flexShrink: 0,
                                    }}
                                />

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#000', lineHeight: 1.3 }}>
                                        {cert.title}
                                    </div>

                                    <div style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>
                                        {cert.issuer}
                                    </div>
                                </div>

                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </div>
                        ))}
                    </div>
                ) : hasMouse ? (
                    <div
                        ref={outerRef}
                        style={{
                            overflow: 'hidden',
                            padding: '10px 4px 14px',
                            cursor: isHovered ? 'grab' : 'default',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                        }}
                    >
                        <motion.div
                            ref={trackRef}
                            style={{ x, display: 'flex', gap: '16px' }}
                        >
                            {certificates.map(renderCard)}
                        </motion.div>
                    </div>
                ) : (
                    <div
                        className="no-scrollbar"
                        style={{
                            display: 'flex',
                            gap: '16px',
                            overflowX: 'auto',
                            padding: '10px 4px 14px',
                            scrollSnapType: 'x mandatory',
                        }}
                    >
                        {certificates.map((cert) => (
                            <div
                                key={cert.id}
                                className="cert-card"
                                onClick={() => openCertificate(cert)}
                                style={{
                                    minWidth: 'clamp(260px, 75vw, 340px)',
                                    borderRadius: '20px',
                                    border: '0.5px solid rgba(0,0,0,0.1)',
                                    background: '#fff',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    scrollSnapAlign: 'start',
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

                                <div
                                    style={{
                                        padding: '12px 14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        borderTop: '0.5px solid rgba(0,0,0,0.06)',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: getIssuerColor(cert.issuer),
                                            flexShrink: 0,
                                        }}
                                    />

                                    <span style={{ fontSize: '13px', fontWeight: 600, flex: 1, lineHeight: 1.3 }}>
                                        {cert.title}
                                    </span>

                                    <span
                                        style={{
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            border: '1.5px solid #000',
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {cert.issuer}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedCert && typeof window !== 'undefined' &&
                    createPortal(
                        <div onClick={() => setSelectedCert(null)} className="modal-overlay">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCert(null);
                                }}
                                className="close-btn modal-control-btn"
                                aria-label="Close certificate preview"
                            >
                                <FiX size={22} />
                            </button>

                            <div onClick={(e) => e.stopPropagation()} className="modal-stage">
                                <div className="modal-content">
                                    <div className="modal-image">
                                        <Image
                                            src={selectedCert.imageUrl}
                                            alt={selectedCert.title}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            unoptimized
                                        />
                                    </div>
                                </div>

                                {canNavigate && (
                                    <div className="modal-actions">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                showPreviousCertificate();
                                            }}
                                            className="modal-action-btn"
                                            aria-label="Previous certificate"
                                        >
                                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M15 18L9 12L15 6" />
                                            </svg>
                                        </button>

                                        <div className="modal-action-divider" />

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                showNextCertificate();
                                            }}
                                            className="modal-action-btn"
                                            aria-label="Next certificate"
                                        >
                                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 18L15 12L9 6" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>,
                        document.getElementById('modal-root')!
                    )
                }

                <style jsx>{`
                    .cert-card {
                        transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                                    box-shadow 0.28s cubic-bezier(0.22, 1, 0.36, 1);
                        will-change: transform;
                    }

                    @media (any-hover: hover) and (any-pointer: fine) {
                        .cert-card:hover {
                            transform: translateY(-10px);
                            box-shadow: 0 18px 38px rgba(0, 0, 0, 0.14);
                        }
                    }

                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }

                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }

                    .modal-overlay {
                        position: fixed;
                        inset: 0;
                        width: 100vw;
                        height: 100vh;
                        background: rgba(0, 0, 0, 0.78);
                        backdrop-filter: blur(14px);
                        -webkit-backdrop-filter: blur(14px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                        padding: 54px 32px;
                        box-sizing: border-box;
                        overflow: hidden;
                        overscroll-behavior: none;
                        touch-action: none;
                        animation: fadeIn 0.25s ease;
                    }

                    .modal-stage {
                        width: min(960px, 100%);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 18px;
                        animation: zoomIn 0.25s ease forwards;
                        touch-action: auto;
                    }

                    .modal-content {
                        width: 100%;
                        height: min(72vh, 680px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                    }

                    .modal-image {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        background: transparent;
                    }

                    .modal-control-btn {
                        border: 1px solid rgba(255, 255, 255, 0.12);
                        background: rgba(24, 24, 24, 0.72);
                        color: #fff;
                        backdrop-filter: blur(16px);
                        -webkit-backdrop-filter: blur(16px);
                        box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        z-index: 10002;
                        transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease;
                    }

                    .close-btn {
                        position: fixed;
                        top: 22px;
                        right: 24px;
                        width: 44px;
                        height: 44px;
                        border-radius: 14px;
                    }

                    .modal-actions {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0;
                        border: 1px solid rgba(255, 255, 255, 0.12);
                        background: rgba(24, 24, 24, 0.72);
                        color: #fff;
                        backdrop-filter: blur(16px);
                        -webkit-backdrop-filter: blur(16px);
                        border-radius: 999px;
                        padding: 6px;
                        box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
                        touch-action: auto;
                    }

                    .modal-action-btn {
                        width: 46px;
                        height: 40px;
                        border: none;
                        background: transparent;
                        color: #fff;
                        border-radius: 999px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: background 0.22s ease, transform 0.22s ease;
                    }

                    .modal-action-divider {
                        width: 1px;
                        height: 22px;
                        background: rgba(255, 255, 255, 0.14);
                        margin: 0 2px;
                    }

                    @media (hover: hover) and (pointer: fine) {
                        .modal-control-btn:hover,
                        .modal-action-btn:hover {
                            background: rgba(255, 255, 255, 0.10);
                        }

                        .close-btn:hover {
                            transform: scale(1.04);
                        }

                        .modal-action-btn:hover {
                            transform: translateY(-1px);
                        }
                    }

                    .modal-control-btn:active,
                    .modal-action-btn:active {
                        transform: scale(0.96);
                    }

                    @media (max-width: 768px) {
                        .modal-overlay {
                            padding: 92px 18px 44px;
                            align-items: center;
                        }

                        .modal-stage {
                            gap: 16px;
                        }

                        .modal-content {
                            height: min(58vh, 520px);
                        }

                        .close-btn {
                            top: 22px;
                            right: 22px;
                            width: 46px;
                            height: 46px;
                            border-radius: 14px;
                        }

                        .modal-actions {
                            padding: 5px;
                        }

                        .modal-action-btn {
                            width: 48px;
                            height: 40px;
                        }
                    }

                    @media (max-width: 480px) {
                        .modal-overlay {
                            padding: 88px 18px 40px;
                        }

                        .modal-content {
                            height: min(50vh, 420px);
                        }

                        .close-btn {
                            top: 20px;
                            right: 20px;
                            width: 44px;
                            height: 44px;
                            border-radius: 14px;
                        }

                        .modal-action-btn {
                            width: 46px;
                            height: 38px;
                        }
                    }

                    @keyframes zoomIn {
                        from {
                            opacity: 0;
                            transform: scale(0.96);
                        }

                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }

                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }

                        to {
                            opacity: 1;
                        }
                    }
                `}</style>
            </section>
        </>
    );
};
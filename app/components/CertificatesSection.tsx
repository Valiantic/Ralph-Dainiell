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
    const sectionRef  = useRef<HTMLElement>(null);
    const outerRef    = useRef<HTMLDivElement>(null);
    const trackRef    = useRef<HTMLDivElement>(null);
    const isHoveredRef = useRef(false);

    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
    const [isMobile,   setIsMobile]   = useState(false);
    const [hasMouse,   setHasMouse]   = useState(false);
    const [isHovered,  setIsHovered]  = useState(false);
    const [visible,    setVisible]    = useState(false);

    // ── Framer Motion values ──────────────────────────────────────────────────
    const xVal = useMotionValue(0);
    const x    = useSpring(xVal, { stiffness: 80, damping: 20, mass: 0.5 });

    // ── Mobile breakpoint ─────────────────────────────────────────────────────
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // ── Mouse / fine-pointer detection ────────────────────────────────────────
    useEffect(() => {
        const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
        setHasMouse(mq.matches);
        const handler = (e: MediaQueryListEvent) => setHasMouse(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // ── Intersection observer (section entrance animation) ────────────────────
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

            const maxX  = -(track.scrollWidth - outer.clientWidth);
            // prefer vertical delta (trackpad / scroll wheel); fall back to horizontal
            const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
            const next  = Math.max(maxX, Math.min(0, xVal.get() - delta));
            xVal.set(next);
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [hasMouse, xVal]);

    // ── Clamp x when window resizes (prevents cards getting lost off-screen) ──
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

    // ── Modal: ESC key ────────────────────────────────────────────────────────
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedCert(null); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    // ── Modal: body scroll lock ───────────────────────────────────────────────
    useEffect(() => {
        document.body.style.overflow = selectedCert ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [selectedCert]);

    // ── Hover handlers — applied at SECTION level ─────────────────────────────
    const handleMouseEnter = () => { isHoveredRef.current = true;  setIsHovered(true);  };
    const handleMouseLeave = () => { isHoveredRef.current = false; setIsHovered(false); };

    // ── Shared card renderer ──────────────────────────────────────────────────
    const renderCard = (cert: Certificate) => (
        <div
            key={cert.id}
            className="cert-card"
            onClick={() => setSelectedCert(cert)}
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

            <div style={{
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderTop: '0.5px solid rgba(0,0,0,0.06)',
            }}>
                <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: getIssuerColor(cert.issuer), flexShrink: 0,
                }} />
                <span style={{ fontSize: '13px', fontWeight: 600, flex: 1, lineHeight: 1.3 }}>
                    {cert.title}
                </span>
                <span style={{
                    fontSize: '11px', fontWeight: 600,
                    border: '1.5px solid #000',
                    padding: '4px 10px', borderRadius: '20px',
                    whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                    {cert.issuer}
                </span>
            </div>
        </div>
    );

    return (
        <>
            <section
                ref={sectionRef}
                className={`card cert-section${visible ? ' cert-visible' : ''}`}
                style={{ width: '100%', background: '#fff' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* ── HEADER ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                    <div style={{ width: '37px', height: '39px', position: 'relative' }}>
                        <Image src="/Images/Icons/certificate icon.png" alt="Certificates" fill style={{ objectFit: 'contain' }} />
                    </div>
                    <h2 style={{ fontSize: '27px', fontWeight: 700 }}>Certificates</h2>
                </div>

                {/* ── MOBILE LIST VIEW — completely unchanged ── */}
                {isMobile ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {certificates.map((cert, index) => (
                            <div
                                key={cert.id}
                                onClick={() => setSelectedCert(cert)}
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
                                <div style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: getIssuerColor(cert.issuer), flexShrink: 0,
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
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </div>
                        ))}
                    </div>

                ) : hasMouse ? (
                    /* ── DESKTOP / MOUSE-DEVICE — framer-motion carousel ── */
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
                    /* ── TOUCH TABLET (no mouse) — native horizontal scroll, no arrows ── */
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
                                }}
                            >
                                <div style={{ position: 'relative', height: '220px', background: '#f2f2f7' }}>
                                    <Image src={cert.imageUrl} alt={cert.title} fill style={{ objectFit: 'cover' }} unoptimized />
                                </div>
                                <div style={{
                                    padding: '12px 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderTop: '0.5px solid rgba(0,0,0,0.06)',
                                }}>
                                    <div style={{
                                        width: '8px', height: '8px', borderRadius: '50%',
                                        background: getIssuerColor(cert.issuer), flexShrink: 0,
                                    }} />
                                    <span style={{ fontSize: '13px', fontWeight: 600, flex: 1, lineHeight: 1.3 }}>
                                        {cert.title}
                                    </span>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 600,
                                        border: '1.5px solid #000',
                                        padding: '4px 10px', borderRadius: '20px',
                                        whiteSpace: 'nowrap', flexShrink: 0,
                                    }}>
                                        {cert.issuer}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── PORTAL MODAL — unchanged ── */}
                {selectedCert && typeof window !== 'undefined' &&
                    createPortal(
                        <div onClick={() => setSelectedCert(null)} className="modal-overlay">
                            <div onClick={e => e.stopPropagation()} className="modal-content">
                                <button onClick={() => setSelectedCert(null)} className="close-btn">
                                    <FiX size={16} />
                                </button>

                                <div className="modal-header">
                                    <div className="dot" style={{ background: getIssuerColor(selectedCert.issuer) }} />
                                    <div>
                                        <h3>{selectedCert.title}</h3>
                                        <p>{selectedCert.issuer}</p>
                                    </div>
                                </div>

                                <div className="modal-image">
                                    <Image
                                        src={selectedCert.imageUrl}
                                        alt={selectedCert.title}
                                        fill
                                        style={{ objectFit: 'contain', padding: '24px' }}
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </div>,
                        document.getElementById('modal-root')!
                    )
                }

                <style jsx>{`
                    /* ── Section entrance animation ── */
                    .cert-section {
                        opacity: 0;
                        transform: translateY(32px);
                        transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                                    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
                    }
                    .cert-section.cert-visible {
                        opacity: 1;
                        transform: translateY(0px);
                    }
                    .cert-section.cert-visible:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
                        transition: transform 0.25s ease, box-shadow 0.25s ease;
                    }

                    /* ── Per-card hover lift ── */
                    .cert-card {
                        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                    }
                    .cert-card:hover {
                        transform: scale(1.035) translateY(-6px);
                    }

                    /* ── Hide scrollbar (touch tablet path) ── */
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

                    /* ── Modal overlay ── */
                    .modal-overlay {
                        position: fixed;
                        top: 0; left: 0;
                        width: 100vw; height: 100vh;
                        background: rgba(0,0,0,0.55);
                        backdrop-filter: blur(12px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                        padding: 16px;
                        box-sizing: border-box;
                        animation: fadeIn 0.25s ease;
                    }

                    .modal-content {
                        background: #fff;
                        border-radius: 28px;
                        max-width: 780px;
                        width: 100%;
                        max-height: calc(100vh - 32px);
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                        position: relative;
                        animation: zoomIn 0.25s ease forwards;
                        box-shadow: 0 30px 80px rgba(0,0,0,0.25);
                    }

                    .close-btn {
                        position: absolute;
                        top: 16px; right: 16px;
                        width: 32px; height: 32px;
                        border-radius: 50%;
                        border: none;
                        background: rgba(0,0,0,0.06);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        z-index: 10;
                        flex-shrink: 0;
                        transition: background 0.2s ease;
                    }
                    .close-btn:hover { background: rgba(0,0,0,0.15); }

                    .modal-header {
                        padding: 20px 24px 16px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        flex-shrink: 0;
                    }
                    .modal-header h3 { font-size: 16px; font-weight: 700; margin: 0; }
                    .modal-header p  { font-size: 12px; color: #8e8e93; margin: 2px 0 0; }

                    .dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

                    .modal-image {
                        position: relative;
                        width: 100%;
                        flex: 1 1 auto;
                        min-height: 480px;
                        max-height: 70vh;
                        background: #f2f2f7;
                    }

                    @keyframes zoomIn {
                        from { opacity: 0; transform: scale(0.92); }
                        to   { opacity: 1; transform: scale(1); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to   { opacity: 1; }
                    }
                `}</style>
            </section>
        </>
    );
};
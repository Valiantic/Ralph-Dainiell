'use client';

import { Certificate } from '../types/portfolio';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
    useInView,
} from 'framer-motion';

interface CertificatesSectionProps {
    certificates: Certificate[];
}

const getIssuerColor = (issuer: string) => {
    if (issuer.toLowerCase().includes('datacamp')) return '#03EF62';
    if (issuer.toLowerCase().includes('hackerrank')) return '#2EC866';
    if (issuer.toLowerCase().includes('cisco')) return '#0a84ff';
    return '#636366';
};

// ─── Card ────────────────────────────────────────────────────────────────────
const CertCard = ({
    cert,
    index,
    onClick,
    hasCursor,
}: {
    cert: Certificate;
    index: number;
    onClick: () => void;
    hasCursor: boolean;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '0px -60px' });

    // Tilt effect (desktop only)
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springX = useSpring(rotateX, { stiffness: 260, damping: 26 });
    const springY = useSpring(rotateY, { stiffness: 260, damping: 26 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!hasCursor || !ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            rotateY.set(((e.clientX - cx) / rect.width) * 10);
            rotateX.set(-((e.clientY - cy) / rect.height) * 10);
        },
        [hasCursor, rotateX, rotateY]
    );

    const handleMouseLeave = useCallback(() => {
        rotateX.set(0);
        rotateY.set(0);
    }, [rotateX, rotateY]);

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.55,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={{
                rotateX: hasCursor ? springX : 0,
                rotateY: hasCursor ? springY : 0,
                transformPerspective: 1000,
                minWidth: 'clamp(260px, 75vw, 340px)',
                flexShrink: 0,
                scrollSnapAlign: hasCursor ? 'none' : 'start',
                borderRadius: '20px',
                border: '0.5px solid rgba(0,0,0,0.1)',
                background: '#fff',
                cursor: 'pointer',
                overflow: 'hidden',
            }}
            whileHover={
                hasCursor
                    ? { scale: 1.035, y: -5, boxShadow: '0 18px 40px rgba(0,0,0,0.13)' }
                    : {}
            }
            whileTap={{ scale: 0.975 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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
        </motion.div>
    );
};

// ─── Main ────────────────────────────────────────────────────────────────────
export const CertificatesSection = ({ certificates }: CertificatesSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: '-60px' });
    const showNav = certificates.length > 3;

    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [hasCursor, setHasCursor] = useState(false);

    // ── Smooth scroll engine ──────────────────────────────────────────────────
    // We track the "desired" scroll position and lerp toward it each frame.
    // The container hover zone covers the ENTIRE section (sectionRef), so the
    // user doesn't have to be pixel-perfect over a card to scroll.
    const scrollTargetRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    // Track whether pointer is inside the SECTION (not just the scroll row)
    const sectionHoveredRef = useRef(false);

    const syncTarget = useCallback(() => {
        if (scrollRef.current) scrollTargetRef.current = scrollRef.current.scrollLeft;
    }, []);

    const lerp = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const current = el.scrollLeft;
        const target = scrollTargetRef.current;
        const diff = target - current;

        if (Math.abs(diff) < 0.3) {
            el.scrollLeft = target;
            rafRef.current = null;
            return;
        }

        // Factor 0.18 → snappier than 0.12 but still buttery
        el.scrollLeft = current + diff * 0.18;
        rafRef.current = requestAnimationFrame(lerp);
    }, []);

    const kickLerp = useCallback(() => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(lerp);
    }, [lerp]);

    // Detect mobile / cursor
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(pointer: fine)');
        setHasCursor(mq.matches);
        const handler = (e: MediaQueryListEvent) => setHasCursor(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // Scroll position tracker
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const check = () => {
            const { scrollLeft, scrollWidth, clientWidth } = el;
            setAtStart(scrollLeft <= 10);
            setAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
        };
        el.addEventListener('scroll', check, { passive: true });
        check();
        return () => el.removeEventListener('scroll', check);
    }, []);

    // Smooth wheel — attached to the SECTION element so hover zone is large
    useEffect(() => {
        const section = sectionRef.current;
        const el = scrollRef.current;
        if (!section || !el || !hasCursor) return;

        const onEnter = () => { sectionHoveredRef.current = true; };
        const onLeave = () => { sectionHoveredRef.current = false; };
        section.addEventListener('mouseenter', onEnter);
        section.addEventListener('mouseleave', onLeave);

        const onScroll = () => syncTarget();
        el.addEventListener('scroll', onScroll, { passive: true });

        const onWheel = (e: WheelEvent) => {
            if (!sectionHoveredRef.current) return;

            // Only intercept horizontal-ish or vertical scroll when there's overflow
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (maxScroll <= 0) return;

            e.preventDefault();

            // Support trackpad horizontal swipe natively too
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

            scrollTargetRef.current = Math.max(
                0,
                Math.min(scrollTargetRef.current + delta * 1.3, maxScroll)
            );

            kickLerp();
        };

        // Must be non-passive to call preventDefault
        section.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            section.removeEventListener('mouseenter', onEnter);
            section.removeEventListener('mouseleave', onLeave);
            section.removeEventListener('wheel', onWheel);
            el.removeEventListener('scroll', onScroll);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [hasCursor, kickLerp, syncTarget]);

    // Framer Motion drag-to-scroll (desktop) ─────────────────────────────────
    const dragX = useMotionValue(0);
    const dragStartScrollLeft = useRef(0);

    const handleDragStart = () => {
        dragStartScrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    };

    const handleDrag = (_: unknown, info: { offset: { x: number } }) => {
        if (!scrollRef.current) return;
        const newScroll = dragStartScrollLeft.current - info.offset.x;
        scrollRef.current.scrollLeft = newScroll;
        scrollTargetRef.current = newScroll;
    };

    // Modal
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedCert(null); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = selectedCert ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [selectedCert]);

    const scroll = (direction: 'left' | 'right') => {
        const step = 370;
        const el = scrollRef.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        scrollTargetRef.current = Math.max(
            0,
            Math.min(
                scrollTargetRef.current + (direction === 'left' ? -step : step),
                maxScroll
            )
        );
        kickLerp();
    };

    const showArrows = showNav && !hasCursor;

    return (
        <>
            <motion.section
                ref={sectionRef as React.RefObject<HTMLElement>}
                className="card cert-section"
                initial={{ opacity: 0, y: 32 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%', background: '#fff' }}
            >
                {/* HEADER */}
                <motion.div
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}
                    initial={{ opacity: 0, x: -16 }}
                    animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div style={{ width: '32px', height: '32px', position: 'relative' }}>
                        <Image
                            src="/Images/Icons/certificate icon.png"
                            alt="Certificates"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Certificates</h2>
                </motion.div>

                {/* MOBILE LIST VIEW */}
                {isMobile ? (
                    <motion.div
                        style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
                        initial="hidden"
                        animate={sectionInView ? 'visible' : 'hidden'}
                        variants={{
                            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                            hidden: {},
                        }}
                    >
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                                }}
                                onClick={() => setSelectedCert(cert)}
                                whileTap={{ scale: 0.98, backgroundColor: 'rgba(0,0,0,0.02)' }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '14px 4px',
                                    borderBottom:
                                        index < certificates.length - 1
                                            ? '0.5px solid rgba(0,0,0,0.08)'
                                            : 'none',
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
                                    <div
                                        style={{
                                            fontSize: '15px',
                                            fontWeight: 700,
                                            color: '#000',
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {cert.title}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>
                                        {cert.issuer}
                                    </div>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    /* DESKTOP SCROLL ROW */
                    <div
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <AnimatePresence>
                            {showArrows && (
                                <motion.button
                                    key="left"
                                    onClick={() => scroll('left')}
                                    animate={{ opacity: atStart ? 0.2 : 1 }}
                                    whileTap={{ scale: 0.85 }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        zIndex: 2,
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                    }}
                                >
                                    <FiChevronLeft size={32} />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Drag wrapper — framer motion drag-to-scroll */}
                        <motion.div
                            drag={hasCursor ? 'x' : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0}
                            onDragStart={handleDragStart}
                            onDrag={handleDrag}
                            style={{
                                x: dragX,
                                flex: 1,
                                overflow: 'hidden',
                                cursor: hasCursor ? 'grab' : 'default',
                            }}
                            whileDrag={{ cursor: 'grabbing' }}
                        >
                            <div
                                ref={scrollRef}
                                className="no-scrollbar"
                                style={{
                                    display: 'flex',
                                    gap: '16px',
                                    overflowX: 'auto',
                                    padding: '10px 4px 14px',
                                    scrollSnapType: hasCursor ? 'none' : 'x mandatory',
                                    // Disable native scroll momentum — we control it
                                    WebkitOverflowScrolling: 'auto',
                                    pointerEvents: hasCursor ? 'none' : 'auto',
                                }}
                            >
                                {certificates.map((cert, index) => (
                                    <CertCard
                                        key={cert.id}
                                        cert={cert}
                                        index={index}
                                        onClick={() => setSelectedCert(cert)}
                                        hasCursor={hasCursor}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {showArrows && (
                                <motion.button
                                    key="right"
                                    onClick={() => scroll('right')}
                                    animate={{ opacity: atEnd ? 0.2 : 1 }}
                                    whileTap={{ scale: 0.85 }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        zIndex: 2,
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                    }}
                                >
                                    <FiChevronRight size={32} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* PORTAL MODAL */}
                {selectedCert &&
                    typeof window !== 'undefined' &&
                    createPortal(
                        <AnimatePresence>
                            <motion.div
                                key="overlay"
                                onClick={() => setSelectedCert(null)}
                                className="modal-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.22 }}
                            >
                                <motion.div
                                    onClick={(e) => e.stopPropagation()}
                                    className="modal-content"
                                    initial={{ opacity: 0, scale: 0.88, y: 24 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.92, y: 16 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 360,
                                        damping: 28,
                                        mass: 0.8,
                                    }}
                                >
                                    <motion.button
                                        onClick={() => setSelectedCert(null)}
                                        className="close-btn"
                                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.15)' }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FiX size={16} />
                                    </motion.button>

                                    <div className="modal-header">
                                        <div
                                            className="dot"
                                            style={{ background: getIssuerColor(selectedCert.issuer) }}
                                        />
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
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>,
                        document.getElementById('modal-root')!
                    )}

                <style jsx>{`
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

                    .modal-overlay {
                        position: fixed;
                        top: 0; left: 0;
                        width: 100vw; height: 100vh;
                        background: rgba(0,0,0,0.55);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                        padding: 16px;
                        box-sizing: border-box;
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
                    }
                    .modal-header {
                        padding: 20px 24px 16px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        flex-shrink: 0;
                    }
                    .modal-header h3 { font-size: 16px; font-weight: 700; margin: 0; }
                    .modal-header p { font-size: 12px; color: #8e8e93; margin: 2px 0 0; }
                    .dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
                    .modal-image {
                        position: relative;
                        width: 100%;
                        flex: 1 1 auto;
                        min-height: 480px;
                        max-height: 70vh;
                        background: #f2f2f7;
                    }
                `}</style>
            </motion.section>
        </>
    );
};
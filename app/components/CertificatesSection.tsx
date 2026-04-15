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
    const showNav = certificates.length > 3;

    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

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

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -370 : 370,
                behavior: 'smooth'
            });
        }
    };

    return (
        // FIX 1: "no-lift" class overrides the .card:hover { transform } from globals.css
        // so the whole section doesn't lift on hover — only individual cert cards do
        <section className="card no-lift" style={{ width: '100%', background: '#fff' }}>
            {/* HEADER */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '32px', position: 'relative' }}>
                    <Image src="/Images/Icons/certificate icon.png" alt="Certificates" fill style={{ objectFit: 'contain' }} />
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Certificates</h2>
            </div>

            {/* SCROLL ROW */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                    className="no-scrollbar"
                    style={{
                        display: 'flex',
                        gap: '16px',
                        overflowX: 'auto',
                        padding: '10px 4px',
                        flex: 1,
                        scrollSnapType: 'x mandatory'
                    }}
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
                                overflow: 'hidden', // FIX 2: clips the image inside rounded corners
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
                                padding: '12px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
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

            {/* PORTAL MODAL */}
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
                .no-scrollbar::-webkit-scrollbar { display: none; }

                /* Override globals.css .card:hover so the whole section doesn't lift */
                .no-lift:hover {
                    transform: none !important;
                    box-shadow: none !important;
                }

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

                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.92); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </section>
    );
};
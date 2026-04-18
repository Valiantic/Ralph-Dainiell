'use client';

import { Certificate } from '../types/portfolio';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
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

    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isHoveringScroll, setIsHoveringScroll] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
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

    return (
        <section className="card no-lift" style={{ width: '100%', background: '#fff' }}>
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
                /* DESKTOP SCROLL ROW — no arrows, scroll on hover */
                <div
                    onMouseEnter={() => setIsHoveringScroll(true)}
                    onMouseLeave={() => setIsHoveringScroll(false)}
                    style={{ position: 'relative' }}
                >
                    <div
                        ref={scrollRef}
                        className="cert-scroll"
                        style={{
                            display: 'flex',
                            gap: '16px',
                            overflowX: isHoveringScroll ? 'auto' : 'hidden',
                            padding: '10px 4px',
                            scrollSnapType: 'x mandatory',
                            cursor: isHoveringScroll ? 'grab' : 'default',
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
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    scrollSnapAlign: 'start',
                                    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
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
                </div>
            )}

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
                .cert-scroll::-webkit-scrollbar { display: none; }
                .cert-scroll { -ms-overflow-style: none; scrollbar-width: none; }

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
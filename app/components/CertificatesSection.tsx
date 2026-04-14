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

    // ESC close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // 🔥 Scroll Lock (PRO UX)
    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
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
        <section className="card" style={{ width: '100%', background: '#fff' }}>
            {/* HEADER */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '32px', position: 'relative' }}>
                    <Image src="/Images/Icons/certificate icon.png" alt="Certificates" fill style={{ objectFit: 'contain' }} />
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Certificates</h2>
            </div>

            {/* SCROLL */}
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
                                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <div style={{ position: 'relative', height: '220px' }}>
                                <Image src={cert.imageUrl} alt={cert.title} fill style={{ objectFit: 'cover' }} />
                            </div>

                            <div style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: getIssuerColor(cert.issuer)
                                }} />
                                <span style={{ fontSize: '13px', fontWeight: 600 }}>{cert.title}</span>
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

            {/* 🔥 PORTAL MODAL */}
            {selectedCert && typeof window !== 'undefined' &&
                createPortal(
                    <div
                        onClick={() => setSelectedCert(null)}
                        className="modal-overlay"
                    >
                        <div
                            onClick={e => e.stopPropagation()}
                            className="modal-content"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="close-btn"
                            >
                                <FiX size={16} />
                            </button>

                            <div className="modal-header">
                                <div className="dot" style={{
                                    background: getIssuerColor(selectedCert.issuer)
                                }} />
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
                                />
                            </div>
                        </div>
                    </div>,
                    document.getElementById('modal-root')!
                )
            }

            {/* 🔥 APPLE STYLE ANIMATION */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0,0,0,0.55);
                    backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    animation: fadeIn 0.25s ease;
                }

                .modal-content {
                    background: #fff;
                    border-radius: 28px;
                    max-width: 780px;
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    transform: scale(0.96);
                    animation: zoomIn 0.25s ease forwards;
                    box-shadow: 0 30px 80px rgba(0,0,0,0.25);
                }

                .close-btn {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(0,0,0,0.06);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .modal-header {
                    padding: 20px 24px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .modal-header h3 {
                    font-size: 16px;
                    font-weight: 700;
                }

                .modal-header p {
                    font-size: 12px;
                    color: #8e8e93;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .modal-image {
                    position: relative;
                    width: 100%;
                    height: 480px;
                    background: #f2f2f7;
                }

                @keyframes zoomIn {
                    from {
                        opacity: 0;
                        transform: scale(0.92);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </section>
    );
};
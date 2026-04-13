'use client';

import { Certificate } from '../types/portfolio';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

interface CertificatesSectionProps {
    certificates: Certificate[];
}

const getIssuerColor = (issuer: string) => {
    if (issuer.toLowerCase().includes('datacamp')) return '#30d158';
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '32px', position: 'relative' }}>
                    <Image src="/Images/Icons/certificate icon.png" alt="Certificates" fill style={{ objectFit: 'contain' }} />
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Certificates</h2>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {showNav && (
                    <button
                        onClick={() => scroll('left')}
                        style={{
                            background: 'none', border: 'none', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            zIndex: 2, flexShrink: 0,
                            cursor: atStart ? 'default' : 'pointer', padding: '0',
                            opacity: atStart ? 0.2 : 1, transition: 'opacity 0.3s ease'
                        }}
                    >
                        <FiChevronLeft size={32} color="#000" strokeWidth={1.5} />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    className="no-scrollbar"
                    style={{
                        display: 'flex', gap: '16px', overflowX: 'auto',
                        padding: '10px 4px', flex: 1,
                        scrollBehavior: 'smooth', scrollSnapType: 'x mandatory'
                    }}
                >
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            onClick={() => setSelectedCert(cert)}
                            style={{
                                minWidth: 'clamp(260px, 75vw, 340px)',
                                overflow: 'hidden',
                                borderRadius: '20px',
                                border: '0.5px solid rgba(0,0,0,0.1)',
                                flexShrink: 0,
                                background: '#fff',
                                scrollSnapAlign: 'start',
                                cursor: 'pointer',
                                transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.025) translateY(-3px)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1) translateY(0)';
                            }}
                        >
                            {/* Certificate Image */}
                            <div style={{
                                position: 'relative', width: '100%', height: '220px',
                                background: '#f2f2f7', overflow: 'hidden'
                            }}>
                                <Image
                                    src={cert.imageUrl}
                                    alt={cert.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    unoptimized
                                />
                            </div>

                            {/* Footer */}
                            <div style={{
                                padding: '12px 14px',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                borderTop: '0.5px solid rgba(0,0,0,0.06)',
                                background: '#fff'
                            }}>
                                <div style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: getIssuerColor(cert.issuer), flexShrink: 0
                                }} />
                                <span style={{
                                    fontSize: '13px', fontWeight: 600,
                                    color: '#1c1c1e', flex: 1, lineHeight: 1.3
                                }}>
                                    {cert.title}
                                </span>
                                <span style={{
                                    fontSize: '11px', fontWeight: 500,
                                    color: '#8e8e93',
                                    background: '#f2f2f7',
                                    padding: '3px 8px', borderRadius: '20px',
                                    whiteSpace: 'nowrap', flexShrink: 0
                                }}>
                                    {cert.issuer}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {showNav && (
                    <button
                        onClick={() => scroll('right')}
                        style={{
                            background: 'none', border: 'none', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            zIndex: 2, flexShrink: 0,
                            cursor: atEnd ? 'default' : 'pointer', padding: '0',
                            opacity: atEnd ? 0.2 : 1, transition: 'opacity 0.3s ease'
                        }}
                    >
                        <FiChevronRight size={32} color="#000" strokeWidth={1.5} />
                    </button>
                )}
            </div>

            {/* LIGHTBOX */}
            {selectedCert && (
                <div
                    onClick={() => setSelectedCert(null)}
                    style={{
                        position: 'fixed', top: 0, left: 0,
                        width: '100vw', height: '100vh',
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        zIndex: 1000, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', padding: '20px'
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#fff', borderRadius: '28px',
                            overflow: 'hidden', maxWidth: '780px',
                            width: '100%', position: 'relative',
                            border: 'none'
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedCert(null)}
                            style={{
                                position: 'absolute', top: '16px', right: '16px',
                                background: 'rgba(0,0,0,0.06)', border: 'none',
                                borderRadius: '50%', width: '32px', height: '32px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', zIndex: 10
                            }}
                        >
                            <FiX size={16} color="#1c1c1e" />
                        </button>

                        {/* Title bar */}
                        <div style={{ padding: '20px 24px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '10px', height: '10px', borderRadius: '50%',
                                background: getIssuerColor(selectedCert.issuer), flexShrink: 0
                            }} />
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1c1c1e' }}>{selectedCert.title}</h3>
                                <p style={{ fontSize: '12px', color: '#8e8e93', marginTop: '2px' }}>{selectedCert.issuer}</p>
                            </div>
                        </div>

                        {/* Certificate Image */}
                        <div style={{
                            position: 'relative', width: '100%', height: '480px',
                            background: '#f2f2f7'
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
            )}

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                @media (max-width: 600px) {
                    .card { padding: 20px !important; }
                }
            `}</style>
        </section>
    );
};
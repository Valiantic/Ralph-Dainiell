'use client';

import { Certificate } from '../types/portfolio';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

interface CertificatesSectionProps {
    certificates: Certificate[];
}

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

    // Close lightbox kapag pinindot ESC
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 350;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
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
                            background: 'none',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            flexShrink: 0,
                            cursor: atStart ? 'default' : 'pointer',
                            padding: '0',
                            opacity: atStart ? 0.2 : 1,
                            transition: 'opacity 0.3s ease'
                        }}
                    >
                        <FiChevronLeft size={32} color="#000" strokeWidth={1.5} />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    className="no-scrollbar"
                    style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'auto',
                        padding: '10px 5px',
                        flex: 1,
                        scrollBehavior: 'smooth',
                        scrollSnapType: 'x mandatory'
                    }}
                >
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            onClick={() => setSelectedCert(cert)}
                            style={{
                                minWidth: 'clamp(280px, 80vw, 380px)',
                                padding: '0',
                                overflow: 'hidden',
                                borderRadius: '24px',
                                border: '1.5px solid #000',
                                flexShrink: 0,
                                background: '#fff',
                                scrollSnapAlign: 'start',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
                                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '240px',
                                background: '#f9f9f9',
                                borderBottom: '1.5px solid #000'
                            }}>
                                <Image
                                    src={cert.imageUrl}
                                    alt={cert.title}
                                    fill
                                    style={{ objectFit: 'contain', padding: '10px' }}
                                    unoptimized
                                />
                            </div>
                            <div style={{ padding: '16px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '4px' }}>{cert.title}</h3>
                                <p style={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>{cert.issuer} • {cert.issueDate}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {showNav && (
                    <button
                        onClick={() => scroll('right')}
                        style={{
                            background: 'none',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            flexShrink: 0,
                            cursor: atEnd ? 'default' : 'pointer',
                            padding: '0',
                            opacity: atEnd ? 0.2 : 1,
                            transition: 'opacity 0.3s ease'
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
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.7)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#fff',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            maxWidth: '800px',
                            width: '100%',
                            position: 'relative',
                            border: 'none'
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedCert(null)}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: '#000',
                                border: 'none',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                        >
                            <FiX size={18} color="#fff" />
                        </button>

                        {/* Title bar */}
                        <div style={{
                            padding: '16px 20px',
                            borderBottom: '1.5px solid #000'
                        }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{selectedCert.title}</h3>
                            <p style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{selectedCert.issuer}</p>
                        </div>

                        {/* Certificate Image */}
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '500px',
                            background: '#f9f9f9'
                        }}>
                            <Image
                                src={selectedCert.imageUrl}
                                alt={selectedCert.title}
                                fill
                                style={{ objectFit: 'contain', padding: '20px' }}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                @media (max-width: 600px) {
                    .card {
                        padding: 20px !important;
                    }
                }
            `}</style>
        </section>
    );
};
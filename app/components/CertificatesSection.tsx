
'use client';

import { Certificate } from '../types/portfolio';
import { useRef } from 'react';
import Image from 'next/image';

interface CertificatesSectionProps {
    certificates: Certificate[];
}

export const CertificatesSection = ({ certificates }: CertificatesSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    // Show navigation buttons only if there are more than 3 certificates
    const showNav = certificates.length > 3;

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
                <div style={{ width: '24px', height: '24px', position: 'relative' }}>
                    <Image src="/Images/Icons/certificate icon.png" alt="Certificates" fill style={{ objectFit: 'contain' }} />
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Certificates</h2>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {showNav && (
                    <button
                        onClick={() => scroll('left')}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#fff',
                            border: '1.5px solid #000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            flexShrink: 0,
                            fontSize: '20px',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        ‹
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
                        <div key={cert.id} style={{
                            minWidth: 'clamp(280px, 80vw, 380px)',
                            padding: '0',
                            overflow: 'hidden',
                            borderRadius: '24px',
                            border: '1.5px solid #000',
                            flexShrink: 0,
                            background: '#fff',
                            scrollSnapAlign: 'start'
                        }}>
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
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#fff',
                            border: '1.5px solid #000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            flexShrink: 0,
                            fontSize: '20px',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        ›
                    </button>
                )}
            </div>
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

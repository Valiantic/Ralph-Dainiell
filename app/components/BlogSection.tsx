'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BlogSection() {
    const [hasMouse, setHasMouse] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [closeHovered, setCloseHovered] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
        setHasMouse(mq.matches);

        const handler = (e: MediaQueryListEvent) => {
            setHasMouse(e.matches);
            if (!e.matches) setIsHovered(false);
        };

        mq.addEventListener('change', handler);

        const openModal = () => setModalOpen(true);
        window.addEventListener('openBlogModal', openModal);

        return () => {
            mq.removeEventListener('change', handler);
            window.removeEventListener('openBlogModal', openModal);
        };
    }, []);

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [modalOpen]);

    return (
        <>
            {modalOpen && (
                <div
                    onClick={() => setModalOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.45)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        animation: 'fadeInOverlay 0.25s ease forwards',
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#fff',
                            borderRadius: '24px',
                            border: '1.5px solid #000',
                            padding: '32px',
                            maxWidth: '520px',
                            width: '90%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            position: 'relative',
                            animation: 'scaleInModal 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '26px', height: '26px', position: 'relative', flexShrink: 0 }}>
                                <Image
                                    src="/Images/Icons/bookicon.png"
                                    alt="Blog"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                                Blog
                            </h2>
                        </div>

                        <p style={{ color: '#000', fontSize: '15px', lineHeight: 1.55, fontWeight: 400, margin: 0 }}>
                            I build projects to remove friction from real workflows turning repeated tasks,
                            unclear processes, and user needs into simple, efficient, and purposeful digital
                            solutions that make everyday work easier to complete.
                        </p>

                        <button
                            onMouseEnter={() => setCloseHovered(true)}
                            onMouseLeave={() => setCloseHovered(false)}
                            onClick={() => setModalOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '14px',
                                right: '14px',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                border: '1.5px solid #000',
                                background: closeHovered ? '#000' : '#fff',
                                color: closeHovered ? '#fff' : '#000',
                                fontSize: '14px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.2s ease, color 0.2s ease',
                                flexShrink: 0,
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <section
                className="card blog-card"
                onMouseEnter={() => { if (hasMouse) setIsHovered(true); }}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setModalOpen(true)}
                style={{
                    width: '100%',
                    height: 'auto',           
                    minHeight: 0,        
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-start',  
                    gap: '14px',
                    padding: '20px',         
                    overflow: 'hidden',       
                    cursor: 'pointer',
                    transform: hasMouse && isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hasMouse && isHovered ? '0 12px 32px rgba(0, 0, 0, 0.13)' : 'none',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 'clamp(18px, 2vw, 26px)', height: 'clamp(18px, 2vw, 26px)', position: 'relative', flexShrink: 0 }}>
                        <Image
                            src="/Images/Icons/bookicon.png"
                            alt="Blog"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <h2 style={{ fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                        Blog
                    </h2>
                </div>

                <p style={{ color: '#000', fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.45, fontWeight: 400, width: '100%', margin: 0 }}>
                    I build projects to remove friction from real workflows turning repeated tasks,
                    unclear processes, and user needs into simple, efficient, and purposeful digital
                    solutions that make everyday work easier to complete.
                </p>

                <style jsx>{`
                    @media (max-width: 480px) {
                        .blog-card {
                            padding: 18px !important;
                        }
                    }

                    @keyframes fadeInOverlay {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes scaleInModal {
                        from { opacity: 0; transform: scale(0.92) translateY(8px); }
                        to { opacity: 1; transform: scale(1) translateY(0); }
                    }
                `}</style>
            </section>
        </>
    );
}
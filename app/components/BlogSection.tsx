'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BlogSection() {
    const [hasMouse, setHasMouse] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
        setHasMouse(mq.matches);

        const handler = (e: MediaQueryListEvent) => {
            setHasMouse(e.matches);
            if (!e.matches) setIsHovered(false);
        };

        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return (
        <section
            className="card blog-card"
            onMouseEnter={() => {
                if (hasMouse) setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: '100%',
                background: '#fff',
                minHeight: '160px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                transform: hasMouse && isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hasMouse && isHovered ? '0 12px 32px rgba(0, 0, 0, 0.13)' : 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '18px',
                }}
            >
                <div
                    style={{
                        width: '24px',
                        height: '24px',
                        position: 'relative',
                        flexShrink: 0,
                    }}
                >
                    <Image
                        src="/Images/Icons/blogicon.png"
                        alt="Blog"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>

                <h2
                    style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        margin: 0,
                        letterSpacing: '-0.02em',
                    }}
                >
                    Blog
                </h2>
            </div>

            <p
                style={{
                    color: '#000',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    lineHeight: 1.55,
                    fontWeight: 400,
                    maxWidth: '620px',
                    margin: 0,
                }}
            >
                I build projects to remove friction from real workflows turning repeated tasks,
                unclear processes, and user needs into simple, efficient, and purposeful digital solutions.
            </p>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .blog-card {
                        min-height: 150px !important;
                        padding: 20px !important;
                    }
                }

                @media (max-width: 480px) {
                    .blog-card {
                        min-height: 145px !important;
                        padding: 18px !important;
                    }
                }
            `}</style>
        </section>
    );
}
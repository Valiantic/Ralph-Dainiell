import { useEffect, useState } from 'react';

interface BioSectionProps {
    bio: string[];
}

export const BioSection = ({ bio }: BioSectionProps) => {
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
        <div
            className="card no-scrollbar"
            onMouseEnter={() => {
                if (hasMouse) setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                height: 'var(--bento-height, 650px)',
                background: '#fff',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                transform: hasMouse && isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hasMouse && isHovered ? '0 12px 32px rgba(0, 0, 0, 0.13)' : 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
        >
            <h2
                style={{
                    fontSize: 'clamp(28px, 8vw, 42px)',
                    fontWeight: 800,
                    marginBottom: '20px',
                    flexShrink: 0,
                    letterSpacing: '-0.8px',
                }}
            >
                Hi there!
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                {bio.map((paragraph, index) => (
                    <p
                        key={index}
                        style={{
                            color: '#000',
                            fontSize: 'clamp(14px, 2.5vw, 17px)',
                            lineHeight: 1.5,
                            fontWeight: 400,
                        }}
                    >
                        {paragraph}
                    </p>
                ))}
            </div>

            <style jsx>{`
                .no-scrollbar {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                @media (max-width: 1024px) {
                    .card {
                        height: auto !important;
                        min-height: 0 !important;
                        padding: 20px !important;
                    }
                }
            `}</style>
        </div>
    );
};
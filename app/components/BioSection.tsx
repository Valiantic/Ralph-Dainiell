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
            className="card bio-card"
            onMouseEnter={() => {
                if (hasMouse) setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                height: 'auto',
                minHeight: '0',
                maxHeight: 'none',
                background: '#fff',
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                transform: hasMouse && isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hasMouse && isHovered ? '0 12px 32px rgba(0, 0, 0, 0.13)' : 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
        >
            <h2
                style={{
                    fontSize: 'clamp(30px, 4vw, 42px)',
                    fontWeight: 800,
                    margin: '0 0 20px',
                    flexShrink: 0,
                    letterSpacing: '-0.8px',
                    lineHeight: 1,
                    color: '#000',
                }}
            >
                Hi there!
            </h2>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '18px',
                }}
            >
                {bio.map((paragraph, index) => (
                    <p
                        key={index}
                        style={{
                            color: '#000',
                            fontSize: 'clamp(14px, 1.35vw, 17px)',
                            lineHeight: 1.48,
                            fontWeight: 400,
                            margin: 0,
                        }}
                    >
                        {paragraph}
                    </p>
                ))}
            </div>

            <style jsx>{`
                .bio-card {
                    width: 100%;
                }

                @media (max-width: 1024px) {
                    .bio-card {
                        height: auto !important;
                        min-height: 0 !important;
                        max-height: none !important;
                        overflow: visible !important;
                        padding: 20px !important;
                    }
                }

                @media (max-width: 480px) {
                    .bio-card {
                        padding: 20px !important;
                    }
                }
            `}</style>
        </div>
    );
};
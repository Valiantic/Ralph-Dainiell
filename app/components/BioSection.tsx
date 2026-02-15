
interface BioSectionProps {
    bio: string[];
}

export const BioSection = ({ bio }: BioSectionProps) => {
    return (
        <div className="card no-scrollbar" style={{
            height: 'var(--bento-height, 650px)',
            background: '#fff',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h2 style={{ fontSize: 'clamp(28px, 8vw, 42px)', fontWeight: 800, marginBottom: '20px', flexShrink: 0, letterSpacing: '-0.8px' }}>Hi there!</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                {bio.map((paragraph, index) => (
                    <p key={index} style={{ color: '#000', fontSize: 'clamp(14px, 2.5vw, 17px)', lineHeight: 1.5, fontWeight: 400 }}>
                        {paragraph}
                    </p>
                ))}
            </div>
            <style jsx>{`
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

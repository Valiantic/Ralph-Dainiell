
import { Experience } from '../types/portfolio';
import Image from 'next/image';

interface ExperienceSectionProps {
    experiences: Experience[];
}

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
    return (
        <div className="card" style={{
            height: 'var(--bento-height, 650px)',
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
            overflow: 'hidden',
            padding: 'clamp(16px, 4vw, 24px)',
            boxSizing: 'border-box'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexShrink: 0 }}>
                <div style={{ width: '24px', height: '24px', position: 'relative' }}>
                    <Image src="/Images/Icons/experience icon.png" alt="Experience" fill style={{ objectFit: 'contain' }} />
                </div>
                <h2 style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 800 }}>Experience</h2>
            </div>

            {/* Static Container */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                overflowY: 'auto' // Still allow scroller if content overflows the card, but show all items in sequence
            }} className="custom-scrollbar">
                {experiences.map((exp) => (
                    <div key={exp.id} style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        flexShrink: 0
                    }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', flexShrink: 0 }}>
                            {exp.logo && (
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    border: '1px solid #eee',
                                    position: 'relative',
                                    flexShrink: 0,
                                    overflow: 'hidden',
                                    background: '#fff'
                                }}>
                                    <Image
                                        src={exp.logo}
                                        alt={exp.company}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            )}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 800, lineHeight: 1.2, marginBottom: '1px' }}>
                                    {exp.role}
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#000' }}>{exp.company}</p>
                                    <p style={{ fontSize: '10px', fontWeight: 600, color: '#888' }}>{exp.duration}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            border: '1.5px solid #000',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            boxSizing: 'border-box',
                            background: '#fcfcfc'
                        }}>
                            <ul style={{
                                paddingLeft: '14px',
                                fontSize: '12px',
                                color: '#333',
                                lineHeight: 1.4,
                                margin: 0,
                                listStyleType: 'disc'
                            }}>
                                {exp.description.map((item, i) => (
                                    <li key={i} style={{ wordBreak: 'break-word' }}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #eee;
                    border-radius: 10px;
                }
                @media (max-width: 1024px) {
                    div.card {
                        height: 480px !important;
                        padding: 20px !important;
                    }
                }
                @media (max-width: 480px) {
                    div.card {
                        height: 400px !important;
                    }
                }
            `}</style>
        </div>
    );
};

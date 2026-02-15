
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

            {/* Scrollable Container */}
            <div className="no-scrollbar" style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                scrollSnapType: 'y mandatory',
                height: '0',
                minHeight: '0'
            }}>
                {experiences.map((exp) => (
                    <div key={exp.id} style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '100%',
                        flexShrink: 0,
                        scrollSnapAlign: 'start',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingBottom: '12px'
                    }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexShrink: 0 }}>
                            {exp.logo && (
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '10px',
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
                                <h3 style={{ fontSize: '15px', fontWeight: 800, lineHeight: 1.2, marginBottom: '2px' }}>
                                    {exp.role}
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>{exp.company}</p>
                                    <p style={{ fontSize: '10px', fontWeight: 600, color: '#888' }}>{exp.duration}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            paddingRight: '6px',
                            border: '1.5px solid #000',
                            borderRadius: '18px',
                            padding: '12px 16px',
                            boxSizing: 'border-box',
                            background: '#fff'
                        }} className="custom-scrollbar">
                            <ul style={{
                                paddingLeft: '16px',
                                fontSize: '12.5px',
                                color: '#333',
                                lineHeight: 1.5,
                                margin: 0,
                                listStyleType: 'disc'
                            }}>
                                {exp.description.map((item, i) => (
                                    <li key={i} style={{ marginBottom: '6px', wordBreak: 'break-word' }}>
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

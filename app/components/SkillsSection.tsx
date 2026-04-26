import { Skill } from '../types/portfolio';
import Image from 'next/image';

interface SkillsSectionProps {
    skills: Skill[];
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
    const categories: Skill['category'][] = ['Programming Language', 'UI Development','Architecture', 'Networking','Tools & DevOps','Database','Design'];

    return (
        <div className="skills-card-outer card" style={{
            height: 'var(--bento-height, 650px)',
            background: '#fff',
            position: 'relative',
            borderRadius: '30px',
            overflow: 'hidden',
            padding: 0,
            width: '100%',
        }}>
            <div className="skills-card" style={{
                height: '100%',
                overflowY: 'auto',
                padding: '24px',
                boxSizing: 'border-box',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ width: '24px', height: '24px', position: 'relative' }}>
                        <Image src="/Images/Icons/skills icon.png" alt="Skills" fill style={{ objectFit: 'contain' }} />
                    </div>
                    <h2 style={{ fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 800 }}>Skills</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {categories.map((category) => (
                        <div key={category}>
                            <h3 style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                color: '#666',
                                marginBottom: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                {category}
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {skills
                                    .filter((s) => s.category === category)
                                    .map((skill) => (
                                        <span key={skill.name} className="pill" style={{
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            border: '1.5px solid #000',
                                            padding: '6px 14px',
                                            background: '#fff'
                                        }}>
                                            {skill.name}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .skills-card {
                    scrollbar-width: thin;
                    scrollbar-color: transparent transparent;
                }

                .skills-card::-webkit-scrollbar {
                    width: 5px;
                }

                .skills-card::-webkit-scrollbar-track {
                    background: transparent;
                }

                .skills-card::-webkit-scrollbar-thumb {
                    background: transparent;
                    border-radius: 999px;
                    min-height: 30px;
                    max-height: 60px;
                    margin: 350px 0;
                }

                .skills-card:hover::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.25);
                }

                .skills-card:hover {
                    scrollbar-color: rgba(0, 0, 0, 0.25) transparent;
                }

                @media (max-width: 1024px) {
                    .skills-card-outer {
                        height: auto !important;
                    }
                    .skills-card {
                        overflow-y: visible !important;
                        height: auto !important;
                        text-align: left !important;
                    }
                }
            `}</style>
        </div>
    );
};
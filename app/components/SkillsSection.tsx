import { Skill } from '../types/portfolio';
import Image from 'next/image';

interface SkillsSectionProps {
    skills: Skill[];
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
        const categories: Skill['category'][] = ['Programming Language', 'UI Development','Architecture', 'Networking','Tools & DevOps','Database','Design'];

    return (
        <div
            className="skills-card card"
            style={{
                height: 'var(--bento-height, 650px)',
                background: '#fff',
                overflowY: 'auto',
                position: 'relative',
                borderRadius: '20px',
                scrollbarWidth: 'thin',
                scrollbarColor: 'transparent transparent',
            }}
        >
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
                                    <span
                                        key={skill.name}
                                        className="pill"
                                        style={{
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            border: '1.5px solid #000',
                                            padding: '6px 14px',
                                            background: '#fff'
                                        }}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
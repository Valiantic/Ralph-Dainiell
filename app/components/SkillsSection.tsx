import { Skill } from '../types/portfolio';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface SkillsSectionProps {
    skills: Skill[];
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
    const categories: Skill['category'][] = ['Programming Language', 'UI Development','Architecture', 'Networking','Tools & DevOps','Database','Design'];
    const scrollRef = useRef<HTMLDivElement>(null);
    const [thumbTop, setThumbTop] = useState(56);
    const [showThumb, setShowThumb] = useState(false);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const THUMB_HEIGHT = 40;
    const TRACK_TOP = 56;
    const TRACK_BOTTOM = 24;

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const scrollable = el.scrollHeight - el.clientHeight;
        const trackHeight = el.clientHeight - TRACK_TOP - TRACK_BOTTOM - THUMB_HEIGHT;
        const ratio = el.scrollTop / scrollable;
        setThumbTop(TRACK_TOP + ratio * trackHeight);
        setShowThumb(true);
        clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setShowThumb(false), 1200);
    };

    return (
        <div className="skills-card-outer card" 
        onMouseEnter={() => setShowThumb(true)}
        onMouseLeave={() => setShowThumb(false)}
        style={{
            height: 'var(--bento-height, 650px)',
            background: '#fff',
            position: 'relative',
            borderRadius: '30px',
            overflow: 'hidden',
            padding: 0,
            width: '100%',
        }}>
           <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="skills-card"
                style={{
                    height: '100%',
                    overflowY: 'auto',
                    padding: '24px',
                    boxSizing: 'border-box',
                    WebkitOverflowScrolling: 'touch',
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

            {/* Custom iOS-style scrollbar thumb */}
            <div className="scroll-thumb" style={{
                position: 'absolute',
                right: '4px',
                top: `${thumbTop}px`,
                width: '4px',
                height: `${THUMB_HEIGHT}px`,
                background: showThumb ? 'rgba(0,0,0,0.25)' : 'transparent',
                borderRadius: '999px',
                transition: 'background 0.3s ease, top 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                pointerEvents: 'none',
            }} />

            <style jsx>{`
                .skills-card {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .skills-card::-webkit-scrollbar {
                    display: none;
                }
                @media (max-width: 1024px) {
                    .skills-card-outer {
                        height: auto !important;
                        width: 100% !important;
                        align-self: flex-start !important;
                    }
                    .skills-card {
                        overflow-y: visible !important;
                        height: auto !important;
                        align-items: flex-start !important;
                    }
                    .scroll-thumb {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};
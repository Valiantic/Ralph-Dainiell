'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo, useState, useEffect, useRef, type CSSProperties, type MouseEvent } from 'react';
import { PortfolioData } from '../types/portfolio';
import { GoFileZip } from 'react-icons/go';
import { IoLocationOutline } from 'react-icons/io5';

interface ProfileHeroProps {
    data: PortfolioData;
}

type Slide =
    | { type: 'greeting'; duration: number }
    | { type: 'content'; main: string; secondary: string; duration: number };

type Dot = {
    ax: number;
    ay: number;
    sx: number;
    sy: number;
    vx: number;
    vy: number;
    x: number;
    y: number;
};

interface DotFieldProps {
    dotRadius?: number;
    dotSpacing?: number;
    cursorRadius?: number;
    cursorForce?: number;
    bulgeOnly?: boolean;
    bulgeStrength?: number;
    glowRadius?: number;
    sparkle?: boolean;
    waveAmplitude?: number;
    gradientFrom?: string;
    gradientTo?: string;
    glowColor?: string;
    className?: string;
    style?: CSSProperties;
}

const SLIDES: Slide[] = [
    { type: 'greeting', duration: 3000 },
    { type: 'content', main: 'Junior Developer', secondary: 'Native iOS', duration: 3000 },
    { type: 'content', main: 'Available!', secondary: 'Hybrid • Remote • On-Site', duration: 4000 },
    { type: 'content', main: 'Build Together', secondary: 'Open Voluntary OJT', duration: 4000 },
    { type: 'content', main: 'Devices', secondary: 'Acer Helios 16 • MacBook Neo', duration: 4000 },
];

const GREETING_WORDS = ['GLAD', 'YOU’RE', 'HERE!'];
const TWO_PI = Math.PI * 2;

const DotField = memo(({
    dotRadius = 1.5,
    dotSpacing = 14,
    cursorRadius = 420,
    cursorForce = 0.1,
    bulgeOnly = true,
    bulgeStrength = 34,
    glowRadius = 150,
    sparkle = false,
    waveAmplitude = 0,
    gradientFrom = '#000000',
    gradientTo = '#000000',
    glowColor = '#000000',
    className = '',
    style = {},
}: DotFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const glowRef = useRef<SVGCircleElement | null>(null);
    const dotsRef = useRef<Dot[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
    const rafRef = useRef<number | null>(null);
    const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
    const glowOpacity = useRef(0);
    const engagement = useRef(0);
    const rebuildRef = useRef<(() => void) | null>(null);
    const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);
    const propsRef = useRef({
        dotRadius,
        dotSpacing,
        cursorRadius,
        cursorForce,
        bulgeOnly,
        bulgeStrength,
        sparkle,
        waveAmplitude,
        gradientFrom,
        gradientTo,
    });

    propsRef.current = {
        dotRadius,
        dotSpacing,
        cursorRadius,
        cursorForce,
        bulgeOnly,
        bulgeStrength,
        sparkle,
        waveAmplitude,
        gradientFrom,
        gradientTo,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const glowEl = glowRef.current;
        const parent = canvas?.parentElement;

        if (!canvas || !parent) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let resizeTimer: ReturnType<typeof setTimeout> | undefined;

        const buildDots = (w: number, h: number) => {
            const p = propsRef.current;
            const step = p.dotRadius + p.dotSpacing;
            const cols = Math.max(1, Math.floor(w / step));
            const rows = Math.max(1, Math.floor(h / step));
            const padX = (w % step) / 2;
            const padY = (h % step) / 2;
            const dots: Dot[] = [];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const ax = padX + col * step + step / 2;
                    const ay = padY + row * step + step / 2;

                    dots.push({
                        ax,
                        ay,
                        sx: ax,
                        sy: ay,
                        vx: 0,
                        vy: 0,
                        x: ax,
                        y: ay,
                    });
                }
            }

            dotsRef.current = dots;
        };

        const doResize = () => {
            const rect = parent.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            sizeRef.current = {
                w,
                h,
                offsetX: rect.left + window.scrollX,
                offsetY: rect.top + window.scrollY,
            };

            buildDots(w, h);
        };

        const resize = () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(doResize, 100);
        };

        const onMouseMove = (e: globalThis.MouseEvent) => {
            const s = sizeRef.current;
            mouseRef.current.x = e.pageX - s.offsetX;
            mouseRef.current.y = e.pageY - s.offsetY;
        };

        const updateMouseSpeed = () => {
            const m = mouseRef.current;
            const dx = m.prevX - m.x;
            const dy = m.prevY - m.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            m.speed += (dist - m.speed) * 0.5;
            if (m.speed < 0.001) m.speed = 0;
            m.prevX = m.x;
            m.prevY = m.y;
        };

        const speedInterval = window.setInterval(updateMouseSpeed, 20);
        let frameCount = 0;

        const tick = () => {
            frameCount += 1;

            const dots = dotsRef.current;
            const m = mouseRef.current;
            const { w, h } = sizeRef.current;
            const p = propsRef.current;
            const t = frameCount * 0.02;

            const targetEngagement = Math.min(m.speed / 5, 1);
            engagement.current += (targetEngagement - engagement.current) * 0.06;

            if (engagement.current < 0.001) engagement.current = 0;

            const eng = engagement.current;
            glowOpacity.current += (eng - glowOpacity.current) * 0.08;

            if (glowEl) {
                glowEl.setAttribute('cx', String(m.x));
                glowEl.setAttribute('cy', String(m.y));
                glowEl.style.opacity = String(glowOpacity.current * 0.35);
            }

            ctx.clearRect(0, 0, w, h);

            const grad = ctx.createLinearGradient(0, 0, w, h);
            grad.addColorStop(0, p.gradientFrom);
            grad.addColorStop(1, p.gradientTo);
            ctx.fillStyle = grad;

            const cr = p.cursorRadius;
            const crSq = cr * cr;
            const rad = p.dotRadius / 2;
            const isBulge = p.bulgeOnly;

            ctx.beginPath();

            for (let i = 0; i < dots.length; i++) {
                const d = dots[i];
                const dx = m.x - d.ax;
                const dy = m.y - d.ay;
                const distSq = dx * dx + dy * dy;

                if (distSq < crSq && eng > 0.01) {
                    const dist = Math.sqrt(distSq);

                    if (isBulge) {
                        const amount = 1 - dist / cr;
                        const push = amount * amount * p.bulgeStrength * eng;
                        const angle = Math.atan2(dy, dx);

                        d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
                        d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
                    } else {
                        const angle = Math.atan2(dy, dx);
                        const move = (500 / Math.max(dist, 1)) * (m.speed * p.cursorForce);

                        d.vx += Math.cos(angle) * -move;
                        d.vy += Math.sin(angle) * -move;
                    }
                } else if (isBulge) {
                    d.sx += (d.ax - d.sx) * 0.1;
                    d.sy += (d.ay - d.sy) * 0.1;
                }

                if (!isBulge) {
                    d.vx *= 0.9;
                    d.vy *= 0.9;
                    d.x = d.ax + d.vx;
                    d.y = d.ay + d.vy;
                    d.sx += (d.x - d.sx) * 0.1;
                    d.sy += (d.y - d.sy) * 0.1;
                }

                let drawX = d.sx;
                let drawY = d.sy;

                if (p.waveAmplitude > 0) {
                    drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
                    drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
                }

                if (p.sparkle) {
                    const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;

                    if ((hash % 100) < 3) {
                        ctx.moveTo(drawX + rad * 1.8, drawY);
                        ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
                    } else {
                        ctx.moveTo(drawX + rad, drawY);
                        ctx.arc(drawX, drawY, rad, 0, TWO_PI);
                    }
                } else {
                    ctx.moveTo(drawX + rad, drawY);
                    ctx.arc(drawX, drawY, rad, 0, TWO_PI);
                }
            }

            ctx.fill();
            rafRef.current = requestAnimationFrame(tick);
        };

        doResize();

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        rafRef.current = requestAnimationFrame(tick);

        rebuildRef.current = () => {
            const { w, h } = sizeRef.current;
            if (w > 0 && h > 0) buildDots(w, h);
        };

        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            window.clearInterval(speedInterval);
            if (resizeTimer) clearTimeout(resizeTimer);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    useEffect(() => {
        rebuildRef.current?.();
    }, [dotRadius, dotSpacing]);

    return (
        <div className={`dot-field-container ${className}`} style={style}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                }}
            />
            <svg
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                }}
            >
                <defs>
                    <radialGradient id={glowIdRef.current}>
                        <stop offset="0%" stopColor={glowColor} />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
                <circle
                    ref={glowRef}
                    cx="-9999"
                    cy="-9999"
                    r={glowRadius}
                    fill={`url(#${glowIdRef.current})`}
                    style={{ opacity: 0, willChange: 'opacity' }}
                />
            </svg>
        </div>
    );
});

DotField.displayName = 'DotField';

const styleBlock = `
    @keyframes blurWordReveal {
        0% { opacity: 0; filter: blur(14px); transform: translateY(-8px); }
        60% { opacity: 1; filter: blur(1px); transform: translateY(1px); }
        100% { opacity: 1; filter: blur(0px); transform: translateY(0); }
    }

    @keyframes ambientFloat {
        0% { transform: translate3d(-8px, -6px, 0) scale(1); opacity: 0.28; }
        50% { transform: translate3d(10px, 8px, 0) scale(1.04); opacity: 0.42; }
        100% { transform: translate3d(-8px, -6px, 0) scale(1); opacity: 0.28; }
    }

    @keyframes softSheen {
        0% { transform: translateX(-140%) rotate(8deg); opacity: 0; }
        35% { opacity: 0.35; }
        100% { transform: translateX(140%) rotate(8deg); opacity: 0; }
    }

    .profile-hero {
        --pair-card-height: 224px;
    }

    .contact-card,
    .opportunities-card {
        height: var(--pair-card-height) !important;
    }

    .opportunities-card:hover .ambient-orb {
        animation-play-state: running;
    }

    .ambient-orb {
        animation: ambientFloat 7s ease-in-out infinite;
        animation-play-state: paused;
    }

    .opportunities-card:hover .card-sheen {
        animation: softSheen 1.5s ease forwards;
    }

    .dot-field-container {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.08;
        transition: opacity 0.45s ease;
    }

    .opportunities-card:hover .dot-field-container {
        opacity: 0.2;
    }

    @media (max-width: 767px) {
        .profile-hero {
            --pair-card-height: 220px;
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 18px !important;
            width: 100% !important;
        }

        .hero-img-container {
            width: 108px !important;
            height: 108px !important;
            border-radius: 24px !important;
            align-self: center !important;
        }

        .hero-info {
            width: 100% !important;
            min-width: 0 !important;
            flex: none !important;
            align-items: center !important;
            text-align: center !important;
            gap: 8px !important;
        }

        .hero-info h1 {
            font-size: 30px !important;
            line-height: 1.04 !important;
            letter-spacing: -1.2px !important;
            max-width: 100% !important;
            text-align: center !important;
        }

        .hero-location {
            justify-content: center !important;
            font-size: 14px !important;
        }

        .hero-role {
            font-size: 20px !important;
            margin-bottom: 6px !important;
            text-align: center !important;
        }

        .hero-buttons {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            width: 100% !important;
            flex-wrap: nowrap !important;
        }

        .cv-button,
        .github-btn {
            width: 100% !important;
            height: 52px !important;
            justify-content: center !important;
        }

        .hero-cards-wrapper {
            width: 100% !important;
            flex: none !important;
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 14px !important;
            align-items: start !important;
        }

        .contact-card {
            width: 100% !important;
            min-height: 0 !important;
            padding: 12px !important;
            gap: 10px !important;
            align-self: start !important;
        }

        .opportunities-card {
            width: 100% !important;
            min-height: 0 !important;
            align-self: start !important;
        }

        .email-row {
            height: 46px !important;
            padding: 10px 12px !important;
            gap: 8px !important;
        }

        .email-icon-wrap {
            width: 22px !important;
            height: 22px !important;
        }

        .email-text {
            font-size: 12px !important;
        }

        .touch-email-pill {
            font-size: 10px !important;
            padding: 3px 8px !important;
            letter-spacing: 0.4px !important;
        }

        .social-grid {
            padding: 10px !important;
            gap: 8px !important;
        }

        .social-link {
            padding: 8px 9px !important;
            gap: 8px !important;
            min-height: 48px !important;
        }

        .social-icon-box {
            width: 24px !important;
            height: 24px !important;
        }

        .social-icon-box svg {
            width: 20px !important;
            height: 20px !important;
        }

        .social-label {
            font-size: 12px !important;
            line-height: 1.1 !important;
        }

        .slide-inner {
            padding: 20px !important;
        }

        .slide-main {
            font-size: 30px !important;
            line-height: 1.04 !important;
            letter-spacing: -0.9px !important;
        }

        .slide-secondary {
            font-size: 14px !important;
            line-height: 1.25 !important;
            color: #8c8c8c !important;
        }

        .greeting-word {
            font-size: 28px !important;
            line-height: 1.05 !important;
        }

        .ambient-orb {
            width: 160px !important;
            height: 160px !important;
        }
    }

    @media (max-width: 430px) {
        .profile-hero {
            --pair-card-height: 214px;
            gap: 16px !important;
        }

        .hero-img-container {
            width: 100px !important;
            height: 100px !important;
        }

        .hero-info h1 {
            font-size: 28px !important;
        }

        .hero-role {
            font-size: 19px !important;
        }

        .contact-card {
            padding: 11px !important;
        }

        .email-row {
            height: 44px !important;
        }

        .social-grid {
            padding: 9px !important;
        }

        .social-link {
            padding: 8px !important;
            gap: 7px !important;
        }

        .slide-inner {
            padding: 18px !important;
        }

        .slide-main {
            font-size: 28px !important;
        }

        .slide-secondary {
            font-size: 13px !important;
        }

        .greeting-word {
            font-size: 26px !important;
        }
    }

    @media (max-width: 375px) {
        .profile-hero {
            --pair-card-height: 206px;
            gap: 14px !important;
        }

        .hero-img-container {
            width: 92px !important;
            height: 92px !important;
            border-radius: 22px !important;
        }

        .hero-info h1 {
            font-size: 26px !important;
            letter-spacing: -0.8px !important;
        }

        .hero-role {
            font-size: 18px !important;
        }

        .contact-card {
            padding: 10px !important;
            gap: 8px !important;
        }

        .email-row {
            height: 42px !important;
            padding: 9px 10px !important;
        }

        .email-text {
            font-size: 11px !important;
        }

        .touch-email-pill {
            font-size: 9px !important;
            padding: 3px 7px !important;
        }

        .social-grid {
            padding: 8px !important;
            gap: 7px !important;
        }

        .social-link {
            min-height: 44px !important;
            padding: 7px !important;
        }

        .social-label {
            font-size: 11px !important;
        }

        .slide-inner {
            padding: 16px !important;
        }

        .slide-main {
            font-size: 25px !important;
        }

        .slide-secondary {
            font-size: 12px !important;
        }

        .greeting-word {
            font-size: 24px !important;
        }
    }
`;

export const ProfileHero = ({ data }: ProfileHeroProps) => {
    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
    const [hoveredGithub, setHoveredGithub] = useState(false);
    const [hoveredCvButton, setHoveredCvButton] = useState(false);
    const [hoveredContactCard, setHoveredContactCard] = useState(false);
    const [hoveredOpportunities, setHoveredOpportunities] = useState(false);
    const [hasCursor, setHasCursor] = useState(false);
    const [emailHovered, setEmailHovered] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [displayedSlide, setDisplayedSlide] = useState<Slide>(SLIDES[0]);
    const [isPaused, setIsPaused] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
    const [contentLifted, setContentLifted] = useState(false);
    const [greetingAnimKey, setGreetingAnimKey] = useState(0);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const elapsedRef = useRef(0);
    const startTimeRef = useRef<number>(0);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mq = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
        setHasCursor(mq.matches);

        const handler = (e: MediaQueryListEvent) => {
            setHasCursor(e.matches);
            if (!e.matches) {
                setEmailHovered(false);
                setHoveredOpportunities(false);
                setIsPaused(false);
                setContentLifted(false);
            }
        };

        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (isPaused) {
            if (timerRef.current) clearTimeout(timerRef.current);
            elapsedRef.current += Date.now() - startTimeRef.current;
            return;
        }

        const currentSlide = SLIDES[slideIndex];
        const remaining = currentSlide.duration - elapsedRef.current;
        startTimeRef.current = Date.now();

        timerRef.current = setTimeout(() => {
            setVisible(false);
            setTimeout(() => {
                const next = (slideIndex + 1) % SLIDES.length;
                elapsedRef.current = 0;
                setSlideIndex(next);
                setDisplayedSlide(SLIDES[next]);
                if (next === 0) setGreetingAnimKey((k) => k + 1);
                setVisible(true);
            }, 420);
        }, remaining > 0 ? remaining : 0);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [slideIndex, isPaused]);

    const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        setCursorPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleOpportunitiesEnter = () => {
        if (hasCursor) {
            setHoveredOpportunities(true);
            setIsPaused(true);
            setContentLifted(true);
        }
    };

    const handleOpportunitiesLeave = () => {
        setHoveredOpportunities(false);
        setIsPaused(false);
        setContentLifted(false);
    };

    const touchPillStyle: CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        fontSize: '11px',
        fontWeight: 700,
        color: '#000',
        border: '1.5px solid #000',
        borderRadius: '20px',
        padding: '4px 10px',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        textDecoration: 'none',
    };

    const socialLinkBaseStyle = (isActive: boolean, activeBackground: string): CSSProperties => ({
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        border: isActive ? '1px solid transparent' : '1px solid #e5e5e5',
        borderRadius: '12px',
        textDecoration: 'none',
        background: isActive ? activeBackground : '#fff',
        transform: hasCursor && isActive ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hasCursor && isActive ? '0 8px 20px rgba(0,0,0,0.12)' : 'none',
        transition: 'all 0.3s ease',
    });

    const contentSlide = displayedSlide as Extract<Slide, { type: 'content' }>;

    return (
        <section
            className="profile-hero"
            style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                width: '100%',
                flexWrap: 'wrap',
            }}
        >
            <style dangerouslySetInnerHTML={{ __html: styleBlock }} />

            <div
                className="hero-img-container"
                style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '32px',
                    background: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1.5px solid #000',
                }}
            >
                {data.profileImage ? (
                    <Image
                        src={data.profileImage}
                        alt={data.name}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    />
                ) : (
                    <span style={{ fontSize: '12px', opacity: 0.5 }}>image here</span>
                )}
            </div>

            <div
                className="hero-info"
                style={{
                    flex: '1 1 300px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    minWidth: '300px',
                }}
            >
                <h1 style={{ fontSize: '38px', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, color: '#000', margin: 0 }}>
                    {data.name}
                </h1>

                <div
                    className="hero-location"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1px',
                        color: '#000',
                        fontSize: '15px',
                    }}
                >
                    <IoLocationOutline size={18} color="#000" />
                    <span style={{ paddingTop: '2px' }}>{data.location}</span>
                </div>

                <div className="hero-role" style={{ fontSize: '22px', fontWeight: 500, color: '#000', marginBottom: '8px' }}>
                    {data.roles.join(' \\ ')}
                </div>

                <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                        href="/resume/GonzagaRalphDainiellCVresume-.pdf"
                        target="_blank"
                        download
                        className="cv-button"
                        onMouseEnter={() => setHoveredCvButton(true)}
                        onMouseLeave={() => setHoveredCvButton(false)}
                        style={{
                            background: hoveredCvButton ? '#1956d4' : '#2b6ef2',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '16px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            textDecoration: 'none',
                            fontSize: '15px',
                            height: '52px',
                            boxSizing: 'border-box',
                            transform: hasCursor && hoveredCvButton ? 'translateY(-2px)' : 'translateY(0)',
                            boxShadow: hasCursor && hoveredCvButton ? '0 10px 24px rgba(43,110,242,0.28)' : 'none',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                        }}
                    >
                        <GoFileZip size={18} color="#fff" />
                        Download CV
                    </a>

                    <a
                        href="https://github.com/Dainiell"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredGithub(true)}
                        onMouseLeave={() => setHoveredGithub(false)}
                        className="card github-btn"
                        style={{
                            padding: '12px 20px',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            fontWeight: 700,
                            fontSize: '16px',
                            height: '52px',
                            boxSizing: 'border-box',
                            border: '1.5px solid #000',
                            textDecoration: 'none',
                            background: hoveredGithub ? '#000' : '#fff',
                            color: hoveredGithub ? '#fff' : '#000',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill={hoveredGithub ? '#fff' : '#000'}
                            style={{ transition: 'fill 0.3s ease', flexShrink: 0 }}
                        >
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>

            <div
                className="hero-cards-wrapper"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    flex: '1 1 600px',
                    alignItems: 'start',
                }}
            >
                <div
                    className="no-lift contact-card"
                    onMouseEnter={() => {
                        if (hasCursor) setHoveredContactCard(true);
                    }}
                    onMouseLeave={() => setHoveredContactCard(false)}
                    style={{
                        height: 'var(--pair-card-height)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        borderRadius: '24px',
                        border: '1.5px solid #000',
                        background: '#fff',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        transform: hasCursor && hoveredContactCard ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: hasCursor && hoveredContactCard ? '0 12px 32px rgba(0,0,0,0.14)' : 'none',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'default',
                    }}
                >
                    <div
                        onMouseEnter={(e) => {
                            e.stopPropagation();
                            if (hasCursor) setEmailHovered(true);
                        }}
                        onMouseLeave={(e) => {
                            e.stopPropagation();
                            setEmailHovered(false);
                        }}
                        style={{
                            borderRadius: '14px',
                            transform: hasCursor && emailHovered ? 'translateY(-3px)' : 'translateY(0)',
                            boxShadow: hasCursor && emailHovered ? '0 8px 20px rgba(0,0,0,0.12)' : 'none',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            flexShrink: 0,
                        }}
                    >
                        <div
                            className="email-row"
                            style={{
                                border: '1.5px solid #000',
                                borderRadius: '14px',
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: hasCursor ? 'center' : 'flex-start',
                                boxSizing: 'border-box',
                                gap: '10px',
                                position: 'relative',
                                overflow: 'hidden',
                                width: '100%',
                            }}
                        >
                            {hasCursor ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        width: '100%',
                                        minWidth: 0,
                                    }}
                                >
                                    <div className="email-icon-wrap" style={{ width: '24px', height: '24px', position: 'relative', flexShrink: 0 }}>
                                        <Image src="/Images/Icons/email icon.png" alt="Email" fill style={{ objectFit: 'contain' }} />
                                    </div>

                                    <span
                                        className="email-text"
                                        style={{
                                            fontSize: '13px',
                                            fontWeight: 700,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            minWidth: 0,
                                            display: 'block',
                                            lineHeight: 1.2,
                                            letterSpacing: 'normal',
                                            transform: 'none',
                                        }}
                                    >
                                        {data.contact.email}
                                    </span>
                                </div>
                            ) : (
                                <>
                                    <div className="email-icon-wrap" style={{ width: '24px', height: '24px', position: 'relative', flexShrink: 0 }}>
                                        <Image src="/Images/Icons/email icon.png" alt="Email" fill style={{ objectFit: 'contain' }} />
                                    </div>

                                    <span
                                        className="email-text"
                                        style={{
                                            fontSize: '13px',
                                            fontWeight: 700,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            flex: '1 1 auto',
                                            minWidth: 0,
                                            display: 'block',
                                            lineHeight: 1.2,
                                            letterSpacing: 'normal',
                                            transform: 'none',
                                        }}
                                    >
                                        {data.contact.email}
                                    </span>

                                    <a className="touch-email-pill" href={`mailto:${data.contact.email}`} style={touchPillStyle}>
                                        SEND EMAIL
                                    </a>
                                </>
                            )}

                            {hasCursor && (
                                <a
                                    href={`mailto:${data.contact.email}`}
                                    aria-label="Send Email"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#000',
                                        color: '#fff',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        letterSpacing: '1px',
                                        textDecoration: 'none',
                                        borderRadius: '12px',
                                        transform: emailHovered ? 'translateX(0%)' : 'translateX(-100%)',
                                        pointerEvents: emailHovered ? 'auto' : 'none',
                                        transition: 'transform 0.35s ease',
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                    }}
                                >
                                    SEND EMAIL
                                </a>
                            )}
                        </div>
                    </div>

                    <div
                        className="social-grid"
                        style={{
                            border: '1.5px solid #000',
                            borderRadius: '14px',
                            padding: '12px 14px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '8px',
                            boxSizing: 'border-box',
                            flex: 1,
                            minHeight: 0,
                        }}
                    >
                        <Link
                            className="social-link"
                            href={data.socials.facebook || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('facebook')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={socialLinkBaseStyle(hoveredSocial === 'facebook', '#1877F2')}
                        >
                            <div className="social-icon-box" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'facebook' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </div>
                            <span className="social-label" style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'facebook' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>
                                Facebook
                            </span>
                        </Link>

                        <Link
                            className="social-link"
                            href={data.socials.instagram || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('instagram')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={{
                                ...socialLinkBaseStyle(false, '#fff'),
                                border: 'none',
                                overflow: 'hidden',
                                background: hoveredSocial === 'instagram' ? 'linear-gradient(to right, #8134af, #dd2a7b, #f58529)' : '#fff',
                                transform: hasCursor && hoveredSocial === 'instagram' ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hoveredSocial === 'instagram' ? (hasCursor ? '0 8px 20px rgba(0,0,0,0.12)' : 'none') : 'inset 0 0 0 1px #e5e5e5',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                            }}
                        >
                            <div className="social-icon-box" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transition: 'all 0.3s ease' }}>
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke={hoveredSocial === 'instagram' ? '#fff' : '#555'} strokeWidth="2" fill="none" />
                                    <circle cx="12" cy="12" r="4" stroke={hoveredSocial === 'instagram' ? '#fff' : '#555'} strokeWidth="2" fill="none" />
                                    <circle cx="17.5" cy="6.5" r="1.5" fill={hoveredSocial === 'instagram' ? '#fff' : '#555'} />
                                </svg>
                            </div>
                            <span className="social-label" style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'instagram' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>
                                Instagram
                            </span>
                        </Link>

                        <Link
                            className="social-link"
                            href={data.socials.youtube || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('youtube')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={socialLinkBaseStyle(hoveredSocial === 'youtube', '#FF0000')}
                        >
                            <div className="social-icon-box" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'youtube' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </div>
                            <span className="social-label" style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'youtube' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>
                                YouTube
                            </span>
                        </Link>

                        <Link
                            className="social-link"
                            href={data.socials.linkedin || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('linkedin')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            style={socialLinkBaseStyle(hoveredSocial === 'linkedin', '#0A66C2')}
                        >
                            <div className="social-icon-box" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={hoveredSocial === 'linkedin' ? '#fff' : '#555'} style={{ transition: 'all 0.3s ease' }}>
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <span className="social-label" style={{ fontSize: '13px', fontWeight: 600, color: hoveredSocial === 'linkedin' ? '#fff' : '#333', transition: 'all 0.3s ease' }}>
                                LinkedIn
                            </span>
                        </Link>
                    </div>
                </div>

                <div
                    ref={cardRef}
                    className="card opportunities-card"
                    onMouseEnter={handleOpportunitiesEnter}
                    onMouseLeave={handleOpportunitiesLeave}
                    onMouseMove={handleCardMouseMove}
                    style={{
                        height: 'var(--pair-card-height)',
                        borderRadius: '24px',
                        border: '1.5px solid #000',
                        background: '#fff',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        position: 'relative',
                        transform: hasCursor && hoveredOpportunities ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: hasCursor && hoveredOpportunities
                            ? '0 12px 32px rgba(0,0,0,0.13), inset 0 0 0 0.5px rgba(0,0,0,0.05)'
                            : 'none',
                        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                        cursor: 'default',
                    }}
                >
                    {hasCursor && (
                        <DotField
                            dotRadius={2}
                            dotSpacing={14}
                            cursorRadius={420}
                            bulgeStrength={34}
                            glowRadius={150}
                            sparkle={false}
                            waveAmplitude={0}
                            gradientFrom="#000000"
                            gradientTo="#000000"
                            glowColor="#000000"
                        />
                    )}

                    <div
                        className="ambient-orb"
                        style={{
                            position: 'absolute',
                            width: '190px',
                            height: '190px',
                            borderRadius: '999px',
                            right: '-58px',
                            top: '-70px',
                            background: 'radial-gradient(circle, rgba(0,0,0,0.055) 0%, rgba(0,0,0,0.02) 42%, transparent 70%)',
                            pointerEvents: 'none',
                            zIndex: 0,
                        }}
                    />

                    <div
                        className="card-sheen"
                        style={{
                            position: 'absolute',
                            top: '-35%',
                            left: 0,
                            width: '42%',
                            height: '170%',
                            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.045), transparent)',
                            pointerEvents: 'none',
                            zIndex: 1,
                            opacity: 0,
                        }}
                    />

                    <svg
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            zIndex: 0,
                            opacity: hoveredOpportunities ? 0.035 : 0.015,
                            transition: 'opacity 0.5s ease',
                        }}
                    >
                        <defs>
                            <pattern id="minimalgrid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                                <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#000" strokeWidth="0.45" opacity="0.18" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#minimalgrid)" />
                    </svg>

                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none',
                            zIndex: 1,
                            borderRadius: '22px',
                            opacity: hasCursor && hoveredOpportunities ? 1 : 0,
                            background: `radial-gradient(ellipse 190px 150px at ${cursorPos.x}% ${cursorPos.y}%, rgba(0,0,0,0.045) 0%, transparent 72%)`,
                            transition: 'opacity 0.4s ease',
                        }}
                    />

                    <div
                        className="slide-inner"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            padding: '26px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 3,
                            opacity: visible ? 1 : 0,
                            transform: visible
                                ? contentLifted
                                    ? 'translateY(-4px) scale(1.012)'
                                    : 'translateY(0px) scale(1)'
                                : 'translateY(10px) scale(0.97)',
                            filter: visible ? 'blur(0px)' : 'blur(2px)',
                            transition: 'opacity 0.42s cubic-bezier(0.4,0,0.2,1), transform 0.42s cubic-bezier(0.4,0,0.2,1), filter 0.42s cubic-bezier(0.4,0,0.2,1)',
                            willChange: 'opacity, transform, filter',
                        }}
                    >
                        {displayedSlide.type === 'greeting' ? (
                            <div
                                key={greetingAnimKey}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    flexWrap: 'wrap',
                                    textAlign: 'center',
                                }}
                            >
                                {GREETING_WORDS.map((word, i) => (
                                    <span
                                        className="greeting-word"
                                        key={`${greetingAnimKey}-${i}`}
                                        style={{
                                            display: 'inline-block',
                                            fontSize: 'clamp(25px, 2.7vw, 34px)',
                                            fontWeight: 800,
                                            color: '#000',
                                            letterSpacing: '-0.8px',
                                            lineHeight: 1.08,
                                            opacity: 0,
                                            animation: 'blurWordReveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                                            animationDelay: `${i * 130}ms`,
                                        }}
                                    >
                                        {word}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '13px',
                                    textAlign: 'center',
                                    width: '100%',
                                    maxWidth: '360px',
                                }}
                            >
                                <p
                                    className="slide-main"
                                    style={{
                                        fontSize: 'clamp(27px, 3vw, 40px)',
                                        fontWeight: 800,
                                        color: '#000',
                                        margin: 0,
                                        letterSpacing: '-1.1px',
                                        lineHeight: 1.02,
                                    }}
                                >
                                    {contentSlide.main}
                                </p>

                                <div
                                    style={{
                                        width: '34px',
                                        height: '2px',
                                        background: '#e3e3e3',
                                        borderRadius: '99px',
                                        flexShrink: 0,
                                    }}
                                />

                                <p
                                    className="slide-secondary"
                                    style={{
                                        fontSize: 'clamp(13px, 1.2vw, 16px)',
                                        fontWeight: 650,
                                        color: '#9a9a9a',
                                        margin: 0,
                                        letterSpacing: '0.2px',
                                        lineHeight: 1.25,
                                    }}
                                >
                                    {contentSlide.secondary}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    setHasMouse(mq.matches);

    const handler = (e: MediaQueryListEvent) => {
      setHasMouse(e.matches);
      if (!e.matches) setIsHovered(false);
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="card proj-section"
      onMouseEnter={() => {
        if (hasMouse) setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hasMouse && isHovered
            ? "translateY(-2px)"
            : "translateY(0px)"
          : "translateY(32px)",
        boxShadow: hasMouse && isHovered ? "0 12px 32px rgba(0, 0, 0, 0.13)" : "none",
        transition: visible
          ? "transform 0.3s ease, box-shadow 0.3s ease"
          : "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <Image
          src="/Images/Icons/ProjectsIcon.png"
          alt="Projects"
          width={25}
          height={25}
          style={{ objectFit: "contain" }}
        />
        <h2 style={{ fontSize: "22px", fontWeight: "700", margin: 0, paddingTop: "3px" }}>
          Projects
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 0",
          color: "#6b7280",
        }}
      >
        Coming Soon
      </div>
    </section>
  );
}
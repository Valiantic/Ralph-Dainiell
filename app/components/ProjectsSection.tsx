"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className={`card proj-section${visible ? " proj-visible" : ""}`}
      style={{ width: "100%", background: "#fff" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <Image
          src="/Images/Icons/ProjectsIcon.png"
          alt="Projects"
          width={28}
          height={28}
          style={{ objectFit: "contain" }}
        />
        <h2 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>
          Projects
        </h2>
      </div>

      <div style={{ textAlign: "center", padding: "2rem 0", color: "#6b7280" }}>
        Coming Soon
      </div>

      <style jsx>{`
        .proj-section {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .proj-section.proj-visible {
          opacity: 1;
          transform: translateY(0px);
        }
        .proj-section.proj-visible:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
      `}</style>
    </section>
  );
}
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
      className={`card no-lift proj-section${visible ? " proj-visible" : ""}`}
      style={{ width: "100%", background: "#fff" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
        <div style={{ width: "32px", height: "32px", position: "relative" }}>
          <Image src="/Images/Icons/Projecticon.png" alt="Projects" fill style={{ objectFit: "contain" }} />
        </div>
        <h2 style={{ fontSize: "32px", fontWeight: 800 }}>Projects</h2>
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
      `}</style>
    </section>
  );
}
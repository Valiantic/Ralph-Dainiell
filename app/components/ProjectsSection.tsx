"use client";

import Image from "next/image";

export default function ProjectsSection() {
  return (
    <section
      className="card"
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
    </section>
  );
}
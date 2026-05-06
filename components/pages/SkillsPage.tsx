"use client";
import { useEffect, useRef } from "react";

const skills = [
  { name: "TypeScript", level: 95, color: "#6eb5ff", years: "5 yrs" },
  { name: "React / Next.js", level: 92, color: "#6eb5ff", years: "5 yrs" },
  { name: "Node.js", level: 88, color: "#7ef5b0", years: "6 yrs" },
  { name: "Python", level: 80, color: "#ffc96b", years: "4 yrs" },
  { name: "Rust", level: 65, color: "#ff8fcb", years: "2 yrs" },
  { name: "Solidity", level: 70, color: "#7ef5b0", years: "2 yrs" },
  { name: "Three.js / WebGL", level: 75, color: "#ff8fcb", years: "3 yrs" },
  { name: "PostgreSQL", level: 85, color: "#ffc96b", years: "5 yrs" },
];

const toolGroups = [
  {
    label: "Frontend",
    color: "#6eb5ff",
    colorDim: "rgba(110,181,255,0.08)",
    tools: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
  },
  {
    label: "Backend",
    color: "#7ef5b0",
    colorDim: "rgba(126,245,176,0.07)",
    tools: ["Node.js", "FastAPI", "Python", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    label: "Infrastructure",
    color: "#ffc96b",
    colorDim: "rgba(255,201,107,0.07)",
    tools: ["Docker", "AWS", "Vercel", "GitHub Actions", "Terraform", "Nginx"],
  },
  {
    label: "Web3",
    color: "#ff8fcb",
    colorDim: "rgba(255,143,203,0.07)",
    tools: ["Solidity", "Hardhat", "ethers.js", "IPFS", "Wagmi", "The Graph"],
  },
];

const timeline = [
  { year: "2024", title: "Senior Engineer", place: "Vercel", desc: "Core contributor to edge runtime and analytics platform." },
  { year: "2022", title: "Full-Stack Engineer", place: "Stripe", desc: "Built internal tooling and payments dashboard used by 3k+ employees." },
  { year: "2020", title: "Frontend Developer", place: "Freelance", desc: "Delivered 20+ client projects across SaaS, fintech and e-commerce." },
  { year: "2018", title: "CS Graduate", place: "UC Berkeley", desc: "B.Sc. Computer Science with focus on distributed systems." },
];

export default function SkillsPage({ onClose }: { onClose: () => void }) {
  const barsRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const animateBars = () => {
      if (animated.current) return;
      animated.current = true;
      document.querySelectorAll(".sp-bar-fill").forEach((el: any) => {
        setTimeout(() => {
          el.style.width = el.dataset.w + "%";
        }, 100);
      });
    };

    const timeout = setTimeout(animateBars, 200);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <style>{`
        .sp-wrap {
          min-height: 100vh;
          padding-bottom: 80px;
          font-family: 'Inter', sans-serif;
        }

        .sp-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          background: rgba(10,10,11,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .sp-nav-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
        }

        .sp-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.55);
          cursor: pointer;
          transition: all 0.2s;
        }
        .sp-back:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.2);
        }

        .sp-header {
          padding: 56px 48px 40px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
        }

        .sp-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(110,181,255,0.6);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .sp-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.035em;
          line-height: 1;
          margin-bottom: 12px;
        }

        .sp-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
          max-width: 400px;
        }

        .sp-stat-row {
          display: flex;
          gap: 32px;
          flex-shrink: 0;
        }

        .sp-stat {
          text-align: right;
        }

        .sp-stat-val {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .sp-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.28);
          margin-top: 1px;
        }

        .sp-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 0 48px;
        }

        .sp-body {
          padding: 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .sp-section-label {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .sp-bars {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sp-bar-row {}

        .sp-bar-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }

        .sp-bar-name {
          font-size: 12.5px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }

        .sp-bar-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sp-bar-years {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.2);
        }

        .sp-bar-pct {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.28);
          min-width: 28px;
          text-align: right;
        }

        .sp-bar-track {
          height: 2.5px;
          background: rgba(255,255,255,0.06);
          border-radius: 3px;
          overflow: hidden;
        }

        .sp-bar-fill {
          height: 100%;
          border-radius: 3px;
          width: 0%;
          transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sp-tools {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sp-tool-group {
          padding: 16px 18px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(16,16,18,0.6);
        }

        .sp-tool-group-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          margin-bottom: 10px;
          font-weight: 500;
        }

        .sp-tool-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .sp-tool-pill {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.38);
          background: rgba(255,255,255,0.03);
          transition: color 0.2s, border-color 0.2s;
        }
        .sp-tool-pill:hover {
          color: rgba(255,255,255,0.65);
          border-color: rgba(255,255,255,0.14);
        }

        .sp-timeline-wrap {
          padding: 0 48px 48px;
        }

        .sp-timeline {
          position: relative;
          padding-left: 24px;
          border-left: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .sp-timeline-item {
          position: relative;
        }

        .sp-timeline-dot {
          position: absolute;
          left: -28.5px;
          top: 5px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6eb5ff;
          border: 2px solid #0a0a0b;
        }

        .sp-timeline-year {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          color: rgba(255,255,255,0.28);
          margin-bottom: 3px;
        }

        .sp-timeline-title {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.82);
          letter-spacing: -0.015em;
        }

        .sp-timeline-place {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(110,181,255,0.65);
          margin-bottom: 4px;
        }

        .sp-timeline-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
        }
      `}</style>

      <div className="sp-wrap">
        <nav className="sp-nav">
          <span className="sp-nav-label">Expertise / Skills</span>
          <button className="sp-back" onClick={onClose}>← Back</button>
        </nav>

        <header className="sp-header">
          <div>
            <div className="sp-eyebrow">Expertise</div>
            <h1 className="sp-title">Skills & Stack</h1>
            <p className="sp-subtitle">
              Technologies I reach for every day, and a few I'm still learning.
            </p>
          </div>
          <div className="sp-stat-row">
            <div className="sp-stat">
              <div className="sp-stat-val" style={{ color: "#6eb5ff" }}>6+</div>
              <div className="sp-stat-label">Years exp</div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-val" style={{ color: "#7ef5b0" }}>18k</div>
              <div className="sp-stat-label">GitHub stars</div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-val" style={{ color: "#ffc96b" }}>32+</div>
              <div className="sp-stat-label">Projects</div>
            </div>
          </div>
        </header>

        <div className="sp-divider" />

        <div className="sp-body" ref={barsRef}>
          <div>
            <div className="sp-section-label">Proficiency</div>
            <div className="sp-bars">
              {skills.map((s) => (
                <div key={s.name} className="sp-bar-row">
                  <div className="sp-bar-meta">
                    <span className="sp-bar-name">{s.name}</span>
                    <div className="sp-bar-right">
                      <span className="sp-bar-years">{s.years}</span>
                      <span className="sp-bar-pct">{s.level}%</span>
                    </div>
                  </div>
                  <div className="sp-bar-track">
                    <div
                      className="sp-bar-fill"
                      data-w={s.level}
                      style={{ background: s.color, boxShadow: `0 0 6px ${s.color}55` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="sp-section-label">Tools & Ecosystem</div>
            <div className="sp-tools">
              {toolGroups.map((g) => (
                <div key={g.label} className="sp-tool-group">
                  <div className="sp-tool-group-label" style={{ color: g.color }}>{g.label}</div>
                  <div className="sp-tool-pills">
                    {g.tools.map((t) => (
                      <span key={t} className="sp-tool-pill">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sp-divider" />

        <div className="sp-timeline-wrap" style={{ paddingTop: 36 }}>
          <div className="sp-section-label">Experience Timeline</div>
          <div className="sp-timeline">
            {timeline.map((t) => (
              <div key={t.year} className="sp-timeline-item">
                <div className="sp-timeline-dot" />
                <div className="sp-timeline-year">{t.year}</div>
                <div className="sp-timeline-title">{t.title}</div>
                <div className="sp-timeline-place">{t.place}</div>
                <div className="sp-timeline-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
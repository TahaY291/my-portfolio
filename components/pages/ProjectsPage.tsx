"use client";
import { useEffect } from "react";

const projects = [
  {
    id: "neuraldash",
    title: "NeuralDash",
    subtitle: "AI-powered analytics dashboard",
    year: "2024",
    role: "Lead Engineer",
    color: "#6eb5ff",
    colorDim: "rgba(110,181,255,0.1)",
    colorBorder: "rgba(110,181,255,0.2)",
    emoji: "⚡",
    desc: "A real-time analytics platform that uses machine learning to surface anomalies and trends in business data. Built for teams who need instant insight without a data science background.",
    highlights: [
      "Processes 2M+ events/day with sub-100ms latency",
      "Anomaly detection model with 94% precision",
      "Custom drag-and-drop dashboard builder",
      "Deployed to 40+ enterprise clients",
    ],
    tech: ["React", "Python", "TensorFlow", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    link: "https://github.com",
  },
  {
    id: "flowmint",
    title: "FlowMint",
    subtitle: "Web3 marketplace for creators",
    year: "2023",
    role: "Full-Stack Developer",
    color: "#7ef5b0",
    colorDim: "rgba(126,245,176,0.08)",
    colorBorder: "rgba(126,245,176,0.18)",
    emoji: "🌿",
    desc: "A decentralized marketplace that lets creators mint, sell and license digital assets as NFTs — with built-in royalty enforcement on every resale via smart contracts.",
    highlights: [
      "$1.2M+ in creator earnings to date",
      "Zero-gas minting via meta-transactions",
      "IPFS-pinned assets with redundant gateways",
      "Supports ERC-721 and ERC-1155 standards",
    ],
    tech: ["Next.js", "Solidity", "IPFS", "ethers.js", "Hardhat", "Tailwind", "Vercel"],
    link: "https://github.com",
  },
  {
    id: "sonique",
    title: "Sonique",
    subtitle: "Spatial audio with 3D sound engine",
    year: "2023",
    role: "Creative Technologist",
    color: "#ff8fcb",
    colorDim: "rgba(255,143,203,0.08)",
    colorBorder: "rgba(255,143,203,0.18)",
    emoji: "🎧",
    desc: "An experimental browser-based DAW with a 3D audio positioning engine. Users can place sound sources in a virtual room and export spatialized mixes — all running in-browser with zero latency.",
    highlights: [
      "HRTF-based binaural rendering in real-time",
      "Rust WASM core for audio processing",
      "Three.js 3D scene for sound placement UI",
      "WebAudio worklets for zero-latency playback",
    ],
    tech: ["WebAudio API", "Three.js", "Rust", "WASM", "TypeScript", "Vite"],
    link: "https://github.com",
  },
];

export default function ProjectsPage({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <style>{`
        .pp-wrap {
          min-height: 100vh;
          padding: 0 0 80px 0;
          font-family: 'Inter', sans-serif;
        }

        .pp-nav {
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

        .pp-nav-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
        }

        .pp-back {
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
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .pp-back:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.2);
        }

        .pp-header {
          padding: 56px 48px 40px;
        }

        .pp-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(110,181,255,0.6);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .pp-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.035em;
          line-height: 1;
          margin-bottom: 14px;
        }

        .pp-subtitle {
          font-size: 15px;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
          max-width: 480px;
        }

        .pp-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 0 48px;
        }

        .pp-projects {
          padding: 48px 48px 0;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .pp-project-card {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          background: rgba(16,16,18,0.8);
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .pp-project-card:hover {
          border-color: rgba(255,255,255,0.11);
          transform: translateY(-2px);
        }

        .pp-project-top {
          padding: 32px 32px 0;
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .pp-project-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
          border: 1px solid;
        }

        .pp-project-meta {
          flex: 1;
        }

        .pp-project-tags {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .pp-project-year {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
        }

        .pp-project-role {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
        }

        .pp-project-dot {
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
        }

        .pp-project-title {
          font-size: 22px;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          letter-spacing: -0.025em;
          margin-bottom: 2px;
        }

        .pp-project-subtitle {
          font-size: 12.5px;
          color: rgba(255,255,255,0.35);
        }

        .pp-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 14px;
          border-radius: 999px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          border: 1px solid;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          flex-shrink: 0;
        }

        .pp-project-body {
          padding: 20px 32px 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .pp-project-desc {
          font-size: 13px;
          line-height: 1.75;
          color: rgba(255,255,255,0.42);
        }

        .pp-project-right {}

        .pp-highlights-label {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .pp-highlights {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 20px;
        }

        .pp-highlight-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          line-height: 1.5;
        }

        .pp-highlight-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .pp-tech-label {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .pp-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .pp-tech-pill {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.03);
        }
      `}</style>

      <div className="pp-wrap">
        <nav className="pp-nav">
          <span className="pp-nav-label">Work / Projects</span>
          <button className="pp-back" onClick={onClose}>← Back</button>
        </nav>

        <header className="pp-header">
          <div className="pp-eyebrow">Selected Work</div>
          <h1 className="pp-title">Projects</h1>
          <p className="pp-subtitle">
            A curated selection of things I've built — from AI dashboards to Web3 marketplaces and audio experiments.
          </p>
        </header>

        <div className="pp-divider" />

        <div className="pp-projects">
          {projects.map((p) => (
            <div key={p.id} className="pp-project-card">
              <div className="pp-project-top">
                <div
                  className="pp-project-icon"
                  style={{ background: p.colorDim, borderColor: p.colorBorder }}
                >
                  {p.emoji}
                </div>
                <div className="pp-project-meta">
                  <div className="pp-project-tags">
                    <span className="pp-project-year">{p.year}</span>
                    <span className="pp-project-dot" />
                    <span className="pp-project-role">{p.role}</span>
                  </div>
                  <div className="pp-project-title">{p.title}</div>
                  <div className="pp-project-subtitle">{p.subtitle}</div>
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="pp-link-btn"
                  style={{
                    color: p.color,
                    borderColor: p.colorBorder,
                    background: p.colorDim,
                  }}
                >
                  View ↗
                </a>
              </div>

              <div className="pp-project-body">
                <p className="pp-project-desc">{p.desc}</p>
                <div className="pp-project-right">
                  <div className="pp-highlights-label">Highlights</div>
                  <div className="pp-highlights">
                    {p.highlights.map((h) => (
                      <div key={h} className="pp-highlight-row">
                        <span className="pp-highlight-dot" style={{ background: p.color }} />
                        {h}
                      </div>
                    ))}
                  </div>
                  <div className="pp-tech-label">Stack</div>
                  <div className="pp-tech-pills">
                    {p.tech.map((t) => (
                      <span key={t} className="pp-tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
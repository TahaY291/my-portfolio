"use client";

const projects = [
  {
    title: "NeuralDash",
    desc: "AI-powered analytics dashboard",
    techs: ["React", "Python", "TensorFlow"],
    color: "var(--accent-blue)",
  },
  {
    title: "FlowMint",
    desc: "Web3 marketplace for creators",
    techs: ["Next.js", "Solidity", "IPFS"],
    color: "var(--accent-green)",
  },
  {
    title: "Sonique",
    desc: "Spatial audio with 3D sound engine",
    techs: ["WebAudio", "Three.js", "Rust"],
    color: "var(--accent-pink)",
  },
];

export default function ProjectsCard({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');

        .projects-card {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 24px 24px;
          border-radius: 22px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;

          background: rgba(14, 14, 16, 0.85);
          backdrop-filter: blur(32px) saturate(1.8) brightness(0.8);
          -webkit-backdrop-filter: blur(32px) saturate(1.8) brightness(0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 16px 56px rgba(0, 0, 0, 0.80),
            0 4px 18px rgba(0, 0, 0, 0.6),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.20),
            inset 0 -1px 0 rgba(255, 255, 255, 0.03);

          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .projects-card::before {
          content: "";
          position: absolute;
          top: -50px; left: -35px;
          width: 240px; height: 150px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 40% 40%,
            rgba(255,255,255,0.14) 0%,
            rgba(255,255,255,0.05) 35%,
            transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .projects-card > * { position: relative; z-index: 1; }

        .projects-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.90),
            0 8px 24px rgba(0, 0, 0, 0.65),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.25),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05);
        }

        .projects-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.32);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .projects-title {
          font-size: 18px;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.02em;
          margin: 0 0 20px 0;
        }

        .project-item {
          padding: 14px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          gap: 5px;
          transition: background 0.15s ease;
          flex: 1;
          justify-content: center;
        }

        .project-item:last-of-type {
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .project-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .project-item-title {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.88);
          letter-spacing: -0.01em;
        }

        .project-item-arrow {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          transition: color 0.15s ease, transform 0.15s ease;
        }

        .projects-card:hover .project-item-arrow {
          color: rgba(255,255,255,0.55);
          transform: translate(2px, -2px);
        }

        .project-item-desc {
          font-size: 11.5px;
          color: rgba(255,255,255,0.32);
          line-height: 1.5;
        }

        .project-item-techs {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          margin-top: 2px;
        }

        .project-tech {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 2px 8px;
          border-radius: 999px;
        }

        .projects-footer {
          margin-top: auto;
          padding-top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .projects-count {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.08em;
        }

        .projects-cta {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(110,181,255,0.75);
          transition: color 0.15s ease;
        }

        .projects-card:hover .projects-cta {
          color: rgba(110,181,255,1);
        }
      `}</style>

      <div className="projects-card" onClick={onClick}>
        <div className="projects-label">Work</div>
        <h3 className="projects-title">Projects</h3>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {projects.map((p) => (
            <div key={p.title} className="project-item">
              <div className="project-item-header">
                <span className="project-item-title">{p.title}</span>
                <span className="project-item-arrow">↗</span>
              </div>
              <span className="project-item-desc">{p.desc}</span>
              <div className="project-item-techs">
                {p.techs.map((t) => (
                  <span key={t} className="project-tech">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="projects-footer">
          <span className="projects-count">3 projects</span>
          <span className="projects-cta">View all →</span>
        </div>
      </div>
    </>
  );
}
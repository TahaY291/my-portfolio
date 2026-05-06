"use client";

const skills = [
  { name: "TypeScript", level: 95, color: "var(--accent-blue)" },
  { name: "React / Next.js", level: 92, color: "var(--accent-blue)" },
  { name: "Node.js", level: 88, color: "var(--accent-green)" },
  { name: "Python", level: 80, color: "var(--accent-amber)" },
];

export default function SkillsCard({ onClick }: {onClick: (e: React.MouseEvent) => void }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');

        .skills-card {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 18px 20px;
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

        .skills-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 24px 70px rgba(0,0,0,0.90),
            0 8px 24px rgba(0,0,0,0.65),
            inset 0 1.5px 0 rgba(255,255,255,0.25);
        }

        .skills-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          flex-shrink: 0;
        }

        .skills-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.32);
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .skills-title {
          font-size: 15px;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          margin: 0;
        }

        .skills-arrow {
          width: 26px; height: 26px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.35);
          font-size: 12px;
        }

        .skills-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          min-height: 0;
        }

        .skill-row {
          min-height: 0;
        }

        .skill-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .skill-name {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          color: rgba(255,255,255,0.45);
        }

        .skill-pct {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
        }

        .skill-track {
          height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 2px;
        }

        .skill-fill {
          height: 100%;
          border-radius: 2px;
        }
      `}</style>

      <div className="skills-card" onClick={onClick}>
        <div className="skills-header">
          <div>
            <div className="skills-label">Expertise</div>
            <h3 className="skills-title">Skills</h3>
          </div>
          <div className="skills-arrow">↗</div>
        </div>

        <div className="skills-list">
          {skills.map((s) => (
            <div key={s.name} className="skill-row">
              <div className="skill-meta">
                <span className="skill-name">{s.name}</span>
                <span className="skill-pct">{s.level}%</span>
              </div>
              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{
                    width: `${s.level}%`,
                    background: s.color,
                    boxShadow: `0 0 6px ${s.color}66`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
"use client";

interface ProjectCardProps {
  title: string;
  desc: string;
  color: string;
  techs: string[];
  category?: string;
  icon?: string;
  onClick: () => void;
}

export default function ProjectCard({
  title,
  desc,
  color,
  techs,
  category,
  icon,
  onClick,
}: ProjectCardProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');

        .bubble-card {
          position: relative;
          padding: 22px 20px 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 220px;
          width: 280px;
          border-radius: 22px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          overflow: hidden;

          /* Deeper, darker glassy background */
          background: rgba(14, 14, 16, 0.85);
          backdrop-filter: blur(32px) saturate(1.8) brightness(0.8);
          -webkit-backdrop-filter: blur(32px) saturate(1.8) brightness(0.8);

          /* Frosted border */
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 16px 56px rgba(0, 0, 0, 0.80),
            0 4px 18px rgba(0, 0, 0, 0.6),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.20),
            inset 0 -1px 0 rgba(255, 255, 255, 0.03);

          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        /* Strong white light reflection blob — top-left */
        .bubble-card::before {
          content: "";
          position: absolute;
          top: -50px;
          left: -35px;
          width: 240px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 40% 40%,
            rgba(255,255,255,0.16) 0%,
            rgba(255,255,255,0.06) 35%,
            transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* Bottom-right ambient glow */
        .bubble-card::after {
          content: "";
          position: absolute;
          bottom: -35px;
          right: -25px;
          width: 160px;
          height: 110px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .bubble-card > * { position: relative; z-index: 1; }

        .bubble-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.90),
            0 8px 24px rgba(0, 0, 0, 0.65),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.25),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05);
        }

        .bubble-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          margin-bottom: 16px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            0 2px 10px rgba(0,0,0,0.4);
          flex-shrink: 0;
        }

        .bubble-category {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.32);
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .bubble-title {
          font-size: 18px;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.02em;
          margin: 0 0 10px 0;
          line-height: 1.2;
        }

        .bubble-desc {
          font-size: 12.5px;
          line-height: 1.65;
          color: rgba(255,255,255,0.36);
          flex-grow: 1;
          margin-bottom: 20px;
        }

        .bubble-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .bubble-tech-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 13px;
          border-radius: 999px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.42);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        .bubble-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 15px;
          border-radius: 999px;
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.72);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.13);
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
          white-space: nowrap;
        }

        .bubble-explore-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.26);
          color: #fff;
        }
      `}</style>

      <div className="bubble-card" onClick={onClick}>
        <div className="bubble-icon-box">{icon}</div>
        <div className="bubble-category">{category}</div>
        <h3 className="bubble-title">{title}</h3>
        <p className="bubble-desc">{desc}</p>

        <div className="bubble-footer">
          {techs.length > 0 && (
            <span className="bubble-tech-badge">{techs[0]}</span>
          )}
          <button
            className="bubble-explore-btn"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            Explore →
          </button>
        </div>
      </div>
    </>
  );
}
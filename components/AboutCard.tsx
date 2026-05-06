"use client";

export default function AboutCard({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');

        .about-bubble-card {
          position: relative;
          padding: 22px 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 22px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          overflow: hidden;

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

        .about-bubble-card::before {
          content: "";
          position: absolute;
          top: -45px;
          left: -30px;
          width: 220px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 40% 40%,
            rgba(255,255,255,0.16) 0%,
            rgba(255,255,255,0.06) 35%,
            transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .about-bubble-card::after {
          content: "";
          position: absolute;
          bottom: -30px;
          right: -20px;
          width: 150px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(251,191,36,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .about-bubble-card > * { position: relative; z-index: 1; }

        .about-bubble-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.90),
            0 8px 24px rgba(0, 0, 0, 0.65),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.25),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05);
        }

        .about-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.32);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .about-title {
          font-size: 16px;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.02em;
          margin: 0 0 12px 0;
        }

        .about-desc {
          font-size: 12.5px;
          line-height: 1.7;
          color: rgba(255,255,255,0.36);
          margin: 0;
        }

        .about-tags {
          display: flex;
          gap: 6px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .about-tag {
          display: inline-flex;
          align-items: center;
          padding: 4px 11px;
          border-radius: 999px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.42);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          letter-spacing: 0.01em;
        }

        .about-read-more {
          display: flex;
          justify-content: flex-end;
          margin-top: 12px;
        }

        .about-read-more span {
          font-size: 11px;
          color: rgba(251,191,36,0.7);
          font-family: 'DM Mono', monospace;
          transition: color 0.15s ease;
        }

        .about-bubble-card:hover .about-read-more span {
          color: rgba(251,191,36,1);
        }
      `}</style>

      <div className="about-bubble-card" onClick={onClick}>
        <div>
          <div className="about-label">Who I Am</div>
          <h3 className="about-title">About</h3>
          <p className="about-desc">
            Based in SF · 6 yrs exp · Prev. Stripe, Vercel. Obsessed with the craft of software.
          </p>
          <div className="about-tags">
            {["☕ Coffee", "🎸 Guitar", "🏔 Hiking"].map(tag => (
              <span key={tag} className="about-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="about-read-more">
          <span>Read more →</span>
        </div>
      </div>
    </>
  );
}
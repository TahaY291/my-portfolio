"use client";
import { useState, useEffect } from "react";

const roles = ["Full-Stack Developer", "UI/UX Craftsman", "Creative Coder", "Open Source Builder"];

export default function IntroCard() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setRoleIdx(i => (i + 1) % roles.length); setVisible(true); }, 280);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .intro-bubble-card {
          position: relative;
          padding: 28px 26px;
          height: 100%;
          min-height: 360px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 22px;
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
        }

        /* Top-left white reflection blob */
        .intro-bubble-card::before {
          content: "";
          position: absolute;
          top: -55px;
          left: -40px;
          width: 260px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 40% 40%,
            rgba(255,255,255,0.16) 0%,
            rgba(255,255,255,0.06) 35%,
            transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* Bottom-right ambient */
        .intro-bubble-card::after {
          content: "";
          position: absolute;
          bottom: -40px;
          right: -30px;
          width: 180px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .intro-bubble-card > * { position: relative; z-index: 1; }

        .intro-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            0 2px 10px rgba(0,0,0,0.4);
        }

        .intro-available {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .intro-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          animation: introPulse 2s ease-in-out infinite;
        }

        @keyframes introPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .intro-available-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #4ade80;
        }

        .intro-category {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.32);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .intro-name {
          font-size: 36px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: rgba(255,255,255,0.93);
          margin: 0 0 8px 0;
        }

        .intro-role-bar {
          height: 22px;
          overflow: hidden;
          margin-bottom: 14px;
          border-left: 2px solid rgba(110,181,255,0.6);
          padding-left: 10px;
        }

        .intro-role-text {
          font-size: 13px;
          color: rgba(110,181,255,0.85);
          font-family: 'DM Mono', monospace;
          display: block;
          transition: opacity 0.25s, transform 0.25s;
        }

        .intro-bio {
          font-size: 13px;
          line-height: 1.75;
          color: rgba(255,255,255,0.38);
        }

        .intro-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 22px;
        }

        .intro-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6eb5ff, #e879f9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 4px 14px rgba(0,0,0,0.45);
        }

        .intro-socials {
          display: flex;
          gap: 7px;
        }

        .intro-social-pill {
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
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .intro-social-pill:hover {
          background: rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.7);
        }
      `}</style>

      <div className="intro-bubble-card">
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="intro-icon-box">👤</div>
          <div className="intro-available">
            <span className="intro-dot" />
            <span className="intro-available-label">Available</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ marginTop: 20 }}>
          <div className="intro-category">Portfolio</div>
          <h1 className="intro-name">Alex Mercer</h1>

          <div className="intro-role-bar">
            <span className="intro-role-text" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-4px)",
            }}>
              {roles[roleIdx]}
            </span>
          </div>

          <p className="intro-bio">
            Building products at the intersection of elegant design and performant engineering. 6 years crafting digital experiences.
          </p>
        </div>

        {/* Footer */}
        <div className="intro-footer">
          <div className="intro-avatar">A</div>
          <div className="intro-socials">
            {["GH", "LI", "TW"].map((s) => (
              <span key={s} className="intro-social-pill">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
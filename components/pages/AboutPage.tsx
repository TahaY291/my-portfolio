"use client";
import { useEffect } from "react";

const values = [
  {
    emoji: "⚡",
    title: "Speed of thought",
    desc: "I believe great software should feel instant. Every 100ms shaved off matters.",
    color: "#6eb5ff",
    colorDim: "rgba(110,181,255,0.08)",
  },
  {
    emoji: "🎨",
    title: "Craft over output",
    desc: "Shipping fast is good. Shipping something beautiful and maintainable is better.",
    color: "#ffc96b",
    colorDim: "rgba(255,201,107,0.08)",
  },
  {
    emoji: "🌿",
    title: "Always learning",
    desc: "I pick up a new language or paradigm every year. Rust in 2023. Solidity in 2022.",
    color: "#7ef5b0",
    colorDim: "rgba(126,245,176,0.07)",
  },
  {
    emoji: "🤝",
    title: "Open by default",
    desc: "18k GitHub stars because I ship everything in the open. Knowledge compounds.",
    color: "#ff8fcb",
    colorDim: "rgba(255,143,203,0.08)",
  },
];

const facts = [
  { label: "Location", value: "San Francisco, CA" },
  { label: "Available", value: "Yes — freelance & full-time" },
  { label: "Time zone", value: "PST (UTC-8)" },
  { label: "Languages", value: "English, Spanish (B2)" },
  { label: "Education", value: "B.Sc. CS — UC Berkeley" },
  { label: "Prev. companies", value: "Stripe, Vercel" },
];

const interests = ["☕ Specialty coffee", "🎸 Guitar (post-rock)", "🏔 Trail running", "📚 Philosophy of mind", "🎮 Indie game dev", "🎧 Electronic music production"];

export default function AboutPage({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <style>{`
        .ap-wrap {
          min-height: 100vh;
          padding-bottom: 80px;
          font-family: 'Inter', sans-serif;
        }

        .ap-nav {
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

        .ap-nav-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
        }

        .ap-back {
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
        .ap-back:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.2);
        }

        .ap-hero {
          padding: 56px 48px 48px;
          display: flex;
          align-items: flex-start;
          gap: 48px;
        }

        .ap-avatar-wrap {
          flex-shrink: 0;
        }

        .ap-avatar {
          width: 90px;
          height: 90px;
          border-radius: 26px;
          background: linear-gradient(135deg, #6eb5ff 0%, #e879f9 50%, #7ef5b0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          font-weight: 800;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
          letter-spacing: -0.04em;
          margin-bottom: 12px;
        }

        .ap-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #4ade80;
        }

        .ap-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          animation: apPulse 2s infinite;
        }
        @keyframes apPulse {
          0%,100%{opacity:1;transform:scale(1);}
          50%{opacity:0.4;transform:scale(0.8);}
        }

        .ap-hero-content {
          flex: 1;
        }

        .ap-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(255,185,71,0.6);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .ap-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.035em;
          line-height: 1;
          margin-bottom: 18px;
        }

        .ap-bio {
          font-size: 14.5px;
          line-height: 1.8;
          color: rgba(255,255,255,0.48);
          max-width: 560px;
          margin-bottom: 20px;
        }

        .ap-bio strong {
          color: rgba(255,255,255,0.72);
          font-weight: 600;
        }

        .ap-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 0 48px;
        }

        .ap-section {
          padding: 40px 48px 0;
        }

        .ap-section-label {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .ap-values {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .ap-value-card {
          padding: 18px 20px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(16,16,18,0.6);
          transition: border-color 0.25s, transform 0.25s;
        }
        .ap-value-card:hover {
          border-color: rgba(255,255,255,0.11);
          transform: translateY(-2px);
        }

        .ap-value-icon {
          font-size: 20px;
          margin-bottom: 10px;
          display: block;
        }

        .ap-value-title {
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.78);
          letter-spacing: -0.015em;
          margin-bottom: 5px;
        }

        .ap-value-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          line-height: 1.65;
        }

        .ap-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          padding: 40px 48px 0;
        }

        .ap-facts {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ap-fact-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .ap-fact-row:first-child { border-top: 1px solid rgba(255,255,255,0.05); }

        .ap-fact-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.06em;
        }

        .ap-fact-value {
          font-size: 12.5px;
          color: rgba(255,255,255,0.6);
          text-align: right;
        }

        .ap-interests {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ap-interest-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.025);
          font-size: 12.5px;
          color: rgba(255,255,255,0.45);
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .ap-interest-tag:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.1);
        }

        .ap-cta-strip {
          margin: 40px 48px 0;
          padding: 24px 28px;
          border-radius: 16px;
          border: 1px solid rgba(110,181,255,0.15);
          background: rgba(110,181,255,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .ap-cta-text {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          line-height: 1.5;
        }

        .ap-cta-text strong {
          color: rgba(255,255,255,0.8);
          font-weight: 600;
        }

        .ap-cta-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 999px;
          background: #6eb5ff;
          color: #0a0a0b;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: opacity 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .ap-cta-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="ap-wrap">
        <nav className="ap-nav">
          <span className="ap-nav-label">Who I Am / About</span>
          <button className="ap-back" onClick={onClose}>← Back</button>
        </nav>

        <div className="ap-hero">
          <div className="ap-avatar-wrap">
            <div className="ap-avatar">AM</div>
            <div className="ap-status">
              <span className="ap-status-dot" />
              Available
            </div>
          </div>
          <div className="ap-hero-content">
            <div className="ap-eyebrow">Who I Am</div>
            <h1 className="ap-title">About Alex</h1>
            <p className="ap-bio">
              I'm a <strong>full-stack developer</strong> based in San Francisco with 6 years of experience building products that sit at the intersection of <strong>elegant design</strong> and <strong>performant engineering</strong>.
            </p>
            <p className="ap-bio" style={{ marginTop: -8 }}>
              Previously at <strong>Stripe</strong> (payments tooling) and <strong>Vercel</strong> (edge runtime). Now I work independently on ambitious products — and I'm always open to the right full-time role.
            </p>
          </div>
        </div>

        <div className="ap-divider" />

        <div className="ap-section">
          <div className="ap-section-label">What I Believe In</div>
          <div className="ap-values">
            {values.map((v) => (
              <div key={v.title} className="ap-value-card">
                <span className="ap-value-icon">{v.emoji}</span>
                <div className="ap-value-title" style={{ color: v.color }}>{v.title}</div>
                <div className="ap-value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="ap-two-col">
          <div>
            <div className="ap-section-label">Quick Facts</div>
            <div className="ap-facts">
              {facts.map((f) => (
                <div key={f.label} className="ap-fact-row">
                  <span className="ap-fact-label">{f.label}</span>
                  <span className="ap-fact-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="ap-section-label">Outside of Code</div>
            <div className="ap-interests">
              {interests.map((i) => (
                <div key={i} className="ap-interest-tag">{i}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="ap-cta-strip">
          <div className="ap-cta-text">
            <strong>Let's build something together.</strong> I'm currently available for freelance projects and open to full-time senior roles.
          </div>
          <a href="mailto:hello@alexmercer.dev" className="ap-cta-btn">
            Get in touch ↗
          </a>
        </div>
      </div>
    </>
  );
}
"use client";
import { useState, useEffect, useRef } from "react";

const roles = [
  "Full-Stack Developer",
  "UI/UX Craftsman",
  "Creative Coder",
  "Open Source Builder",
];

const stats = [
  { target: 32, suffix: "+", label: "Projects", color: "#6eb5ff" },
  { target: 6,  suffix: "yr", label: "Experience", color: "#7ef5b0" },
  { target: 18, suffix: "k", label: "GitHub Stars", color: "#ffc96b" },
];

const socials = [
  { label: "GH", color: "#e8eaea", href: "https://github.com" },
  { label: "LI", color: "#6eb5ff", href: "https://linkedin.com" },
  { label: "TW", color: "#5bc0f8", href: "https://twitter.com" },
];

/* ── Typewriter hook ── */
function useTypewriter(words: string[], typingSpeed = 68, deletingSpeed = 38, pauseMs = 1600) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [phase, setPhase]         = useState<"typing" | "pausing" | "deleting">("typing");
  const [charIdx, setCharIdx]     = useState(0);

  useEffect(() => {
    const word = words[wordIdx];

    if (phase === "typing") {
      if (charIdx < word.length) {
        const t = setTimeout(() => {
          setDisplayed(word.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, typingSpeed + Math.random() * 22);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), pauseMs);
        return () => clearTimeout(t);
      }
    }

    if (phase === "deleting") {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayed(word.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, deletingSpeed);
        return () => clearTimeout(t);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [phase, charIdx, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1400, delay = 0, active = false) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, duration, delay]);

  return val;
}

export default function IntroCard({ statsActive = true }: { statsActive?: boolean }) {
  const roleText = useTypewriter(roles);

  const counts = [
    useCountUp(stats[0].target, 1200, 200,  statsActive),
    useCountUp(stats[1].target,  900, 400,  statsActive),
    useCountUp(stats[2].target, 1400, 300,  statsActive),
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .intro-card {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 26px 24px;
          border-radius: 22px;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          background: rgba(14, 14, 16, 0.85);
          backdrop-filter: blur(32px) saturate(1.8) brightness(0.8);
          -webkit-backdrop-filter: blur(32px) saturate(1.8) brightness(0.8);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 16px 56px rgba(0,0,0,0.80),
            0 4px 18px rgba(0,0,0,0.6),
            inset 0 1.5px 0 rgba(255,255,255,0.20),
            inset 0 -1px 0 rgba(255,255,255,0.03);
        }

        .intro-card::before {
          content: "";
          position: absolute;
          top: -55px; left: -40px;
          width: 260px; height: 160px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 40% 40%,
            rgba(255,255,255,0.16) 0%,
            rgba(255,255,255,0.06) 35%,
            transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .intro-card > * { position: relative; z-index: 1; }

        /* top row */
        .intro-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .intro-available {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .intro-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4ade80;
          animation: introPulse 2s ease-in-out infinite;
        }

        @keyframes introPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.8); }
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
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
        }

        /* name */
        .intro-name {
          font-size: 34px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: rgba(255,255,255,0.93);
          margin: 10px 0 8px;
        }

        /* typewriter */
        .intro-role-bar {
          display: flex;
          align-items: center;
          gap: 0;
          border-left: 2px solid rgba(110,181,255,0.5);
          padding-left: 10px;
          margin-bottom: 12px;
          height: 22px;
          overflow: hidden;
        }

        .intro-role-text {
          font-family: 'DM Mono', monospace;
          font-size: 12.5px;
          color: rgba(110,181,255,0.85);
          white-space: nowrap;
        }

        .intro-cursor {
          display: inline-block;
          width: 2px;
          height: 13px;
          background: rgba(110,181,255,0.75);
          margin-left: 2px;
          border-radius: 1px;
          animation: cursorBlink 0.75s step-end infinite;
          flex-shrink: 0;
        }

        @keyframes cursorBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }

        /* bio */
        .intro-bio {
          font-size: 12.5px;
          line-height: 1.75;
          color: rgba(255,255,255,0.36);
        }

        /* stats */
        .intro-stats {
          display: flex;
          gap: 20px;
          padding: 12px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin: 14px 0;
        }

        .intro-stat-value {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
          transition: color 0.2s;
        }

        .intro-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.28);
          margin-top: 1px;
        }

        /* footer */
        .intro-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .intro-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6eb5ff, #e879f9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
          flex-shrink: 0;
        }

        .intro-socials {
          display: flex;
          gap: 6px;
        }

        .intro-social-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 11px;
          border-radius: 999px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
          text-decoration: none;
        }

        .intro-social-pill:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="intro-card">

        {/* Top row */}
        <div className="intro-top-row">
          <span className="intro-category">Portfolio</span>
          <div className="intro-available">
            <span className="intro-dot" />
            <span className="intro-available-label">Available</span>
          </div>
        </div>

        {/* Name + role */}
        <div>
          <h1 className="intro-name">Alex Mercer</h1>

          <div className="intro-role-bar">
            <span className="intro-role-text">{roleText}</span>
            <span className="intro-cursor" />
          </div>

          <p className="intro-bio">
            Building products at the intersection of elegant design and performant engineering.
          </p>
        </div>

        {/* Animated stats */}
        <div className="intro-stats">
          {stats.map((s, i) => (
            <div key={s.label}>
              <div className="intro-stat-value" style={{ color: s.color }}>
                {counts[i]}{s.suffix}
              </div>
              <div className="intro-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="intro-footer">
          <div className="intro-avatar">A</div>
          <div className="intro-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="intro-social-pill"
                style={{ ["--hover-color" as any]: s.color }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = s.color;
                  (e.currentTarget as HTMLElement).style.borderColor = s.color + "44";
                  (e.currentTarget as HTMLElement).style.background = s.color + "12";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.background = "";
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
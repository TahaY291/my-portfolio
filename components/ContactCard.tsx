"use client";

export default function ContactCard({ onClick }: { onClick: () => void }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');

        .contact-bubble-card {
          position: relative;
          padding: 22px 20px;
          min-height: 160px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 22px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          overflow: hidden;

          /* Dark glass */
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

        /* Top-left bubble reflection */
        .contact-bubble-card::before {
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

        /* Bottom-right glow */
        .contact-bubble-card::after {
          content: "";
          position: absolute;
          bottom: -30px;
          right: -20px;
          width: 150px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(110,181,255,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .contact-bubble-card > * { position: relative; z-index: 1; }

        .contact-bubble-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.90),
            0 8px 24px rgba(0, 0, 0, 0.65),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.25),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05);
        }

        .contact-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.32);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .contact-title {
          font-size: 17px;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.02em;
          margin: 0 0 10px 0;
        }

        .contact-desc {
          font-size: 12.5px;
          line-height: 1.65;
          color: rgba(255,255,255,0.36);
          margin: 0;
        }

        .contact-cta {
          margin-top: 18px;
          padding: 10px 16px;
          background: rgba(110,181,255,0.07);
          border: 1px solid rgba(110,181,255,0.18);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .contact-bubble-card:hover .contact-cta {
          background: rgba(110,181,255,0.11);
          border-color: rgba(110,181,255,0.28);
        }

        .contact-email {
          font-size: 12px;
          color: rgba(110,181,255,0.75);
          font-family: 'DM Mono', monospace;
        }

        .contact-arrow {
          font-size: 14px;
          color: rgba(110,181,255,0.65);
        }
      `}</style>

      <div className="contact-bubble-card" onClick={onClick}>
        <div>
          <div className="contact-label">Get in Touch</div>
          <h3 className="contact-title">Contact</h3>
          <p className="contact-desc">
            Open to collaborations, freelance, or just a good convo.
          </p>
        </div>

        <div className="contact-cta">
          <span className="contact-email">hello@alexmercer.dev</span>
          <span className="contact-arrow">↗</span>
        </div>
      </div>
    </>
  );
}
"use client";
import { useState, useRef } from "react";

export default function ContactCard() {
  const [hovered, setHovered] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHovered(true);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setHovered(false), 280);
  };

  const handleSend = () => {
    if (!name || !email) return;
    setSent(true);
    setTimeout(() => { setSent(false); setName(""); setEmail(""); setHovered(false); }, 2400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');

        .contact-card-outer {
          position: relative;
          height: 100%;
          border-radius: 22px;
          overflow: hidden;
          cursor: default;

          background: rgba(14, 14, 16, 0.85);
          backdrop-filter: blur(32px) saturate(1.8) brightness(0.8);
          -webkit-backdrop-filter: blur(32px) saturate(1.8) brightness(0.8);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 16px 56px rgba(0,0,0,0.80),
            0 4px 18px rgba(0,0,0,0.6),
            inset 0 1.5px 0 rgba(255,255,255,0.20),
            inset 0 -1px 0 rgba(255,255,255,0.03);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .contact-card-outer:hover {
          border-color: rgba(255,255,255,0.13);
          box-shadow:
            0 24px 70px rgba(0,0,0,0.90),
            0 8px 24px rgba(0,0,0,0.65),
            inset 0 1.5px 0 rgba(255,255,255,0.25),
            inset 0 -1px 0 rgba(255,255,255,0.05);
        }

        .contact-card-outer::before {
          content: "";
          position: absolute;
          top: -45px; left: -30px;
          width: 220px; height: 140px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 40% 40%,
            rgba(255,255,255,0.16) 0%,
            rgba(255,255,255,0.06) 35%,
            transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .contact-card-outer::after {
          content: "";
          position: absolute;
          bottom: -30px; right: -20px;
          width: 150px; height: 100px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(110,181,255,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .contact-default-layer {
          position: absolute;
          inset: 0;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 1;
          transition: opacity 0.3s ease, transform 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .contact-default-layer.hidden {
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
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

        .contact-email-pill {
          margin-top: 18px;
          padding: 10px 14px;
          background: rgba(110,181,255,0.07);
          border: 1px solid rgba(110,181,255,0.18);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.2s, border-color 0.2s;
        }

        .contact-card-outer:hover .contact-email-pill {
          background: rgba(110,181,255,0.11);
          border-color: rgba(110,181,255,0.28);
        }

        .contact-email-text {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(110,181,255,0.75);
        }

        .contact-email-arrow {
          font-size: 13px;
          color: rgba(110,181,255,0.55);
        }

        /* Hover form layer */
        .contact-form-layer {
          position: absolute;
          inset: 0;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          z-index: 2;
          background: rgba(14,14,16,0.96);
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.34,1.2,0.64,1);
          opacity: 0;
          transform: translateY(14px);
          pointer-events: none;
          font-family: 'Inter', sans-serif;
        }

        .contact-form-layer.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .contact-form-title {
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          letter-spacing: -0.015em;
          margin-bottom: 2px;
        }

        .contact-form-hint {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          color: rgba(255,255,255,0.22);
          margin-bottom: 6px;
        }

        .contact-input {
          width: 100%;
          padding: 9px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.75);
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, background 0.2s;
        }

        .contact-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .contact-input:focus {
          border-color: rgba(110,181,255,0.35);
          background: rgba(110,181,255,0.04);
        }

        .contact-send-btn {
          width: 100%;
          padding: 9px 14px;
          background: rgba(110,181,255,0.12);
          border: 1px solid rgba(110,181,255,0.28);
          border-radius: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #6eb5ff;
          cursor: pointer;
          text-align: center;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          font-weight: 500;
        }

        .contact-send-btn:hover {
          background: rgba(110,181,255,0.2);
          border-color: rgba(110,181,255,0.42);
        }

        .contact-send-btn:active {
          transform: scale(0.98);
        }

        .contact-send-btn.success {
          background: rgba(126,245,176,0.1);
          border-color: rgba(126,245,176,0.3);
          color: #7ef5b0;
        }

        .contact-form-footer {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.18);
          text-align: center;
        }
      `}</style>

      <div
        className="contact-card-outer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Default state */}
        <div className={`contact-default-layer${hovered ? " hidden" : ""}`}>
          <div>
            <div className="contact-label">Get in Touch</div>
            <h3 className="contact-title">Contact</h3>
            <p className="contact-desc">
              Open to collaborations, freelance, or just a good convo.
            </p>
          </div>
          <div className="contact-email-pill">
            <span className="contact-email-text">hello@alexmercer.dev</span>
            <span className="contact-email-arrow">↗</span>
          </div>
        </div>

        {/* Hover form */}
        <div className={`contact-form-layer${hovered ? " visible" : ""}`}>
          <div className="contact-form-title">Say hello 👋</div>
          <div className="contact-form-hint">Hover out to dismiss</div>
          <input
            className="contact-input"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="contact-input"
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className={`contact-send-btn${sent ? " success" : ""}`}
            onClick={handleSend}
          >
            {sent ? "Message sent ✓" : "Send message →"}
          </button>
          <div className="contact-form-footer">No spam. Just a conversation.</div>
        </div>
      </div>
    </>
  );
}
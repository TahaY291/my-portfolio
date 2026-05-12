"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import IntroCard from "@/components/IntroCard";
import ProjectsCard from "@/components/ProjectCard";
import SkillsCard from "@/components/SkillsCard";
import AboutCard from "@/components/AboutCard";
import ProjectsPage from "@/components/pages/ProjectsPage";
import SkillsPage from "@/components/pages/SkillsPage";
import AboutPage from "@/components/pages/AboutPage"
import ContactCard from "@/components/ContactCard";
import NightSkyBackground from "../components/NightSkyBackground";

type PageType = null | "projects" | "skills" | "about";

export default function Home() {
  const [activePage, setActivePage] = useState<PageType>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [loaderPct, setLoaderPct]   = useState(0);
  const [showName, setShowName]     = useState(false);
  const [isClosing, setIsClosing]   = useState(false);

  const overlayRef    = useRef<HTMLDivElement>(null);
  const gsapRef       = useRef<any>(null);
  const originRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    import("gsap").then((mod) => {
      gsapRef.current = mod.gsap;
    });
  }, []);

  /* ── Loader ── */
  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 3.5 + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setLoaderPct(100);
        setTimeout(() => setShowName(true), 200);
        setTimeout(() => setLoaderDone(true), 900);
        setTimeout(() => {
          const gsap = gsapRef.current;
          if (!gsap) return;
          setTimeout(() => {
            gsap.from(".portfolio-card", {
              opacity: 0, y: 28, duration: 0.55, stagger: 0.07, ease: "power3.out",
            });
          }, 60);
        }, 1100);
        return;
      }
      setLoaderPct(Math.round(p));
    }, 55);
    return () => clearInterval(iv);
  }, []);

  const openPage = useCallback((page: PageType, cardEl?: HTMLElement) => {
    originRectRef.current = cardEl ? cardEl.getBoundingClientRect() : null;
    setActivePage(page);
    setIsClosing(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const overlay = overlayRef.current;
        const gsap = gsapRef.current;
        if (!overlay) return;
        if (!gsap) {
          overlay.style.opacity = "1";
          overlay.style.clipPath = "none";
          return;
        }
        const rect = originRectRef.current;
        if (rect) {
          gsap.fromTo(overlay,
            { clipPath: `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round 22px)`, opacity: 1 },
            { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: 0.55, ease: "expo.inOut" }
          );
          gsap.fromTo(".detail-page-content",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.25 }
          );
        } else {
          gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
          gsap.from(".detail-page-content", { opacity: 0, y: 30, duration: 0.5, ease: "power3.out", delay: 0.1 });
        }
      });
    });
  }, []);

  const closePage = useCallback(() => {
    const overlay = overlayRef.current;
    const gsap = gsapRef.current;
    if (!overlay) { setActivePage(null); return; }
    if (!gsap) { setActivePage(null); return; }

    setIsClosing(true);
    const rect = originRectRef.current;
    gsap.to(".detail-page-content", { opacity: 0, y: 30, duration: 0.2, ease: "power2.in" });
    if (rect) {
      gsap.to(overlay, {
        clipPath: `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round 22px)`,
        opacity: 0.6, duration: 0.45, ease: "expo.inOut", delay: 0.15,
        onComplete: () => { setActivePage(null); setIsClosing(false); originRectRef.current = null; },
      });
    } else {
      gsap.to(overlay, {
        opacity: 0, duration: 0.3, ease: "power2.in", delay: 0.15,
        onComplete: () => { setActivePage(null); setIsClosing(false); },
      });
    }
  }, []);

  const makeClickHandler = (page: PageType) => (e: React.MouseEvent) => {
    const cardEl = e.currentTarget as HTMLElement;
    openPage(page, cardEl);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; }

        .cursor-dot {
          position: fixed; width: 10px; height: 10px; border-radius: 50%;
          background: rgba(255,255,255,0.9); pointer-events: none; z-index: 9999;
          transform: translate(-50%,-50%);
          transition: width .2s ease, height .2s ease;
          mix-blend-mode: difference;
        }

        .loader-wrap {
          position: fixed; inset: 0; z-index: 200; background: #0a0a0b;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: opacity .5s ease, visibility .5s ease;
        }
        .loader-wrap.hidden { opacity: 0; visibility: hidden; }
        .loader-pre {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.18em; color: rgba(255,255,255,0.22);
          text-transform: uppercase; margin-bottom: 20px;
        }
        .loader-bar-track {
          width: 200px; height: 1.5px;
          background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden;
        }
        .loader-bar-fill {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.95), rgba(255,255,255,0.3));
          transition: width .05s linear;
        }
        .loader-pct {
          font-family: 'DM Mono', monospace; font-size: 10px;
          color: rgba(255,255,255,0.2); margin-top: 10px;
        }
        .loader-name {
          position: absolute; bottom: 15%; font-size: 13px; font-weight: 700;
          letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0);
          font-family: 'DM Mono', monospace;
          transition: color .7s ease, letter-spacing .7s ease;
        }
        .loader-name.show { color: rgba(255,255,255,0.45); letter-spacing: 0.5em; }
        .loader-name::before, .loader-name::after {
          content: attr(data-text); position: absolute; left: 0; top: 0; width: 100%;
          font-family: 'DM Mono', monospace; font-size: inherit; font-weight: 700;
          letter-spacing: inherit; text-transform: uppercase;
        }
        .loader-name::before {
          color: rgba(255,255,255,0.85);
          clip-path: polygon(0 0, 100% 0, 100% 38%, 0 38%);
          animation: glitch-top 3.5s infinite steps(1);
        }
        .loader-name::after {
          color: rgba(180,180,180,0.7);
          clip-path: polygon(0 62%, 100% 62%, 100% 100%, 0 100%);
          animation: glitch-bot 3.5s infinite steps(1);
        }
        @keyframes glitch-top {
          0%,88%,100%{transform:translate(0);opacity:0;}
          89%{transform:translate(-4px,-1px);opacity:1;}
          91%{transform:translate(4px,0);opacity:1;}
          93%{transform:translate(-2px,1px);opacity:1;}
          95%{transform:translate(0);opacity:0;}
        }
        @keyframes glitch-bot {
          0%,88%,100%{transform:translate(0);opacity:0;}
          89%{transform:translate(4px,1px);opacity:1;}
          91%{transform:translate(-4px,0);opacity:1;}
          93%{transform:translate(2px,-1px);opacity:1;}
          95%{transform:translate(0);opacity:0;}
        }

        .night-sky-bg { z-index: 0; }
        .grain-canvas { z-index: 1; }
        .scanlines    { z-index: 2; }
        .vignette     { z-index: 2; }
        .bento-main   { z-index: 10; }
        .mono-bar     { z-index: 20; }
        .detail-overlay { z-index: 100; }
        .cursor-dot   { z-index: 9999; }

        .overlay-escape-hint {
          position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
          z-index: 101; font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; color: rgba(255,255,255,0.22);
          text-transform: uppercase; pointer-events: none;
          opacity: 0; animation: hint-fade 0.5s ease 0.7s forwards;
        }
        @keyframes hint-fade { to { opacity: 1; } }
      `}</style>

      <NightSkyBackground />

      {/* LOADER */}
      <div className={`loader-wrap${loaderDone ? " hidden" : ""}`}>
        <div className="loader-pre">Initializing Portfolio</div>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${loaderPct}%` }} />
        </div>
        <div className="loader-pct">{loaderPct}%</div>
        <div className={`loader-name${showName ? " show" : ""}`} data-text="Taha Yasin">
          Taha Yasin
        </div>
      </div>

      {/* DETAIL PAGE OVERLAY */}
      {activePage && (
        <>
          <div
            ref={overlayRef}
            className="detail-overlay"
            onClick={(e) => { if (e.target === overlayRef.current) closePage(); }}
          >
            <div className="detail-page-content">
              {activePage === "projects" && <ProjectsPage onClose={closePage} />}
              {activePage === "skills"   && <SkillsPage   onClose={closePage} />}
              {activePage === "about"    && <AboutPage    onClose={closePage} />}
            </div>
          </div>
          {!isClosing && (
            <div className="overlay-escape-hint">Press ESC or click backdrop to close</div>
          )}
        </>
      )}

      <div className="max-lg:h-full h-screen w-screen flex items-center justify-center">
        <div className="flex max-lg:flex-col w-[80%] h-[75%] gap-5">
          <div className="basis-[25%] h-full portfolio-card">
            <IntroCard />
          </div>
          <div className="basis-[50%] h-full flex flex-col gap-5">
            <div className="basis-[65%] cursor-pointer" onClick={makeClickHandler("projects")}>
              <ProjectsCard onClick={() => openPage("projects")} />
            </div>
            <div className="basis-[35%] cursor-pointer" onClick={makeClickHandler("skills")}>
              <SkillsCard onClick={() => openPage("skills")} />
            </div>
          </div>
          <div className="basis-[25%] h-full flex flex-col gap-5">
            <div className="basis-[50%] cursor-pointer" onClick={makeClickHandler("about")}>
              <AboutCard onClick={() => openPage("about")} />
            </div>
            <div className="basis-[50%]">
              <ContactCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import IntroCard from "@/components/IntroCard";
import ProjectsCard from "@/components/ProjectCard";
import SkillsCard from "@/components/SkillsCard";
import ContactCard from "@/components/ContactCard";
import AboutCard from "@/components/AboutCard";
import ProjectsPage from "@/components/pages/ProjectsPage";
import SkillsPage from "@/components/pages/SkillsPage";
import AboutPage from "@/components/pages/AboutPage";

type PageType = null | "projects" | "skills" | "about";

/* ─────────────────────────────────────────
   LIGHTNING AURORA — monochrome WebGL
───────────────────────────────────────── */
function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl")!;
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const vert = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;
    const frag = `
      precision highp float;
      uniform float u_time;
      uniform vec2  u_res;
      uniform vec2  u_mouse;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
      }
      float fbm(vec2 p) {
        float v=0.0,a=0.5;
        for(int i=0;i<7;i++){v+=a*noise(p);p=p*2.2+vec2(1.7,9.2);a*=0.48;}
        return v;
      }
      float bolt(vec2 p,float t){
        float n=fbm(p*3.0+vec2(t*0.9,t*0.4));
        float n2=fbm(p*5.0+vec2(-t*0.6,t*1.1)+n);
        return smoothstep(0.08,0.0,abs(n2-0.5))*1.8;
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/u_res;
        vec2 mouse=u_mouse/u_res;
        float t=u_time*0.14;
        vec2 warp=uv+(mouse-0.5)*0.07;
        float n1=fbm(warp*1.6+vec2(t*0.4,t*0.25));
        float n2=fbm(warp*2.8+vec2(-t*0.5,t*0.7)+n1*0.6);
        float diffuse=smoothstep(0.38,0.72,n1)*smoothstep(0.88,0.5,n1);
        diffuse+=smoothstep(0.42,0.68,n2)*smoothstep(0.82,0.52,n2)*0.6;
        float b1=bolt(warp+vec2(t*0.15,0.0),t);
        float b2=bolt(warp*1.4+vec2(0.3,t*0.2),t*1.3);
        float b3=bolt(warp*0.8+vec2(-0.2,t*-0.18),t*0.7);
        float bolts=b1*0.9+b2*0.7+b3*0.5;
        float flicker=hash(vec2(floor(t*18.0),floor(t*11.0)));
        bolts*=0.7+flicker*0.6;
        vec3 boltColor=vec3(0.85,0.90,1.00);
        vec3 diffuseColor=vec3(0.80,0.80,0.82);
        vec3 col=diffuseColor*diffuse*0.22+boltColor*bolts*0.9;
        col+=boltColor*bolts*bolts*0.4;
        float vig=uv.x*(1.0-uv.x)*uv.y*(1.0-uv.y);
        vig=pow(vig*16.0,0.45);
        col*=vig*1.5;
        float lum=col.r*0.299+col.g*0.587+col.b*0.114;
        col=mix(vec3(lum),col,0.25);
        gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouse);

    let animId: number;
    const start = performance.now();
    const render = () => {
      animId = requestAnimationFrame(render);
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, canvas.height - mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0,
        width: "100%", height: "100%",
        zIndex: 0, pointerEvents: "none",
      }}
    />
  );
}

/* ─────────────────────────────────────────
   FILM GRAIN OVERLAY
───────────────────────────────────────── */
function GrainOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    c.width = 300; c.height = 300;
    let id: number;
    const draw = () => {
      id = requestAnimationFrame(draw);
      if (Math.random() > 0.35) return;
      const img = ctx.createImageData(300, 300);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = img.data[i+1] = img.data[i+2] = v;
        img.data[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        zIndex: 1, pointerEvents: "none", opacity: 0.04, mixBlendMode: "screen",
      }}
    />
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function Home() {
  const [activePage, setActivePage]   = useState<PageType>(null);
  const [loaded, setLoaded]           = useState(false);
  const [loaderDone, setLoaderDone]   = useState(false);
  const [loaderPct, setLoaderPct]     = useState(0);
  const [showName, setShowName]       = useState(false);
  const [isClosing, setIsClosing]     = useState(false);

  const cursorRef  = useRef<HTMLDivElement>(null);
  const mainRef    = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const gsapRef    = useRef<any>(null);

  // Store the origin rect of the card that was clicked
  const originRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    import("gsap").then((mod) => { gsapRef.current = mod.gsap; });
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
          setLoaded(true);
          setTimeout(() => {
            const gsap = gsapRef.current;
            if (!gsap) return;
            gsap.from(".portfolio-card", {
              opacity: 0, y: 28, duration: 0.55, stagger: 0.07, ease: "power3.out",
            });
            document.querySelectorAll(".skill-fill-bar").forEach((el: any) => {
              gsap.to(el, { width: el.dataset.w + "%", duration: 1.3, ease: "power2.out", delay: 0.4 });
            });
          }, 60);
        }, 1100);
        return;
      }
      setLoaderPct(Math.round(p));
    }, 55);
    return () => clearInterval(iv);
  }, []);

  /* ── Custom cursor ── */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    let cx = 0, cy = 0, tx = 0, ty = 0;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", move);
    const loop = () => {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      cursor.style.left = cx + "px"; cursor.style.top = cy + "px";
      requestAnimationFrame(loop);
    };
    loop();
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ── Card tilt ── */
  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    card.style.transform = `translateY(-5px) scale(1.015) perspective(700px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg)`;
    if (cursorRef.current) { cursorRef.current.style.width = "22px"; cursorRef.current.style.height = "22px"; }
  };
  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
    if (cursorRef.current) { cursorRef.current.style.width = "10px"; cursorRef.current.style.height = "10px"; }
  };

  /* ── Open page — shared element expand transition ── */
  const openPage = useCallback((page: PageType, cardEl?: HTMLElement) => {
    // Capture origin rect before state update
    if (cardEl) {
      originRectRef.current = cardEl.getBoundingClientRect();
    } else {
      originRectRef.current = null;
    }

    setActivePage(page);
    setIsClosing(false);

    // After overlay mounts, animate from card rect → fullscreen
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const overlay = overlayRef.current;
        const gsap = gsapRef.current;
        if (!overlay || !gsap) return;

        const rect = originRectRef.current;
        if (rect) {
          // Position overlay exactly over the source card, then expand
          gsap.fromTo(
            overlay,
            {
              clipPath: `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round 22px)`,
              opacity: 1,
            },
            {
              clipPath: "inset(0px 0px 0px 0px round 0px)",
              duration: 0.55,
              ease: "expo.inOut",
            }
          );
          // Fade + slide the inner content up after clip expands
          gsap.fromTo(
            ".detail-page-content",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.25 }
          );
        } else {
          // Fallback: simple fade
          gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
          gsap.from(".detail-page-content", { opacity: 0, y: 30, duration: 0.5, ease: "power3.out", delay: 0.1 });
        }
      });
    });
  }, []);

  /* ── Close page — collapse back to card rect ── */
  const closePage = useCallback(() => {
    const overlay = overlayRef.current;
    const gsap = gsapRef.current;
    if (!overlay || !gsap) { setActivePage(null); return; }

    setIsClosing(true);

    const rect = originRectRef.current;

    // First fade out the content
    gsap.to(".detail-page-content", {
      opacity: 0,
      y: 30,
      duration: 0.2,
      ease: "power2.in",
    });

    if (rect) {
      // Collapse clip back to origin card rect
      gsap.to(overlay, {
        clipPath: `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round 22px)`,
        opacity: 0.6,
        duration: 0.45,
        ease: "expo.inOut",
        delay: 0.15,
        onComplete: () => {
          setActivePage(null);
          setIsClosing(false);
          originRectRef.current = null;
        },
      });
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.15,
        onComplete: () => {
          setActivePage(null);
          setIsClosing(false);
        },
      });
    }
  }, []);

  const tiltProps = { onMouseMove: handleTiltMove, onMouseLeave: handleTiltLeave };

  /* ── Card click handler factory — captures the card element ── */
  const makeClickHandler = (page: PageType) => (e: React.MouseEvent) => {
    // Walk up to find the .portfolio-card wrapper
    const cardEl = (e.currentTarget as HTMLElement).closest(".portfolio-card") as HTMLElement;
    openPage(page, cardEl || undefined);
  };

  return (
    <>
      <style>{`
        /* ── Cursor ── */
        .cursor-dot {
          position: fixed; width: 10px; height: 10px; border-radius: 50%;
          background: rgba(255,255,255,0.9);
          pointer-events: none; z-index: 9999;
          transform: translate(-50%,-50%);
          transition: width .2s ease, height .2s ease;
          mix-blend-mode: difference; opacity: 1;
        }

        /* ── Loader ── */
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
          background: linear-gradient(90deg,
            rgba(255,255,255,0.3),
            rgba(255,255,255,0.95),
            rgba(255,255,255,0.3)
          );
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
          font-family: 'DM Mono', monospace; font-size: inherit;
          font-weight: 700; letter-spacing: inherit; text-transform: uppercase;
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

        /* ── CRT / grain ── */
        .scanlines {
          position: fixed; inset: 0; z-index: 2; pointer-events: none;
          background: repeating-linear-gradient(
            to bottom, transparent 0px, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }
        .vignette {
          position: fixed; inset: 0; z-index: 2; pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,0.82) 100%);
        }
        .mono-bar {
          position: fixed; bottom: 0; left: 0; right: 0;
          height: 1.5px; z-index: 10; pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.0)  0%,
            rgba(255,255,255,0.12) 15%,
            rgba(255,255,255,0.85) 30%,
            rgba(255,255,255,1.0)  50%,
            rgba(255,255,255,0.85) 70%,
            rgba(255,255,255,0.12) 85%,
            rgba(255,255,255,0.0)  100%
          );
          background-size: 200% 100%;
          animation: shimmer-slide 3.5s ease-in-out infinite;
        }
        @keyframes shimmer-slide {
          0%   { background-position: -100% 0; opacity: 0.5; }
          50%  { background-position:  100% 0; opacity: 1;   }
          100% { background-position: -100% 0; opacity: 0.5; }
        }

        /* ── Cards ── */
        .portfolio-card {
          transition: transform .35s cubic-bezier(0.34,1.4,0.64,1),
                      box-shadow .35s ease, border-color .25s ease;
        }
        /* Dim cards when overlay is open */
        .cards-dimmed .portfolio-card {
          opacity: 0.4;
          transform: scale(0.98);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
        }

        /* ── Detail overlay — clip-path driven, no CSS animation ── */
        .detail-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(10,10,11,0.97);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          /* Start invisible; GSAP controls opacity + clipPath */
          will-change: clip-path, opacity;
        }
        .detail-page-content {
          min-height: 100%;
          padding: 1rem;
        }
        @media (min-width: 640px) {
          .detail-page-content { padding: 2rem; }
        }

        /* ── Responsive grid ── */
        .portfolio-grid {
          display: grid;
          gap: 1rem;
          width: 100%;
          grid-template-columns: 1fr;
          grid-template-rows: auto;
        }
        /* Tablet: 2 columns */
        @media (min-width: 640px) {
          .portfolio-grid {
            grid-template-columns: 1fr 1fr;
            max-width: 720px;
          }
          .card-intro    { grid-column: 1 / -1; }
          .card-projects { grid-row: span 2; }
        }
        /* Desktop: 3 columns, fixed proportions */
        @media (min-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: 1fr 1.4fr 1fr;
            grid-template-rows: 1fr auto;
            max-width: 1100px;
            height: 70vh;
          }
          .card-intro    { grid-column: 2; grid-row: 1; }
          .card-skills   { grid-column: 2; grid-row: 2; }
          .card-projects { grid-column: 1; grid-row: 1 / 3; }
          .card-about    { grid-column: 3; grid-row: 1; }
          .card-contact  { grid-column: 3; grid-row: 2; }
        }

        /* Mobile card order */
        .card-intro    { order: 1; }
        .card-projects { order: 2; }
        .card-skills   { order: 3; }
        .card-about    { order: 4; }
        .card-contact  { order: 5; }

        /* Min heights on mobile so cards don't collapse */
        .card-intro    { min-height: 200px; }
        .card-projects { min-height: 280px; }
        .card-skills   { min-height: 120px; }
        .card-about    { min-height: 130px; }
        .card-contact  { min-height: 110px; }

        /* On desktop, cards fill their grid cell */
        @media (min-width: 1024px) {
          .card-intro, .card-projects, .card-skills,
          .card-about, .card-contact {
            min-height: 0;
            height: 100%;
          }
          /* Skills is shorter on desktop */
          .card-skills { min-height: 0; }
        }

        /* All direct card children fill height */
        .portfolio-card > * { height: 100%; }
        @media (max-width: 1023px) {
          .portfolio-card > * { height: auto; }
          .portfolio-card { height: auto !important; }
        }

        /* ── Escape hint ── */
        .overlay-escape-hint {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 101;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
          pointer-events: none;
          opacity: 0;
          animation: hint-fade 0.5s ease 0.7s forwards;
        }
        @keyframes hint-fade { to { opacity: 1; } }
      `}</style>

      {/* Cursor */}
      <div ref={cursorRef} className="cursor-dot" />

      {/* Lightning aurora */}
      <AuroraBackground />

      {/* Film grain */}
      <GrainOverlay />

      {/* CRT scanlines */}
      <div className="scanlines" />

      {/* Vignette */}
      <div className="vignette" />

      {/* Monochrome shimmer bar */}
      <div className="mono-bar" />

      {/* LOADER */}
      <div className={`loader-wrap${loaderDone ? " hidden" : ""}`}>
        <div className="loader-pre">Initializing Portfolio</div>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${loaderPct}%` }} />
        </div>
        <div className="loader-pct">{loaderPct}%</div>
        <div className={`loader-name${showName ? " show" : ""}`} data-text="Alex Mercer">
          Alex Mercer
        </div>
      </div>

      {/* DETAIL PAGES — overlay with shared-element transition */}
      {activePage && (
        <>
          <div
            ref={overlayRef}
            className="detail-overlay"
            onClick={(e) => {
              // Close if clicking the backdrop (not content)
              if (e.target === overlayRef.current) closePage();
            }}
          >
            <div className="detail-page-content">
              {activePage === "projects" && <ProjectsPage onClose={closePage} />}
              {activePage === "skills"   && <SkillsPage   onClose={closePage} />}
              {activePage === "about"    && <AboutPage    onClose={closePage} />}
            </div>
          </div>
          {/* Keyboard escape hint */}
          {!isClosing && (
            <div className="overlay-escape-hint">Press ESC or click backdrop to close</div>
          )}
        </>
      )}

      {/* MAIN GRID */}
      <main
        ref={mainRef}
        className="w-screen min-h-screen flex items-center justify-center p-4 sm:p-6 box-border relative"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        <div className={`portfolio-grid relative z-10 ${activePage ? "cards-dimmed" : ""}`}>

          {/* Intro */}
          <div className="portfolio-card card-intro">
            <IntroCard statsActive={loaded} />
          </div>

          {/* Projects */}
          <div
            className="portfolio-card card-projects"
            {...tiltProps}
          >
            <ProjectsCard onClick={(e: React.MouseEvent) => makeClickHandler("projects")(e)} />
          </div>

          {/* Skills */}
          <div
            className="portfolio-card card-skills"
            {...tiltProps}
          >
            <SkillsCard onClick={(e: React.MouseEvent) => makeClickHandler("skills")(e)} />
          </div>

          {/* About */}
          <div
            className="portfolio-card card-about"
            {...tiltProps}
          >
            <AboutCard onClick={(e: React.MouseEvent) => makeClickHandler("about")(e)} />
          </div>

          {/* Contact */}
          <div className="portfolio-card card-contact">
            <ContactCard />
          </div>

        </div>
      </main>
    </>
  );
}
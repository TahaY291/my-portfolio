"use client";
import { useState } from "react";
import IntroCard from "@/components/IntroCard";
import ProjectCard from "@/components/ProjectCard";
import SkillsCard from "@/components/SkillsCard";
import ContactCard from "@/components/ContactCard";
import AboutCard from "@/components/AboutCard";
import StatsCard from "@/components/StatsCard";
// import ProjectPage from "@/components/pages/ProjectPage";
// import SkillsPage from "@/components/pages/SkillsPage";
// import AboutPage from "@/components/pages/AboutPage";
// import ContactPage from "@/components/pages/ContactPage";

type PageType = null | "project" | "skills" | "about" | "contact";

// Wrapper that forces a card to fill its grid cell and suppresses internal min-heights
function CardCell({
  children,
  delay,
  style = {},
}: {
  children: React.ReactNode;
  delay: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="fade-up"
      style={{
        animationDelay: delay,
        minHeight: 0,
        minWidth: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* This inner div stretches to fill the cell and overrides card min-heights */}
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            // Override the min-height that individual card components set on themselves
            ["--card-min-height" as string]: "0px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activePage, setActivePage] = useState<PageType>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const openPage = (page: PageType, project?: string) => {
    setActivePage(page);
    if (project) setSelectedProject(project);
  };

  const closePage = () => {
    setActivePage(null);
    setSelectedProject(null);
  };

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        background: "var(--bg)",
        boxSizing: "border-box",
      }}
    >
      {/* Ambient background glows */}
      <div style={{
        position: "fixed", top: "10%", left: "15%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(110,181,255,0.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "10%", right: "15%",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(126,245,176,0.05) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Force all card internals to respect grid sizing */}
      <style>{`
        .card-cell-inner > * {
          min-height: 0 !important;
          height: 100% !important;
        }
        .card-cell-inner .about-bubble-card,
        .card-cell-inner .contact-bubble-card,
        .card-cell-inner .intro-bubble-card,
        .card-cell-inner .bubble-card,
        .card-cell-inner .card {
          min-height: 0 !important;
          height: 100% !important;
          box-sizing: border-box;
        }
      `}</style>

      {/* Bento Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.8fr 1fr",
        gridTemplateRows: "195px 130px 205px",
        gap: "12px",
        position: "relative",
        zIndex: 1,
        maxWidth: "1080px",
        width: "100%",
      }}>

        {/* Row 1, Col 1: About */}
        <div
          className="fade-up"
          style={{ animationDelay: "0.1s", gridColumn: "1", gridRow: "1", minHeight: 0, overflow: "hidden" }}
        >
          <div className="card-cell-inner" style={{ height: "100%" }}>
            <AboutCard onClick={() => openPage("about")} />
          </div>
        </div>

        {/* Col 2: IntroCard — spans rows 1 and 2 */}
        <div
          className="fade-up"
          style={{ animationDelay: "0s", gridColumn: "2", gridRow: "1 / 3", minHeight: 0, overflow: "hidden" }}
        >
          <div className="card-cell-inner" style={{ height: "100%" }}>
            <IntroCard />
          </div>
        </div>

        {/* Row 1, Col 3: Stats */}
        <div
          className="fade-up"
          style={{ animationDelay: "0.15s", gridColumn: "3", gridRow: "1", minHeight: 0, overflow: "hidden" }}
        >
          <div className="card-cell-inner" style={{ height: "100%" }}>
            <StatsCard />
          </div>
        </div>

        {/* Row 2, Col 1: Skills */}
        <div
          className="fade-up"
          style={{ animationDelay: "0.2s", gridColumn: "1", gridRow: "2", minHeight: 0, overflow: "hidden" }}
        >
          <div className="card-cell-inner" style={{ height: "100%" }}>
            <SkillsCard onClick={() => openPage("skills")} />
          </div>
        </div>

        {/* Row 2, Col 3: Contact */}
        <div
          className="fade-up"
          style={{ animationDelay: "0.25s", gridColumn: "3", gridRow: "2", minHeight: 0, overflow: "hidden" }}
        >
          <div className="card-cell-inner" style={{ height: "100%" }}>
            <ContactCard onClick={() => openPage("contact")} />
          </div>
        </div>

        {/* Row 3: Projects spanning all 3 columns */}
        <div
          className="fade-up"
          style={{
            animationDelay: "0.3s",
            gridColumn: "1 / 4",
            gridRow: "3",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px",
            minHeight: 0,
          }}
        >
          <div className="card-cell-inner" style={{ height: "100%", overflow: "hidden" }}>
            <ProjectCard
              title="NeuralDash"
              desc="AI-powered analytics dashboard with real-time insights"
              color="var(--accent-blue)"
              techs={["React", "Python", "TensorFlow"]}
              onClick={() => openPage("project", "NeuralDash")}
            />
          </div>
          <div className="card-cell-inner" style={{ height: "100%", overflow: "hidden" }}>
            <ProjectCard
              title="FlowMint"
              desc="Web3 marketplace for digital creators and collectors"
              color="var(--accent-green)"
              techs={["Next.js", "Solidity", "IPFS"]}
              onClick={() => openPage("project", "FlowMint")}
            />
          </div>
          <div className="card-cell-inner" style={{ height: "100%", overflow: "hidden" }}>
            <ProjectCard
              title="Sonique"
              desc="Spatial audio player with immersive 3D sound engine"
              color="var(--accent-pink)"
              techs={["WebAudio", "Three.js", "Rust"]}
              onClick={() => openPage("project", "Sonique")}
            />
          </div>
        </div>
      </div>

      {/* Page Overlays */}
      <div className={`page-overlay ${activePage === "project" ? "open" : ""}`}>
        {/* <ProjectPage onClose={closePage} projectName={selectedProject} /> */}
      </div>
      <div className={`page-overlay ${activePage === "skills" ? "open" : ""}`}>
        {/* <SkillsPage onClose={closePage} /> */}
      </div>
      <div className={`page-overlay ${activePage === "about" ? "open" : ""}`}>
        {/* <AboutPage onClose={closePage} /> */}
      </div>
      <div className={`page-overlay ${activePage === "contact" ? "open" : ""}`}>
        {/* <ContactPage onClose={closePage} /> */}
      </div>
    </main>
  );
}
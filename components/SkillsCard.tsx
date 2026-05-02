"use client";

const skills = [
  { name: "TypeScript", level: 95, color: "var(--accent-blue)" },
  { name: "React / Next.js", level: 92, color: "var(--accent-blue)" },
  { name: "Node.js", level: 88, color: "var(--accent-green)" },
  { name: "Python", level: 80, color: "var(--accent-amber)" },
];

export default function SkillsCard({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="card clickable"
      onClick={onClick}
      style={{
        padding: "18px 20px",
        height: "100%",
        minHeight: 0,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: 4 }}>EXPERTISE</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Skills</h3>
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          border: "1px solid var(--border-bright)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--text-muted)", fontSize: 13,
        }}>↗</div>
      </div>

      {/* Skill bars — flex-grow so they fill remaining space */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, justifyContent: "space-evenly", minHeight: 0 }}>
        {skills.map((s) => (
          <div key={s.name} style={{ minHeight: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "'DM Mono', monospace" }}>{s.name}</span>
              <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>{s.level}%</span>
            </div>
            <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
              <div style={{
                height: "100%", width: `${s.level}%`,
                background: s.color, borderRadius: 2,
                boxShadow: `0 0 6px ${s.color}66`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
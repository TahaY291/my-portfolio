"use client";

const stats = [
  { value: "32+", label: "Projects", color: "var(--accent-blue)" },
  { value: "6yr", label: "Experience", color: "var(--accent-green)" },
  { value: "18k", label: "GitHub Stars", color: "var(--accent-amber)" },
];

export default function StatsCard() {
  return (
    <div className="card" style={{ padding: "22px 20px", minHeight: "160px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>AT A GLANCE</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
        {stats.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: s.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
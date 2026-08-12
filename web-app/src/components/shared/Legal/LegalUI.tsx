import React from "react";
import { CheckCircle2 } from "lucide-react";

export function SectionBadge({ number }: { number: string }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black tracking-tight shrink-0"
      style={{ background: "linear-gradient(135deg,#006970,#0599D5)", color: "#fff" }}>
      {number}
    </span>
  );
}

export function SectionHeading({ id, number, icon: Icon, children }: { id: string; number?: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6" id={id}>
      {number && <SectionBadge number={number} />}
      <Icon className="w-6 h-6" style={{ color: "#0599D5" }} />
      <h2 id={id} className="text-3xl sm:text-4xl font-black mb-0 flex items-center gap-3" style={{ color: "#050B1A" }}>{children}</h2>
    </div>
  );
}

export function InfoCard({ icon: Icon, title, children, accent = "#0599D5" }: { icon: React.ElementType; title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className="rounded-2xl border p-5 mb-4" style={{ borderColor: `${accent}22`, background: `${accent}08` }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5" style={{ color: accent }} />
        <span className="text-lg font-bold" style={{ color: accent }}>{title}</span>
      </div>
      <div className="text-lg leading-relaxed" style={{ color: "#3b494b" }}>{children}</div>
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-lg" style={{ color: "#3b494b" }}>
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#006970" }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CountryBadge({ country }: { country: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    "US": { bg: "#EFF6FF", text: "#1D4ED8" },
    "Nigeria": { bg: "#ECFDF5", text: "#065F46" },
    "EU": { bg: "#FEF3C7", text: "#92400E" },
  };
  const c = colors[country] || { bg: "#F3F4F6", text: "#374151" };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-bold"
      style={{ background: c.bg, color: c.text }}>{country}</span>
  );
}

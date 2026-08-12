import React from "react";
import { ChevronDown, Search, X } from "lucide-react";

export type LegalCategory = {
  title: string;
  sections: {
    id: string;
    label: string;
    icon: React.ElementType;
  }[];
};

export function LegalSidebar({
  categories,
  activeSection,
  searchQuery,
  onSearch,
}: {
  categories: LegalCategory[];
  activeSection: string;
  searchQuery: string;
  onSearch: (q: string) => void;
}) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="flex flex-col w-full h-full">
      <div className="flex flex-col h-full overflow-hidden" style={{ paddingTop: "24px" }}>
        {/* Search */}
        <div className="relative mx-4 mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#64748b" }} />
          <input
            type="text"
            placeholder="Search sections..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm outline-none placeholder-slate-500"
            style={{
              background: "#F1F5F9",
              border: "1px solid #E2E8F0",
              color: "#050B1A",
            }}
          />
          {searchQuery && (
            <button onClick={() => onSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2">
              <X className="w-3 h-3" style={{ color: "#64748b" }} />
            </button>
          )}
        </div>

        {/* TOC Accordion */}
        <nav className="flex-1 overflow-y-auto px-2 pb-8 space-y-4">
          {categories.map((category) => {
            const filteredSections = category.sections.filter(
              (s) => !searchQuery || s.label.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (filteredSections.length === 0) return null;
            return (
              <details key={category.title} className="group/details" open>
                <summary className="flex items-center justify-between px-3 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 cursor-pointer select-none">
                  {category.title}
                  <ChevronDown className="w-3 h-3 transition-transform group-open/details:-rotate-180" />
                </summary>
                <div className="space-y-0.5">
                  {filteredSections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollTo(section.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group"
                        style={{
                          background: isActive ? "#EFF6FF" : "transparent",
                        }}
                      >
                        <section.icon
                          className="w-4 h-4 shrink-0 transition-colors"
                          style={{ color: isActive ? "#0599D5" : "#64748b" }}
                        />
                        <span
                          className="text-sm font-medium transition-colors"
                          style={{ color: isActive ? "#0599D5" : "#475569" }}
                        >
                          {section.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export function LegalMobileTOC({
  categories,
  activeSection,
  open,
  onClose,
}: {
  categories: LegalCategory[];
  activeSection: string;
  open: boolean;
  onClose: () => void;
}) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="absolute left-0 top-0 bottom-0 w-72 flex flex-col p-4"
        style={{ background: "#0A1628" }}
      >
        <div className="flex items-center justify-between mb-6 mt-2">
          <span className="font-black text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
            Contents
          </span>
          <button onClick={onClose}>
            <X className="w-5 h-5" style={{ color: "rgba(255,255,255,0.5)" }} />
          </button>
        </div>
        <nav className="space-y-4 overflow-y-auto flex-1">
          {categories.map((category) => (
            <div key={category.title} className="mb-2">
              <div className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {category.title}
              </div>
              <div className="space-y-0.5">
                {category.sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollTo(section.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
                      style={{
                        background: isActive ? "rgba(5,153,213,0.18)" : "transparent",
                      }}
                    >
                      <section.icon
                        className="w-4 h-4 shrink-0"
                        style={{ color: isActive ? "#0599D5" : "rgba(255,255,255,0.4)" }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: isActive ? "#00F0FF" : "rgba(255,255,255,0.7)" }}
                      >
                        {section.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

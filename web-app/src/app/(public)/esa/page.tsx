"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { ShieldCheck, Lock, Radar, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import { esaMarkdown } from "./policy";

const CATEGORIES = [
  {
    title: "Security Terms",
    sections: [
      { id: "1-applicability", label: "Applicability", icon: FileText },
      { id: "2-information-security-program", label: "Security Program", icon: ShieldCheck },
      { id: "3-access-control", label: "Access Control", icon: Lock },
      { id: "4-data-encryption", label: "Encryption", icon: Lock },
    ],
  },
  {
    title: "Operations",
    sections: [
      { id: "5-vulnerability-management", label: "Vulnerability Management", icon: Radar },
      { id: "6-incident-response", label: "Incident Response", icon: AlertTriangle },
      { id: "7-compliance-audit", label: "Compliance & Audit", icon: CheckCircle2 },
    ],
  },
];

export default function ESAPage() {
  return (
    <LegalLayout
      title="Enterprise Security Addendum"
      description="Advanced security commitments, access controls, and incident response guarantees for our Noble Elite Enterprise clients."
      lastUpdated="August 9, 2026"
      categories={CATEGORIES}
      icon={<ShieldCheck className="w-6 h-6 text-slate-700" />}
      iconBg="bg-slate-200"
    >
      <div className="prose prose-slate prose-a:text-slate-800 prose-headings:text-slate-900 max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
        >
          {esaMarkdown}
        </ReactMarkdown>
      </div>
    </LegalLayout>
  );
}

"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { ShieldAlert, Server, Activity, HardDrive, FileText } from "lucide-react";
import { disasterRecoveryMarkdown } from "./policy";

const CATEGORIES = [
  {
    title: "Overview",
    sections: [
      { id: "1-purpose", label: "Purpose", icon: FileText },
      { id: "2-recovery-objectives", label: "Recovery Objectives", icon: Activity },
    ],
  },
  {
    title: "Resilience",
    sections: [
      { id: "3-architecture-resilience", label: "Architecture", icon: Server },
      { id: "4-incident-response-plan", label: "Incident Response", icon: ShieldAlert },
    ],
  },
  {
    title: "Testing",
    sections: [
      { id: "5-testing-and-review", label: "Testing & Review", icon: HardDrive },
    ],
  },
];

export default function DisasterRecoveryPage() {
  return (
    <LegalLayout
      title="Business Continuity & Disaster Recovery"
      description="Our architecture, processes, and metrics designed to ensure NobleInvoice remains operational during major disruptions."
      lastUpdated="August 9, 2026"
      categories={CATEGORIES}
      icon={<Server className="w-6 h-6 text-red-500" />}
      iconBg="bg-red-50"
    >
      <div className="prose prose-slate prose-a:text-red-600 prose-headings:text-slate-900 max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
        >
          {disasterRecoveryMarkdown}
        </ReactMarkdown>
      </div>
    </LegalLayout>
  );
}

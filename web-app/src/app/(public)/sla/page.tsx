"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { Activity, Percent, Ban, AlertCircle, FileText } from "lucide-react";
import { slaMarkdown } from "./policy";

const CATEGORIES = [
  {
    title: "SLA Terms",
    sections: [
      { id: "1-applicability", label: "Applicability", icon: FileText },
      { id: "2-uptime-commitment", label: "Uptime Commitment", icon: Activity },
      { id: "3-service-credits", label: "Service Credits", icon: Percent },
    ],
  },
  {
    title: "Conditions",
    sections: [
      { id: "4-exclusions", label: "Exclusions", icon: Ban },
      { id: "5-sole-remedy", label: "Sole Remedy", icon: AlertCircle },
    ],
  },
];

export default function SLAPage() {
  return (
    <LegalLayout
      title="Service Level Agreement"
      description="Our 99.9% uptime commitment for Noble Elite Enterprise customers, including service credit structures and guarantees."
      lastUpdated="August 9, 2026"
      categories={CATEGORIES}
      icon={<Activity className="w-6 h-6 text-indigo-500" />}
      iconBg="bg-indigo-50"
    >
      <div className="prose prose-slate prose-a:text-indigo-600 prose-headings:text-slate-900 max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
        >
          {slaMarkdown}
        </ReactMarkdown>
      </div>
    </LegalLayout>
  );
}

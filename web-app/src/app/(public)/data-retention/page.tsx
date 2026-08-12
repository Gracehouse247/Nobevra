"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { Database, Clock, Trash2, Smartphone, ShieldAlert, FileText } from "lucide-react";
import { dataRetentionMarkdown } from "./policy";

const CATEGORIES = [
  {
    title: "Overview",
    sections: [
      { id: "1-purpose-and-scope", label: "Purpose & Scope", icon: FileText },
      { id: "2-general-retention-principles", label: "Retention Principles", icon: ShieldAlert },
    ],
  },
  {
    title: "Schedules",
    sections: [
      { id: "3-retention-schedules", label: "Retention Schedules", icon: Clock },
    ],
  },
  {
    title: "Deletion",
    sections: [
      { id: "4-data-deletion-process", label: "Deletion Process", icon: Trash2 },
      { id: "5-local-data-on-mobile-devices", label: "Mobile Data", icon: Smartphone },
    ],
  },
  {
    title: "Contact",
    sections: [
      { id: "6-changes-to-this-policy", label: "Changes", icon: FileText },
      { id: "7-contact", label: "Contact Us", icon: FileText },
    ],
  },
];

export default function DataRetentionPage() {
  return (
    <LegalLayout
      title="Data Retention & Deletion Policy"
      description="Detailed schedules of how long we store your data and the automated processes that ensure it is securely destroyed when no longer needed."
      lastUpdated="August 9, 2026"
      categories={CATEGORIES}
      icon={<Database className="w-6 h-6 text-emerald-500" />}
      iconBg="bg-emerald-50"
    >
      <div className="prose prose-slate prose-a:text-emerald-600 prose-headings:text-slate-900 max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
        >
          {dataRetentionMarkdown}
        </ReactMarkdown>
      </div>
    </LegalLayout>
  );
}

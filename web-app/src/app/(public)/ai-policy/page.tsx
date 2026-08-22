"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { Cpu, ShieldCheck, AlertCircle, FileText, Globe, Lock } from "lucide-react";

const CATEGORIES = [
  {
    title: "AI Overview",
    sections: [
      { id: "1-introduction", label: "Introduction", icon: Cpu },
      { id: "2-ai-features-in-nobevra", label: "AI Features", icon: Cpu },
      { id: "3-ai-providers", label: "AI Providers", icon: Globe },
    ],
  },
  {
    title: "Data & Privacy",
    sections: [
      { id: "4-data-submitted-to-ai-features", label: "Data Submitted", icon: Lock },
      { id: "5-data-retention-and-training", label: "Data Retention", icon: ShieldCheck },
      { id: "6-ai-and-personal-data", label: "Personal Data & AI", icon: ShieldCheck },
    ],
  },
  {
    title: "Usage & Responsibility",
    sections: [
      { id: "7-accuracy-and-limitations", label: "Accuracy & Limitations", icon: AlertCircle },
      { id: "8-prohibited-ai-usage", label: "Prohibited Usage", icon: AlertCircle },
      { id: "9-human-oversight", label: "Human Oversight", icon: FileText },
      { id: "10-ai-generated-content", label: "AI-Generated Content", icon: FileText },
    ],
  },
  {
    title: "Governance",
    sections: [
      { id: "11-responsible-ai-principles", label: "Responsible AI Principles", icon: ShieldCheck },
      { id: "12-quotas-and-fair-use", label: "Quotas & Fair Use", icon: Cpu },
      { id: "13-changes-to-ai-features", label: "Changes to Features", icon: ShieldCheck },
      { id: "14-contact", label: "Contact", icon: FileText },
    ],
  },
];

const content = `
### 1. INTRODUCTION

Nobevra integrates artificial intelligence to help users create invoices faster, scan receipts more efficiently, and gain insights into their business performance. We believe AI should be useful, transparent, and clearly bounded by human accountability.

This AI & Responsible AI Policy explains:
* Which AI features Nobevra provides.
* Which AI providers power those features.
* What data is submitted to AI systems.
* How that data is handled.
* The limitations of AI-generated outputs.
* Your responsibilities when using AI features.
* Nobevra's responsible AI principles.

This policy forms part of the Nobevra [Terms of Service](https://nobevra.noblesworld.com.ng/terms) and should be read alongside the [Privacy Policy](https://nobevra.noblesworld.com.ng/privacy).

**Effective Date:** August 8, 2026

---

### 2. AI FEATURES IN NOBEVRA

Nobevra currently provides the following AI-powered features:

| Feature | Description | Available On |
|---|---|---|
| AI Assistant | Conversational AI assistant that helps answer business questions and provide guidance | Noble Pulse, Noble Elite |
| AI Voice Invoice Generation | Generate invoice drafts by speaking naturally | Noble Pulse (5/mo), Noble Elite (15/mo) |
| Receipt OCR Scanning | Scan receipt images to automatically extract amounts, dates, vendors and line items | Noble Pulse (5/mo), Noble Elite (15/mo) |
| Report Insights | AI-generated narrative summaries and recommendations based on your financial analytics | Noble Pulse, Noble Elite |

Additional AI-powered features may be introduced from time to time. This policy will be updated when materially new AI capabilities are added.

---

### 3. AI PROVIDERS

All current AI features in Nobevra are powered by:

**Google Gemini API (Google LLC)**

| Feature | Model |
|---|---|
| AI Assistant | Gemini 1.5 Flash |
| AI Voice Invoice Generation | Gemini 1.5 Flash |
| Receipt OCR / Image Analysis | Gemini 1.5 Flash Vision |
| Report Insights | Gemini 2.0 Flash |

Google LLC acts as a **data processor** with respect to data submitted through the Gemini API, in accordance with Google's API Terms of Service and applicable data-protection law.

Google's AI principles and practices: [ai.google/principles](https://ai.google/principles)  
Google's privacy policy: [policies.google.com/privacy](https://policies.google.com/privacy)

Nobevra does not use Groq, OpenAI, Anthropic, or any other AI provider in its current production environment. This policy will be updated if additional AI providers are integrated.

---

### 4. DATA SUBMITTED TO AI FEATURES

The following data categories may be submitted to the Google Gemini API depending on which AI feature you use:

| Feature | Data Sent to Gemini API |
|---|---|
| AI Assistant | Your typed message + limited financial context (e.g., your current invoice totals or plan tier — no raw client personal data unless you type it) |
| AI Voice Invoice Generation | Your spoken words (converted to text) + basic account context |
| Receipt OCR Scanning | The receipt image you upload (base64-encoded) |
| Report Insights | Aggregated financial metrics (totals, counts, trends) — no personal identifiers of your clients |

**Recommendations to protect sensitive data:**
* Do not paste full client lists, Social Security Numbers, bank account numbers, or other highly sensitive personal information into the AI assistant.
* Receipt images submitted for OCR may contain vendor names, amounts, and dates — review what is in your image before scanning.
* AI Voice features process your voice input as text; do not dictate sensitive information you would not type.

---

### 5. DATA RETENTION AND TRAINING

**Nobevra's database:**
* The **content** of AI sessions (messages, receipt images, voice inputs) is **not stored** in the Nobevra database.
* Only **usage counts** (how many AI operations you have used in the current billing period) are recorded in the database.
* This design minimizes our data retention footprint for AI interactions.

**Google's API terms:**
Per Google's API Terms of Service for the Gemini API:
* Data submitted via the Gemini API **is not used to train Google's general-purpose AI models**.
* Google may retain submitted data for a limited period for safety and abuse monitoring purposes, subject to their data retention policies.
* Enterprises using the API may have additional contractual protections available.

Nobevra does not train, fine-tune, or use your data to improve its own AI models.

---

### 6. AI AND PERSONAL DATA

When you use AI features, data submitted may constitute personal data under the Nigeria Data Protection Act 2023 (NDPA), GDPR, or other applicable law — particularly if you include client names, business addresses, or financial details in AI prompts.

**As controller:** You remain responsible for ensuring that any personal data you submit to AI features is processed in accordance with applicable data-protection law, including ensuring you have a lawful basis to share that data.

**As processor:** Nobevra processes such data on your behalf to deliver the AI feature you have requested, as described in the Privacy Policy.

**Data subject rights:** Where AI processing affects individuals' personal data, data-subject rights (access, correction, deletion) should be directed to Nobevra via privacy@noblesworld.com.ng. Where data has been transmitted to Google and you require deletion, we will coordinate with Google's applicable procedures.

---

### 7. ACCURACY AND LIMITATIONS

**AI-generated outputs are not guaranteed to be accurate, complete, or appropriate for your circumstances.**

Specific limitations you should be aware of:

* **Invoice generation:** AI-generated invoices may contain incorrect line items, prices, dates, tax calculations, client details, or formatting errors. You must review all AI-generated invoices before sending them to clients.
* **Receipt OCR:** Extracted amounts, dates, vendor names, and line items may be incorrect due to image quality, unusual receipt formats, handwriting, or model limitations. Always verify extracted data against the source document.
* **Report insights:** AI narrative summaries are based on your stored financial data and may reflect errors in that data. They are not a substitute for professional accounting analysis.
* **AI assistant:** Responses may be outdated, incorrect, or not applicable to your specific jurisdiction or industry. Nobevra AI does not provide legal, tax, accounting, financial, investment, or medical advice.

**Nobevra is not liable for decisions made in reliance on unreviewed AI-generated content.**

---

### 8. PROHIBITED AI USAGE

You must not use Nobevra's AI features to:

* Generate fraudulent invoices, false business records, or fabricated receipts.
* Create content designed to deceive, defraud, harass, or harm individuals.
* Circumvent AI usage quotas by creating multiple accounts or manipulating session state.
* Attempt to "jailbreak," reverse-engineer, or probe the underlying AI model.
* Extract proprietary model weights, training data, or system prompts.
* Generate content that violates the Acceptable Use Policy, including hate speech, illegal content, or content that exploits minors.
* Submit inputs containing highly sensitive personal data (financial credentials, government ID numbers, medical records) unless the feature expressly supports and documents such use.

---

### 9. HUMAN OVERSIGHT

Nobevra is designed with human oversight in mind:

* AI features are assistive — they produce drafts or suggestions that you must review before use.
* No AI feature in Nobevra automatically sends invoices, makes payments, or takes legally binding actions without your explicit confirmation.
* AI-generated invoice drafts must be manually reviewed and sent by you.
* Receipt OCR extractions are presented for your review before being saved.
* Report insights are advisory only and do not trigger automated financial actions.

You are the responsible decision-maker. AI is a tool, not an autonomous agent.

---

### 10. AI-GENERATED CONTENT

Any content generated by AI features and saved or sent through Nobevra becomes your content, subject to the Terms of Service. You are responsible for:

* The accuracy of AI-generated invoices sent to clients.
* Compliance with applicable consumer protection and trading standards laws regarding statements in invoices or product descriptions.
* Reviewing OCR-extracted data before recording it as a business expense.
* Not relying on AI-generated tax figures without independent verification.

Nobevra is not liable for losses arising from your reliance on AI-generated content that you did not review.

---

### 11. RESPONSIBLE AI PRINCIPLES

Nobevra's approach to AI is guided by the following principles:

**Transparency**
We clearly disclose which AI features we offer, which providers power them, and what data is submitted. We do not use AI in hidden or opaque ways that affect your account without your knowledge.

**Human accountability**
AI in Nobevra is always subject to human review. We do not use AI to make automated decisions that have significant legal or financial effects on you without human involvement.

**Data minimization**
We submit only the data necessary for each AI feature to function. We do not store AI session content in our database. We encourage users not to submit unnecessary personal data to AI features.

**Fairness and non-discrimination**
We do not use AI features to profile users based on protected characteristics or to make discriminatory decisions.

**Safety**
We implement usage quotas to prevent abuse. We prohibit use of AI features to generate harmful, fraudulent, or illegal content. We work with providers whose AI safety practices meet acceptable standards.

**Continuous improvement**
We review our AI features and this policy as AI technology and applicable regulation evolves. We will update this policy when we introduce new AI capabilities or providers.

---

### 12. QUOTAS AND FAIR USE

AI feature usage is subject to monthly quotas under your subscription plan:

| Plan | AI Voice Invoice Generation | Receipt OCR Scans |
|---|---|---|
| Explorer (free) | Not available | Not available |
| Pay-As-You-Go | Not included | Not included |
| Noble Pulse | 5 uses/month | 5 uses/month |
| Noble Elite | 15 uses/month | 15 uses/month |

Quotas reset on the first of each billing month. Unused quota does not roll over. Quota counts are enforced at the database level.

Attempting to circumvent quotas by creating multiple accounts or manipulating quota counters is a violation of the Acceptable Use Policy and may result in account termination.

---

### 13. CHANGES TO AI FEATURES

AI technology evolves rapidly. Nobevra may:

* Add new AI features or models.
* Switch AI providers.
* Change the scope of data submitted to AI providers.
* Adjust usage quotas.
* Deprecate existing AI features.

Where changes materially affect how your data is processed by AI systems, we will update this policy, the Privacy Policy, and the Subprocessor List, and notify users via in-app notification or email.

---

### 14. CONTACT

For questions about AI features, data submitted to AI systems, or to exercise data-subject rights relating to AI processing:

**Data Protection Officer:** privacy@noblesworld.com.ng  
**General support:** invoice@noblesworld.com.ng
`;

export default function AIPolicyPage() {
  return (
    <LegalLayout
      title="AI & Responsible AI Policy"
      description="This policy explains how Nobevra uses artificial intelligence, which AI providers we use, how your data is handled, and our commitment to responsible AI development."
      categories={CATEGORIES}
    >
      <div className="prose prose-slate prose-a:text-blue-600 prose-headings:text-slate-900 max-w-none prose-h3:text-2xl prose-h3:font-black prose-h3:mt-12 prose-h3:scroll-mt-24 prose-table:text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
          {content}
        </ReactMarkdown>
      </div>
    </LegalLayout>
  );
}

"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { ShieldCheck, AlertCircle, FileText, Globe, Lock, Database } from "lucide-react";

const CATEGORIES = [
  {
    title: "General Rules",
    sections: [
      { id: "1-overview", label: "Overview", icon: ShieldCheck },
      { id: "2-prohibited-conduct", label: "Prohibited Conduct", icon: AlertCircle },
      { id: "3-content-standards", label: "Content Standards", icon: FileText },
    ],
  },
  {
    title: "Platform-Specific",
    sections: [
      { id: "4-invoice-and-payment-misuse", label: "Invoice & Payment Misuse", icon: AlertCircle },
      { id: "5-ai-feature-usage", label: "AI Feature Usage", icon: ShieldCheck },
      { id: "6-qr-codes-and-digital-identities", label: "QR Codes & Identities", icon: Globe },
      { id: "7-api-and-integrations", label: "API & Integrations", icon: Lock },
      { id: "8-team-workspaces", label: "Team Workspaces", icon: Database },
    ],
  },
  {
    title: "Enforcement",
    sections: [
      { id: "9-reporting-violations", label: "Reporting Violations", icon: FileText },
      { id: "10-enforcement-and-consequences", label: "Enforcement", icon: AlertCircle },
      { id: "11-appeals", label: "Appeals", icon: ShieldCheck },
      { id: "12-changes-to-this-policy", label: "Policy Changes", icon: ShieldCheck },
    ],
  },
];

const content = `
### 1. OVERVIEW

This Acceptable Use Policy ("AUP") describes what you may and may not do when using the Nobevra platform, including the website, web application, mobile applications, APIs, and all related services ("Service").

This AUP forms part of the Nobevra [Terms of Service](https://nobevra.noblesworld.com.ng/terms). Capitalized terms not defined here have the meanings given to them in the Terms of Service.

**The purpose of this policy** is to ensure that Nobevra remains a safe, fair, and legally compliant environment for all users — freelancers, consultants, agencies, businesses, and their clients.

By using the Service, you confirm that you have read and agree to comply with this AUP.

---

### 2. PROHIBITED CONDUCT

You must not use Nobevra to:

#### 2.1 Fraud and Financial Crime
* Create, send, or store fraudulent invoices.
* Impersonate another business, individual, or brand in invoices, client portals, digital business cards, or any other part of the Service.
* Facilitate money laundering, terrorism financing, sanctions evasion, or any other financial crime.
* Submit false or misleading business, tax, or registration information.
* Generate fictitious transactions to game payment provider limits or bank systems.
* Use the payment or wallet features to move money obtained through illegal means.

#### 2.2 Harmful or Illegal Activities
* Use the Service to facilitate any activity that is illegal under applicable Nigerian, international, or local law.
* Sell, promote, or distribute illegal goods or services.
* Engage in or facilitate human trafficking, exploitation, or abuse.
* Exploit, harm, or attempt to exploit minors in any way.
* Create QR codes, digital business cards, or Digital Product Passports that direct users to illegal, harmful, or prohibited content.

#### 2.3 Security Attacks and Technical Abuse
* Probe, scan, or test the vulnerability of Nobevra's infrastructure without prior written authorization.
* Attempt to gain unauthorized access to another user's Account, Workspace, or data.
* Bypass, circumvent, or disable authentication, security controls, rate limits, or entitlement enforcement mechanisms.
* Upload, transmit, or execute malware, ransomware, viruses, trojans, worms, or any other malicious code.
* Conduct or facilitate distributed denial-of-service (DDoS) attacks against Nobevra or any third-party system.
* Use automated scripts, bots, or scrapers to access or extract data from the Service in ways not permitted by the Terms of Service.
* Manipulate, reset, or falsify usage quotas, AI credit limits, or subscription entitlements.

#### 2.4 Privacy and Data Violations
* Collect, harvest, or process personal information about other users without a lawful basis.
* Use client data stored in Nobevra's CRM for purposes outside the legitimate B2B relationship with that client.
* Attempt to access, extract, or reverse-engineer other users' Business Data or Customer Data.
* Use the Service to conduct phishing, social engineering, or identity theft.
* Violate any applicable data-protection law, including the Nigeria Data Protection Act 2023 (NDPA), GDPR, or equivalent legislation.

#### 2.5 Intellectual Property
* Upload or transmit content that infringes another person's copyright, trademark, trade secret, patent, or other intellectual-property rights.
* Use Nobevra's branding, name, or logos in an unauthorized manner.
* Remove copyright or proprietary notices from any Nobevra materials.

#### 2.6 Spam and Messaging Abuse
* Use the client portal, invoice messaging, or email features to send unsolicited bulk commercial messages (spam).
* Use the Service to send harassing, threatening, defamatory, or abusive communications.
* Use automated means to send high volumes of invoices, reminders, or client portal messages beyond normal business use.

#### 2.7 Subscription and Entitlement Abuse
* Create multiple accounts to circumvent subscription limits, PAYG purchase rules, promotional offers, or free-tier restrictions.
* Sell, resell, sublicense, or transfer Nobevra subscription access to unauthorized third parties.
* Attempt to circumvent the Service's entitlement system to access features not included in your Plan.
* Use the Service in a way that creates an unreasonable or disproportionate load on the platform's infrastructure.

---

### 3. CONTENT STANDARDS

Any content you upload, publish, or transmit through the Service must:

* Be accurate and not misleading.
* Comply with applicable laws in your jurisdiction and those of your clients.
* Not contain hate speech, discriminatory content, or material that promotes violence against any person or group.
* Not contain sexually explicit, pornographic, or obscene material.
* Not contain content that defames, harasses, or threatens another person.
* Not infringe any third party's intellectual-property rights.

Content that appears in invoices, client portals, digital business cards, QR code destinations, and Digital Product Passports is subject to these standards.

---

### 4. INVOICE AND PAYMENT MISUSE

Nobevra's payment and invoicing features are intended for legitimate commercial transactions. You must not:

* Issue invoices for goods or services you do not intend to deliver.
* Use Nobevra payment links to solicit payment from individuals under false pretences.
* Use the wallet or payout features for the movement of funds unrelated to legitimate business invoicing activity.
* Attempt to reverse-engineer Flutterwave's or any payment provider's API in an unauthorized manner.
* Submit false or inflated transaction amounts to a payment provider.
* Create fictitious client records to abuse PAYG client-slot entitlements.

Payment misuse may result in immediate account suspension and reporting to relevant financial authorities.

---

### 5. AI FEATURE USAGE

Nobevra's AI features (AI assistant, AI voice invoice generation, receipt OCR extraction) are provided for legitimate business productivity purposes. You must not use AI features to:

* Generate fraudulent invoices, false business records, or fabricated receipts.
* Submit inputs designed to manipulate or "jailbreak" the AI model.
* Attempt to extract training data or proprietary model information.
* Generate content that violates any other part of this AUP.
* Circumvent AI usage quotas by creating multiple accounts or manipulating session state.

AI-generated content must be reviewed by you before use. You are responsible for the accuracy and legality of any document created or modified using AI assistance.

---

### 6. QR CODES AND DIGITAL IDENTITIES

QR codes and digital business cards created through Nobevra must not:

* Direct users to phishing pages, malware, or prohibited content.
* Impersonate another brand, business, or individual.
* Be used to collect personal information from third parties without appropriate notice and lawful basis.
* Direct users to content that violates this AUP or applicable law.

Nobevra QR analytics may collect technical data about people who scan your QR codes. As the QR code owner, you are responsible for ensuring that any collection of such data is consistent with applicable privacy law and that you have provided appropriate notice to the individuals concerned, as described in the Privacy Policy.

---

### 7. API AND INTEGRATIONS

API access (available on Noble Elite) must be used in accordance with the following rules:

* API credentials (keys, tokens, secrets) must be kept confidential and must not be shared or exposed in public repositories, client-side code, or logs.
* API usage must comply with documented rate limits. Attempts to circumvent rate limits are prohibited.
* You must not use the API to bulk-extract or scrape data beyond your own account's data.
* Integration with third-party services must comply with those services' terms of service.
* Webhook endpoints you configure must not be used to facilitate prohibited activities.

Nobevra may revoke API access immediately where abuse is detected, without prior notice.

---

### 8. TEAM WORKSPACES

If you use Nobevra's team workspace features (Noble Elite):

* Workspace administrators are responsible for the actions of team members they invite.
* You must not invite individuals to a Workspace without their consent.
* Role-based permissions must be configured appropriately to limit access to sensitive data.
* You must not use team workspace features to give unauthorized individuals access to another business's data.
* Workspace administrators must not abuse role-assignment features to deprive legitimate business owners of control over their own Workspace.

---

### 9. REPORTING VIOLATIONS

If you believe another user is violating this AUP — including fraudulent invoicing, impersonation, harassment, or security abuse — please report it to:

**Email:** invoice@noblesworld.com.ng  
**Subject line:** "AUP Violation Report"

Please include as much detail as possible, including the nature of the violation, the account or content involved, and any supporting evidence. We will investigate reports in good faith and take appropriate action.

Nobevra is not able to confirm or disclose the outcome of investigations concerning other users' accounts.

---

### 10. ENFORCEMENT AND CONSEQUENCES

Nobevra reserves the right to take the following actions in response to violations of this AUP:

* Issue a formal warning.
* Temporarily restrict specific features or functionality.
* Suspend access to the Account while an investigation is conducted.
* Permanently terminate the Account and all associated data.
* Remove or disable specific content that violates this AUP.
* Report conduct to relevant law enforcement or regulatory authorities.
* Seek injunctive relief or other legal remedies.

The severity of the response will generally be proportionate to the severity and nature of the violation. Immediate termination without prior notice may occur for severe violations including fraud, security attacks, child exploitation, and terrorism-related activity.

---

### 11. APPEALS

If you believe your account was suspended or terminated in error:

1. Email **invoice@noblesworld.com.ng** with the subject line "Account Appeal."
2. Include your registered email address and a description of why you believe the action was taken in error.
3. We aim to review appeals within 5 business days.

Submitting an appeal does not guarantee reinstatement. Where we determine that a violation did occur, we may maintain the suspension or termination.

---

### 12. CHANGES TO THIS POLICY

We may update this Acceptable Use Policy from time to time. Material changes will be notified via in-app notification or email. Continued use of the Service after the effective date of an updated AUP constitutes acceptance where legally permitted.

**Contact:** invoice@noblesworld.com.ng
`;

export default function AcceptableUsePage() {
  return (
    <LegalLayout
      title="Acceptable Use Policy"
      description="This policy describes what you may and may not do when using Nobevra — protecting all users, maintaining platform integrity, and ensuring legal compliance."
      categories={CATEGORIES}
    >
      <div className="prose prose-slate prose-a:text-blue-600 prose-headings:text-slate-900 max-w-none prose-h3:text-2xl prose-h3:font-black prose-h3:mt-12 prose-h3:scroll-mt-24 prose-h4:text-lg prose-h4:font-bold">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
          {content}
        </ReactMarkdown>
      </div>
    </LegalLayout>
  );
}

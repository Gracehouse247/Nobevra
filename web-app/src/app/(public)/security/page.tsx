"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { ShieldCheck, Lock, Database, Globe, FileText, Users, AlertCircle } from "lucide-react";

const CATEGORIES = [
  {
    title: "Security Overview",
    sections: [
      { id: "1-our-security-commitment", label: "Our Commitment", icon: ShieldCheck },
      { id: "2-infrastructure-security", label: "Infrastructure", icon: Globe },
      { id: "3-encryption", label: "Encryption", icon: Lock },
    ],
  },
  {
    title: "Authentication & Access",
    sections: [
      { id: "4-authentication", label: "Authentication", icon: Lock },
      { id: "5-row-level-security-rls", label: "Row-Level Security", icon: Database },
      { id: "6-access-control", label: "Access Control", icon: Users },
    ],
  },
  {
    title: "Data & Payments",
    sections: [
      { id: "7-data-security", label: "Data Security", icon: Database },
      { id: "8-payment-card-security", label: "Payment Card Security", icon: ShieldCheck },
      { id: "9-backups", label: "Backups", icon: Database },
    ],
  },
  {
    title: "Operations & Response",
    sections: [
      { id: "10-monitoring", label: "Monitoring", icon: AlertCircle },
      { id: "11-incident-response", label: "Incident Response", icon: AlertCircle },
      { id: "12-vulnerability-management", label: "Vulnerability Management", icon: ShieldCheck },
      { id: "13-your-responsibilities", label: "Your Responsibilities", icon: Users },
      { id: "14-contact", label: "Contact", icon: FileText },
    ],
  },
];

const content = `
### 1. OUR SECURITY COMMITMENT

NobleInvoice is built on the principle that users who trust us with their business data deserve robust, transparent, and independently verifiable security practices.

This Security Policy describes the technical and organizational measures NobleInvoice implements to protect the confidentiality, integrity, and availability of the Service and of Business Data entrusted to us.

**Effective Date:** August 8, 2026  
**This document reflects the security posture as of the effective date. Specific controls are subject to change as the platform evolves.**

---

### 2. INFRASTRUCTURE SECURITY

**Cloud infrastructure:** NobleInvoice's backend is hosted on Supabase, which runs on AWS infrastructure. Web application delivery is handled by Vercel's global edge network.

**Physical security:** NobleInvoice does not operate its own data centers. Physical security controls — including perimeter security, access controls, surveillance, and environmental controls — are managed by AWS and Vercel in accordance with their respective certifications (AWS SOC 2, ISO 27001, and related standards).

**Network security:**
* All traffic between clients and NobleInvoice servers is encrypted using TLS 1.2 or higher.
* Edge-layer DDoS protection and rate limiting are implemented via Supabase and Vercel's infrastructure.
* Database and storage access is restricted to authorized server-side processes; the database is not publicly accessible.
* Production systems are logically isolated from development and staging environments.

**Supabase security:** [https://supabase.com/security](https://supabase.com/security)  
**Vercel security:** [https://vercel.com/security](https://vercel.com/security)

---

### 3. ENCRYPTION

**In transit:**
* All connections between clients (browsers, mobile apps) and NobleInvoice servers use TLS 1.2+.
* HTTP connections are automatically redirected to HTTPS.
* Supabase database connections use encrypted connections.

**At rest:**
* Database data is encrypted at rest by Supabase/AWS (AES-256).
* Document and file storage is encrypted at rest.
* Mobile application secrets (JWT tokens, user credentials) are stored using **flutter_secure_storage**, which uses:
  * iOS: Keychain Services (hardware-backed where available)
  * Android: EncryptedSharedPreferences (backed by Android Keystore)

**Passwords:**
* User passwords are never stored in plain text.
* Password hashing is managed by Supabase Auth using bcrypt.

---

### 4. AUTHENTICATION

**Methods supported:**
* Email and password (with password-strength enforcement)
* Google OAuth 2.0 (Sign in with Google)
* LinkedIn OAuth (if social features are connected)

**Session management:**
* Authentication uses JWT (JSON Web Tokens) issued by Supabase Auth.
* Access tokens are short-lived (typically 1 hour).
* Refresh tokens rotate on use, limiting the impact of token exposure.
* Sessions can be invalidated server-side on sign-out or account security events.

**Mobile push notification security:**
* Firebase Cloud Messaging (FCM) device tokens are stored in the database and associated with authenticated user accounts.
* FCM tokens are used only for sending legitimate platform notifications to your devices.
* Tokens are rotated on re-registration and cleaned up on sign-out.

---

### 5. ROW-LEVEL SECURITY (RLS)

NobleInvoice implements **Supabase Row-Level Security (RLS) policies** across all database tables containing user data.

RLS ensures that:
* A user can only read, insert, update, or delete rows that belong to their own account or Workspace.
* Database queries cannot return data belonging to another user, even if an unauthorized query is attempted.
* Team workspace access is governed by role-based RLS policies — members can access only the Workspace data their administrator has authorized.

RLS is enforced at the database level, independent of application-level access controls, providing an additional security layer.

---

### 6. ACCESS CONTROL

**User-level:**
* Access to features and data is controlled by your subscription plan entitlement.
* Entitlement checks are enforced at both the API and database levels.

**Team workspace (Noble Elite):**
* Workspace administrators can assign roles and permissions to team members.
* Role-based access control (RBAC) limits what data each team member can view, create, or modify.
* Administrators can remove members and revoke access at any time.

**NobleInvoice staff access:**
* NobleInvoice staff do not have routine access to user Business Data.
* Access may be necessary for support, security investigations, or legal compliance, and is subject to internal access control policies.

**API keys:**
* API keys (Noble Elite) are hashed before storage. Full API keys are displayed only at the time of creation.
* Lost API keys cannot be recovered — a new key must be generated.

---

### 7. DATA SECURITY

**Data isolation:** Every user's data is logically isolated by user ID and, for teams, by Workspace ID. RLS policies (Section 5) enforce this isolation at the database level.

**Audit logging:** Critical account actions — including sign-in events, subscription changes, team membership changes, and data deletion requests — are logged for security and compliance purposes.

**GDPR/NDPA-relevant controls:**
* The database includes GDPR-compliance columns (consent records, data deletion flags, retention tracking).
* The \`cleanup-user-data\` Supabase Edge Function implements a structured, cascading deletion pipeline for account deletion requests.
* Soft-deletion mechanisms are used where immediate hard deletion is not feasible (e.g., financial records subject to retention obligations).

**AI data handling:**
* AI assistant, OCR, and report insight features use Google Gemini API.
* Data submitted to the Gemini API is not used to train Google's general-purpose AI models (per Google's API terms).
* The content of AI sessions is not stored in the NobleInvoice database — only usage counts are recorded.

---

### 8. PAYMENT CARD SECURITY

**Tokenized-only architecture:**
NobleInvoice uses a tokenized payment architecture designed to minimize exposure to cardholder data:

* Card numbers, CVVs, and full card details are submitted directly to Flutterwave's **PCI DSS-compliant hosted environment** and never transit NobleInvoice application servers.
* NobleInvoice stores only the payment token returned by Flutterwave: last 4 digits, card brand, expiry reference, and transaction identifiers.
* This architecture is designed to reduce NobleInvoice's PCI DSS scope.

**Flutterwave PCI DSS compliance:** [https://flutterwave.com/us/compliance](https://flutterwave.com/us/compliance)

---

### 9. BACKUPS

**Database backups:** Supabase maintains automated database backups on a schedule consistent with its platform commitments. Backup retention periods are governed by Supabase's policies for the applicable service tier.

**File/document storage:** User-uploaded documents and files stored in Supabase Storage are protected by Supabase's storage infrastructure, including redundant storage.

**User-initiated exports:** Where available, NobleInvoice provides data export functionality to allow users to maintain independent copies of their Business Data. We recommend using this functionality for critical business records.

NobleInvoice's backup systems are designed for disaster recovery and are not a substitute for your own business continuity arrangements for critical financial records.

---

### 10. MONITORING

NobleInvoice implements the following monitoring controls:

* **Error and performance monitoring:** Application errors, API failures, and performance anomalies are monitored.
* **Authentication monitoring:** Failed sign-in attempts and unusual session patterns may trigger security alerts.
* **Rate limiting:** API endpoints and authentication systems implement rate limiting to mitigate brute-force and abuse attempts.
* **Third-party monitoring:** Supabase and Vercel provide infrastructure-level monitoring including availability alerting.

---

### 11. INCIDENT RESPONSE

In the event of a security incident affecting user data:

1. **Detection and containment:** Affected systems are isolated to limit the impact.
2. **Assessment:** The nature, scope, and affected data are determined.
3. **Notification:** Affected users and, where required, relevant supervisory authorities (including the NDPC under NDPA 2023, and other applicable regulators) are notified within applicable legal timeframes. Under GDPR, personal data breaches must generally be reported to the relevant supervisory authority within 72 hours of becoming aware.
4. **Remediation:** The vulnerability or cause of the incident is addressed.
5. **Post-incident review:** Lessons are incorporated into security controls.

To report a suspected security incident or data breach: **privacy@noblesworld.com.ng**

---

### 12. VULNERABILITY MANAGEMENT

NobleInvoice operates a responsible disclosure approach to security vulnerabilities:

**If you discover a security vulnerability:**
* Please report it to **privacy@noblesworld.com.ng** with a description of the issue and steps to reproduce.
* Do not publicly disclose the vulnerability until we have had a reasonable opportunity to investigate and remediate.
* Do not exploit the vulnerability beyond what is necessary to demonstrate its existence.
* Do not access, modify, or delete data belonging to other users during your testing.

We will acknowledge your report promptly and aim to resolve confirmed vulnerabilities in a timely manner. We do not currently operate a formal bug bounty programme, but we genuinely appreciate responsible disclosure and will acknowledge researchers who help us improve security.

**You must not conduct security testing against NobleInvoice systems without prior written authorization.**

---

### 13. YOUR RESPONSIBILITIES

Security is a shared responsibility. To protect your NobleInvoice Account:

* **Use a strong, unique password** for your NobleInvoice account that you do not reuse on other services.
* **Enable Google Sign-In or other available authentication methods** where they offer additional security.
* **Protect your API keys** — do not commit them to public repositories or expose them in client-side code.
* **Manage team access carefully** — remove former employees or contractors promptly.
* **Keep your contact information current** — we use your email address for security notifications.
* **Report suspicious activity** immediately to invoice@noblesworld.com.ng.
* **Maintain independent backups** of critical business records.

NobleInvoice is not responsible for security incidents caused by your failure to follow reasonable security practices.

---

### 14. CONTACT

**Security and vulnerability reports:** privacy@noblesworld.com.ng  
**Data Protection Officer:** privacy@noblesworld.com.ng  
**General support:** invoice@noblesworld.com.ng  

For data-subject rights requests related to security data, please contact the Data Protection Officer.
`;

export default function SecurityPage() {
  return (
    <LegalLayout
      title="Security Policy"
      description="This document describes the technical and organizational security measures NobleInvoice implements to protect your business data, financial records, and account information."
      categories={CATEGORIES}
    >
      <div className="prose prose-slate prose-a:text-blue-600 prose-headings:text-slate-900 max-w-none prose-h3:text-2xl prose-h3:font-black prose-h3:mt-12 prose-h3:scroll-mt-24">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
          {content}
        </ReactMarkdown>
      </div>
    </LegalLayout>
  );
}

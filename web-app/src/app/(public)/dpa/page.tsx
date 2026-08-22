"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { FileText, ShieldCheck, Database, Globe, Lock, Users, AlertCircle } from "lucide-react";

const CATEGORIES = [
  {
    title: "Agreement",
    sections: [
      { id: "1-parties-and-scope", label: "Parties & Scope", icon: FileText },
      { id: "2-definitions", label: "Definitions", icon: FileText },
      { id: "3-roles-of-the-parties", label: "Roles of the Parties", icon: Users },
    ],
  },
  {
    title: "Processing Details",
    sections: [
      { id: "4-subject-matter-and-instructions", label: "Subject Matter", icon: Database },
      { id: "5-nature-purpose-and-duration", label: "Nature & Duration", icon: FileText },
      { id: "6-categories-of-personal-data", label: "Data Categories", icon: Database },
      { id: "7-categories-of-data-subjects", label: "Data Subjects", icon: Users },
    ],
  },
  {
    title: "Obligations",
    sections: [
      { id: "8-processor-obligations", label: "Processor Obligations", icon: ShieldCheck },
      { id: "9-security-measures", label: "Security Measures", icon: Lock },
      { id: "10-sub-processors", label: "Sub-Processors", icon: Globe },
      { id: "11-international-transfers", label: "International Transfers", icon: Globe },
    ],
  },
  {
    title: "Rights & Liability",
    sections: [
      { id: "12-data-subject-rights", label: "Data Subject Rights", icon: Users },
      { id: "13-data-breach-notification", label: "Breach Notification", icon: AlertCircle },
      { id: "14-audit-rights", label: "Audit Rights", icon: FileText },
      { id: "15-term-and-termination", label: "Term & Termination", icon: FileText },
      { id: "16-liability-and-indemnification", label: "Liability", icon: ShieldCheck },
      { id: "17-governing-law", label: "Governing Law", icon: Globe },
      { id: "18-contact-and-execution", label: "Contact & Execution", icon: FileText },
    ],
  },
];

const content = `
### 1. PARTIES AND SCOPE

This Data Processing Addendum ("DPA") is entered into between:

* **Controller:** The business, organization, or individual ("Customer," "you," "Controller") that has agreed to the Nobevra Terms of Service and uses the Nobevra platform to process personal data.
* **Processor:** The Noble's Technology Services, CAC-registered, Lagos, Nigeria, operating the Nobevra platform ("Nobevra," "we," "Processor").

This DPA applies where Nobevra processes **personal data on behalf of the Customer** as a data processor, specifically the personal data of the Customer's clients, contacts, employees, or other data subjects that the Customer uploads, stores, or processes through the Nobevra platform ("Customer Personal Data").

This DPA forms part of and is incorporated into the Nobevra [Terms of Service](https://nobevra.noblesworld.com.ng/terms). In the event of a conflict between this DPA and the Terms of Service in matters relating to data processing, this DPA prevails.

**This DPA is incorporated into the Terms of Service by reference and applies automatically to all Nobevra customers who process personal data through the platform.** Enterprise customers who require a signed bilateral DPA should contact legal@noblesworld.com.ng.

---

### 2. DEFINITIONS

For this DPA:

* **"Personal Data"** means any information relating to an identified or identifiable natural person, as defined under applicable data-protection law, including the Nigeria Data Protection Act 2023 (NDPA), GDPR, and UK GDPR.
* **"Processing"** means any operation or set of operations performed on Personal Data, including collection, storage, retrieval, use, disclosure, and deletion.
* **"Controller"** means the entity that determines the purposes and means of the processing of Personal Data. In the context of this DPA, the Customer is the Controller of Customer Personal Data.
* **"Processor"** means the entity that processes Personal Data on behalf of the Controller. In the context of this DPA, Nobevra is the Processor.
* **"Sub-processor"** means any third party engaged by the Processor to carry out processing activities on behalf of the Controller.
* **"Data Subject"** means the natural person whose Personal Data is being processed.
* **"Supervisory Authority"** means the relevant governmental body responsible for data-protection supervision, including the Nigeria Data Protection Commission (NDPC) and equivalent authorities in other jurisdictions.
* **"Security Incident"** means a confirmed breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, Personal Data.
* **"SCCs"** means the Standard Contractual Clauses for the transfer of Personal Data to third countries, as applicable.

---

### 3. ROLES OF THE PARTIES

**Customer as Controller:**
* The Customer determines the purposes for which Customer Personal Data is processed (e.g., to manage client invoices, issue payment requests, maintain client records).
* The Customer is responsible for: collecting Personal Data lawfully; providing appropriate privacy notices to its data subjects; ensuring there is a lawful basis for processing; and complying with applicable data-protection law in its jurisdiction.
* The Customer is responsible for the accuracy and legality of the Customer Personal Data it uploads to Nobevra.

**Nobevra as Processor:**
* Nobevra processes Customer Personal Data only on the documented instructions of the Customer, as set out in this DPA and the Terms of Service.
* Nobevra does not sell Customer Personal Data or use it for its own independent commercial purposes.
* Nobevra does not make independent decisions about Customer Personal Data beyond what is necessary to provide the Service.

**Independent Controller scenarios:**
* Where Nobevra processes data about the Customer's own Account (registration data, subscription data, payment information for billing Nobevra's own subscription), Nobevra acts as an independent Controller. This processing is described in the [Privacy Policy](https://nobevra.noblesworld.com.ng/privacy).

---

### 4. SUBJECT MATTER AND INSTRUCTIONS

**Subject matter:** The processing of Customer Personal Data stored by the Customer in the Nobevra platform, including but not limited to client contact information, invoice records, and payment transaction references.

**Instructions:** Nobevra is instructed to process Customer Personal Data for the following purposes:
* Storing Customer Personal Data in the Nobevra database on behalf of the Customer.
* Enabling the Customer to create, send, and manage invoices to its clients.
* Enabling the Customer to manage client relationships through the CRM features.
* Enabling the Customer to access, edit, export, and delete Customer Personal Data.
* Providing customer support relating to Customer Personal Data where authorized by the Customer.
* Complying with legal obligations applicable to Nobevra as Processor.

Nobevra will not process Customer Personal Data for any purpose beyond those described above unless required by applicable law, in which case Nobevra will inform the Customer unless prohibited by law.

If the Customer provides instructions that Nobevra reasonably believes would violate applicable data-protection law, Nobevra will inform the Customer.

---

### 5. NATURE, PURPOSE, AND DURATION

**Nature of processing:** Storage, retrieval, formatting, transmission (for invoice delivery), and deletion of Customer Personal Data within the Nobevra platform.

**Purpose:** To enable the Customer to operate its invoicing, CRM, and business management workflows using the Nobevra platform.

**Duration:** The processing continues for the duration of the Customer's active subscription or free account. Upon Account deletion, Customer Personal Data will be deleted in accordance with the deletion procedure described in Section 15 below and the Privacy Policy, subject to legal retention requirements.

---

### 6. CATEGORIES OF PERSONAL DATA

Customer Personal Data processed through the Nobevra platform may include:

| Category | Examples |
|---|---|
| **Client identity data** | Client name, business name, trading name |
| **Contact data** | Client email address, phone number, postal address |
| **Financial data** | Invoice amounts, payment status, transaction references, bank account details (where provided) |
| **Business data** | Tax identification numbers, VAT/GST registration numbers, company registration numbers |
| **Communication data** | Content of messages sent through the client portal |
| **Electronic signature data** | IP address and User-Agent of signatory at time of contract signature, SHA-256 document hash |
| **QR scan data** | IP address, User-Agent, timestamp, approximate location of QR code scanner (where the Customer uses QR features) |

The Customer controls what categories of Personal Data it uploads to Nobevra. Nobevra does not determine the categories of Personal Data the Customer chooses to store.

**Special categories of personal data:** Nobevra's platform is not designed or intended for the storage of special categories of personal data (as defined under GDPR Article 9 or NDPA equivalents), including health data, racial or ethnic origin, religious beliefs, or criminal records. The Customer must not upload special-category data to Nobevra.

---

### 7. CATEGORIES OF DATA SUBJECTS

The Personal Data processed may relate to the following categories of data subjects:

* The Customer's individual clients (natural persons or sole traders).
* The Customer's business clients' representatives and contact persons.
* The Customer's employees or team members (in the context of team workspace access).
* Third parties who sign contracts through the Nobevra e-signature feature.
* Third parties who scan QR codes created by the Customer using Nobevra.

---

### 8. PROCESSOR OBLIGATIONS

Nobevra, as Processor, undertakes to:

* Process Customer Personal Data only on the documented instructions of the Customer and as described in this DPA.
* Ensure that persons authorised to process Customer Personal Data are subject to appropriate confidentiality obligations.
* Implement and maintain appropriate technical and organisational security measures as described in Section 9.
* Assist the Customer in fulfilling data-subject rights requests to the extent technically feasible (see Section 12).
* Assist the Customer in meeting applicable data-protection compliance obligations, including Data Protection Impact Assessments (DPIAs) where required.
* Notify the Customer of a Security Incident in accordance with Section 13.
* Delete or return Customer Personal Data at the end of the service relationship, in accordance with Section 15.
* Make available information necessary to demonstrate compliance with the obligations set out in this DPA.
* Not transfer Customer Personal Data to sub-processors except as authorised under Section 10.

---

### 9. SECURITY MEASURES

Nobevra implements the following technical and organisational security measures for Customer Personal Data:

**Technical measures:**
* TLS 1.2+ encryption for all data in transit.
* AES-256 encryption for data at rest (managed by Supabase/AWS).
* Row-Level Security (RLS) policies enforcing data isolation per user and Workspace at the database level.
* JWT-based authentication with short-lived access tokens and rotating refresh tokens.
* Device-level secure storage for mobile authentication tokens (iOS Keychain / Android EncryptedSharedPreferences).
* Tokenized payment architecture — full cardholder data is not stored by Nobevra.
* Rate limiting on API endpoints and authentication systems.

**Organisational measures:**
* Access to production systems limited to authorised personnel.
* Internal access-control policies for Nobevra staff.
* Responsible disclosure vulnerability reporting process.
* Audit logging of critical account and administrative actions.

A full description of security measures is available in the [Security Policy](https://nobevra.noblesworld.com.ng/security).

---

### 10. SUB-PROCESSORS

The Customer authorises Nobevra to engage the sub-processors listed in the [Subprocessor List](https://nobevra.noblesworld.com.ng/subprocessors), which is incorporated into this DPA by reference.

Nobevra will:
* Enter into written agreements with each sub-processor imposing data-protection obligations materially equivalent to those in this DPA.
* Remain liable to the Customer for the acts and omissions of its sub-processors to the same extent Nobevra would be liable if it performed the processing directly.
* Notify the Customer before engaging any new sub-processor that will process Customer Personal Data, by updating the Subprocessor List. The Customer may object to new sub-processors as set out in that list.

---

### 11. INTERNATIONAL TRANSFERS

Customer Personal Data may be transferred to countries outside Nigeria and/or the EEA in connection with the sub-processors listed in the Subprocessor List (primarily the United States, where Supabase/AWS, Google, and Vercel infrastructure are located).

Where required by applicable law, such transfers are made pursuant to:
* **Standard Contractual Clauses (SCCs):** Where sub-processors have incorporated EU SCCs into their data-processing terms.
* **Adequacy decisions:** Where applicable.
* **Other appropriate safeguards:** As required under applicable law, including NDPA provisions for cross-border data transfers.

The Customer acknowledges that, by using Nobevra, Customer Personal Data will be transferred to and processed in the United States and other jurisdictions, subject to these safeguards.

Enterprise customers requiring specific transfer documentation (signed SCCs, transfer impact assessments) should contact legal@noblesworld.com.ng.

---

### 12. DATA SUBJECT RIGHTS

**Customer's responsibility:** As Controller, the Customer is primarily responsible for responding to data-subject rights requests (access, rectification, erasure, restriction, portability, objection) from its clients and other data subjects.

**Nobevra's assistance:** To the extent technically feasible and within the capabilities of the platform, Nobevra will assist the Customer in responding to data-subject rights requests:
* The Customer can export Customer Personal Data using the in-app export functionality (where available).
* The Customer can delete clients, invoices, and other records directly through the Nobevra interface.
* For erasure requests requiring platform-level deletion beyond what the Customer can perform through the interface, the Customer should contact privacy@noblesworld.com.ng.

**Nobevra's own data subjects:** Data-subject rights relating to Nobevra's processing of the Customer's own Account data (as independent Controller) should be directed to privacy@noblesworld.com.ng.

---

### 13. DATA BREACH NOTIFICATION

If Nobevra becomes aware of a Security Incident affecting Customer Personal Data, Nobevra will:

1. Notify the Customer **without undue delay** and, where feasible, within **72 hours** of becoming aware of the Security Incident.
2. Provide available information about: the nature of the Security Incident; the categories and approximate number of data subjects concerned; the categories and approximate volume of records concerned; the likely consequences; and measures taken or proposed to address the incident.
3. Cooperate with the Customer in investigating and mitigating the Security Incident.

Notification will be sent to the email address associated with the Customer's Account. It is the Customer's responsibility to maintain a current, monitored email address.

Nobevra's notification to the Customer does not constitute an admission of fault or liability.

The Customer is responsible for notifying the relevant Supervisory Authority and affected data subjects as required by applicable law, based on the information provided by Nobevra.

---

### 14. AUDIT RIGHTS

The Customer may, at its own expense and upon reasonable written notice (at least 30 days), exercise audit rights regarding Nobevra's processing of Customer Personal Data, subject to the following:

* Audits must be conducted during business hours and must not unreasonably disrupt Nobevra's operations.
* Audits may not involve direct access to systems containing other customers' data.
* Nobevra may satisfy audit obligations by providing relevant documentation, certifications, or third-party audit reports where available.
* No more than one audit per 12-month period per Customer, except following a confirmed Security Incident.

---

### 15. TERM AND TERMINATION

**Term:** This DPA is effective for the duration of the Customer's Account.

**Deletion on termination:**
* Upon Account deletion initiated by the Customer, Customer Personal Data will be deleted through Nobevra's deletion pipeline (the \`cleanup-user-data\` process) within a commercially reasonable period.
* Certain data may be retained where required by applicable law (e.g., financial records required for tax compliance, legal proceedings, or regulatory obligations), as described in the Privacy Policy.
* Backup copies may persist for a limited period following deletion and will be overwritten in the normal course of backup rotation.

**Return of data:** Where technically available, the Customer may export Customer Personal Data via the in-app export functionality before Account deletion. Nobevra is not obligated to maintain data in a specific format for export purposes.

---

### 16. LIABILITY AND INDEMNIFICATION

Each party's liability under this DPA is subject to the limitations set out in the Terms of Service.

The Customer agrees to indemnify Nobevra against claims, fines, or penalties imposed by a Supervisory Authority or third party arising from the Customer's failure to comply with applicable data-protection law in its role as Controller, including failure to provide appropriate privacy notices to data subjects or failure to establish a lawful basis for processing.

Nothing in this DPA excludes either party's liability for death, personal injury, fraud, or any other liability that cannot be excluded by applicable law.

---

### 17. GOVERNING LAW

This DPA is governed by the laws of the Federal Republic of Nigeria. Where required by applicable law (for example, GDPR), the mandatory requirements of that law apply to the extent of any conflict with Nigerian law.

---

### 18. CONTACT AND EXECUTION

**For enterprise DPA inquiries, signed bilateral agreements, or DPIA support:**

**Email:** legal@noblesworld.com.ng  
**Subject:** "DPA Request — [Company Name]"

**Data Protection Officer:** privacy@noblesworld.com.ng  
**General support:** invoice@noblesworld.com.ng

Enterprise customers requiring a separately signed DPA (e.g., for procurement or enterprise compliance purposes) should contact us with their company name, jurisdiction, and any specific requirements. We will work to accommodate reasonable requests.
`;

export default function DPAPage() {
  return (
    <LegalLayout
      title="Data Processing Addendum"
      description="This DPA governs how Nobevra processes personal data on behalf of business customers. It applies automatically to all customers and sets out the obligations of both parties under NDPA, GDPR, and applicable data-protection law."
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

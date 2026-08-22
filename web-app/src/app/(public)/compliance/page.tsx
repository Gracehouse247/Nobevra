"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { ShieldCheck, Globe, Database, Lock, Scale, AlertCircle, FileText, Users, Cpu } from "lucide-react";

const CATEGORIES = [
  {
    title: "Overview & Scope",
    sections: [
      { id: "1-our-commitment", label: "1. Our Commitment", icon: ShieldCheck },
      { id: "2-important-scope-statement", label: "2. Scope Statement", icon: Globe },
      { id: "3-principal-compliance-framework", label: "3. Compliance Framework", icon: Scale },
      { id: "4-data-protection-principles", label: "4. Data Protection Principles", icon: ShieldCheck },
    ],
  },
  {
    title: "Roles & Data",
    sections: [
      { id: "5-controller-and-processor-roles", label: "5. Controller & Processor Roles", icon: Users },
      { id: "6-types-of-information-nobevra-may-process", label: "6. Types of Information", icon: Database },
      { id: "7-sensitive-information", label: "7. Sensitive Information", icon: AlertCircle },
      { id: "8-childrens-data", label: "8. Children's Data", icon: Users },
    ],
  },
  {
    title: "Operations & Infrastructure",
    sections: [
      { id: "9-international-data-transfers", label: "9. International Transfers", icon: Globe },
      { id: "10-infrastructure-and-service-providers", label: "10. Infrastructure & Providers", icon: Database },
      { id: "11-security-framework", label: "11. Security Framework", icon: Lock },
      { id: "12-account-security", label: "12. Account Security", icon: Lock },
      { id: "13-team-and-organization-access", label: "13. Team Access", icon: Users },
    ],
  },
  {
    title: "Service Limitations",
    sections: [
      { id: "14-financial-and-payment-compliance", label: "14. Financial & Payment", icon: FileText },
      { id: "15-taxes", label: "15. Taxes", icon: FileText },
      { id: "16-invoices-and-legal-documents", label: "16. Invoices & Legal Docs", icon: FileText },
      { id: "17-electronic-signatures", label: "17. Electronic Signatures", icon: FileText },
      { id: "18-ai-governance", label: "18. AI Governance", icon: Cpu },
      { id: "19-automated-decision-making-and-analytics", label: "19. Automated Decisions", icon: Cpu },
    ],
  },
  {
    title: "Data Rights & Management",
    sections: [
      { id: "20-data-retention", label: "20. Data Retention", icon: Database },
      { id: "21-account-deletion", label: "21. Account Deletion", icon: AlertCircle },
      { id: "22-data-subject-rights", label: "22. Data Subject Rights", icon: Users },
      { id: "23-data-protection-requests", label: "23. Data Protection Requests", icon: ShieldCheck },
      { id: "24-data-breach-management", label: "24. Breach Management", icon: AlertCircle },
      { id: "25-data-protection-impact-assessments", label: "25. DPIAs", icon: ShieldCheck },
    ],
  },
  {
    title: "Privacy by Design",
    sections: [
      { id: "26-privacy-by-design", label: "26. Privacy by Design", icon: ShieldCheck },
      { id: "27-third-party-integrations", label: "27. Third-Party Integrations", icon: Globe },
      { id: "28-cookies-and-tracking", label: "28. Cookies & Tracking", icon: Globe },
      { id: "29-marketing-communications", label: "29. Marketing", icon: FileText },
      { id: "30-qr-code-analytics-and-location-data", label: "30. QR Code Analytics", icon: Globe },
      { id: "31-business-customer-responsibilities", label: "31. Customer Responsibilities", icon: Users },
    ],
  },
  {
    title: "Governance & Regulatory",
    sections: [
      { id: "32-international-privacy-framework", label: "32. International Privacy", icon: Globe },
      { id: "33-compliance-monitoring", label: "33. Compliance Monitoring", icon: ShieldCheck },
      { id: "34-regulatory-cooperation", label: "34. Regulatory Cooperation", icon: Scale },
      { id: "35-compliance-documentation", label: "35. Documentation", icon: FileText },
      { id: "36-security-and-compliance-certifications", label: "36. Certifications", icon: ShieldCheck },
      { id: "37-compliance-limitations", label: "37. Limitations", icon: AlertCircle },
      { id: "38-changes-to-this-compliance-framework", label: "38. Changes", icon: FileText },
      { id: "39-contact-and-compliance-requests", label: "39. Contact", icon: FileText },
      { id: "40-regulatory-authority-complaints", label: "40. Authority Complaints", icon: Scale },
      { id: "41-relationship-with-other-nobevra-policies", label: "41. Other Policies", icon: FileText },
    ],
  },
];

const content = `
### 1. OUR COMMITMENT

Nobevra is committed to operating its platform responsibly, securely and transparently.

Nobevra provides a cross-platform business and productivity ecosystem that may allow users to create, store, process and manage:

* invoices;
* quotations;
* estimates;
* receipts;
* client information;
* business information;
* products and services;
* expenses;
* payment information;
* business documents;
* digital signatures;
* QR codes;
* digital business cards;
* digital product information;
* CRM information;
* team and organization information;
* productivity information;
* analytics;
* AI-assisted workflows; and
* other business records.

Because these activities may involve personal data and commercially sensitive information, Nobevra maintains a compliance framework designed around applicable privacy, data-protection, security, consumer-protection and electronic-commerce requirements.

Our compliance approach is based on the principles of:

Privacy by Design → Security by Design → Data Minimisation → Transparency → Accountability → User Control → Appropriate Retention → Secure Processing

---

### 2. IMPORTANT SCOPE STATEMENT

Nobevra is designed for users in Nigeria, Africa and other international markets.

However, Nobevra does not represent that a single compliance framework automatically makes the service compliant with every law in every country.

Different jurisdictions impose different requirements depending on:

* the user's location;
* the customer's location;
* the location of the business;
* the nature of the information processed;
* the type of service being provided;
* the organization's role as controller, processor or other regulated entity;
* payment activities;
* employment or team-management activities;
* international data transfers;
* applicable sector regulations; and
* applicable contractual obligations.

Where a particular jurisdiction imposes additional requirements, Nobevra will seek to apply appropriate controls where those requirements are applicable to our activities.

---

### 3. PRINCIPAL COMPLIANCE FRAMEWORK

Nobevra's compliance program is designed with reference to applicable requirements including, where applicable:

**Nigeria**
* Nigeria Data Protection Act 2023 (NDPA);
* applicable regulations, guidance and directives issued by the Nigeria Data Protection Commission (NDPC);
* applicable electronic transactions and consumer-protection requirements;
* applicable payment and financial-services requirements where relevant;
* applicable Nigerian tax and invoicing requirements where relevant.

**European Economic Area**

Where applicable based on territorial scope:
* General Data Protection Regulation (GDPR);
* applicable European data-protection authority requirements;
* applicable electronic communications, cookie and marketing requirements.

The GDPR requires organizations to follow principles including purpose limitation, data minimisation, storage limitation, security and accountability.

**United Kingdom**

Where applicable:
* UK GDPR;
* Data Protection Act 2018;
* applicable UK privacy and electronic-communications requirements.

The UK currently maintains specific rules governing restricted international transfers of personal information, including adequacy mechanisms and appropriate safeguards.

**Brazil**

Where applicable:
* Lei Geral de Proteção de Dados — LGPD;
* applicable regulations and guidance of the Brazilian National Data Protection Authority (ANPD).

Brazil currently has specific regulatory requirements governing international transfers of personal data.

**Kenya**

Where applicable:
* Data Protection Act, 2019;
* applicable regulations and requirements of the Office of the Data Protection Commissioner.

Kenya's framework includes rights relating to information, access, objection, correction and deletion.

**South Africa**

Where applicable:
* Protection of Personal Information Act (POPIA);
* applicable requirements of the Information Regulator;
* applicable Promotion of Access to Information Act requirements.

South Africa's Information Regulator provides compliance mechanisms and regulatory resources for POPIA and PAIA.

**Other jurisdictions**

Nobevra may also be subject to privacy, consumer-protection, electronic-commerce, cybersecurity, payment, tax or other requirements in other jurisdictions where it operates or targets users.

---

### 4. DATA PROTECTION PRINCIPLES

Nobevra's privacy and data-processing practices are designed around internationally recognised data-protection principles.

**4.1 Lawfulness, Fairness and Transparency**
We seek to process personal information only where we have an appropriate legal basis and provide appropriate information about such processing.

**4.2 Purpose Limitation**
Personal information should be collected and used for specified and legitimate purposes and should not be reused in incompatible ways.

**4.3 Data Minimisation**
We seek to collect information reasonably necessary for the relevant service or purpose.

**4.4 Accuracy**
Users may be provided mechanisms to update or correct information associated with their accounts.

**4.5 Storage Limitation**
Personal information should not be retained indefinitely without an appropriate reason.

**4.6 Integrity and Confidentiality**
We implement reasonable technical and organizational safeguards designed to protect information against:
* unauthorized access;
* unauthorized disclosure;
* alteration;
* destruction;
* accidental loss;
* misuse; and
* other reasonably foreseeable security risks.

**4.7 Accountability**
Nobevra seeks to maintain appropriate documentation, controls and processes to demonstrate compliance with applicable data-protection obligations.

These principles closely reflect the core GDPR principles recognized by the European Commission.

---

### 5. CONTROLLER AND PROCESSOR ROLES

Depending on how Nobevra is used, the legal role of Nobevra and its customer may differ.

**5.1 Nobevra as Controller**
Nobevra may act as a data controller where it determines the purposes and means of processing personal information.

Examples may include:
* account registration;
* authentication;
* billing;
* customer support;
* platform security;
* product analytics;
* service communications;
* marketing where permitted;
* fraud prevention; and
* platform administration.

**5.2 Nobevra as Processor or Service Provider**
A business customer may use Nobevra to store and process information about its own customers, employees, suppliers or business contacts.

In those circumstances, the Nobevra customer may determine why the information is processed, while Nobevra processes that information to provide the requested service.

The customer remains responsible for ensuring that it has an appropriate legal basis and authority to provide such information to Nobevra.

---

### 6. TYPES OF INFORMATION NOBEVRA MAY PROCESS

Depending on the features used, information may include:

**Account Information**
* name;
* email address;
* phone number;
* password credentials or authentication identifiers;
* account preferences.

**Business Information**
* business name;
* business address;
* business registration information;
* tax information;
* business logo;
* business contact details;
* business branding.

**Client and CRM Information**
Users may voluntarily enter:
* customer names;
* email addresses;
* telephone numbers;
* addresses;
* company information;
* notes;
* interaction information;
* invoices;
* quotations;
* payment status;
* other CRM information.

**Financial and Transaction Information**
Depending on features used:
* invoice information;
* expense records;
* payment status;
* transaction references;
* currency;
* tax information;
* product pricing;
* payment-related information.

**Documents and Files**
Users may upload:
* receipts;
* invoices;
* logos;
* business documents;
* signatures;
* product images;
* PDF documents;
* other supported files.

**QR and Digital Identity Information**
Depending on the QR functionality used:
* QR destination information;
* vCard information;
* business card information;
* campaign information;
* scan analytics;
* referral information;
* device/browser information;
* approximate location information where enabled and legally permitted.

**Productivity Information**
Where applicable:
* tasks;
* projects;
* time blocks;
* habits;
* productivity records;
* focus information;
* workspace information.

**AI Interaction Data**
Where AI features are used, Nobevra may process information necessary to:
* generate invoices;
* interpret user instructions;
* process voice commands;
* classify information;
* provide productivity assistance;
* generate business content.

Nobevra should clearly identify which AI features process user-provided content and which third-party AI providers, if any, are involved.

---

### 7. SENSITIVE INFORMATION

Nobevra is not designed as a platform for intentionally collecting highly sensitive categories of personal information unless a specific feature expressly supports such processing.

Users should not intentionally upload sensitive personal information that is unnecessary for using Nobevra.

This may include information relating to:
* health;
* biometric information;
* racial or ethnic origin;
* religious beliefs;
* political opinions;
* criminal records;
* sexual orientation;
* government secrets;
* highly confidential credentials; or
* other specially protected information.

Where a business customer chooses to process regulated or sensitive information through Nobevra, that customer is responsible for ensuring that such processing is lawful and appropriate.

---

### 8. CHILDREN'S DATA

Nobevra is primarily intended for businesses, professionals, freelancers, agencies, consultants and organizations.

The service is not intentionally designed to collect personal information from children where prohibited by applicable law.

If you believe a child has provided personal information to Nobevra without appropriate authorization, contact:

invoice@noblesworld.com.ng

We will assess the request and take appropriate action where legally required.

---

### 9. INTERNATIONAL DATA TRANSFERS

Nobevra may operate using infrastructure and service providers located in different countries.

Consequently, personal information may potentially be processed outside the country in which the user resides.

Where applicable law imposes restrictions on international transfers, Nobevra will seek to use a legally recognized transfer mechanism.

Depending on the applicable jurisdiction, this may include:
* adequacy decisions;
* standard contractual clauses;
* approved contractual safeguards;
* transfer agreements;
* applicable statutory exceptions;
* other legally recognized mechanisms.

International transfer requirements are jurisdiction-specific. For example, the UK currently requires restricted transfers to be covered by adequacy regulations, appropriate safeguards or a permitted exception.

Brazil likewise has specific rules governing international transfers under its LGPD framework.

Nobevra will not represent that all international transfers are automatically lawful solely because information is processed by a reputable cloud provider.

---

### 10. INFRASTRUCTURE AND SERVICE PROVIDERS

Nobevra currently uses a cross-platform architecture including:

**Frontend: Vercel**
Used for hosting the web application's frontend and associated web infrastructure.

**Backend and Database: Supabase**
Used for backend infrastructure and database/storage functionality.

**Mobile Applications**
Nobevra's mobile applications are built using Flutter and connect to the Nobevra backend infrastructure.

**Email**
Nobevra currently uses SMTP/webmail infrastructure for email communications.

Additional third-party service providers may be introduced as Nobevra evolves.

Before adding a third-party processor that handles personal information, Nobevra should evaluate:
* the provider's security practices;
* data-processing terms;
* applicable transfer mechanisms;
* data location;
* retention;
* sub-processors;
* breach obligations;
* contractual protections;
* compliance certifications where relevant.

---

### 11. SECURITY FRAMEWORK

Nobevra adopts a defense-in-depth approach to information security.

Security controls may include:
* authentication controls;
* authorization controls;
* role-based permissions;
* database access controls;
* row-level security where applicable;
* environment-variable protection;
* encryption in transit;
* secure credential handling;
* least-privilege access;
* validation of user input;
* secure API design;
* rate limiting;
* audit logging;
* monitoring;
* backup mechanisms;
* security updates;
* vulnerability management.

Security controls should be continuously reviewed as Nobevra's infrastructure and threat landscape evolve.

---

### 12. ACCOUNT SECURITY

Users are responsible for protecting:
* passwords;
* authentication credentials;
* API credentials;
* recovery codes;
* device access;
* team invitations;
* other authentication mechanisms.

Users should immediately report suspected unauthorized access.

Nobevra may suspend or restrict access where reasonably necessary to protect:
* the user;
* other users;
* customer information;
* the platform;
* payment systems;
* infrastructure.

---

### 13. TEAM AND ORGANIZATION ACCESS

Nobevra may allow business owners to invite team members.

Organization administrators may control access to business resources through:
* roles;
* permissions;
* workspace membership;
* access levels;
* team-management controls.

Organizations are responsible for ensuring that team members receive only the access reasonably necessary for their responsibilities.

When a team member leaves an organization, administrators should promptly remove or restrict their access.

---

### 14. FINANCIAL AND PAYMENT COMPLIANCE

Nobevra provides business-management and invoicing functionality.

Depending on the feature and jurisdiction, the platform may facilitate integrations with payment providers.

Nobevra should not be interpreted as:
* a bank;
* a deposit-taking institution;
* an insurer;
* a licensed investment adviser;
* a cryptocurrency exchange;
* a tax authority;
* an accounting authority; or
* a regulated financial institution,

unless Nobevra expressly states otherwise and has obtained the required authorization.

Where payment services are provided by third-party payment providers, the payment provider's own terms, privacy policies, licenses and compliance obligations may apply.

---

### 15. TAXES

Nobevra may provide tools that assist users with:
* invoice calculations;
* tax fields;
* tax rates;
* financial reports;
* currency conversion;
* business records.

However, Nobevra does not guarantee that generated tax calculations or documents satisfy every country's tax requirements.

Tax laws differ between jurisdictions.

Users remain responsible for:
* determining applicable taxes;
* maintaining appropriate records;
* filing tax returns;
* remitting taxes;
* obtaining professional tax advice where required.

---

### 16. INVOICES AND LEGAL DOCUMENTS

Nobevra provides tools for generating business documents.

The existence of a document-generation feature does not mean that every generated document automatically satisfies the legal requirements of every jurisdiction.

Users are responsible for verifying whether their:
* invoices;
* receipts;
* estimates;
* quotations;
* contracts;
* signatures;
* tax documents;

satisfy applicable legal requirements.

---

### 17. ELECTRONIC SIGNATURES

Where Nobevra provides electronic-signature functionality, users are responsible for ensuring that:
* the signer has authority;
* appropriate consent is obtained;
* the document is legally appropriate;
* required signature standards are satisfied.

Electronic-signature requirements vary significantly between jurisdictions.

Nobevra does not guarantee that a particular signature method will have the same legal effect in every jurisdiction.

---

### 18. AI GOVERNANCE

Nobevra may provide AI-assisted functionality.

AI features may be used for:
* invoice creation;
* voice commands;
* productivity assistance;
* document interpretation;
* receipt/OCR processing;
* business insights;
* recommendations;
* workflow automation.

AI-generated results may contain errors.

Users should review AI-generated information before relying on it for:
* financial decisions;
* tax filings;
* legal documents;
* accounting;
* regulatory submissions;
* contractual commitments;
* other consequential decisions.

Nobevra should not be treated as a substitute for qualified legal, accounting, tax or financial advice.

---

### 19. AUTOMATED DECISION-MAKING AND ANALYTICS

Certain Nobevra features may use analytics or automated processing to provide:
* productivity insights;
* usage statistics;
* financial reports;
* business recommendations;
* workflow suggestions;
* fraud/security signals;
* platform optimization.

Where applicable law provides rights concerning automated decision-making or profiling, Nobevra will provide appropriate information and mechanisms required by that law.

The GDPR, for example, recognizes rights concerning automated decision-making and profiling.

---

### 20. DATA RETENTION

Nobevra applies retention principles designed to avoid unnecessarily retaining personal information.

Retention periods may depend on:
* account status;
* legal obligations;
* contractual requirements;
* security requirements;
* dispute resolution;
* financial records;
* regulatory requirements;
* backup systems;
* fraud prevention;
* legitimate business purposes.

Different categories of information may therefore have different retention periods.

Information may remain in secure backups for a limited additional period after deletion where technically necessary.

---

### 21. ACCOUNT DELETION

Users may request deletion of their Nobevra account subject to applicable law and legitimate retention requirements.

Deletion may involve:
* account deactivation;
* removal or anonymization of eligible personal information;
* deletion of user-generated content where applicable;
* termination of associated access;
* processing of backup copies according to applicable retention cycles.

Certain information may need to be retained where required for:
* tax;
* accounting;
* fraud prevention;
* security;
* legal claims;
* dispute resolution;
* regulatory compliance.

Nobevra will not use account deletion mechanisms to unlawfully eliminate information that must legally be retained.

---

### 22. DATA SUBJECT RIGHTS

Depending on the jurisdiction, individuals may have rights including:
* right to information;
* right of access;
* right to correction;
* right to deletion;
* right to restriction;
* right to object;
* right to data portability;
* right to withdraw consent;
* rights relating to automated decision-making;
* right to lodge a complaint with an appropriate regulator.

The GDPR recognizes these rights in its data-subject framework.

Other jurisdictions may provide similar or different rights.

Requests should be submitted to:
invoice@noblesworld.com.ng

Nobevra may need to verify the identity of the requesting person before releasing or modifying information.

---

### 23. DATA PROTECTION REQUESTS

A request should include sufficient information to allow Nobevra to:
* identify the account;
* understand the request;
* verify the requester;
* locate relevant information.

We may request additional information where reasonably necessary to prevent unauthorized disclosure.

Where applicable law establishes a statutory response period, Nobevra will seek to respond within that period.

---

### 24. DATA BREACH MANAGEMENT

Nobevra maintains processes designed to identify, investigate, contain and respond to security incidents.

Where a security incident constitutes a legally reportable personal-data breach, Nobevra will make notifications required by applicable law.

Depending on the circumstances, notifications may be made to:
* affected users;
* customers;
* regulators;
* law-enforcement authorities;
* other appropriate parties.

Applicable notification obligations may vary depending on jurisdiction, the type of information involved and the level of risk.

---

### 25. DATA PROTECTION IMPACT ASSESSMENTS

Where processing presents potentially significant privacy risks, Nobevra may conduct a Data Protection Impact Assessment or equivalent privacy-risk assessment.

This may be particularly relevant to:
* AI systems;
* behavioral analytics;
* large-scale personal-data processing;
* geolocation/QR analytics;
* profiling;
* sensitive information;
* automated decision-making;
* new technologies;
* high-risk integrations.

---

### 26. PRIVACY BY DESIGN

Privacy considerations should be incorporated into Nobevra's product-development lifecycle.

Engineering and product teams should consider:
* data minimisation;
* permission boundaries;
* secure defaults;
* retention;
* access control;
* encryption;
* auditability;
* user transparency;
* deletion;
* portability;
* security testing.

Privacy should not be treated solely as a documentation exercise.

---

### 27. THIRD-PARTY INTEGRATIONS

Nobevra may integrate with third-party services.

Examples may include:
* payment providers;
* email providers;
* AI providers;
* cloud infrastructure;
* analytics services;
* authentication services;
* document-processing services.

Third-party services may process information under their own privacy policies and terms.

Users should review applicable third-party documentation where appropriate.

---

### 28. COOKIES AND TRACKING

Nobevra may use:
* essential cookies;
* authentication technologies;
* security technologies;
* analytics technologies;
* preference storage;
* marketing technologies where applicable.

Where consent is legally required, Nobevra should obtain appropriate consent before deploying non-essential tracking technologies.

Users should be provided appropriate controls for managing consent where required.

---

### 29. MARKETING COMMUNICATIONS

Nobevra may send:
* transactional emails;
* account notifications;
* security alerts;
* service announcements;
* product updates;
* educational communications;
* marketing communications where permitted.

Users should be provided appropriate mechanisms to unsubscribe from non-essential marketing communications.

Service-critical communications may continue where legally permitted because they are necessary to provide the service.

---

### 30. QR CODE ANALYTICS AND LOCATION DATA

Some QR-code functionality may provide analytics such as:
* number of scans;
* approximate geographic information;
* device information;
* browser information;
* referral information;
* timestamps.

Where location or similar information is collected, Nobevra should:
* disclose the purpose;
* minimise collection;
* provide appropriate controls;
* avoid collecting precise location unless necessary and legally permitted;
* retain analytics only as long as reasonably necessary.

---

### 31. BUSINESS CUSTOMER RESPONSIBILITIES

Nobevra customers who use the platform to process their customers' information are responsible for:
* having a lawful basis for processing;
* providing appropriate privacy notices;
* obtaining consent where required;
* responding to their customers' rights requests where they are the responsible controller;
* ensuring uploaded information is lawful;
* configuring appropriate user permissions;
* protecting account credentials;
* complying with applicable industry regulations.

Nobevra does not become responsible for a customer's unlawful collection or use of personal information merely because the information is stored or processed through Nobevra.

---

### 32. INTERNATIONAL PRIVACY FRAMEWORK

Nobevra's objective is to maintain a privacy framework capable of supporting international customers while recognizing that compliance must be evaluated jurisdiction by jurisdiction.

The platform therefore seeks to maintain controls around:

Data Collection
↓
Purpose
↓
Legal Basis
↓
Access Control
↓
Processing
↓
International Transfer
↓
Retention
↓
Deletion
↓
Auditability
↓
User Rights

This lifecycle approach is consistent with modern data-protection principles.

---

### 33. COMPLIANCE MONITORING

Nobevra may periodically review:
* applicable laws;
* regulatory guidance;
* security controls;
* third-party processors;
* data flows;
* retention policies;
* access permissions;
* incident response;
* privacy practices;
* contractual requirements.

The compliance framework may therefore be updated periodically.

---

### 34. REGULATORY COOPERATION

Where legally required, Nobevra will cooperate with competent regulators and authorities.

Nothing in this framework limits Nobevra's legal obligations to respond to lawful:
* court orders;
* subpoenas;
* regulatory requests;
* law-enforcement requests;
* statutory obligations.

Where legally permitted, Nobevra may seek to notify affected users about government or regulatory requests.

---

### 35. COMPLIANCE DOCUMENTATION

Nobevra may maintain internal compliance documentation including, where applicable:
* records of processing activities;
* data maps;
* vendor/subprocessor registers;
* security policies;
* retention schedules;
* incident-response procedures;
* data-processing agreements;
* privacy impact assessments;
* transfer assessments;
* access-control records;
* training records;
* compliance assessments.

These internal records may not all be publicly available because some contain confidential security or business information.

---

### 36. SECURITY AND COMPLIANCE CERTIFICATIONS

Nobevra will not claim certification, accreditation or regulatory authorization unless it has actually obtained the relevant certification or authorization.

Examples include:
* ISO 27001;
* SOC 2;
* PCI DSS;
* GDPR certification;
* regulatory licenses;
* payment licenses.

Where Nobevra obtains recognized certifications in the future, this page may be updated accordingly.

---

### 37. COMPLIANCE LIMITATIONS

Nobevra provides technology intended to help businesses manage their operations.

It does not guarantee that use of the platform automatically makes a business:
* tax compliant;
* legally compliant;
* GDPR compliant;
* NDPA compliant;
* POPIA compliant;
* LGPD compliant;
* PCI compliant;
* financially regulated;
* legally authorized to conduct a particular business activity.

Compliance ultimately depends on how the customer uses the platform and the laws applicable to that customer.

---

### 38. CHANGES TO THIS COMPLIANCE FRAMEWORK

Nobevra may update this framework when:
* laws change;
* regulatory guidance changes;
* new features are introduced;
* infrastructure changes;
* security practices improve;
* new markets are entered;
* new processors are introduced.

The Last Updated date will be changed whenever material revisions are made.

---

### 39. CONTACT AND COMPLIANCE REQUESTS

For privacy, data protection and compliance questions:

**Nobevra**
Powered by The Noble's Technology Services

**Email:** invoice@noblesworld.com.ng

**Website:** [https://nobevra.noblesworld.com.ng](https://nobevra.noblesworld.com.ng)

---

### 40. REGULATORY AUTHORITY COMPLAINTS

Where an individual believes their data-protection rights have been violated, they may have the right to complain to the relevant data-protection authority in their jurisdiction.

For example, EU individuals may have rights to lodge complaints with their national data-protection authority.

For Nigerian processing, the relevant regulatory framework includes the Nigeria Data Protection Commission.

Nobevra encourages users to contact us first so that we can investigate and attempt to resolve legitimate concerns, without limiting any statutory right to contact a regulator.

---

### 41. RELATIONSHIP WITH OTHER NOBEVRA POLICIES

This Global Compliance Framework should be read together with:

**[Privacy Policy](/privacy)**
Explains how Nobevra collects, uses, stores, shares and protects personal information.

**[Terms of Service](/terms)**
Defines the contractual rules governing use of Nobevra.

**[Cookie Policy](/cookies)**
Explains cookies, tracking technologies and consent controls.

**[Data Processing Addendum](/dpa)**
Recommended for business/enterprise customers where Nobevra processes customer data on their behalf.

**[Acceptable Use Policy](/acceptable-use)**
Defines prohibited and abusive uses of the platform.

**[Security Policy](/security)**
Explains Nobevra's security commitments and controls.
`;

export default function GlobalComplianceFrameworkPage() {
  return (
    <LegalLayout
      title="Global Compliance & Data Protection Framework"
      description="The Nobevra Global Compliance Framework details our comprehensive approach to data protection, security, and global privacy standards including NDPA, GDPR, and other frameworks."
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

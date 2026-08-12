"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { ShieldCheck, CreditCard, RefreshCcw, AlertCircle, FileText } from "lucide-react";

const CATEGORIES = [
  {
    title: "Subscriptions",
    sections: [
      { id: "1-overview", label: "Overview", icon: ShieldCheck },
      { id: "2-subscription-cancellation", label: "Cancellation", icon: RefreshCcw },
      { id: "3-how-to-cancel", label: "How to Cancel", icon: RefreshCcw },
      { id: "4-effect-of-cancellation", label: "Effect of Cancellation", icon: AlertCircle },
    ],
  },
  {
    title: "Refunds",
    sections: [
      { id: "5-refund-policy", label: "Refund Policy", icon: CreditCard },
      { id: "6-eligible-refund-scenarios", label: "Eligible Scenarios", icon: CreditCard },
      { id: "7-non-refundable-items", label: "Non-Refundable Items", icon: AlertCircle },
      { id: "8-how-to-request-a-refund", label: "Request a Refund", icon: FileText },
    ],
  },
  {
    title: "Special Cases",
    sections: [
      { id: "9-pay-as-you-go-purchases", label: "Pay-As-You-Go", icon: CreditCard },
      { id: "10-failed-payments-and-grace-periods", label: "Failed Payments", icon: AlertCircle },
      { id: "11-price-changes", label: "Price Changes", icon: ShieldCheck },
      { id: "12-mandatory-consumer-rights", label: "Consumer Rights", icon: ShieldCheck },
    ],
  },
  {
    title: "Contact",
    sections: [
      { id: "13-contact-us", label: "Contact Us", icon: FileText },
    ],
  },
];

const content = `
### 1. OVERVIEW

This Refund & Cancellation Policy explains when and how you may cancel your NobleInvoice subscription, and when you may be eligible to receive a refund. This policy forms part of the NobleInvoice Terms of Service.

**Effective Date:** August 8, 2026  
**Applies to:** All NobleInvoice subscription plans — Explorer (free), Pay-As-You-Go, Noble Pulse, and Noble Elite.

---

### 2. SUBSCRIPTION CANCELLATION

You may cancel your Noble Pulse or Noble Elite subscription at any time. Cancellation is effective at the end of your current paid billing period.

**What happens when you cancel:**
* Your subscription will not renew after the current billing period ends.
* You retain full access to your paid plan features until the end of the billing period you have already paid for.
* At the end of that period, your account automatically transitions to the Explorer (free) plan.
* Your Business Data, invoices, clients and other records remain accessible on your account subject to the Explorer plan's limits.

Cancellation does **not** delete your account or erase your data.

---

### 3. HOW TO CANCEL

You may cancel your subscription through any of the following methods:

**In-app:** Navigate to your Account → Billing → Manage Subscription → Cancel Subscription.

**By email:** Contact our support team at **invoice@noblesworld.com.ng** with the subject line "Cancel Subscription" and include your registered email address.

NobleInvoice is committed to making cancellation at least as easy as sign-up. We will not require you to call a phone number, complete unnecessary steps, or navigate deliberately confusing flows to cancel.

We aim to process email cancellation requests within 2 business days. We will send a confirmation email once cancellation has been processed.

---

### 4. EFFECT OF CANCELLATION

| Event | Outcome |
|---|---|
| Cancellation before renewal date | No future charge; access continues until billing period ends |
| Billing period ends after cancellation | Account downgrades to Explorer (free) plan automatically |
| Data after downgrade | Existing data retained; subject to Explorer plan limits |
| Reactivation | You may resubscribe at any time from the upgrade page |

Downgrading from Noble Elite to Explorer may make certain features (team workspace, API access, custom domain, unlimited estimates) unavailable. Data associated with those features may become read-only. NobleInvoice will make commercially reasonable efforts to warn you before any data becomes irreversibly inaccessible.

---

### 5. REFUND POLICY

**General position:** Subscription payments are generally **non-refundable** once the billing period has commenced. Partial billing periods are not automatically refunded.

This is because access to the full subscription benefits (unlimited invoices, premium templates, AI features, storage, etc.) is granted immediately upon payment.

This general position is subject to the exceptions set out below and to mandatory consumer rights under applicable law, which this policy does not seek to exclude.

---

### 6. ELIGIBLE REFUND SCENARIOS

NobleInvoice will consider refund requests in the following circumstances:

**A. Duplicate charge or billing error**
If you were charged more than once for the same billing period, or if there was a clear billing system error, you are entitled to a full refund of the duplicate or erroneous charge. Please contact us within 30 days of the charge.

**B. Charge after confirmed cancellation**
If you were charged after a cancellation that was confirmed in writing by NobleInvoice, you are entitled to a full refund of that charge.

**C. Service unavailability**
If NobleInvoice was unavailable for a continuous period materially affecting your ability to use the Service during your paid billing period, and the unavailability was caused by NobleInvoice's systems rather than a third-party provider or circumstances beyond our control, we may, at our discretion, issue a proportionate credit or refund.

**D. First-time subscriber — 7-day satisfaction request**
First-time Noble Pulse or Noble Elite subscribers who cancel within 7 calendar days of their initial subscription payment may submit a goodwill refund request. Approval is at NobleInvoice's discretion. This applies only to the first subscription purchase by a given account and does not apply to renewals, upgrades, or accounts that have previously received a goodwill refund.

**E. Mandatory statutory rights**
Where applicable law grants you a mandatory right of withdrawal or refund — for example, statutory cooling-off rights under Nigerian consumer protection law (FCCPA 2018) or applicable EU/UK consumer regulations — those rights apply and are not excluded by this policy. Please contact us to exercise statutory rights.

---

### 7. NON-REFUNDABLE ITEMS

The following are **not refundable**, except where mandatory law requires otherwise:

* Subscription fees for billing periods that have already commenced (except as described in Section 6).
* Subscription renewals where you did not cancel before the renewal date.
* Noble Elite early-bird promotional pricing — these are one-time offers at a discounted rate and are non-refundable.
* Unused days or unused features within a paid billing period.
* Charges incurred due to exceeding usage limits, where applicable.
* Pay-As-You-Go purchases (see Section 9).

---

### 8. HOW TO REQUEST A REFUND

To request a refund, email us at **invoice@noblesworld.com.ng** with:

* Subject line: "Refund Request"
* Your registered email address
* The date(s) of the charge(s) concerned
* The amount charged
* The reason for your refund request
* Any relevant transaction reference or receipt

We aim to respond to refund requests within **5 business days**. If your request is approved, refunds will be processed to the original payment method. Processing time depends on your payment provider (typically 5–10 business days for card refunds through Flutterwave).

---

### 9. PAY-AS-YOU-GO PURCHASES

Pay-As-You-Go (PAYG) purchases are **one-time, non-subscription transactions** that immediately unlock a specific entitlement (one premium template, one client slot, one QR business card, or one Digital Product Passport).

Because the entitlement is granted immediately upon payment and is permanently associated with your account, **PAYG purchases are non-refundable** unless:

* A duplicate or erroneous charge occurred.
* The purchased entitlement was not delivered as described.
* Mandatory statutory rights apply.

If you believe a PAYG purchase was not delivered correctly, contact us at invoice@noblesworld.com.ng within 14 days.

---

### 10. FAILED PAYMENTS AND GRACE PERIODS

If a subscription payment fails (for example, due to an expired card, insufficient funds, or a payment provider issue):

1. NobleInvoice will attempt to retry the payment.
2. If retry fails, a **grace period** may apply during which premium features remain accessible.
3. If payment is not resolved within the grace period, premium features may be suspended and the account may be downgraded to the Explorer (free) plan.
4. You will receive email notifications about failed payments and how to update your payment method.

You are not charged for the grace period if the subscription ultimately lapses. Resolving the payment before the grace period ends typically restores full access without data loss.

---

### 11. PRICE CHANGES

NobleInvoice may change subscription prices from time to time. If prices change:

* Existing subscribers will receive **at least 30 days' notice** before a price increase takes effect on their renewal.
* Notice will be provided by email and/or in-app notification.
* If you do not agree to the new price, you may cancel before the renewal date and will not be charged at the new price.
* Promotional, early-bird, or grandfathered pricing (where offered) may have different terms disclosed at the time of purchase.

---

### 12. MANDATORY CONSUMER RIGHTS

Nothing in this policy excludes or limits rights you have under applicable mandatory consumer-protection law, including:

* **Nigeria:** Federal Competition and Consumer Protection Act 2018 (FCCPA); rights enforceable through the Federal Competition and Consumer Protection Commission (FCCPC).
* **European Union / UK:** EU Consumer Rights Directive, UK Consumer Rights Act 2015, and similar national implementations.
* **California (USA):** California Automatic Renewal Law (ARL) and CCPA.

Where mandatory statutory rights apply to your transaction, they take precedence over the terms of this policy.

---

### 13. CONTACT US

For cancellation requests, refund requests, billing questions, or to exercise consumer rights:

**NobleInvoice Support**  
Email: **invoice@noblesworld.com.ng**  
Legal/Billing: **legal@noblesworld.com.ng**  
Response time: 2–5 business days  
`;

export default function RefundPage() {
  return (
    <LegalLayout
      title="Refund & Cancellation Policy"
      description="This policy explains how to cancel your NobleInvoice subscription, when refunds are available, and how to request them. We are committed to making both sign-up and cancellation straightforward."
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

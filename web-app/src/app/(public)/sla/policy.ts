export const slaMarkdown = `
# SERVICE LEVEL AGREEMENT (SLA)

**Effective Date:** August 9, 2026  
**Last Updated:** August 9, 2026

## 1. APPLICABILITY
This Service Level Agreement ("SLA") is applicable solely to customers subscribed to the **Noble Elite** plan (Enterprise customers). It forms part of the Terms of Service between you and The Noble's Technology Services ("Nobevra," "we," "our"). It outlines our commitments regarding the availability of the Nobevra platform.

This SLA does not apply to users on the Free (Starter), Pay-As-You-Go, or Noble Pulse plans.

## 2. UPTIME COMMITMENT
We guarantee that the Nobevra core web application and APIs (the "Service") will have a Monthly Uptime Percentage of at least **99.9%** during any monthly billing cycle.

**"Monthly Uptime Percentage"** is calculated as:
(Maximum Available Minutes - Downtime) / Maximum Available Minutes x 100

**"Downtime"** means the total accumulated minutes during a billing month where the core Service is completely unavailable. Downtime is measured based on Nobevra's server-side error rate and monitoring systems.

## 3. SERVICE CREDITS
If the Monthly Uptime Percentage falls below 99.9% for a Noble Elite customer, that customer will be eligible to receive a Service Credit as follows:

| Monthly Uptime Percentage | Service Credit Percentage |
| :--- | :--- |
| **99.0% to < 99.9%** | 10% of monthly fee (or 10% of the monthly equivalent for annual plans) |
| **< 99.0%** | 25% of monthly fee (or 25% of the monthly equivalent for annual plans) |

**Claiming Credits:**
To receive a Service Credit, you must submit a claim to enterprise-support@noblesworld.com.ng within 30 days of the end of the billing month in which the Downtime occurred. The claim must include dates, times, and descriptions of the incidents.

Service Credits are issued as a financial credit against future billing cycles and cannot be exchanged for cash refunds.

## 4. EXCLUSIONS
Downtime does not include unavailability resulting from:

1. **Scheduled Maintenance:** Routine maintenance windows, provided we have notified you at least 48 hours in advance.
2. **Force Majeure:** Events outside of our reasonable control (e.g., natural disasters, acts of war, widespread internet outages, or major infrastructure failures at our cloud providers).
3. **Customer Actions:** Misconfiguration, API abuse, or suspension of your account due to Terms of Service violations.
4. **Third-Party Failures:** Outages originating from third-party services you connect to the platform (e.g., your bank's API, external SMTP servers).

## 5. SOLE REMEDY
The Service Credits outlined in this SLA are your sole and exclusive remedy for any failure by Nobevra to meet the Uptime Commitment.
`;

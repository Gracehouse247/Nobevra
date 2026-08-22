export const disasterRecoveryMarkdown = `
# BUSINESS CONTINUITY & DISASTER RECOVERY (BCP/DR)

**Effective Date:** August 9, 2026  
**Last Updated:** August 9, 2026

## 1. PURPOSE
The Nobevra Business Continuity and Disaster Recovery (BCP/DR) Plan outlines the architecture, processes, and metrics designed to ensure that the Nobevra platform remains operational and resilient in the face of major disruptions.

## 2. RECOVERY OBJECTIVES
Our disaster recovery architecture is built to meet the following objectives for Enterprise (Noble Elite) customers:

* **Recovery Time Objective (RTO):** 24 hours. The maximum acceptable duration of time that the Nobevra core infrastructure can be down following a catastrophic disaster before services are restored.
* **Recovery Point Objective (RPO):** 24 hours. The maximum targeted period in which data might be lost from an IT service due to a major incident. (Note: Under normal circumstances, Point-in-Time Recovery allows for much lower data loss).

## 3. ARCHITECTURE & RESILIENCE

### A. High Availability (Multi-AZ)
Nobevra is hosted on modern, cloud-native infrastructure (Vercel and Supabase) distributed across multiple Availability Zones (AZs) in Tier-1 data centers. The failure of a single data center will not cause a complete system outage.

### B. Automated Backups
* **Database Backups:** Automated full backups are taken daily. 
* **Point-in-Time Recovery (PITR):** Transaction logs are maintained, allowing us to roll back the database to any specific second within the last 7 days.
* **Storage Location:** Backups are securely encrypted (AES-256) and stored in geographically redundant cold storage, separate from the primary database cluster.

### C. Traffic Routing & DDoS Protection
We utilize global edge routing and Web Application Firewalls (WAF) to mitigate Distributed Denial of Service (DDoS) attacks. In the event of localized network disruption, traffic is automatically routed to healthy global edge nodes.

## 4. INCIDENT RESPONSE PLAN
In the event of a catastrophic failure:

1. **Detection:** Automated monitoring alerts the Nobevra engineering team within minutes of a critical failure.
2. **Assessment:** The incident commander assesses the scope. If the primary region is unrecoverable, the DR plan is activated.
3. **Failover Execution:** The engineering team provisions replacement infrastructure in a secondary region, restores the most recent database backup, and redirects DNS routing.
4. **Communication:** Status updates are published to our status page, and Enterprise customers are notified directly via email.
5. **Post-Mortem:** Once resolved, a detailed incident report is provided to Enterprise customers outlining the root cause and steps taken to prevent recurrence.

## 5. TESTING AND REVIEW
This BCP/DR plan is reviewed annually. Tabletop exercises or partial disaster recovery simulations are conducted at least once per calendar year to validate the RTO and RPO metrics and ensure team readiness.
`;

export const esaMarkdown = `
# ENTERPRISE SECURITY ADDENDUM (ESA)

**Effective Date:** August 9, 2026  
**Last Updated:** August 9, 2026

## 1. APPLICABILITY
This Enterprise Security Addendum ("ESA") is entered into between Nobevra and customers subscribing to the **Noble Elite** plan. It supplements our standard Terms of Service and details our advanced security commitments to Enterprise organizations.

## 2. INFORMATION SECURITY PROGRAM
Nobevra maintains a comprehensive Information Security Program designed to protect the confidentiality, integrity, and availability of Customer Data. Our program is aligned with industry best practices and global regulatory frameworks.

## 3. ACCESS CONTROL
* **Role-Based Access Control (RBAC):** We employ strict RBAC internally. Only authorized personnel whose job functions require it are granted access to production systems.
* **Multi-Factor Authentication (MFA):** MFA is strictly enforced for all Nobevra employees and contractors accessing sensitive infrastructure.
* **Customer Permissions:** We provide Enterprise customers with robust RBAC tools to manage their own team members' access (e.g., Owner, Admin, Staff, Viewer).

## 4. DATA ENCRYPTION
* **In Transit:** All data transmitted between the customer and Nobevra is encrypted using industry-standard TLS 1.3.
* **At Rest:** All Customer Data stored within Nobevra databases (including Supabase instances) is encrypted at rest using AES-256 encryption.
* **Mobile Data:** Draft data stored locally on our iOS and Android mobile apps is protected via OS-level secure enclaves and secure storage APIs.

## 5. VULNERABILITY MANAGEMENT
* **Automated Scanning:** We continuously monitor our infrastructure for known vulnerabilities and misconfigurations.
* **Penetration Testing:** Nobevra engages independent third-party cybersecurity firms to conduct application penetration testing at least annually. Summaries of these reports are available to Enterprise customers upon request under NDA.
* **Patch Management:** Critical security patches are applied immediately upon availability and validation.

## 6. INCIDENT RESPONSE
* **Detection & Mitigation:** We operate continuous monitoring systems with automated alerting for suspicious activity.
* **Notification:** In the event of a confirmed Security Incident (data breach) involving Customer Data, Nobevra will notify affected Enterprise customers without undue delay, and no later than **48 hours** after confirmation of the incident.
* **Remediation:** Nobevra will take prompt action to mitigate the incident and will provide regular updates and a post-incident report to affected customers.

## 7. COMPLIANCE & AUDIT
* We maintain compliance with applicable data protection laws, including the Nigeria Data Protection Act 2023 (NDPA). 
* Enterprise customers may, upon reasonable request, review our security documentation and compliance attestations to verify our adherence to this ESA.
`;

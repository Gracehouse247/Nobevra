export const dataRetentionMarkdown = `
# DATA RETENTION & DELETION POLICY

**Effective Date:** August 9, 2026  
**Last Updated:** August 9, 2026

## 1. PURPOSE AND SCOPE
This Data Retention & Deletion Policy outlines how long The Noble's Technology Service ("Nobevra," "we," "our") retains personal data, business data, and system logs, and the processes by which such data is securely deleted or anonymized.

This policy applies to all users of the Nobevra platform, across all our services (Web, Android, iOS, APIs). It forms part of our Global Compliance Framework and ensures our adherence to the Nigeria Data Protection Act (NDPA), GDPR, and other applicable global standards.

## 2. GENERAL RETENTION PRINCIPLES
We operate on the principle of data minimization. We only retain personal and business data for as long as it is reasonably necessary to:
- Provide our services to you;
- Maintain accurate financial and business records on your behalf;
- Comply with applicable legal, tax, and accounting obligations;
- Resolve disputes and enforce our agreements.

When data is no longer necessary for these purposes, it is either securely deleted or irreversibly anonymized.

## 3. RETENTION SCHEDULES

We enforce automated retention rules at the database level. The following schedules apply:

### A. Active Account Data
* **Invoices, Clients, Expenses, Products, and Business Cards:** Retained for the lifetime of your active account. 
* **Receipt Images & Uploads:** Retained for the lifetime of the active account unless manually deleted by the user.

### B. Analytical and Telemetry Data
* **QR Code Scan Analytics:** Device and location information captured when someone scans your QR code (e.g., on a digital business card) is automatically purged **90 days** after the scan occurs.
* **AI Usage Logs:** Inputs provided to the Nobevra AI Assistant (including receipt OCR inputs and prompt contexts) are retained strictly for auditing and abuse-prevention purposes and are permanently deleted after **1 year**.

### C. Security and System Logs
* **Audit Logs:** System access logs, API usage logs, and authentication events are retained for **1 year** for security, compliance, and incident response purposes, after which they are permanently deleted.

### D. Backups
* **System Backups:** Database and infrastructure backups are retained for **30 days**. After 30 days, they are automatically overwritten or destroyed. Data deleted from active systems may persist in backups for up to this 30-day period.

## 4. DATA DELETION PROCESS

### 4.1 User-Initiated Deletion
You may request the deletion of your account at any time through the Data & Backup Settings page in the application, or by emailing us at privacy@noblesworld.com.ng.

### 4.2 The 30-Day Grace Period
When you initiate an account deletion:
1. **Immediate Lockout:** Your account is immediately banned at the authentication layer, and you will be logged out. You can no longer access your data.
2. **Pending Deletion State:** Your profile is marked for deletion, starting a 30-day grace period.
3. **Hard Deletion Execution:** Exactly 30 days after the request, an automated process completely and permanently deletes your user record. This triggers a cascading deletion across our databases, irreversibly erasing your profile, invoices, clients, expenses, and uploaded files.

### 4.3 Exceptions to Deletion
Even if you request deletion, we may be required by law to retain certain specific records (such as billing history for your Nobevra subscription payments) for tax and accounting purposes (typically up to 7 years depending on jurisdiction). This data is isolated and access is strictly restricted.

## 5. LOCAL DATA ON MOBILE DEVICES
If you use the Nobevra mobile application (iOS or Android), some data (such as draft invoices) is stored locally on your device using encrypted secure storage. 
* Logging out of the mobile app securely wipes this local data.
* Uninstalling the mobile app removes this local data from your device.

## 6. CHANGES TO THIS POLICY
We may update this policy periodically to reflect changes in our automated retention systems or legal obligations. We will notify you of any material changes.

## 7. CONTACT
For questions about this policy or to request data deletion, contact our Privacy Team at privacy@noblesworld.com.ng.
`;

<p align="center">
  <a href="https://nobevra.noblesworld.com.ng">
    <img src="NobeBrand Identityvra/horizontal_logo.png" alt="Nobevra Logo" width="480">
  </a>
</p>

<h3 align="center">The Autonomous Financial Operating System & Enterprise Business Suite</h3>

<p align="center">
  Unified platform combining intelligent invoicing, client CRM, expense tracking, dynamic QR generation, and real-time revenue analytics. Built for modern businesses, agencies, and freelancers.
</p>

<p align="center">
  <a href="https://github.com/Gracehouse247/Nobevra/actions/workflows/web-app.yml"><img src="https://github.com/Gracehouse247/Nobevra/actions/workflows/web-app.yml/badge.svg" alt="Web App CI"></a>
  <a href="https://github.com/Gracehouse247/Nobevra/actions/workflows/flutter.yml"><img src="https://github.com/Gracehouse247/Nobevra/actions/workflows/flutter.yml/badge.svg" alt="Mobile App CI"></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.2-black?logo=next.js" alt="Next.js"></a>
  <a href="https://flutter.dev/"><img src="https://img.shields.io/badge/Flutter-3.22-02569B?logo=flutter" alt="Flutter"></a>
  <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase" alt="Supabase"></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel" alt="Vercel"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-Proprietary-blue.svg" alt="License"></a>
</p>

---

## 🚀 Overview

**Nobevra** is a next-generation, high-performance financial management ecosystem. Designed with security, speed, and elegance at its core, Nobevra provides an all-in-one platform for invoicing, client relationship management, expense optimization, digital business cards, dynamic QR codes, and automated AI financial insights across Web, iOS, and Android.

### Key Capabilities

- 📄 **Smart & Automated Invoicing**: Customizable PDF templates, recurring billing engines, polymorphic item mapping, multi-currency conversions, and direct Flutterwave payment processing.
- 💼 **Client CRM & Relationship Hub**: Complete client profiles, interaction histories, document management, project linking, and automated payment reminders.
- 📊 **Real-time Financial Analytics**: Instant revenue tracking, expense categorizations, cash flow forecasting, and executive dashboard metrics.
- ⚡ **Dynamic QR Code Engine**: Dynamic link routing, live trackable analytics, custom brand styling, and instant contact/payment sharing.
- 🤖 **Autonomous AI Intelligence**: AI-powered billing recommendations, automatic OCR expense itemization, financial assistant, and automated SEO/content engines.
- 📱 **Cross-Platform Ecosystem**: Web app built on Next.js 16 (React 19 & Tailwind CSS v4) with PWA support, alongside native mobile apps built on Flutter 3.22 with offline Isar caching.

---

## 🎨 Brand & Product Showcase

<p align="center">
  <img src="NobeBrand Identityvra/Nobevra1.png" alt="Nobevra Platform Showcase 1" width="48%">
  <img src="NobeBrand Identityvra/Nobevra2.png" alt="Nobevra Platform Showcase 2" width="48%">
</p>

---

## 🏗️ Repository Architecture

```text
Nobevra/
├── Backend/                    # Supabase database schemas, Edge Functions & RLS security policies
│   ├── supabase/
│   │   ├── functions/          # Deno edge functions (dispatch-webhooks, FLW webhooks, emails, AI)
│   │   └── migrations/         # PostgreSQL database migrations & schema definitions
│   └── Database/               # Migration backups & reference scripts
├── Mobile App/                 # Cross-platform Flutter mobile application (Android / iOS)
│   ├── lib/                    # Provider architecture, UI components, Isar offline sync, models
│   └── assets/                 # Brand assets, custom fonts, PDF templates & icons
├── web-app/                    # Next.js 16 (App Router) web platform & PWA
│   ├── src/                    # App router pages, Server Actions, React 19 UI, Tailwind v4
│   └── public/                 # Static web assets & PWA manifests
└── NobeBrand Identityvra/      # Official brand identity guidelines, logos, and product mockups
```

---

## 🛠️ Tech Stack & Infrastructure

| Layer | Technology | Key Features |
| :--- | :--- | :--- |
| **Web Platform** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion | Server-Side Rendering (SSR), PWA ready, Lucide Icons, Recharts |
| **Mobile App** | Flutter 3.22, Dart 3.4, Isar DB, Provider, PDF / Printing | Offline-first caching, biometric auth, native PDF generation, dynamic QR |
| **Backend & DB** | Supabase (PostgreSQL), Deno Edge Functions, Row Level Security (RLS) | Real-time webhooks, Zero-Trust security triggers, Flutterwave webhooks |
| **Authentication** | Firebase Auth & Supabase Auth SSR | Multi-tenant auth, role-based access control (RBAC), OAuth |
| **Deployment** | Vercel (Web Platform), GitHub Actions CI/CD | Automated CI typechecking, build verifications, APK release builds |

---

## 💻 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **Flutter SDK**: `v3.22.x` or higher
- **Git**: `v2.x` or higher

### 1. Setting up the Web Platform (`web-app`)

```bash
# Navigate to web application directory
cd web-app

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the web application.

### 2. Setting up the Mobile Application (`Mobile App`)

```bash
# Navigate to Mobile App directory
cd "Mobile App"

# Fetch Flutter package dependencies
flutter pub get

# Run development application
flutter run
```

---

## 🛡️ Security & Zero-Trust Architecture

Nobevra strictly adheres to Zero-Trust security principles:
- **Row Level Security (RLS)**: Enforced across all Supabase PostgreSQL tables ensuring isolated multi-tenant data access.
- **HMAC Webhook Signatures**: All outgoing webhooks are signed using `X-Nobevra-Signature` header verification.
- **Biometric Device Authentication**: Secure local auth storage on iOS and Android via `flutter_secure_storage` and `local_auth`.

---

## 🌐 Deployments & Quick Links

- **Official Web Platform**: [https://nobevra.noblesworld.com.ng](https://nobevra.noblesworld.com.ng)
- **API Base Endpoint**: `https://nobevra.noblesworld.com.ng/api`
- **Documentation**: See [`web-app/README.md`](./web-app/README.md) and [`Mobile App/README.md`](./Mobile%20App/README.md)

---

## 📄 License

© 2026 NoblesWorld. All rights reserved.

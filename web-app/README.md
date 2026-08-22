# Nobevra Web Platform

[![Web App CI](https://github.com/Gracehouse247/Nobevra/actions/workflows/web-app.yml/badge.svg)](https://github.com/Gracehouse247/Nobevra/actions/workflows/web-app.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

**Nobevra** is a premium, enterprise-grade business suite designed for modern professionals, agencies, and enterprises. It combines advanced invoicing, client CRM management, financial analytics, dynamic QR codes, and autonomous AI insights into a unified, high-performance web platform.

---

## 🌟 Key Features

- 📄 **Advanced Invoicing**: Professional, customizable templates with global multi-currency tax support.
- 👥 **Client CRM Hub**: Comprehensive client profile management, document tracking, and automated reminders.
- 📈 **Financial Analytics**: Real-time revenue insights, expense breakdown charts, and cash flow forecasting.
- 🤖 **Autonomous AI Engine**: Smart billing recommendations, OCR invoice parsing, and intelligent assistant.
- ⚡ **Dynamic QR & Digital Cards**: Interactive QR routing, custom branding styles, and digital vCard generation.
- 📱 **Progressive Web App (PWA)**: Full offline-capable PWA support for desktop and mobile browsers.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Engine**: React 19, Tailwind CSS v4, Framer Motion, Radix UI primitives
- **Backend & Database**: Supabase (PostgreSQL, SSR Auth, Storage) & Firebase
- **Payments**: Flutterwave Integration
- **State Management**: Zustand & SWR

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **npm** / **yarn** / **pnpm**

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Gracehouse247/Nobevra.git
   cd Nobevra/web-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in `web-app/`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_FLW_PUBLIC_KEY=your_flutterwave_public_key
   NEXT_PUBLIC_API_URL=https://nobevra.noblesworld.com.ng/api
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Compliance

- Built with strict Row Level Security (RLS) enforcement via `@supabase/ssr`.
- Secure server side-action validation with `zod`.
- PCI-DSS compliant Flutterwave payment gateway integration.

---

## 🌐 Production Deployment

- **Production URL**: [https://nobevra.noblesworld.com.ng](https://nobevra.noblesworld.com.ng)
- **Deployment Platform**: Vercel

---

## 📄 License

© 2026 NoblesWorld. All rights reserved.

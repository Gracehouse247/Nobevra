# Nobevra Backend: Supabase Upload Guide 🚀

This guide provides a step-by-step walkthrough for deploying the **Nobevra** database schema, storage policies, and logic to your Supabase project.

## 📂 Pre-requisites
1.  A **Supabase Account** (https://supabase.com).
2.  A new **Project** created in the Supabase Dashboard.
3.  The **Supabase CLI** installed (optional, but recommended for Edge Functions).

---

## 🏗️ Step 1: Execute SQL Migrations
Go to the **SQL Editor** in your Supabase Dashboard and run the migrations located in `supabase/migrations/` in order.

---

## 📦 Step 2: Create Storage Buckets
Go to **Storage** in the Supabase Dashboard and verify the following buckets:

1.  `brand-assets`: For business logos and stamps.
2.  `receipts`: For expense OCR documents.
3.  `avatars`: For user profile pictures.
4.  `cms-media`: For blog and marketing article media.
5.  `documents`: For secure PDF exports.

---

## ⚡ Step 3: Deploy Edge Functions
Nobevra uses Supabase Edge Functions for advanced logic. Use the Supabase CLI to deploy them from your local project:

```bash
supabase functions deploy
```

---

**Your Nobevra backend is now production-ready!**

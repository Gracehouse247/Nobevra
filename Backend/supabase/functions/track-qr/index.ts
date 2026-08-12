import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

import { CORS_HEADERS as corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const qrId = url.searchParams.get("id");

    if (!qrId) {
      return new Response("Missing QR ID", { status: 400 });
    }

    // 1. Fetch QR Details
    const { data: qr, error: qrErr } = await supabase
      .from("qr_codes")
      .select("*")
      .eq("id", qrId)
      .single();

    if (qrErr || !qr) {
      return new Response("QR Code Not Found", { status: 404 });
    }

    // 2. Log Scan Analytics
    const deviceInfo = {
      userAgent: req.headers.get("user-agent"),
      ip: req.headers.get("x-forwarded-for")?.split(",")[0],
      referer: req.headers.get("referer"),
      acceptLanguage: req.headers.get("accept-language"),
    };

    // Capture location if available via Cloudflare headers (Supabase uses CF)
    const location = req.headers.get("cf-ipcity") 
      ? `${req.headers.get("cf-ipcity")}, ${req.headers.get("cf-ipcountry")}`
      : "Unknown";

    await supabase.from("qr_scans").insert({
      qr_code_id: qrId,
      device_info: deviceInfo,
      location: location,
    });

    // 3. Determine Redirect URL
    let targetUrl = "https://invoice.noblesworld.com.ng"; // Fallback
    
    if (qr.type === "website") {
      targetUrl = qr.content.url;
    } else if (qr.type === "vcard" || qr.type === "business_card") {
      // For business cards, we might redirect to a digital profile page
      // For now, redirect to the asset_url (vCard file) if it exists
      targetUrl = qr.asset_url || `https://invoice.noblesworld.com.ng/profile/${qr.user_id}`;
    } else if (qr.content.url) {
       targetUrl = qr.content.url;
    }

    // 4. Redirect
    return Response.redirect(targetUrl, 302);

  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
});

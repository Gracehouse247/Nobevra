// supabase/functions/scan-receipt/index.ts
// AI-powered receipt scanner using Gemini Vision

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { encodeBase64 } from "https://deno.land/std@0.224.0/encoding/base64.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const RECEIPT_SYSTEM_PROMPT = `
You are an expert receipt and invoice data extraction AI. 
Analyze the provided image of a receipt, invoice, or bill and extract all relevant expense data.

Return a JSON object with the following structure:
{
  "vendor": "Business/Merchant name (string)",
  "amount": numeric total amount (number, no currency symbol),
  "currency_code": "ISO-4217 3-letter code, e.g. NGN, USD, EUR, GBP, GHS, KES, ZAR (string)",
  "expense_date": "Date in YYYY-MM-DD format (string)",
  "category": "One of: Food & Dining, Travel, Office Supplies, Software & Subscriptions, Marketing, Utilities, Professional Services, Healthcare, Shopping, Fuel & Transport, Other (string)",
  "notes": "Brief description of what was purchased (string, max 100 chars)",
  "tax_amount": numeric tax amount if visible (number or null),
  "line_items": [
    { "description": "Item name", "quantity": 1, "unit_price": 0.00, "total": 0.00 }
  ]
}

RULES:
- If a field is not visible or cannot be determined, use null for numbers and make a best guess for strings.
- For currency: look for currency symbols (₦=NGN, $=USD, €=EUR, £=GBP, GH₵=GHS, KSh=KES, R=ZAR) or text indicating the country.
- If currency is unclear, default to NGN.
- For the date: if no year is shown, assume the current year.
- For category: make your best inference based on the vendor type and items.
- ONLY return the raw JSON object. No markdown, no explanation, no extra text.
`;

serve(async (req) => {
  // Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  try {
    // 1. Verify Authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized user" }), {
        status: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // 2. Enforce Subscription Quota
    let scanLimit = 0;
    let teamId = null;

    try {
      // Get primary team
      const { data: teamData } = await supabaseClient
        .from("teams")
        .select("id")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
        
      if (teamData) {
        teamId = teamData.id;
        // Resolve Entitlements
        const { data: entitlements } = await supabaseClient
          .rpc('resolve_team_entitlements', { p_team_id: teamId });
          
        if (entitlements && entitlements['receipt.scan']) {
          scanLimit = parseInt(entitlements['receipt.scan']);
        }
      }
    } catch (dbErr) {
      console.warn("Could not query limits:", dbErr);
    }

    if (scanLimit <= 0) {
      return new Response(JSON.stringify({ error: "Receipt scanning is only available on Pulse and Elite plans." }), {
        status: 403,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const serviceClient = createClient(SUPABASE_URL!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const monthStart = new Date();
    monthStart.setDate(1);
    const periodStart = monthStart.toISOString().split('T')[0]; // "2026-07-01"

    const { data: usageData, error: usageErr } = await serviceClient
      .from("team_usage")
      .select("used_amount")
      .eq("team_id", teamId)
      .eq("feature_id", "receipt.scan")
      .eq("period_start", periodStart)
      .maybeSingle();

    const scansMade = usageData?.used_amount || 0;
    if (scansMade >= scanLimit) {
      return new Response(JSON.stringify({ error: `You have reached your limit of ${scanLimit} receipt scans this month.` }), {
        status: 429,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Note: We don't increment here yet. We increment after successful parsing.
    // 3. Parse Request Body
    // Accept: { imageBase64: string, mimeType: string }
    // OR:     { imageUrl: string } for a remote URL
    const body = await req.json();

    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "AI Engine is not configured." }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // 3. Build Gemini Vision Request
    let imagePart: Record<string, unknown>;

    if (body.imageBase64) {
      // Client uploaded raw base64
      const mimeType = body.mimeType || "image/jpeg";
      if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(mimeType)) {
        return new Response(JSON.stringify({ error: "Unsupported image format. Use JPEG, PNG, WEBP, or GIF." }), {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }
      imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: body.imageBase64,
        },
      };
    } else if (body.imageUrl) {
      // Prevent SSRF: ensure it is a Supabase Storage URL belonging to our project
      if (!body.imageUrl.startsWith(SUPABASE_URL!)) {
        return new Response(JSON.stringify({ error: "Invalid image URL. Only internal storage URLs are permitted." }), {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      const imgRes = await fetch(body.imageUrl);
      if (!imgRes.ok) {
        throw new Error("Failed to fetch image from internal storage.");
      }
      
      const arrayBuffer = await imgRes.arrayBuffer();
      const base64Str = encodeBase64(arrayBuffer);

      imagePart = {
        inlineData: {
          mimeType: imgRes.headers.get("content-type") || "image/jpeg",
          data: base64Str,
        },
      };
    } else {
      return new Response(JSON.stringify({ error: "Provide either imageBase64 or imageUrl in the request body." }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // 4. Call Gemini 1.5 Flash Vision API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: RECEIPT_SYSTEM_PROMPT }],
        },
        contents: [
          {
            role: "user",
            parts: [
              imagePart,
              { text: "Extract all expense data from this receipt image and return the JSON object." },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1, // Low temperature for factual extraction
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error(`Gemini Vision API failed: ${errText}`);
      throw new Error("Failed to analyze receipt image with AI.");
    }

    const geminiJson = await geminiRes.json();
    const modelText = geminiJson.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!modelText) {
      throw new Error("Empty response from Gemini Vision model.");
    }

    // 5. Parse and validate the extracted data
    let extractedData: Record<string, unknown>;
    try {
      extractedData = JSON.parse(modelText);
    } catch (_parseErr) {
      console.error("Failed to parse Gemini response as JSON:", modelText);
      throw new Error("AI could not parse a structured response from this image. Please try a clearer photo.");
    }

    // 5b. Increment Usage after successful extraction
    if (teamId) {
      serviceClient.rpc('increment_team_usage', {
        p_team_id: teamId,
        p_feature_id: 'receipt.scan',
        p_period_start: periodStart
      }).catch(console.error);
    }

    // 6. Return structured expense data
    return new Response(
      JSON.stringify({
        success: true,
        data: extractedData,
        message: `Receipt from ${extractedData.vendor || "Unknown Merchant"} scanned successfully.`,
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Scan Receipt Function Error:", error);
    return new Response(
      JSON.stringify({
        error: String(error),
        message: "Failed to scan receipt. Please try again with a clearer image.",
      }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }
});

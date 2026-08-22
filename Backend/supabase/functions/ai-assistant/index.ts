// supabase/functions/ai-assistant/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import { CORS_HEADERS } from "../_shared/cors.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const BASE_SYSTEM_INSTRUCTION = `
You are the AI Business Assistant for Nobevra, The Intelligent Business Operating System.
Your task is to analyze the user's input message, the provided USER CONTEXT (if any), and conversation history, categorize their intent, and extract structured data when possible.

Supported Intents:
1. CREATE_INVOICE: The user wants to generate a new invoice draft.
   - Extracted Data should contain:
     - client: { name: string, client_id?: string, email?: string, company?: string, address?: string } // IMPORTANT: match name to a client_id from USER CONTEXT if available
     - invoice: {
         invoice_number?: string,
         items: Array<{ description: string, quantity: number, unit_price: number }>,
         total_amount: number,
         currency_code: string (ISO-4217, e.g., NGN, USD, EUR, GHS, KES, ZAR),
         due_date?: string (YYYY-MM-DD, e.g. 14 days from today if not specified)
       }
2. CREATE_PROPOSAL: The user wants to write a client proposal or estimate.
   - Same data structure as CREATE_INVOICE but invoice_type should be 'estimate' or 'quote'.
3. WRITE_REMINDER: The user wants to compose a payment reminder for a client.
   - Extracted Data should contain:
     - subject: string (email subject)
     - body: string (email/SMS/WhatsApp message body text, polite but firm)
4. NAVIGATE: The user wants to navigate to a specific page or section of the app.
   - Extracted Data should contain:
     - path: string (e.g., '/invoices', '/clients', '/settings', '/reports', '/wallet', '/dashboard', or '/')
5. UPDATE_STATUS: The user wants to update the status of an existing invoice (e.g. mark as paid).
   - Extracted Data should contain:
     - invoice_id: string (extracted from context if possible)
     - new_status: string (e.g. 'paid', 'cancelled')
6. QUERY_DATA: The user is asking for specific data or insights (e.g., total revenue, overdue invoices).
   - Extracted Data: no rigid structure. Just answer if it's in the context.
7. CONVERSATIONAL: The user is chatting, asking questions about invoices, or general billing advice.
   - No extracted data structure needed.

Response Format:
You MUST return a JSON object containing:
- "intent": The categorized intent string (one of the 4 above).
- "reply": Your natural language response back to the user (keep it concise, professional, and friendly).
- "data": (Optional) The structured data object extracted for the intent.

Example:
User input: "Create invoice for John Doe (john@example.com) for 500 for web design"
JSON Response:
{
  "intent": "CREATE_INVOICE",
  "reply": "I've drafted an invoice for John Doe totaling $500 for web design. Please review and confirm the draft below.",
  "data": {
    "client": { "name": "John Doe", "email": "john@example.com" },
    "invoice": {
      "items": [{ "description": "Web Design Services", "quantity": 1, "unit_price": 500 }],
      "total_amount": 500,
      "currency_code": "USD"
    }
  }
}

IMPORTANT: Do not return any markdown wraps (like \`\`\`json) or other formatting. Only return the raw JSON object.
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

    // 2. Fetch User Dynamic Entitlements
    let userPreferredCurrency = "NGN";
    let aiVoiceLimit = 0;
    let teamId = null;

    try {
      // Get the user's primary team
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
          
        if (entitlements && entitlements['ai.voice']) {
          aiVoiceLimit = parseInt(entitlements['ai.voice']);
        }
      }

      const { data: profile } = await supabaseClient
        .from("profiles")
        .select("preferred_currency")
        .eq("id", user.id)
        .single();
      if (profile && profile.preferred_currency) {
        userPreferredCurrency = profile.preferred_currency;
      }
    } catch (dbErr) {
      console.warn("Could not query entitlements or profile:", dbErr);
    }

    if (aiVoiceLimit <= 0) {
      return new Response(JSON.stringify({ 
        error: "Upgrade Required", 
        reply: "AI Voice Assistant is exclusively available on the Pulse and Elite plans. Please upgrade to continue." 
      }), {
        status: 403,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // 2b. Rate Limiting via team_usage
    const serviceClient = createClient(SUPABASE_URL!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const monthStart = new Date();
    monthStart.setDate(1);
    const periodStart = monthStart.toISOString().split('T')[0]; // "2026-07-01"
    
    const { data: usageData, error: usageErr } = await serviceClient
      .from("team_usage")
      .select("used_amount")
      .eq("team_id", teamId)
      .eq("feature_id", "ai.voice")
      .eq("period_start", periodStart)
      .maybeSingle();
      
    const callsMade = usageData?.used_amount || 0;
    if (callsMade >= aiVoiceLimit) {
      return new Response(JSON.stringify({ 
        error: "Quota Exceeded", 
        reply: `You have reached your limit of ${aiVoiceLimit} AI requests this month. Please upgrade your plan for more.` 
      }), {
        status: 429,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Increment usage synchronously to prevent race conditions
    const { error: incErr } = await serviceClient.rpc('increment_team_usage', {
      p_team_id: teamId,
      p_feature_id: 'ai.voice',
      p_period_start: periodStart
    });
    
    if (incErr) {
        console.warn("Failed to increment team usage:", incErr);
    }

    // 3. Parse Body
    const { message, chatHistory, userContext } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Missing prompt message" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    if (!GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY environment secret.");
      return new Response(JSON.stringify({ error: "AI Engine is currently unconfigured." }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // 4. Construct System Instruction with Contextual Multi-currency Rules
    const systemInstructionWithCurrency = `${BASE_SYSTEM_INSTRUCTION}

    CONTEXTUAL DEFAULT RULES:
    1. The user's default preferred currency is "${userPreferredCurrency}".
    2. If the user specifies monetary values with symbols or terms (e.g. "₦", "Naira", "$", "dollars", "€", "euros", "£", "pounds", "cedis", "GH₵", "shillings", "KES", "Rands", "ZAR"), you MUST extract them and map them to their official standard three-letter ISO-4217 code (NGN, USD, EUR, GBP, GHS, KES, ZAR, etc.).
    3. If NO explicit currency is specified in their prompt, you MUST default the currency_code to the user's preferred currency: "${userPreferredCurrency}".
    
    USER CONTEXT:
    ${userContext ? JSON.stringify(userContext) : "No context provided."}
    `;

    // 5. Format Contents for Gemini Model
    const geminiHistory = (chatHistory || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const contents = [
      ...geminiHistory,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    // 6. Invoke Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstructionWithCurrency }],
        },
        contents: contents,
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error(`Gemini API call failed: ${errText}`);
      throw new Error("Failed to communicate with Google Gemini API");
    }

    const geminiJson = await geminiRes.json();
    const modelReplyText = geminiJson.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!modelReplyText) {
      throw new Error("Empty response received from Gemini model.");
    }

    // 7. Parse Model Response
    const parsedAction = JSON.parse(modelReplyText);

    return new Response(JSON.stringify(parsedAction), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("AI Assistant Function Error:", error);
    return new Response(JSON.stringify({ 
      error: String(error),
      reply: "I encountered a neural synchronization block. Can you try again?" 
    }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});

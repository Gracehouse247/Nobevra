import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import { CORS_HEADERS } from "../_shared/cors.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

type AssistMode =
  | 'improve'
  | 'expand'
  | 'summarize'
  | 'rephrase'
  | 'simplify'
  | 'formal'
  | 'casual'
  | 'conclusion'
  | 'intro'
  | 'faq'
  | 'outline'
  | 'repurpose_twitter'
  | 'repurpose_linkedin'
  | 'repurpose_newsletter';

const SYSTEM_PROMPTS: Record<AssistMode, string> = {
  improve: 'Improve the clarity, flow, and engagement of the following content. Keep the same length and meaning but make it more compelling. Return only the improved text.',
  expand: 'Expand the following content with more detail, examples, and depth. Roughly double the length. Return only the expanded text.',
  summarize: 'Summarize the following content into 3-5 concise bullet points. Return only the bullet points.',
  rephrase: 'Rephrase the following content in a fresh way while keeping the same meaning. Return only the rephrased text.',
  simplify: 'Simplify the following content to a Grade 8 reading level. Use short sentences and plain language. Return only the simplified text.',
  formal: 'Rewrite the following content in a formal, professional business tone. Return only the rewritten text.',
  casual: 'Rewrite the following content in a warm, friendly, conversational tone. Return only the rewritten text.',
  conclusion: 'Write a compelling conclusion paragraph for the following article. Return only the conclusion paragraph.',
  intro: 'Write an attention-grabbing introduction paragraph for the following article. Use a hook and clearly state what the reader will learn. Return only the introduction.',
  faq: 'Generate 5 frequently asked questions (with detailed answers) based on the following content. Format as Q: ... A: ... Return only the FAQ pairs.',
  outline: 'Create a detailed article outline with H2 and H3 sections based on the following topic/content. Return only the outline in markdown.',
  repurpose_twitter: 'Transform the following blog post into a compelling Twitter/X thread (10-15 tweets). Number each tweet. Keep each tweet under 280 characters. Start with a strong hook tweet. End with a CTA. Return only the thread.',
  repurpose_linkedin: 'Transform the following blog post into a professional LinkedIn post (400-600 words). Use line breaks for readability, include 3-5 relevant hashtags at the end. Return only the post.',
  repurpose_newsletter: 'Transform the following blog post into a friendly email newsletter (300-400 words). Include a subject line at the top, a personal greeting, the key insights, and a CTA. Return only the newsletter.',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const { mode, content, title } = await req.json();

    if (!mode || !content) {
      return new Response(JSON.stringify({ error: 'mode and content are required.' }), { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
    }

    const systemPrompt = SYSTEM_PROMPTS[mode as AssistMode];
    if (!systemPrompt) {
      return new Response(JSON.stringify({ error: `Unknown mode: ${mode}` }), { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
    }

    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured on the Edge Function." }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const contextualContent = title ? `Article Title: "${title}"\n\nContent:\n${content}` : content;

    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${systemPrompt}\n\n---\n\n${contextualContent}` },
            ],
          },
        ],
        generationConfig: {
          temperature: mode.startsWith('repurpose') ? 0.8 : 0.5,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(JSON.stringify({ error: 'Gemini API error', details: errText }), { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
    }

    const geminiData = await geminiRes.json();
    const result = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
  }
});

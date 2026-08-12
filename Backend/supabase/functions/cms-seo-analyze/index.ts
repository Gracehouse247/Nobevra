import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import { CORS_HEADERS } from "../_shared/cors.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

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

    const { title, content, metaTitle, metaDescription, slug, focusKeyword, wordCount } = await req.json();

    if (!title && !content) {
      return new Response(JSON.stringify({ error: 'Title and content are required.' }), { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
    }

    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured on the Edge Function." }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const prompt = `You are an expert SEO analyst. Analyze the following blog post and return a detailed JSON SEO report.

BLOG POST DATA:
- Title: "${title}"
- Slug: "${slug}"
- Meta Title: "${metaTitle || title}"
- Meta Description: "${metaDescription}"
- Focus Keyword: "${focusKeyword || 'none specified'}"
- Word Count: ${wordCount}
- Content (first 3000 chars): "${content?.substring(0, 3000)}"

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "overallScore": <number 0-100>,
  "readabilityScore": <number 0-100>,
  "seoScore": <number 0-100>,
  "keywordDensity": <number percentage, e.g. 1.8>,
  "readingTime": <number in minutes>,
  "sentiment": "<positive|neutral|negative>",
  "toneConsistency": "<formal|conversational|mixed>",
  "issues": [
    { "type": "<error|warning|info>", "message": "<short issue description>", "fix": "<actionable fix>" }
  ],
  "strengths": ["<strength 1>", "<strength 2>"],
  "lsiKeywords": ["<semantically related keyword>"],
  "missingTopics": ["<topic not covered that competitors likely cover>"],
  "titleAnalysis": {
    "hasKeyword": <boolean>,
    "length": <number>,
    "powerWords": ["<power word if any>"],
    "suggestion": "<improved title suggestion>"
  },
  "metaAnalysis": {
    "hasKeyword": <boolean>,
    "length": <number>,
    "isCompelling": <boolean>,
    "suggestion": "<improved meta description>"
  },
  "contentStructure": {
    "hasH1": <boolean>,
    "hasH2": <boolean>,
    "hasImages": <boolean>,
    "hasInternalLinks": <boolean>,
    "hasBulletPoints": <boolean>,
    "paragraphCount": <number>
  },
  "snippetPreview": {
    "title": "<optimized title for snippet>",
    "url": "<slug>",
    "description": "<optimized meta for snippet>"
  }
}`;

    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(JSON.stringify({ error: 'Gemini API error', details: errText }), { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
    }

    const geminiData = await geminiRes.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Strip any markdown code fences if Gemini wraps in ```json
    const jsonMatch = rawText.match(/```json\s*([\s\S]*?)```/) || rawText.match(/```\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : rawText.trim();

    let analysis;
    try {
      analysis = JSON.parse(jsonStr);
    } catch {
      return new Response(JSON.stringify({ error: 'Failed to parse AI response', raw: rawText }), { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ analysis }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
  }
});

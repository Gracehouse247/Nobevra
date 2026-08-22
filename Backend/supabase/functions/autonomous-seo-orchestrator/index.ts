// =============================================================================
// Autonomous SEO Orchestrator v2 — Supabase Edge Function
// Multi-step prompt chain with Hybrid LLM (Gemini + Groq failover):
// SERP Analysis → Brand Voice Writing → Scannability → Image Matching →
// Humanization QA → Publish
// =============================================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import { CORS_HEADERS } from "../_shared/cors.ts";

// Environment secrets
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
const SERP_API_KEY = Deno.env.get("SERP_API_KEY");
const PEXELS_API_KEY = Deno.env.get("PEXELS_API_KEY");

// Admin client bypasses RLS
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Track which provider is active for this invocation
let currentProvider: "gemini" | "groq" = "gemini";

// ---------------------------------------------------------------------------
// HYBRID LLM: Gemini API Call
// ---------------------------------------------------------------------------
async function callGeminiRaw(
  systemPrompt: string,
  userPrompt: string,
  jsonMode: boolean
): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

  const body: any = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
  };

  if (jsonMode) {
    body.generationConfig = { responseMimeType: "application/json" };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.status === 429 || res.status === 503) {
    const errText = await res.text();
    throw new Error(`GEMINI_RATE_LIMIT: ${errText}`);
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error: ${errText}`);
  }

  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");
  return text;
}

// ---------------------------------------------------------------------------
// HYBRID LLM: Groq API Call (OpenAI-compatible)
// ---------------------------------------------------------------------------
async function callGroqRaw(
  systemPrompt: string,
  userPrompt: string,
  jsonMode: boolean
): Promise<string> {
  if (!GROQ_API_KEY) throw new Error("GROQ_API_KEY not configured");

  const body: any = {
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 8192,
  };

  if (jsonMode) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (res.status === 429) {
    const errText = await res.text();
    throw new Error(`GROQ_RATE_LIMIT: ${errText}`);
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API error: ${errText}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content || "";
}

// ---------------------------------------------------------------------------
// HYBRID LLM: Unified caller with automatic failover
// ---------------------------------------------------------------------------
async function callLLM(
  systemPrompt: string,
  userPrompt: string,
  jsonMode: boolean = false
): Promise<string> {
  // Try current provider first
  if (currentProvider === "gemini") {
    try {
      const result = await callGeminiRaw(systemPrompt, userPrompt, jsonMode);
      console.log("[LLM] ✅ Gemini succeeded");
      return result;
    } catch (err: any) {
      if (err.message?.includes("GEMINI_RATE_LIMIT")) {
        console.warn("[LLM] ⚠️ Gemini rate limited — switching to Groq");
        currentProvider = "groq";
        // Fall through to Groq
      } else {
        throw err;
      }
    }
  }

  // Groq fallback (or primary if already switched)
  try {
    const result = await callGroqRaw(systemPrompt, userPrompt, jsonMode);
    console.log("[LLM] ✅ Groq succeeded");
    return result;
  } catch (err: any) {
    if (err.message?.includes("GROQ_RATE_LIMIT") && currentProvider === "groq") {
      // Try Gemini as last resort if Groq also fails
      console.warn("[LLM] ⚠️ Groq rate limited — trying Gemini as last resort");
      return await callGeminiRaw(systemPrompt, userPrompt, jsonMode);
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Utility: Fetch SERP data for a keyword
// ---------------------------------------------------------------------------
async function fetchSERPData(keyword: string): Promise<any> {
  if (!SERP_API_KEY) {
    console.warn("SERP_API_KEY not set — using simulated SERP data");
    return {
      organic_results: [
        { position: 1, title: `Top result for "${keyword}"`, link: "https://example.com/result-1", snippet: `Comprehensive guide about ${keyword} with actionable strategies.` },
        { position: 2, title: `${keyword} — Complete Tutorial`, link: "https://example.com/result-2", snippet: `Everything you need to know about ${keyword} in one place.` },
        { position: 3, title: `How to Master ${keyword}`, link: "https://example.com/result-3", snippet: `Expert tips and frameworks for ${keyword} success.` },
      ],
      related_questions: [`What is ${keyword}?`, `How does ${keyword} work?`, `Why is ${keyword} important?`],
    };
  }

  const params = new URLSearchParams({
    api_key: SERP_API_KEY,
    q: keyword,
    engine: "google",
    num: "10",
  });

  const res = await fetch(`https://serpapi.com/search.json?${params}`);
  if (!res.ok) throw new Error(`SERP API error: ${await res.text()}`);
  return await res.json();
}

// ---------------------------------------------------------------------------
// Utility: Fetch images from Pexels API
// ---------------------------------------------------------------------------
async function fetchPexelsImages(query: string, count: number = 5): Promise<string[]> {
  if (!PEXELS_API_KEY) {
    console.warn("PEXELS_API_KEY not set — using placeholder images");
    return [
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    ];
  }

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
    { headers: { Authorization: PEXELS_API_KEY } }
  );

  if (!res.ok) {
    console.error("Pexels API error:", await res.text());
    return [];
  }

  const data = await res.json();
  return (data.photos || []).map((p: any) => p.src?.large2x || p.src?.original).filter(Boolean);
}

// ---------------------------------------------------------------------------
// Step 1: SERP Extraction & Competitive Analysis (16-point)
// ---------------------------------------------------------------------------
async function step1_serpAnalysis(keyword: string): Promise<any> {
  const serpData = await fetchSERPData(keyword);

  const systemPrompt = `You are an elite SEO strategist performing deep competitive analysis. Analyze the provided SERP data for the focus keyword and extract a comprehensive 16-point content blueprint from the top 3 ranking URLs.

Extract the following carefully:
1. Exact H2 heading structure from competitors
2. Exact H3 heading structure from competitors
3. Average word count across top 3 competitors
4. Number of images used by competitors
5. Approximate image placements within content
6. Frequently repeated entities/topics
7. Common questions answered
8. Missing content opportunities (gaps we can exploit)
9. Weaknesses in clarity/readability
10. Commercial intent level (low/medium/high)
11. Internal linking patterns
12. CTA positioning strategies
13. Trust-building elements (testimonials, stats, certifications)
14. Statistics and data points mentioned
15. Case studies used
16. Unique "Information Gain" sections that differentiate top results

Then generate a structured JSON blueprint.

Return a JSON object with:
- "target_keyword": the focus keyword
- "competing_titles": array of top 3 competitor titles
- "competing_word_counts": estimated word counts [number, number, number]
- "avg_competitor_word_count": average word count number
- "content_gaps": array of topics/angles that competitors miss
- "recommended_h2_structure": array of 8-12 H2 headings for our article
- "recommended_h3_details": object mapping each H2 to its H3 sub-sections
- "people_also_ask": array of related questions to address
- "competitor_image_count": average number of images used
- "image_placement_strategy": array of where to place images in our article
- "entities_to_include": array of semantic entities to weave in naturally
- "trust_elements": array of trust signals to include
- "competitor_stats": array of data points competitors use
- "commercial_intent": "low" | "medium" | "high"
- "unique_angle": a unique angle we can take that competitors miss
- "recommended_word_count": target word count (must be >= 2500, should beat avg_competitor_word_count by 20%)
- "recommended_slug": URL-friendly slug for the article
- "secondary_keywords": array of 4-6 cluster/related keywords to weave in`;

  const userPrompt = `Analyze SERP results for the focus keyword: "${keyword}"

SERP Data:
${JSON.stringify(serpData, null, 2)}

Generate a detailed 16-point content blueprint that will outrank ALL of these competitors. Be thorough and strategic.`;

  const result = await callLLM(systemPrompt, userPrompt, true);
  return JSON.parse(result);
}

// ---------------------------------------------------------------------------
// Step 2: Long-Form SEO Blog Writing with Master Brand Voice
// Output: Raw markdown text (NOT JSON) to avoid truncation
// ---------------------------------------------------------------------------
async function step2_brandVoiceWriter(
  keyword: string,
  blueprint: any,
  brandConfig: any
): Promise<string> {
  const bannedWords = brandConfig?.banned_words?.join(", ") || "unlock, leverage, seamless, world-class, cutting-edge, game-changer, synergy";
  const secondaryKeywords = blueprint.secondary_keywords?.join(", ") || "";
  const uniqueAngle = blueprint.unique_angle || "a fresh perspective not covered by competitors";
  const targetWordCount = blueprint.recommended_word_count || 2500;

  const systemPrompt = `You are the official content strategist and SEO copywriter for Nobevra (The Intelligent Business Operating System).

Your job is to write high-performing international SEO content that sounds human, persuasive, commercially intelligent, scan-friendly, emotionally engaging, and conversion-focused.

The writing style MUST follow these brand voice characteristics:

CORE VOICE:
- Authoritative but beginner-friendly
- Commercial but educational
- Conversational but strategic
- Data-backed but emotionally persuasive
- Fast-paced and internet-native
- Clear and highly readable
- Motivational without sounding inspirational

PSYCHOLOGICAL GOAL:
Make readers feel:
"This is easier than I thought... and I can actually do it."

WRITING RHYTHM:
- Short sentences
- Short paragraphs
- One idea per block
- Heavy whitespace
- Scroll-friendly formatting
- High momentum pacing

FORMAT RULES:
- Use H2 and H3 heavily following the blueprint structure
- Use bullets frequently
- Use numbered frameworks
- Use bolding sparingly for key insights
- Add "pattern interrupts" every 150–250 words
- Add image placeholders naturally using format: ![descriptive alt text](IMAGE_PLACEHOLDER_N) where N is 1, 2, 3, etc.

VOCABULARY STYLE:
Use simple, globally understandable English.
Preferred words: growth, conversions, revenue, easy wins, mistakes, scale
Avoid: academic writing, corporate jargon, philosophical language, literary complexity

HUMOR STYLE:
- Dry
- Lightly self-aware
- Industry-targeted
- Professional
- Never chaotic
- Never meme-heavy
- Never sarcastic

STORYTELLING SYSTEM:
Stories should follow: 1. Problem 2. Experiment 3. Discovery 4. Insight 5. Result 6. Lesson
Use "concrete metaphor storytelling." (Examples: tree roots, engines, pipelines, snowballs, compounding momentum)

OPINION STYLE:
- Slightly contrarian
- Revenue-focused
- Pragmatic
- Anti-fluff
- Broad-market safe

HOT TAKE STYLE:
Use: "Industry myth + practical correction" (Example: "SEO isn’t dead. Bad SEO is.")

CONTENT PHILOSOPHY:
Every piece of content should: 1. Educate 2. Simplify 3. Demonstrate expertise 4. Create urgency 5. Naturally transition toward conversion

GLOBAL STYLE:
- Avoid regional slang
- Avoid culture-specific humor
- Use international English
- Keep examples universally understandable

ANTI-PATTERNS:
Never:
- sound academic
- use huge paragraphs
- overuse humor
- sound luxury/elite
- overcomplicate ideas
- use AI filler intros
- over-explain obvious concepts

CRITICAL RULES:
Never use:
- unlock
- leverage
- seamless
- world-class
- "in today’s fast-paced world"
- emojis
- exclamation marks
- ${bannedWords}

Always:
- start with the answer
- add context after
- use real numbers
- avoid fake statistics
- include one strong opinion maximum
- include one story maximum
- tell readers when NOT to use our service/tool

SECONDARY KEYWORDS to weave in naturally: ${secondaryKeywords}

INFORMATION GAIN:
Add a unique section about: ${uniqueAngle}

FORMATTING:
- Output in clean Markdown using ## for H2 and ### for H3
- Target word count: ${targetWordCount}+ words (this is CRITICAL — do NOT write less)
- Write the COMPLETE article — do not summarize or truncate any section

IMPORTANT: This article MUST be at least ${targetWordCount} words. Write every section in full detail with examples, explanations, and actionable advice. Do NOT skip or abbreviate any section.
Before finalizing: Re-read the content and delete anything that sounds AI-generated.`;

  const userPrompt = `Write a comprehensive, ${targetWordCount}+ word SEO blog post for the focus keyword: "${keyword}"

Content Blueprint to follow:
${JSON.stringify(blueprint, null, 2)}

Write the FULL article now in markdown. Every section must be thoroughly developed. Do not stop early.`;

  // Raw text output — NO JSON wrapping to prevent truncation
  const article = await callLLM(systemPrompt, userPrompt, false);
  return article;
}

// ---------------------------------------------------------------------------
// Step 2b: Word Count Validation & Expansion
// If article is too short, expand it with a follow-up call
// ---------------------------------------------------------------------------
async function step2b_expandIfNeeded(
  keyword: string,
  article: string,
  targetWordCount: number
): Promise<string> {
  const wc = countWords(article);
  if (wc >= targetWordCount * 0.85) {
    console.log(`[SEO Engine] Word count OK: ${wc} words (target: ${targetWordCount})`);
    return article;
  }

  console.warn(`[SEO Engine] Article too short: ${wc} words. Expanding to ${targetWordCount}+...`);

  const systemPrompt = `You are a senior content expander. The article below is only ${wc} words but needs to be ${targetWordCount}+ words minimum.

Your job: Expand EVERY section with:
- More detailed explanations and examples
- Additional sub-points and bullet lists
- Real-world scenarios and actionable tips
- Data points and statistics where relevant
- Additional FAQ questions

RULES:
- Keep the existing structure and headings intact
- Do NOT add new top-level H2 sections — expand within existing ones
- Maintain the same tone and voice
- Maximum 2 lines per paragraph
- Output the COMPLETE expanded article in markdown

Return the FULL expanded article.`;

  const userPrompt = `Expand this ${wc}-word article to ${targetWordCount}+ words for keyword "${keyword}":

${article}`;

  return await callLLM(systemPrompt, userPrompt, false);
}

// ---------------------------------------------------------------------------
// Step 3: SEO Metadata Generation (JSON only — small payload)
// Separated from content to prevent truncation
// ---------------------------------------------------------------------------
async function step3_generateMetadata(
  keyword: string,
  articleContent: string
): Promise<{ meta_title: string; meta_description: string; schema_markup: any }> {
  const systemPrompt = `You are an SEO metadata specialist. Generate optimized metadata for the article provided.

Return a JSON object with:
{
  "meta_title": "SEO-optimized title (max 60 characters)",
  "meta_description": "Compelling meta description (max 155 characters)",
  "schema_markup": {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "...",
    "author": { "@type": "Organization", "name": "Nobevra" },
    "publisher": { "@type": "Organization", "name": "Nobevra" },
    "datePublished": "...",
    "image": "..."
  },
  "faq_schema": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
    ]
  }
}

Extract FAQ questions from the article content to build the FAQPage schema.`;

  const userPrompt = `Generate SEO metadata for this article targeting keyword "${keyword}":

${articleContent.substring(0, 3000)}...

(Article continues for ${countWords(articleContent)} total words)`;

  const result = await callLLM(systemPrompt, userPrompt, true);
  return JSON.parse(result);
}

// ---------------------------------------------------------------------------
// Step 4: Scannability Optimization (Raw text output — no truncation)
// ---------------------------------------------------------------------------
async function step4_scannabilityOptimizer(
  keyword: string,
  articleContent: string
): Promise<string> {
  const systemPrompt = `You are an SEO scannability optimizer. Take the article and apply these optimizations:

1. Ensure all paragraphs are max 2 lines long (break up any longer ones)
2. Ensure H2 headers appear every 200-350 words
3. Add bold emphasis to key phrases, statistics, and important terms
4. Add internal links where relevant using Nobevra URLs:
   - [invoice generator](/features/invoice-generator)
   - [client portal](/features/client-portal)
   - [digital business cards](/features/digital-business-cards)
   - [pricing](/pricing)
   - [blog](/blog)
5. Ensure bullet lists are used for any list of 3+ items
6. Add horizontal rules (---) between major sections for visual separation

CRITICAL: Output the COMPLETE optimized article in full markdown. Do NOT summarize, truncate, or skip any section. The output must contain the ENTIRE article with optimizations applied.

Do NOT wrap the output in JSON. Return raw markdown only.`;

  const userPrompt = `Optimize the following ${countWords(articleContent)}-word article for scannability. Keyword: "${keyword}"

${articleContent}

Output the COMPLETE optimized article. Do not skip any content.`;

  return await callLLM(systemPrompt, userPrompt, false);
}

// ---------------------------------------------------------------------------
// Step 5: Image Injection — Replace placeholders with Pexels URLs
// ---------------------------------------------------------------------------
async function step5_injectImages(
  keyword: string,
  articleContent: string
): Promise<{ content: string; featuredImage: string }> {
  // Count image placeholders
  const placeholderRegex = /!\[([^\]]*)\]\(IMAGE_PLACEHOLDER_(\d+)\)/g;
  const matches = [...articleContent.matchAll(placeholderRegex)];

  if (matches.length === 0) {
    // No placeholders found — fetch a single featured image
    const images = await fetchPexelsImages(keyword, 1);
    return { content: articleContent, featuredImage: images[0] || "" };
  }

  // Fetch enough images for all placeholders + 1 featured
  const searchQueries = matches.map(m => m[1] || keyword);
  const allImages = await fetchPexelsImages(keyword, matches.length + 1);

  let updatedContent = articleContent;
  matches.forEach((match, index) => {
    const imageUrl = allImages[index + 1] || allImages[0] || "";
    updatedContent = updatedContent.replace(match[0], `![${match[1]}](${imageUrl})`);
  });

  return {
    content: updatedContent,
    featuredImage: allImages[0] || "",
  };
}

// ---------------------------------------------------------------------------
// Step 6: Humanization & QA (split into text + scores)
// ---------------------------------------------------------------------------
async function step6_humanize(content: string): Promise<string> {
  const systemPrompt = `You are a content humanizer and quality editor. Apply the following humanization pass:

1. Remove repetitive sentence structures — vary how sentences begin
2. Remove robotic transitions ("Moreover", "Furthermore", "In conclusion", "It's worth noting", "It should be noted", "In the realm of", "Additionally")
3. Add natural sentence variation — mix short punchy sentences with medium explanatory ones
4. Ensure emotional readability — the reader should feel engaged, not lectured
5. Ensure international readability — avoid region-specific idioms, use clear universal English

RULES:
- Do NOT change the meaning or remove any sections
- Do NOT add new content
- Do NOT reduce the word count
- Preserve all markdown formatting, links, and images
- Output the COMPLETE humanized article in full markdown

Return raw markdown only. Do NOT wrap in JSON.`;

  const userPrompt = `Humanize the following article (${countWords(content)} words). Apply all 5 humanization checks.

${content}

Output the COMPLETE humanized article. Do not truncate.`;

  return await callLLM(systemPrompt, userPrompt, false);
}

async function step6b_scoreContent(content: string): Promise<{ seo_score: number; human_score: number }> {
  const systemPrompt = `You are a content quality scorer. Evaluate the article and return scores.

Return JSON:
{
  "seo_score": <0-100 based on keyword density, header structure, internal links, meta optimization, FAQ presence>,
  "human_score": <0-100 based on readability, conversational tone, absence of AI patterns, engagement, sentence variety>
}`;

  const userPrompt = `Score this article:

${content.substring(0, 2000)}...

(${countWords(content)} total words)`;

  const result = await callLLM(systemPrompt, userPrompt, true);
  return JSON.parse(result);
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
function generateSlug(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function countWords(text: string): number {
  return text
    .replace(/[#*\[\]()>_`~|]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

// ---------------------------------------------------------------------------
// MASTER ORCHESTRATOR v2
// ---------------------------------------------------------------------------
async function runPipeline(keywordId: string): Promise<void> {
  console.log(`[SEO Engine v2] Starting pipeline for keyword ID: ${keywordId}`);

  // Reset provider for each pipeline run
  currentProvider = "gemini";

  // 1. Fetch keyword record
  const { data: kw, error: kwError } = await supabaseAdmin
    .from("seo_keywords")
    .select("*")
    .eq("id", keywordId)
    .single();

  if (kwError || !kw) {
    throw new Error(`Keyword not found: ${kwError?.message}`);
  }

  console.log(`[SEO Engine v2] Processing keyword: "${kw.keyword}"`);

  // Update status to processing
  await supabaseAdmin
    .from("seo_keywords")
    .update({ status: "processing" })
    .eq("id", keywordId);

  // 2. Fetch brand voice config
  let brandConfig: any = {};
  try {
    const { data: settings } = await supabaseAdmin
      .from("seo_settings")
      .select("brand_voice_config, auto_publish")
      .limit(1)
      .single();
    brandConfig = settings?.brand_voice_config || {};
  } catch {
    console.warn("[SEO Engine v2] No SEO settings found, using defaults");
  }

  // 3. Execute multi-step pipeline
  try {
    // Step 1: SERP Analysis (16-point extraction)
    console.log("[SEO Engine v2] Step 1: SERP Extraction & Competitive Analysis...");
    const blueprint = await step1_serpAnalysis(kw.keyword);
    const targetWordCount = blueprint.recommended_word_count || 2500;
    console.log(`[SEO Engine v2] Blueprint: ${blueprint.recommended_h2_structure?.length} H2s, target ${targetWordCount} words`);

    // Step 2: Brand Voice Writing (raw text — no truncation)
    console.log("[SEO Engine v2] Step 2: Long-Form Brand Voice Writing...");
    let rawArticle = await step2_brandVoiceWriter(kw.keyword, blueprint, brandConfig);
    console.log(`[SEO Engine v2] Raw article: ${countWords(rawArticle)} words`);

    // Step 2b: Expand if too short
    rawArticle = await step2b_expandIfNeeded(kw.keyword, rawArticle, targetWordCount);
    console.log(`[SEO Engine v2] After expansion: ${countWords(rawArticle)} words`);

    // Step 3: SEO Metadata (JSON — small payload, no truncation risk)
    console.log("[SEO Engine v2] Step 3: SEO Metadata Generation...");
    const metadata = await step3_generateMetadata(kw.keyword, rawArticle);
    console.log(`[SEO Engine v2] Meta title: "${metadata.meta_title}"`);

    // Step 4: Scannability Optimization (raw text — no truncation)
    console.log("[SEO Engine v2] Step 4: Scannability Optimization...");
    const optimizedArticle = await step4_scannabilityOptimizer(kw.keyword, rawArticle);
    console.log(`[SEO Engine v2] Optimized: ${countWords(optimizedArticle)} words`);

    // Step 5: Image Injection
    console.log("[SEO Engine v2] Step 5: Image Matching & Injection...");
    const { content: imageArticle, featuredImage } = await step5_injectImages(kw.keyword, optimizedArticle);
    console.log(`[SEO Engine v2] Featured image: ${featuredImage ? "acquired" : "unavailable"}`);

    // Step 6: Humanization (raw text — no truncation)
    console.log("[SEO Engine v2] Step 6: Humanization Pass...");
    const humanizedArticle = await step6_humanize(imageArticle);
    console.log(`[SEO Engine v2] Humanized: ${countWords(humanizedArticle)} words`);

    // Step 6b: Score content (JSON — tiny payload)
    console.log("[SEO Engine v2] Step 6b: Quality Scoring...");
    const scores = await step6b_scoreContent(humanizedArticle);
    console.log(`[SEO Engine v2] Scores — SEO: ${scores.seo_score}/100, Human: ${scores.human_score}/100`);

    // 4. Determine publish status
    const shouldPublish = brandConfig?.auto_publish !== false;
    const slug = blueprint.recommended_slug || generateSlug(kw.keyword);

    // 5. Combine schema markup
    const combinedSchema = {
      article: metadata.schema_markup || {},
      faq: (metadata as any).faq_schema || {},
    };

    // 6. Save article to database
    const articlePayload = {
      keyword_id: keywordId,
      title: metadata.meta_title || `${kw.keyword} — Complete Guide`,
      slug: slug,
      meta_title: metadata.meta_title,
      meta_description: metadata.meta_description,
      content_markdown: humanizedArticle,
      featured_image_url: featuredImage,
      status: shouldPublish ? "published" : "draft",
      word_count: countWords(humanizedArticle),
      seo_score: scores.seo_score,
      human_score: scores.human_score,
      schema_markup: combinedSchema,
      published_at: shouldPublish ? new Date().toISOString() : null,
    };

    const { error: insertError } = await supabaseAdmin
      .from("seo_articles")
      .upsert(articlePayload, { onConflict: "slug" });

    if (insertError) {
      throw new Error(`Failed to save article: ${insertError.message}`);
    }

    // 7. Update keyword status
    await supabaseAdmin
      .from("seo_keywords")
      .update({ status: "completed" })
      .eq("id", keywordId);

    // 8. Insert initial ranking snapshot
    await supabaseAdmin.from("rankings_tracker").insert({
      keyword_id: keywordId,
      google_rank: 0,
      serps_snapshot_url: null,
      tracked_at: new Date().toISOString(),
    });

    console.log(`[SEO Engine v2] ✅ Pipeline complete for "${kw.keyword}" — ${countWords(humanizedArticle)} words — ${shouldPublish ? "PUBLISHED" : "DRAFTED"} — Provider: ${currentProvider}`);
  } catch (pipelineError) {
    await supabaseAdmin
      .from("seo_keywords")
      .update({ status: "failed" })
      .eq("id", keywordId);

    throw pipelineError;
  }
}

// ---------------------------------------------------------------------------
// HTTP Handler
// ---------------------------------------------------------------------------
serve(async (req) => {
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
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized user" }), {
        status: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["super_admin", "seo_manager"].includes(profile.role)) {
      return new Response(
        JSON.stringify({ error: "Insufficient permissions. Requires super_admin or seo_manager role." }),
        { status: 403, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const { keywordId, mode } = await req.json();

    if (mode === "batch") {
      const { data: pendingKeywords } = await supabaseAdmin
        .from("seo_keywords")
        .select("id")
        .eq("status", "pending")
        .order("created_at", { ascending: true })
        .limit(5);

      if (!pendingKeywords || pendingKeywords.length === 0) {
        return new Response(
          JSON.stringify({ message: "No pending keywords in queue", processed: 0 }),
          { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        );
      }

      const results: any[] = [];
      for (const kw of pendingKeywords) {
        try {
          await runPipeline(kw.id);
          results.push({ id: kw.id, status: "completed" });
        } catch (err) {
          results.push({ id: kw.id, status: "failed", error: String(err) });
        }
      }

      return new Response(
        JSON.stringify({ message: "Batch processing complete", processed: results.length, results }),
        { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    if (!keywordId) {
      return new Response(
        JSON.stringify({ error: "Missing keywordId parameter" }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    await runPipeline(keywordId);

    return new Response(
      JSON.stringify({ success: true, message: `Pipeline completed for keyword ${keywordId}`, provider: currentProvider }),
      { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[SEO Engine v2] Fatal error:", error);
    return new Response(
      JSON.stringify({ error: String(error), message: "Autonomous engine encountered a critical failure." }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
});

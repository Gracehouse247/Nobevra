#!/usr/bin/env node

/**
 * NOBEVRA INTERNAL MANAGEMENT SEO KEYWORD GUARD ENGINE
 * 
 * Exclusively for the Nobevra Internal Management Team.
 * Runs locally on your machine to prevent keyword cannibalization before creating/updating pages.
 * 
 * Usage:
 *   node scripts/seo-keyword-guard.mjs "your target keyword"
 *   npm run seo:guard -- "your target keyword"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_APP_DIR = path.join(ROOT_DIR, 'src', 'app');

// ── MANAGEMENT SEO API KEYS ──────────────────────────────────────────
const SERP_API_KEY = process.env.SERP_API_KEY || 'c355cd7c9ff40a3bce7af5235b2391e71370ec2128242f1e4ff02bdc32b984d3';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '98ff403cdamsh11854c32c1776fbp1237b4jsnff605da4a6a6';
const RAPIDAPI_HOST = process.env.RAPIDAPI_BACKLINK_HOST || 'domain-da-pa-check2.p.rapidapi.com';

// ── 1. TEXT NORMALIZATION & SIMILARITY HELPERS ───────────────────────
function normalize(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function getTokens(str) {
    const stopWords = new Set(['for', 'the', 'a', 'an', 'and', 'in', 'of', 'to', 'with', 'best', 'online']);
    return new Set(
        normalize(str)
            .split(' ')
            .filter(w => w.length > 1 && !stopWords.has(w))
    );
}

function calculateJaccardSimilarity(a, b) {
    const tokensA = getTokens(a);
    const tokensB = getTokens(b);
    if (tokensA.size === 0 || tokensB.size === 0) return 0;
    const intersection = new Set([...tokensA].filter(x => tokensB.has(x)));
    const union = new Set([...tokensA, ...tokensB]);
    return intersection.size / union.size;
}

// ── 2. REPOSITORY SCANNER ─────────────────────────────────────────────
function scanRepositoryForKeywords() {
    const registry = [];
    const visitedFiles = new Set();

    function walk(dir) {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                if (entry.name !== 'node_modules' && entry.name !== '.next') {
                    walk(fullPath);
                }
            } else if (entry.isFile() && (entry.name === 'page.tsx' || entry.name === 'layout.tsx' || entry.name.endsWith('.md'))) {
                if (visitedFiles.has(fullPath)) continue;
                visitedFiles.add(fullPath);

                const content = fs.readFileSync(fullPath, 'utf8');
                const relPath = path.relative(ROOT_DIR, fullPath);

                // Compute route URL
                let routeUrl = relPath
                    .replace(/^src\/app\//, '/')
                    .replace(/\(public\)\//, '')
                    .replace(/\(user\)\//, '')
                    .replace(/\(auth\)\//, '')
                    .replace(/\/page\.(tsx|js|ts)$/, '')
                    .replace(/\/layout\.(tsx|js|ts)$/, '')
                    .replace(/\.md$/, '');
                
                if (routeUrl === '/page' || routeUrl === '') routeUrl = '/';

                const keywords = [];

                // Extract keywords array from metadata
                const keywordsMatch = content.match(/keywords\s*:\s*\[([^\]]+)\]/);
                if (keywordsMatch) {
                    const rawItems = keywordsMatch[1].split(',');
                    for (const item of rawItems) {
                        const clean = item.replace(/['"`\n\r]/g, '').trim();
                        if (clean && clean.length > 2) keywords.push(clean);
                    }
                }

                // Extract title
                const titleMatch = content.match(/title\s*:\s*['"`]([^'"`]+)['"`]/);
                const title = titleMatch ? titleMatch[1] : '';

                // Extract H1
                const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
                const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

                if (keywords.length > 0 || title || h1Text) {
                    registry.push({
                        url: routeUrl,
                        file: relPath,
                        primaryKeyword: keywords[0] || title,
                        keywords: keywords,
                        title: title,
                        h1: h1Text
                    });
                }
            }
        }
    }

    walk(SRC_APP_DIR);
    return registry;
}

// ── 3. SERP API DISCOVERY ─────────────────────────────────────────────
async function fetchSerpAlternatives(keyword, registry) {
    const suggestions = [];

    try {
        const url = `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&engine=google&api_key=${SERP_API_KEY}&gl=us&hl=en`;
        const res = await fetch(url);
        const data = await res.json();

        // 1. Related Searches
        if (data.related_searches && Array.isArray(data.related_searches)) {
            for (const item of data.related_searches) {
                if (item.query && !isKeywordInRegistry(item.query, registry)) {
                    suggestions.push({
                        keyword: item.query,
                        source: 'Google Related Searches',
                        type: 'High Commercial Opportunity'
                    });
                }
            }
        }

        // 2. People Also Ask Questions (Great for supporting H2/H3 or blog topics)
        if (data.related_questions && Array.isArray(data.related_questions)) {
            for (const item of data.related_questions) {
                if (item.question && !isKeywordInRegistry(item.question, registry)) {
                    suggestions.push({
                        keyword: item.question,
                        source: 'Google People Also Ask',
                        type: 'Informational / Problem-Solving'
                    });
                }
            }
        }
    } catch (err) {
        // Intelligent Offline Spoke Topic Generator Fallback
        const modifiers = [
            { suffix: 'for consultants and agencies', intent: 'Vertical Commercial Niche' },
            { suffix: 'automation workflow guide', intent: 'High-Intent Solution Informational' },
            { suffix: 'audit checklist and best practices', intent: 'Educational Authority' },
            { prefix: 'how to choose the best', intent: 'BOFU Comparison' },
            { suffix: 'milestone tracking and client approval', intent: 'Feature Specific Long-Tail' }
        ];

        for (const mod of modifiers) {
            const candidate = mod.prefix
                ? `${mod.prefix} ${keyword}`
                : `${keyword} ${mod.suffix}`;
            
            if (!isKeywordInRegistry(candidate, registry)) {
                suggestions.push({
                    keyword: candidate,
                    source: 'Nobevra Topical Cluster Engine (Local)',
                    type: mod.intent
                });
            }
        }
    }

    return suggestions.slice(0, 5);
}

function isKeywordInRegistry(kw, registry) {
    const norm = normalize(kw);
    return registry.some(r => {
        if (normalize(r.primaryKeyword) === norm) return true;
        return r.keywords.some(k => normalize(k) === norm);
    });
}

// ── 4. MAIN COLLISION DETECTOR ────────────────────────────────────────
async function runKeywordGuard(candidateKeyword) {
    console.log('\n' + '='.repeat(70));
    console.log('  🔒 NOBEVRA INTERNAL MANAGEMENT KEYWORD GUARD ENGINE');
    console.log('='.repeat(70));
    console.log(`🔍 Scanning repository for focus concept: "${candidateKeyword}"...\n`);

    const registry = scanRepositoryForKeywords();
    console.log(`📦 Scanned ${registry.length} active routes and files across the repository.`);

    const normCandidate = normalize(candidateKeyword);
    let collision = null;

    for (const entry of registry) {
        // Tier 1: Exact Match
        if (normalize(entry.primaryKeyword) === normCandidate) {
            collision = {
                tier: 'Tier 1: Exact Match Conflict',
                matchedOn: 'Primary Keyword',
                matchedKeyword: entry.primaryKeyword,
                entry: entry
            };
            break;
        }

        // Check in keywords array
        for (const kw of entry.keywords) {
            if (normalize(kw) === normCandidate) {
                collision = {
                    tier: 'Tier 1: Exact Match in Metadata Keywords',
                    matchedOn: 'Metadata Keywords Array',
                    matchedKeyword: kw,
                    entry: entry
                };
                break;
            }
        }
        if (collision) break;

        // Tier 2: Token / Jaccard Overlap
        const jaccardScore = calculateJaccardSimilarity(candidateKeyword, entry.primaryKeyword);
        if (jaccardScore >= 0.75) {
            collision = {
                tier: `Tier 2: Semantic Token Overlap (${Math.round(jaccardScore * 100)}% match)`,
                matchedOn: 'Primary Concept Stems',
                matchedKeyword: entry.primaryKeyword,
                entry: entry
            };
            break;
        }
    }

    if (!collision) {
        console.log('\n' + '─'.repeat(70));
        console.log(`✅  KEYWORD AVAILABLE: "${candidateKeyword}"`);
        console.log('─'.repeat(70));
        console.log('🎯 Status: No cannibalization conflicts detected across your pages or blog.');
        console.log('🚀 Safe to use as the Primary Focus Keyword for your new page or post.');
        console.log('='.repeat(70) + '\n');
        return;
    }

    // Collision Found
    console.log('\n' + '─'.repeat(70));
    console.log(`🚨  CANNIBALIZATION CONFLICT DETECTED!`);
    console.log('─'.repeat(70));
    console.log(`❌ Candidate Keyword:  "${candidateKeyword}"`);
    console.log(`⚠️  Conflict Reason:    ${collision.tier}`);
    console.log(`📍 Currently Owned By:  ${collision.entry.url} (${collision.entry.file})`);
    console.log(`🔑 Existing Match:      "${collision.matchedKeyword}"`);
    if (collision.entry.title) {
        console.log(`📄 Page Title:          "${collision.entry.title}"`);
    }

    console.log('\n🌐 Querying Google SERP API for non-cannibalized alternative keywords...');
    const alternatives = await fetchSerpAlternatives(candidateKeyword, registry);

    if (alternatives.length > 0) {
        console.log('\n💡 RECOMMENDED UNOWNED ALTERNATIVE SEARCH TERMS (Verified Unique):');
        console.log('─'.repeat(70));
        alternatives.forEach((alt, idx) => {
            console.log(`  ${idx + 1}. "${alt.keyword}"`);
            console.log(`     ├─ Source: ${alt.source}`);
            console.log(`     └─ Intent: ${alt.type}\n`);
        });
        console.log('📌 Management Recommendation:');
        console.log('   Select one of the alternatives above to rank without cannibalizing existing pages.');
    } else {
        console.log('\n💡 Recommendation: Modify the focus concept to target a distinct sub-topic.');
    }
    console.log('='.repeat(70) + '\n');
}

// ── EXECUTE CLI ───────────────────────────────────────────────────────
const args = process.argv.slice(2);
const targetKeyword = args[0];

if (!targetKeyword) {
    console.log('\n❌ Error: Please provide a keyword to check.');
    console.log('👉 Example usage: node scripts/seo-keyword-guard.mjs "online invoicing software"\n');
    process.exit(1);
}

runKeywordGuard(targetKeyword);

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ── MANAGEMENT SEO API KEYS ──────────────────────────────────────────
const SERP_API_KEY = process.env.SERP_API_KEY || 'c355cd7c9ff40a3bce7af5235b2391e71370ec2128242f1e4ff02bdc32b984d3';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '98ff403cdamsh11854c32c1776fbp1237b4jsnff605da4a6a6';

function normalize(str: string): string {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function getTokens(str: string): Set<string> {
    const stopWords = new Set(['for', 'the', 'a', 'an', 'and', 'in', 'of', 'to', 'with', 'best', 'online']);
    return new Set(
        normalize(str)
            .split(' ')
            .filter(w => w.length > 1 && !stopWords.has(w))
    );
}

function calculateJaccardSimilarity(a: string, b: string): number {
    const tokensA = getTokens(a);
    const tokensB = getTokens(b);
    if (tokensA.size === 0 || tokensB.size === 0) return 0;
    const intersection = new Set([...tokensA].filter(x => tokensB.has(x)));
    const union = new Set([...tokensA, ...tokensB]);
    return intersection.size / union.size;
}

function scanRepository() {
    const registry: Array<{
        url: string;
        file: string;
        primaryKeyword: string;
        keywords: string[];
        title: string;
        h1: string;
    }> = [];

    const rootDir = process.cwd();
    const appDir = path.join(rootDir, 'src', 'app');
    const visitedFiles = new Set<string>();

    function walk(dir: string) {
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
                const relPath = path.relative(rootDir, fullPath);

                let routeUrl = relPath
                    .replace(/^src\/app\//, '/')
                    .replace(/\(public\)\//, '')
                    .replace(/\(user\)\//, '')
                    .replace(/\(auth\)\//, '')
                    .replace(/\/page\.(tsx|js|ts)$/, '')
                    .replace(/\/layout\.(tsx|js|ts)$/, '')
                    .replace(/\.md$/, '');
                
                if (routeUrl === '/page' || routeUrl === '') routeUrl = '/';

                const keywords: string[] = [];

                const keywordsMatch = content.match(/keywords\s*:\s*\[([^\]]+)\]/);
                if (keywordsMatch) {
                    const rawItems = keywordsMatch[1].split(',');
                    for (const item of rawItems) {
                        const clean = item.replace(/['"`\n\r]/g, '').trim();
                        if (clean && clean.length > 2) keywords.push(clean);
                    }
                }

                const titleMatch = content.match(/title\s*:\s*['"`]([^'"`]+)['"`]/);
                const title = titleMatch ? titleMatch[1] : '';

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

    walk(appDir);
    return registry;
}

function isKeywordInRegistry(kw: string, registry: any[]): boolean {
    const norm = normalize(kw);
    return registry.some(r => {
        if (normalize(r.primaryKeyword) === norm) return true;
        return r.keywords.some((k: string) => normalize(k) === norm);
    });
}

async function fetchSerpAlternatives(keyword: string, registry: any[]) {
    const suggestions: Array<{ keyword: string; source: string; intent: string }> = [];

    try {
        const url = `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&engine=google&api_key=${SERP_API_KEY}&gl=us&hl=en`;
        const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
        const data = await res.json();

        if (data.related_searches && Array.isArray(data.related_searches)) {
            for (const item of data.related_searches) {
                if (item.query && !isKeywordInRegistry(item.query, registry)) {
                    suggestions.push({
                        keyword: item.query,
                        source: 'Google Related Searches',
                        intent: 'High Commercial Opportunity'
                    });
                }
            }
        }

        if (data.related_questions && Array.isArray(data.related_questions)) {
            for (const item of data.related_questions) {
                if (item.question && !isKeywordInRegistry(item.question, registry)) {
                    suggestions.push({
                        keyword: item.question,
                        source: 'Google People Also Ask',
                        intent: 'Informational / Problem-Solving'
                    });
                }
            }
        }
    } catch (err) {
        // Fallback to local intelligent cluster engine
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
                    intent: mod.intent
                });
            }
        }
    }

    return suggestions.slice(0, 6);
}

export async function POST(request: Request) {
    try {
        const { keyword } = await request.json();

        if (!keyword || typeof keyword !== 'string') {
            return NextResponse.json({ error: 'Please enter a target keyword' }, { status: 400 });
        }

        const registry = scanRepository();
        const normCandidate = normalize(keyword);
        let collision: any = null;

        for (const entry of registry) {
            // Tier 1: Exact Match
            if (normalize(entry.primaryKeyword) === normCandidate) {
                collision = {
                    tier: 'Tier 1: Exact Match Conflict',
                    matchedOn: 'Primary Focus Keyword',
                    matchedKeyword: entry.primaryKeyword,
                    entry: entry
                };
                break;
            }

            // Check metadata keywords
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
            const jaccardScore = calculateJaccardSimilarity(keyword, entry.primaryKeyword);
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
            // Generate clean slug
            const cleanSlug = keyword
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim();

            const titleTemplate = `${keyword
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')} — All-in-One Operations | Nobevra`;

            return NextResponse.json({
                isAvailable: true,
                keyword,
                totalScanned: registry.length,
                generatedSlug: `/${cleanSlug}`,
                generatedTitle: titleTemplate,
                metaDescTemplate: `Explore ${keyword} with Nobevra. Streamline your operations, automate client workflows, and scale your business with zero friction.`
            });
        }

        // Fetch alternatives for collision
        const alternatives = await fetchSerpAlternatives(keyword, registry);

        return NextResponse.json({
            isAvailable: false,
            keyword,
            totalScanned: registry.length,
            collision: {
                tier: collision.tier,
                matchedOn: collision.matchedOn,
                matchedKeyword: collision.matchedKeyword,
                url: collision.entry.url,
                file: collision.entry.file,
                title: collision.entry.title,
            },
            alternatives
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const registry = scanRepository();
        return NextResponse.json({
            total: registry.length,
            routes: registry.map(r => ({
                url: r.url,
                primaryKeyword: r.primaryKeyword,
                title: r.title,
                keywordsCount: r.keywords.length
            }))
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { cur, prev, status_overview } = body;

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY is missing');
            return NextResponse.json({ error: 'AI features are not configured.' }, { status: 500 });
        }

        const prompt = `You are an expert SaaS financial advisor. Analyze this dashboard data and provide exactly 3 concise, highly actionable insights. 
Each insight must be a single sentence.
Format the output as a strict JSON array of objects. Example:
[
  {"type": "good", "text": "Your revenue grew 15% due to higher invoice completion rates."},
  {"type": "warning", "text": "30% of your invoices are currently pending, follow up immediately."},
  {"type": "neutral", "text": "Your average invoice value has remained steady at $150."}
]
Allowed types: "good", "bad", "warning", "neutral".

Data Payload:
Current Period: Total Revenue ${cur.total_revenue}, Total Invoices ${cur.total_invoices}, Active Clients ${cur.active_clients}, Avg Value ${cur.avg_invoice_value}
Previous Period: Total Revenue ${prev.total_revenue}, Total Invoices ${prev.total_invoices}, Active Clients ${prev.active_clients}, Avg Value ${prev.avg_invoice_value}
Status Overview: ${JSON.stringify(status_overview)}
`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.2,
                    responseMimeType: "application/json"
                }
            })
        });

        const data = await response.json();
        
        if (!response.ok || !data.candidates || data.candidates.length === 0) {
            console.error('Gemini API Error:', data);
            return NextResponse.json({ error: 'Failed to generate insights' }, { status: 502 });
        }

        const responseText = data.candidates[0].content.parts[0].text;
        const insights = JSON.parse(responseText);

        return NextResponse.json({ insights });

    } catch (error: any) {
        console.error('AI Insights API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

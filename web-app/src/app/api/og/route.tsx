import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const title = searchParams.get('title') || 'Nobevra Portal';
        const desc = searchParams.get('desc') || 'Secure Digital Billing and Invoicing.';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F0F4F8',
                        fontFamily: 'sans-serif',
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(22, 111, 187, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(22, 111, 187, 0.1) 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            padding: '60px 80px',
                            borderRadius: '40px',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            maxWidth: '900px',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100px',
                                height: '100px',
                                backgroundColor: 'rgba(22, 111, 187, 0.1)',
                                borderRadius: '30px',
                                marginBottom: '40px',
                            }}
                        >
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#166FBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h1
                            style={{
                                fontSize: '64px',
                                fontWeight: 900,
                                color: '#0F172A',
                                margin: '0 0 20px 0',
                                letterSpacing: '-0.05em',
                                lineHeight: 1.1,
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            style={{
                                fontSize: '32px',
                                fontWeight: 500,
                                color: '#64748B',
                                margin: 0,
                                maxWidth: '700px',
                                lineHeight: 1.4,
                            }}
                        >
                            {desc}
                        </p>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.error('OG Image Generation Error:', e);
        return new Response('Failed to generate image', { status: 500 });
    }
}

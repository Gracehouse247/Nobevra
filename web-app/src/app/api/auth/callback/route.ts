import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/dashboard';
  
  // Protect against open redirect
  if (!next.startsWith('/')) {
    next = '/dashboard';
  }

  if (code) {
    const response = NextResponse.redirect(`${origin}${next}`);
      
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value; },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.delete({ name, ...options });
          },
        },
      }
    );
    
    // Exchange code for session (sets auth cookies)
    await supabase.auth.exchangeCodeForSession(code);

    // Industry standard: silent automatic identity linking.
    // If the user just linked Google to an existing email/password account
    // they will now have 2+ identities. Redirect with linked=google so the
    // dashboard can show a "Google linked!" success toast.
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const identities = user?.identities ?? [];
      const hasGoogle = identities.some((i) => i.provider === 'google');
      const hasEmail  = identities.some((i) => i.provider === 'email');
      if (hasGoogle && hasEmail) {
        return NextResponse.redirect(`${origin}/dashboard?linked=google`, { headers: response.headers });
      }
    } catch {
      // Non-critical — swallow and proceed
    }

    return response;
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate`);
}

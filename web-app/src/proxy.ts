import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getCurrencyForCountry } from '@/lib/geo/countryToCurrency'

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // ── Custom Domain White-Label Logic ──────────────────────────────────────
  const isAppDomain = 
      hostname.includes('localhost') || 
      hostname.includes('noblesworld.com.ng') ||
      hostname.includes('nobevra.noblesworld.com.ng') ||
      hostname.includes('.vercel.app');

  if (!isAppDomain) {
      if (url.pathname === '/') {
          return NextResponse.rewrite(new URL(`/custom-domain-proxy?domain=${hostname}`, request.url));
      } else if (url.pathname.startsWith('/invoice/')) {
          const invoiceId = url.pathname.replace('/invoice/', '');
          return NextResponse.rewrite(new URL(`/embed/invoice/${invoiceId}?domain=${hostname}`, request.url));
      } else if (url.pathname.startsWith('/contract/')) {
          const contractId = url.pathname.replace('/contract/', '');
          return NextResponse.rewrite(new URL(`/embed/contract/${contractId}?domain=${hostname}`, request.url));
      }
  }

  // ── Geo-detection: Read Vercel's free edge header (zero API cost) ──────────
  // This header is injected automatically by Vercel on production deployments.
  // In local dev it won't be present — the CurrencyContext falls back to /api/geo
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  const alreadyHasGeo = request.cookies.has('ni_detected_country');

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Set geo cookie once per session if we have a Vercel country header
  if (vercelCountry && !alreadyHasGeo) {
    const detectedCurrency = getCurrencyForCountry(vercelCountry);
    response.cookies.set('ni_detected_country', vercelCountry, {
      path: '/',
      maxAge: 86400, // 24h
      sameSite: 'lax',
    });
    response.cookies.set('ni_detected_currency', detectedCurrency, {
      path: '/',
      maxAge: 86400,
      sameSite: 'lax',
    });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // ── Admin Routes ──────────────────────────────────────────────
  const isAdminLogin = pathname === '/admin/login'
  const isAdminRoute = pathname.startsWith('/admin') && !isAdminLogin

  // If user is logged in and visits /admin/login, check if they're an admin
  // If user is logged in and visits /admin/login, we'll let the page load
  // If they are an admin, the client-side logic in admin/login/page.tsx or layout.tsx will redirect them.
  if (isAdminLogin && user) {
    return response;
  }

  // Protected admin routes — require authentication
  // The actual subscription_tier === 'admin' check is handled securely by
  // the client-side admin/layout.tsx to avoid Edge runtime RLS issues.
  if (isAdminRoute) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/admin/login';
      return NextResponse.redirect(redirectUrl);
    }
    // User is authenticated, allow through (layout.tsx will verify admin role)
    return response;
  }

  // ── User Routes ───────────────────────────────────────────────
  const protectedRoutes = [
    '/dashboard', '/invoices', '/clients', '/products', '/expenses', 
    '/networking', '/upgrade', '/wallet', '/settings', 
    '/qr-generator', '/studio', '/enterprise', '/support',
    '/pro', '/embed/business-card', '/reports'
  ]
  const authRoutes = ['/login', '/register']

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    const redirectResponse = NextResponse.redirect(redirectUrl)
    // Forward cookies set by Supabase (e.g. cleared sessions)
    response.cookies.getAll().forEach(cookie => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    return redirectResponse
  }

  // Check onboarding status for protected routes
  if (isProtectedRoute && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single()

    if (!profile?.onboarding_completed) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/register'
      return NextResponse.redirect(redirectUrl)
    }
  }

  if (isAuthRoute && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single()

    // If they completed onboarding, send to dashboard. Otherwise, let them stay on register/login to complete it.
    if (profile?.onboarding_completed) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/dashboard'
        const redirectResponse = NextResponse.redirect(redirectUrl)
        response.cookies.getAll().forEach(cookie => {
          redirectResponse.cookies.set(cookie.name, cookie.value)
        })
        return redirectResponse
    } else if (pathname === '/login') {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/register'
        return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|svg|fonts).*)',
  ],
}

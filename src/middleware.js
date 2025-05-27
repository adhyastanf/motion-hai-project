import { NextResponse } from 'next/server';
import { authClient } from './lib/client/auth-client';

export async function middleware(request) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  });
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)', '/dashboard/:path*'],
};

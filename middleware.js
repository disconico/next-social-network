import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!req.url.includes('/app')) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = '/';

  if (!session) return NextResponse.redirect(url);

  return NextResponse.next();
}

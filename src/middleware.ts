import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

let cachedEncodedSecret: Uint8Array | null = null;

function getEncodedSecret(): Uint8Array {
  if (!cachedEncodedSecret) {
    cachedEncodedSecret = new TextEncoder().encode(process.env.JWT_SECRET!);
  }
  return cachedEncodedSecret;
}

const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  try {
    await jwtVerify(token, getEncodedSecret(), {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}

export const config = {
  matcher: ['/cart/:path*', '/order-list/:path*', '/user/:path*', '/private/:path*'],
};

import { NextRequest, NextResponse } from "next/server";

// Lightweight middleware: check for next-auth session cookie only.
// Full JWT verification happens in Server Components via auth() from @/auth.
export function middleware(req: NextRequest) {
  const sessionToken =
    req.cookies.get("next-auth.session-token") ??
    req.cookies.get("__Secure-next-auth.session-token");

  if (!sessionToken) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/((?!login).*)"],
};

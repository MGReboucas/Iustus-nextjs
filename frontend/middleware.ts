import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase();
  const client = process.env.IUSTUS_CLIENT_ORIGIN;
  const team = process.env.IUSTUS_TEAM_ORIGIN;
  const path = request.nextUrl.pathname;
  const expected = path.startsWith("/cliente") ? client : path.startsWith("/advogado") ? team : null;
  if (expected && host !== new URL(expected).host.toLowerCase()) {
    return new NextResponse("Esta área não está disponível neste portal.", { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, private");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}

export const config = { matcher: ["/acessar", "/cliente/:path*", "/advogado/:path*"] };

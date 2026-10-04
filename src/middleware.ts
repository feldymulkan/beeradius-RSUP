// middleware.ts

import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

// ─── Middleware utama ─────────────────────────────────────────────────────────
export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // [1] /api/auth/* → selalu publik (dibutuhkan oleh NextAuth untuk login/callback/session)
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // [2] Semua /api/* lainnya → wajib terautentikasi, kembalikan 401 JSON jika tidak
  if (pathname.startsWith("/api/")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized: Anda harus login untuk mengakses endpoint ini.",
        },
        { status: 401 }
      );
    }

    // Token valid → lanjutkan ke handler
    return NextResponse.next();
  }

  // [3] Halaman UI (non-API) → gunakan withAuth bawaan NextAuth (redirect ke /login)
  return withAuthMiddleware(req as any, event);
}

// Helper: jalankan withAuth untuk route halaman UI
const withAuthMiddleware = withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSuccess(_req) {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

// ─── Matcher ──────────────────────────────────────────────────────────────────
export const config = {
  matcher: [
    /*
     * Jalankan middleware pada semua path KECUALI:
     * - _next/static  (file statis Next.js)
     * - _next/image   (optimasi gambar Next.js)
     * - favicon.ico   (ikon browser)
     * - login         (halaman login — dikecualikan agar tidak loop redirect)
     * - file statis publik (png, jpg, svg, dll)
     *
     * CATATAN: /api/* sengaja TIDAK dikecualikan — middleware ini
     * yang menangani autentikasi API secara eksplisit.
     */
    "/((?!_next/static|_next/image|favicon.ico|login|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf|css|js)$).*)",
  ],
};
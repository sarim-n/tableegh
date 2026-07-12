import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import { NextResponse } from "next/server";
const intlMiddleware = createMiddleware(routing);

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. Let intlMiddleware handle locale redirections first
  const response = intlMiddleware(request);

  // If the request is a redirect from next-intl, return it immediately
  if (response.status === 307 || response.status === 308) {
    return response;
  }

  // 2. Check for protected admin paths
  // Pathname pattern: /en/admin/dashboard, /ur/admin/events etc.
  const isAdminPath = /\/(en|ur)\/admin(\/|$)/.test(pathname);
  const isLoginPath = /\/(en|ur)\/admin\/login/.test(pathname);

  if (isAdminPath && !isLoginPath) {
    const token = request.cookies.get("admin_token");

    if (!token) {
      // Redirect to localized login page
      const locale = pathname.split("/")[1] || "en";
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/", "/(en|ur)/:path*", "/admin/:path*"],
};

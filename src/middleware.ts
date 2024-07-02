import { type NextRequest, NextResponse } from "next/server";
import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from "./lib/constants";

const isProtectedRoute = (pathname: string) => {
  return pathname.startsWith("/movies/") || pathname.startsWith("/tv/");
};

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";

  if (!session && isProtectedRoute(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    absoluteURL.searchParams.set(
      "message",
      "You need to login to access this page"
    );
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (session && request.nextUrl.pathname === ROOT_ROUTE) {
    const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  return NextResponse.next();
}

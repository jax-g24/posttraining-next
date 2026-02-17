import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  if (hostname === "course.posttraining.ai" && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/syllabus", request.url), 307);
  }
}

export const config = {
  matcher: "/",
};

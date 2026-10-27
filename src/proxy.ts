import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.nextUrl.searchParams.has("fbclid")) {
    return NextResponse.next();
  }

  const cleanUrl = request.nextUrl.clone();
  cleanUrl.searchParams.delete("fbclid");
  return NextResponse.redirect(cleanUrl);
}

export const config = {
  matcher: "/",
};

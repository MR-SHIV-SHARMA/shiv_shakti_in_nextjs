import { NextResponse } from "next/server";

export function middleware(req) {
  const city = req.geo?.city || "Unknown";
  if (city !== "Jaipur") {
    return NextResponse.redirect("https://www.shivshaktiss.in/not-available");
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};

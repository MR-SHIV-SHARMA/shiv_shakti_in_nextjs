import { NextResponse } from "next/server";

export async function GET(req) {
  const city = req.geo?.city || "Unknown";

  if (city !== "Jaipur") {
    return new NextResponse(
      JSON.stringify({ error: "Access restricted to Jaipur users only." }),
      { status: 403 }
    );
  }
  return new NextResponse(JSON.stringify({ success: "Welcome, Jaipur User!" }));
}

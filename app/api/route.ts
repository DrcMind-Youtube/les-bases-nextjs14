import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    welcome: "Bienvenue sur notre API",
  });
}

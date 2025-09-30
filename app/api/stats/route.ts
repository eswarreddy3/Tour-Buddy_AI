import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    itineraries: 12450,
    destinations: 320,
    travelers: "50k+",
  })
}

import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json([
    { id: "t1", author: "Aarav S.", quote: "TourBuddy AI planned the perfect weekend for us!" },
    { id: "t2", author: "Meera K.", quote: "Loved the personalized suggestions and easy navigation." },
  ])
}

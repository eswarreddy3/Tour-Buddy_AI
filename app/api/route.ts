import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET() {
  try {
    const db = getDB()
    const [rows] = await db.query(
      `SELECT state_id AS id, state_name AS name, capital_city AS capital, state_hero_image_url AS image 
       FROM states`
    )

    return NextResponse.json(rows)
  } catch (err) {
    console.error("DB error:", err)
    return NextResponse.json({ error: "Failed to fetch states" }, { status: 500 })
  }
}

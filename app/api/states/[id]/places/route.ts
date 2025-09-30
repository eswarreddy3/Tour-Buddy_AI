import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDB()

    // Fetch places for a given state_id
    const [rows] = await db.query(
      `SELECT 
         place_id AS id,
         place_name AS name,
         place_hero_image_url AS image,
         place_specialty AS highlight,
         category
       FROM places
       WHERE state_id = ?`,
      [params.id]
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error("DB Error:", error)
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDB()

    // fetch one place by id
    const [rows] = await db.query(
      `SELECT 
        place_id AS id,
        place_name AS name,
        place_hero_image_url AS image,
        category,
        place_overview AS description,
        place_specialty AS speciality,
        best_time_text AS bestTime,
        latitude,
        longitude
       FROM places
       WHERE place_id = ?`, 
      [params.id]
    )

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (err) {
    console.error("DB error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

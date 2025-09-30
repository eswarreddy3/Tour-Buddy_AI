import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDB()

    // Fetch all seasonal costs for a place by place_id
    const [rows] = await db.query(
      `SELECT 
        cost_id,
        place_id,
        season_tag AS season,
        stay_per_night_band AS stayPerNight,
        food_per_day_band AS foodPerDay,
        local_transport_per_day AS localTransport,
        activities_per_day AS activities,
        total_per_day_band AS totalPerDay,
        cost_notes AS notes,
        sources_info AS sources,
        last_verified_on AS lastVerified
       FROM place_costs
       WHERE place_id = ?`,
      [params.id]
    )

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ message: "No cost data found" }, { status: 404 })
    }

    // ✅ Parse sources_info safely
    const result = rows.map((row: any) => ({
      ...row,
      sources: (() => {
        try {
          return typeof row.sources === "string" ? JSON.parse(row.sources) : row.sources
        } catch {
          return []
        }
      })(),
    }))

    return NextResponse.json(result)
  } catch (err) {
    console.error("DB error:", err)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

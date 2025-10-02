import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDB()
    const [rows] = await db.query(
      `SELECT state_id AS id, state_name AS name, capital_city AS capital, state_hero_image_url AS image
       FROM states
       WHERE state_id = ?`,
      [params.id]  // use the id from URL
    ) as [any[], any]; // Type assertion to treat rows as an array

    if (!rows || (Array.isArray(rows) && rows.length === 0)) {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    return NextResponse.json(Array.isArray(rows) ? rows[0] : rows)
  } catch (err) {
    console.error("DB error:", err)
    return NextResponse.json({ error: "Failed to fetch state" }, { status: 500 })
  }
}

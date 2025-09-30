import { NextResponse } from "next/server"

const DB: Record<string, any> = {
  "st-1": { id: "st-1", name: "Kerala", capital: "Thiruvananthapuram" },
  "st-2": { id: "st-2", name: "Andhra Pradesh", capital: "Amaravati" },
  "st-3": { id: "st-3", name: "Tamilnadu", capital: "Chennai" },
  "st-4": { id: "st-3", name: "Goa", capital: "Panaji" },
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const data = DB[params.id]
  if (!data) return NextResponse.json({ message: "Not found" }, { status: 404 })
  return NextResponse.json(data)
}

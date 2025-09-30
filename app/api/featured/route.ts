import { NextResponse } from "next/server"

export async function GET() {
  const data = [
    {
      id: "place-1",
      name: "Valley Vista",
      image: "/valley.jpg",
      highlight: "Sunrise points",
      category: "Nature",
    },
    {
      id: "place-2",
      name: "Fort Heritage",
      image: "/fort.jpg",
      highlight: "Ancient walls",
      category: "Heritage",
    },
    {
      id: "place-3",
      name: "Coastal Breeze",
      image: "/tropical-beach-paradise.png",
      highlight: "Golden sands",
      category: "Adventure",
    },
  ]
  return NextResponse.json(data)
}

// lib/weatherFetcher.ts
export async function weatherFetcher([lat, lon]: [number, number]) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}`
  )
  if (!res.ok) throw new Error("Failed to fetch weather")
  return res.json()
}

"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { weatherFetcher } from "@/lib/weatherFetcher"
import PlaceCosts from "@/components/place-costs"

export default function PlacePage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useSWR(id ? `/api/places/${id}` : null, fetcher)

  // fetch weather using lat/lon from DB
  const { data: weather } = useSWR(
    data?.latitude && data?.longitude ? [data.latitude, data.longitude] : null,
    weatherFetcher
  )

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-sm text-destructive">Failed to load.</p>
      </div>
    )
  }
  if (!data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-sm text-muted-foreground">Not found.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-0 md:px-4 pb-10">
      <div className="relative w-full">
        <img
          src={data.image || "/placeholder.svg?height=320&width=1200&query=place%20hero"}
          alt={data.name}
          className="h-[320px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          {data.category ? <p className="text-sm opacity-90">{data.category}</p> : null}
        </div>
      </div>

      <div className="px-4 mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <section className="rounded-lg border border-border p-4 bg-card">
            <h2 className="font-semibold mb-2">About</h2>
            <p className="text-sm text-muted-foreground">{data.description ?? "Coming soon"}</p>
          </section>

          <section className="rounded-lg border border-border p-4 bg-card">
            <h2 className="font-semibold mb-2">Speciality</h2>
            <p className="text-sm text-muted-foreground">{data.speciality ?? "Coming soon"}</p>
          </section>

          <section className="rounded-lg border border-border p-4 bg-card">
            <h2 className="font-semibold mb-2">Best Time to Visit</h2>
            <p className="text-sm text-muted-foreground">{data.bestTime ?? "Coming soon"}</p>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-lg border border-border p-4 bg-card text-sm">
            {weather ? (
              <div className="flex items-center gap-4">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-16 h-16"
                />
                <div>
                  <p className="font-semibold text-lg">{weather.main.temp}°C</p>
                  <p className="capitalize">{weather.weather[0].description}</p>
                  <p className="text-xs text-muted-foreground">
                    Feels like {weather.main.feels_like}°C • Humidity {weather.main.humidity}%
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Loading weather...</p>
            )}
          </section>

          <PlaceCosts placeId={id} />

          {/* <section className="rounded-lg border border-dashed border-border p-4 bg-card text-sm text-muted-foreground">
            Map embed: Coming soon
          </section> */}
          {/* <section className="rounded-lg border border-dashed border-border p-4 bg-card text-sm text-muted-foreground">
            Festivals list: Coming soon
          </section> */}

          <div className="flex gap-2">
            <Button className="flex-1" variant="default">
              AI Voice Guide
            </Button>
            {/* <Button className="flex-1 bg-transparent" variant="outline">
              Favorite
            </Button> */}
          </div>
        </aside>
      </div>
    </div>
  )
}

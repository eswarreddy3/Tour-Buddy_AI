"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { PlaceCard } from "@/components/place-card"

export function PopularDestinations() {
  const { data, isLoading, error } = useSWR("/api/featured", fetcher)

  return (
    <section aria-labelledby="popular">
      <h2 id="popular" className="text-xl font-semibold mb-4">
        Popular Destinations
      </h2>
      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {error && <p className="text-sm text-destructive">Failed to load.</p>}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.isArray(data) &&
          data.map((p: any) => (
            <PlaceCard
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image}
              highlight={p.highlight}
              category={p.category}
            />
          ))}
      </div>
    </section>
  )
}

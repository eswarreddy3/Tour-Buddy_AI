"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"

export function StatsSection() {
  const { data, isLoading, error } = useSWR("/api/stats", fetcher)
  return (
    <section aria-labelledby="stats" className="rounded-lg border border-border p-6 bg-card">
      <h2 id="stats" className="text-xl font-semibold mb-4">
        Our Impact
      </h2>
      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {error && <p className="text-sm text-destructive">Failed to load.</p>}
      {data && (
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Itineraries Generated" value={data.itineraries ?? "—"} />
          <Stat label="Destinations Covered" value={data.destinations ?? "—"} />
          <Stat label="Happy Travelers" value={data.travelers ?? "—"} />
        </div>
      )}
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  )
}

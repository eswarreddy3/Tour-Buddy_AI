"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { useSearchParams } from "next/navigation"
import { StateCard } from "@/components/state-card"
import { SearchBar } from "@/components/search-bar"

export default function AllStatesPage() {
  const { data, isLoading, error } = useSWR("/api", fetcher)
  const params = useSearchParams()
  const q = (params.get("q") || "").toLowerCase()

  const filtered = Array.isArray(data)
    ? data.filter((s: any) => {
        const hay = `${s.name} ${s.capital}`.toLowerCase()
        return q ? hay.includes(q) : true
      })
    : []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      {/* <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">All States</h1>
        <SearchBar placeholder="Filter states..." />
      </div>

      <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
        Interactive India Map: Coming soon
      </div> */}

      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {error && <p className="text-sm text-destructive">Failed to load states.</p>}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((s: any) => (
          <StateCard key={s.id} id={s.id} name={s.name} image={s.image} capital={s.capital} />
        ))}
      </div>
    </div>
  )
}

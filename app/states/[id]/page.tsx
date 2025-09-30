"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { PlaceCard } from "@/components/place-card"
import { useMemo } from "react"
import { Button } from "@/components/ui/button"

const CATEGORIES = ["Adventure", "Culture", "Historical", "Nature", "Heritage", "Food", "Religious"]

export default function StatePage() {
  const { id } = useParams<{ id: string }>()
  const { data: state, isLoading: loadingState } = useSWR(id ? `/api/states/${id}` : null, fetcher)
  const { data: places, isLoading: loadingPlaces } = useSWR(id ? `/api/states/${id}/places` : null, fetcher)
  const params = useSearchParams()
  const router = useRouter()
  const active = params.get("category") || ""

  const filtered = useMemo(() => {
    if (!Array.isArray(places)) return []
    return active ? places.filter((p: any) => p.category === active) : places
  }, [places, active])

  const setCategory = (cat: string) => {
    const next = new URLSearchParams(params.toString())
    if (cat) next.set("category", cat)
    else next.delete("category")
    router.replace(`?${next.toString()}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      {loadingState ? (
        <div className="h-40 rounded-lg bg-muted animate-pulse" aria-busy />
      ) : state ? (
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold">{state.name}</h1>
          <p className="text-sm text-muted-foreground">Capital: {state.capital ?? "—"}</p>
        </header>
      ) : (
        <p className="text-sm text-muted-foreground"></p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant={active === "" ? "default" : "outline"} size="sm" onClick={() => setCategory("")}>
          All
        </Button>
        {CATEGORIES.map((c) => (
          <Button key={c} variant={active === c ? "default" : "outline"} size="sm" onClick={() => setCategory(c)}>
            {c}
          </Button>
        ))}
      </div>

      {loadingPlaces && <p className="text-sm text-muted-foreground">Loading places...</p>}

      {/* empty state: show a big "Coming soon" with icon */}
      {!loadingPlaces && Array.isArray(filtered) && filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          {/* Simple location / map pin icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a3 3 0 100-6 3 3 0 000 6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s8-4.5 8-10.5A8 8 0 004 10.5C4 16.5 12 21 12 21z" />
          </svg>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight">Coming soon</h2>
          <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
            We’re adding great places to this state. Check back later or try another category.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.isArray(filtered) &&
            filtered.map((p: any) => (
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
      )}
    </div>
  )
}

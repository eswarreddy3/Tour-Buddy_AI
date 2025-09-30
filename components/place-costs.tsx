"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface PlaceCost {
  cost_id: number
  season: string
  stayPerNight: string
  foodPerDay: string
  localTransport: string
  activities: string
  totalPerDay: string
  notes: string
  sources: { title: string; link: string }[]
  lastVerified: string
}

export default function PlaceCosts({ placeId }: { placeId: string }) {
  const { data, isLoading, error } = useSWR<PlaceCost[]>(
    placeId ? `/api/place_costs/${placeId}` : null,
    fetcher
  )

  if (isLoading) {
    return (
      <section className="rounded-lg border border-border p-4 bg-card">
        <h2 className="font-semibold mb-2">Estimated Costs</h2>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section className="rounded-lg border border-border p-4 bg-card">
        <h2 className="font-semibold mb-2">Estimated Costs</h2>
        <p className="text-sm text-destructive">Failed to load.</p>
      </section>
    )
  }

  return (
    <section className="rounded-lg border border-border p-4 bg-card">
      <h2 className="font-semibold mb-4">Estimated Costs</h2>

      <Tabs defaultValue={data[0]?.season} className="w-full">
        <TabsList className="grid grid-cols-3">
          {data.map((row) => (
            <TabsTrigger key={row.cost_id} value={row.season}>
              {row.season}
            </TabsTrigger>
          ))}
        </TabsList>

        {data.map((row) => (
          <TabsContent key={row.cost_id} value={row.season}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>🏨 Stay / Night</span>
                <span className="font-medium">{row.stayPerNight}</span>
              </div>
              <div className="flex justify-between">
                <span>🍲 Food / Day</span>
                <span className="font-medium">{row.foodPerDay}</span>
              </div>
              <div className="flex justify-between">
                <span>🚖 Local Transport</span>
                <span className="font-medium">{row.localTransport}</span>
              </div>
              <div className="flex justify-between">
                <span>🎟️ Activities</span>
                <span className="font-medium">{row.activities}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold">
                <span>Total / Day</span>
                <span>{row.totalPerDay}</span>
              </div>
            </div>

            {row.notes && (
              <p className="mt-3 text-xs text-muted-foreground italic">💡 {row.notes}</p>
            )}

            {row.sources?.length > 0 && (
              <div className="mt-3 text-xs">
                Sources:{" "}
                {row.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary mr-2"
                  >
                    {src.title}
                  </a>
                ))}
              </div>
            )}

            <p className="mt-1 text-[11px] text-muted-foreground">
              Verified on {new Date(row.lastVerified).toLocaleDateString()}
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

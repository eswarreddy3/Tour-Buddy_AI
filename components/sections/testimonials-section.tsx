"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"

export function TestimonialsSection() {
  const { data, isLoading, error } = useSWR("/api/testimonials", fetcher)
  return (
    <section aria-labelledby="testimonials">
      <h2 id="testimonials" className="text-xl font-semibold mb-4">
        What Travelers Say
      </h2>
      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {error && <p className="text-sm text-destructive">Failed to load.</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {Array.isArray(data) &&
          data.map((t: any) => (
            <blockquote key={t.id} className="rounded-lg border border-border p-4 bg-card">
              <p className="text-pretty">“{t.quote}”</p>
              <footer className="mt-2 text-sm text-muted-foreground">— {t.author}</footer>
            </blockquote>
          ))}
      </div>
    </section>
  )
}

import { HeroSlider } from "@/components/hero-slider"
import { FeatureCard } from "@/components/feature-card"
import { PopularDestinations } from "@/components/sections/popular-destinations"
import { StatsSection } from "@/components/sections/stats-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-10">
      <HeroSlider />

      {/* Features (static product features OK) */}
      <section aria-labelledby="features">
        <h2 id="features" className="text-xl font-semibold mb-4">
          Why TourBuddy AI
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            title="AI Trip Plans"
            description="Personalized itineraries based on your interests."
            icon="/abstract-ai-network.png"
          />
          <FeatureCard
            title="Smart Search"
            description="Find places by category, vibe, and season."
            icon="/search-icon.png"
          />
          <FeatureCard
            title="Offline Ready"
            description="Save favorites and access plans on the go."
            icon="/offline-sign.png"
          />
        </div>
      </section>

      {/* <PopularDestinations /> */}

      <StatsSection />

      <TestimonialsSection />

      <div className="text-center">
        <Link href="/states">
          <Button size="lg">Explore States</Button>
        </Link>
      </div>
    </div>
  )
}

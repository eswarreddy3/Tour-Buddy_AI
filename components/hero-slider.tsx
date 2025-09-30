"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button" // Named export
import { ChevronRight } from "lucide-react"

const heroImages = [
  { url: "/taj-mahal-at-sunrise-with-golden-light.jpg", alt: "Taj Mahal at sunrise" },
  { url: "/kerala-backwaters-with-traditional-houseboat.jpg", alt: "Kerala Backwaters" },
  { url: "/rajasthan-desert-with-camel-caravan-at-sunset.jpg", alt: "Rajasthan Desert" },
  { url: "/himalayan-mountains-with-snow-peaks-and-valley.jpg", alt: "Himalayan Mountains" },
]

export function HeroSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1))
    }, 4000) // Rotate every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Text Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
          TourBuddy AI
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl mb-8 font-light text-balance">
          AI That Plans, You Just Explore
        </p>
        <p className="text-lg sm:text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Your one-stop travel planning companion with AI-powered personalized itineraries, budget optimization, and
          multilingual voice assistance for seamless adventures.
        </p>

        <Link href="/states">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Explore States
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

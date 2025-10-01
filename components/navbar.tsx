"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DarkModeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [lang, setLang] = useState<"EN" | "HI">("EN")
  const [q, setQ] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("tb_lang") : null
    if (saved === "HI" || saved === "EN") setLang(saved)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("tb_lang", lang)
  }, [lang])

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    router.push(`/states?${params.toString()}`)
    setIsOpen(false) // close menu after search
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-pretty">TourBuddy AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="ml-6 hidden md:flex items-center gap-4">
          <Link
            href="/"
            className={`text-sm ${pathname === "/" ? "font-semibold" : "text-muted-foreground hover:text-foreground"}`}
          >
            Home
          </Link>
          <Link
            href="/states"
            className={`text-sm ${pathname?.startsWith("/states") ? "font-semibold" : "text-muted-foreground hover:text-foreground"}`}
          >
            States
          </Link>
          <Link
            href="/ai-planner"
            className={`text-sm ${pathname?.startsWith("/ai-planner") ? "font-semibold" : "text-muted-foreground hover:text-foreground"}`}
          >
            AI Trip Planner
          </Link>
        </nav>

        {/* Desktop Search */}
        <form onSubmit={onSearch} className="ml-auto hidden md:flex items-center gap-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search states or places"
            aria-label="Search"
            className="w-64"
          />
          <Button type="submit" variant="default">
            Search
          </Button>
        </form>

        {/* Desktop Actions */}
        <div className="ml-auto md:ml-2 hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
            aria-label="Toggle language"
            title="Toggle language"
          >
            {lang}
          </Button>
          <DarkModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="ml-auto md:hidden">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
              aria-label="Toggle language"
              title="Toggle language"
            >
              {lang}
            </Button>
            
            <DarkModeToggle />

            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-3">
          <Link
            href="/"
            className="block text-sm text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/states"
            className="block text-sm text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            States
          </Link>
          <Link
            href="/ai-planner"
            className="block text-sm text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            AI Trip Planner
          </Link>

          {/* <form onSubmit={onSearch} className="flex items-center gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search states or places"
              aria-label="Search"
              className="flex-1"
            />
            <Button type="submit" size="sm">Go</Button>
          </form> */}

          
        </div>
      )}
    </header>
  )
}

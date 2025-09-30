"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar({ placeholder = "Search", className = "" }: { placeholder?: string; className?: string }) {
  const router = useRouter()
  const params = useSearchParams()
  const [q, setQ] = useState("")

  useEffect(() => {
    setQ(params.get("q") ?? "")
  }, [params])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = new URLSearchParams(Array.from(params.entries()))
    if (q) next.set("q", q)
    else next.delete("q")
    router.push(`/states?${next.toString()}`)
  }

  return (
    <form onSubmit={onSubmit} className={`flex items-center gap-2 ${className}`}>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} />
      <Button type="submit">Search</Button>
    </form>
  )
}

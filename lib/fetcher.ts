export async function fetcher(input: string | URL, init?: RequestInit) {
  const res = await fetch(input, { ...init, next: { revalidate: 0 } })
  if (!res.ok) throw new Error("Network response was not ok")
  return res.json()
}

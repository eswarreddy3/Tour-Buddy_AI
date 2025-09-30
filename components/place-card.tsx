import Link from "next/link"

export type PlaceCardProps = {
  id: string
  name: string
  image: string
  highlight?: string
  category?: string
}
export function PlaceCard({ id, name, image, highlight, category }: PlaceCardProps) {
  return (
    <Link
      href={`/places/${id}`}
      className="group rounded-lg border border-border overflow-hidden bg-card hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={image || "/placeholder.svg?height=180&width=320&query=place%20image"}
          alt={`${name} preview`}
          className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{name}</h3>
          {category ? (
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{category}</span>
          ) : null}
        </div>
        {highlight ? <p className="text-sm text-muted-foreground mt-1">{highlight}</p> : null}
      </div>
    </Link>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export type StateCardProps = {
  id: string
  name: string
  image: string
  description?: string
  capital?: string
}

export function StateCard({ id, name, image, description, capital }: StateCardProps) {
  return (
    <Link href={`/states/${id}`} className="group">
      <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm hover:shadow-2xl transition-all duration-400 ease-in-out transform hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={`${name} preview`}
            className="w-full h-52 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <h3 className="text-xl font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          {capital && <p className="text-sm text-muted-foreground mb-1">Capital: {capital}</p>}
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 text-pretty">
              {description}
            </p>
          )}
          <Button
            variant="outline"
            size="sm"
            className="w-full border-primary text-primary transition-all duration-300
              group-hover:bg-primary group-hover:text-primary-foreground dark:group-hover:bg-primary dark:group-hover:text-primary-foreground"
          >
            Explore
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </Link>
  )
}

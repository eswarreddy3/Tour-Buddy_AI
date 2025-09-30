type Props = {
  title: string
  description: string
  icon?: string
}
export function FeatureCard({ title, description, icon }: Props) {
  return (
    <div className="rounded-lg border border-border p-4 bg-card">
      <div className="flex items-start gap-3">
        <img
          src={icon || "/placeholder.svg?height=32&width=32&query=feature%20icon"}
          alt=""
          className="size-8"
          aria-hidden="true"
        />
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}

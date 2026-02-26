import { MapPin, FileText, Users, ShieldCheck } from "lucide-react"

const stats = [
  { label: "Reports Filed", value: "2,847", icon: FileText },
  { label: "Areas Cleaned", value: "1,523", icon: ShieldCheck },
  { label: "Districts Covered", value: "142", icon: MapPin },
  { label: "Active Officers", value: "389", icon: Users },
]

export function StatsSection() {
  return (
    <section className="border-t border-border bg-primary py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10">
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <p
                className="mt-4 text-3xl font-bold text-primary-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-primary-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Bug, Droplets, AlertTriangle } from "lucide-react"

const diseases = [
  {
    name: "Dengue",
    icon: Bug,
    description: "Spread by Aedes mosquitoes breeding in stagnant water. Over 100 million infections annually worldwide.",
  },
  {
    name: "Malaria",
    icon: Droplets,
    description: "Caused by Plasmodium parasites transmitted through Anopheles mosquitoes found near stagnant water sources.",
  },
  {
    name: "Cholera",
    icon: AlertTriangle,
    description: "Waterborne disease linked to contaminated stagnant water. Can cause severe dehydration and is potentially fatal.",
  },
]

export function ProblemSection() {
  return (
    <section className="border-t border-border bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Silent Threat in Our Communities
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Stagnant water bodies are breeding grounds for deadly diseases. Every year, millions are affected by preventable water-borne and mosquito-borne illnesses. Early detection and rapid response can save lives.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {diseases.map((disease) => (
            <div
              key={disease.name}
              className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                <disease.icon className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{disease.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{disease.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

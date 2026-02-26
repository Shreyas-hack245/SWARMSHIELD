import { Camera, Cpu, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Upload Photo",
    description: "Citizens capture and upload photos of stagnant water or hazardous areas using their smartphone.",
    icon: Camera,
    color: "bg-primary/10 text-primary",
  },
  {
    number: "02",
    title: "Automatic Risk Detection",
    description: "Our AI analyzes the image, detects risk levels, and categorizes the threat severity automatically.",
    icon: Cpu,
    color: "bg-accent/10 text-accent",
  },
  {
    number: "03",
    title: "Government Action & Cleanup",
    description: "Health officers are notified, assigned cleanup tasks, and mark areas as safe after remediation.",
    icon: CheckCircle,
    color: "bg-success/10 text-success",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How It Works
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Three simple steps from citizen report to government cleanup action.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${step.color}`}>
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span
                    className="text-3xl font-bold text-muted-foreground/30"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>

              {/* Arrow connector (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block">
                  <ArrowRight className="h-5 w-5 text-muted-foreground/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

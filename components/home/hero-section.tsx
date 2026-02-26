import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Health Surveillance</span>
          </div>

          <h1
            className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SWARMSHIELD
          </h1>
          
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            One Photo. One Report. One Step Closer to a Healthier Community.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2 rounded-xl px-6">
              <Link href="/report">
                Report Area
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-6">
              <Link href="/reports">View Reports</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="rounded-xl px-6">
              <Link href="/officer">Officer Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

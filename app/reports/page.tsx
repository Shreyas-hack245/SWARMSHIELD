import { ReportsDashboard } from "@/components/reports/reports-dashboard"
import { BarChart3 } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="bg-background py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Public Reports</span>
          </div>
          <h1
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Reports Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            View all submitted reports and their current status. Filter by risk level or cleanup status.
          </p>
        </div>

        <ReportsDashboard />
      </div>
    </div>
  )
}

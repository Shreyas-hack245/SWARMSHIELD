"use client"

import { useState, useEffect } from "react"
import { getReports, type Report } from "@/lib/data-store"
import { ReportCard } from "@/components/reports/report-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Filter, AlertTriangle, CheckCircle, LayoutGrid } from "lucide-react"

type FilterType = "All" | "High Risk" | "Cleaned"

const filters: { label: FilterType; icon: typeof LayoutGrid }[] = [
  { label: "All", icon: LayoutGrid },
  { label: "High Risk", icon: AlertTriangle },
  { label: "Cleaned", icon: CheckCircle },
]

export function ReportsDashboard() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All")
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    setReports(getReports())
  }, [])

  const filteredReports = reports.filter((report) => {
    if (activeFilter === "High Risk") return report.riskLevel === "High"
    if (activeFilter === "Cleaned") return report.status === "Cleaned"
    return true
  })

  return (
    <div>
      {/* Stats bar */}
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        {[
          { label: "Total Reports", value: reports.length, color: "text-primary" },
          { label: "High Risk", value: reports.filter((r) => r.riskLevel === "High").length, color: "text-destructive" },
          { label: "Pending", value: reports.filter((r) => r.status === "Pending").length, color: "text-warning" },
          { label: "Cleaned", value: reports.filter((r) => r.status === "Cleaned").length, color: "text-success" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={cn("text-2xl font-bold", stat.color)} style={{ fontFamily: "var(--font-heading)" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filter buttons */}
      <div className="mb-6 flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filter:</span>
        {filters.map((filter) => (
          <Button
            key={filter.label}
            variant={activeFilter === filter.label ? "default" : "outline"}
            size="sm"
            className="gap-2 rounded-lg"
            onClick={() => setActiveFilter(filter.label)}
          >
            <filter.icon className="h-3.5 w-3.5" />
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Reports grid */}
      {filteredReports.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No reports found matching the selected filter.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  )
}

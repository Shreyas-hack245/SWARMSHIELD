import type { Report } from "@/lib/data-store"
import { Badge } from "@/components/ui/badge"
import { MapPin, Ticket, Calendar, ImageIcon } from "lucide-react"

const riskColors: Record<string, string> = {
  Low: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  High: "bg-destructive/10 text-destructive border-destructive/20",
}

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning border-warning/20",
  Cleaned: "bg-success/10 text-success border-success/20",
}

export function ReportCard({ report }: { report: Report }) {
  const date = new Date(report.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      {/* Image placeholder */}
      <div className="relative flex h-40 items-center justify-center bg-muted/50">
        <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="outline" className={`${riskColors[report.riskLevel]} border text-xs`}>
            {report.riskLevel} Risk
          </Badge>
          <Badge variant="outline" className={`${statusColors[report.status]} border text-xs`}>
            {report.status}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Ticket className="h-3.5 w-3.5" />
          <span className="font-mono font-medium">{report.ticketId}</span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground">
          {report.description}
        </p>

        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{report.district} - {report.pincode}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

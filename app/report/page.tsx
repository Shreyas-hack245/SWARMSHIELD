import { ReportForm } from "@/components/report/report-form"
import { Camera, MapPin, FileText } from "lucide-react"

export default function ReportPage() {
  return (
    <div className="bg-background py-10 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Camera className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Citizen Reporting</span>
          </div>
          <h1
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Report a Hazardous Area
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Help your community by reporting stagnant water or unsanitary conditions. Your report triggers an AI-powered risk assessment and alerts local health authorities.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Camera, label: "Upload Evidence", desc: "Photo or video of the area" },
            { icon: MapPin, label: "Share Location", desc: "Pincode, district, GPS" },
            { icon: FileText, label: "Get Ticket", desc: "Track your report status" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <ReportForm />
      </div>
    </div>
  )
}

import { Shield } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                SWARMSHIELD
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AI-powered public health surveillance platform. Protecting communities through technology and citizen engagement.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Report Area
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  View Reports
                </Link>
              </li>
              <li>
                <Link href="/officer" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Officer Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Contact</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Public Health Department</li>
              <li>support@swarmshield.gov</li>
              <li>Helpline: 1800-XXX-XXXX</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          2026 SWARMSHIELD. Built for a healthier community.
        </div>
      </div>
    </footer>
  )
}

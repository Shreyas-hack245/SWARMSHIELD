"use client"

import { useState, useRef } from "react"
import { getReports, markAsCleaned, type Report } from "@/lib/data-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Upload,
  MapPin,
  Ticket,
  Calendar,
  ImageIcon,
  AlertTriangle,
  LogOut,
  User,
} from "lucide-react"

const riskColors: Record<string, string> = {
  Low: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  High: "bg-destructive/10 text-destructive border-destructive/20",
}

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning border-warning/20",
  Cleaned: "bg-success/10 text-success border-success/20",
}

export function OfficerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [reports, setReports] = useState<Report[]>([])
  const [cleaningId, setCleaningId] = useState<string | null>(null)
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    // Simulated login - no real auth
    setIsLoggedIn(true)
    setReports(getReports())
  }

  function handleMarkCleaned(id: string) {
    setCleaningId(id)
    // Simulate processing
    setTimeout(() => {
      markAsCleaned(id)
      setReports(getReports())
      setCleaningId(null)
    }, 1000)
  }

  function handleUploadCleanup(id: string) {
    fileInputRefs.current[id]?.click()
  }

  function handleCleanupImageChange(id: string) {
    // In a real app, this would upload the file
    markAsCleaned(id, "uploaded")
    setReports(getReports())
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Officer Login
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Access the health officer dashboard to manage reports
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-2xl border border-border bg-card p-6 lg:p-8"
          >
            <div className="flex flex-col gap-5">
              <div>
                <Label htmlFor="username" className="mb-2 block text-sm font-medium text-foreground">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-xl pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2 rounded-xl">
                <Lock className="h-4 w-4" />
                Sign In
              </Button>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Demo: Enter any credentials to access the dashboard
            </p>
          </form>
        </div>
      </div>
    )
  }

  const pendingCount = reports.filter((r) => r.status === "Pending").length
  const cleanedCount = reports.filter((r) => r.status === "Cleaned").length

  return (
    <div className="bg-background py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Officer Dashboard</span>
            </div>
            <h1
              className="text-3xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Manage Reports
            </h1>
            <p className="mt-1 text-muted-foreground">
              Review, investigate, and mark reports as cleaned.
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2 rounded-xl"
            onClick={() => setIsLoggedIn(false)}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
              {reports.length}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">Pending Action</p>
            <p className="text-2xl font-bold text-warning" style={{ fontFamily: "var(--font-heading)" }}>
              {pendingCount}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">Cleaned</p>
            <p className="text-2xl font-bold text-success" style={{ fontFamily: "var(--font-heading)" }}>
              {cleanedCount}
            </p>
          </div>
        </div>

        {/* Reports list */}
        <div className="flex flex-col gap-4">
          {reports.map((report) => {
            const date = new Date(report.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })

            return (
              <div
                key={report.id}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/20"
              >
                <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
                  {/* Image placeholder */}
                  <div className="flex h-24 w-full shrink-0 items-center justify-center rounded-xl bg-muted/50 lg:w-32">
                    <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                        <Ticket className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="font-mono">{report.ticketId}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${riskColors[report.riskLevel]} border text-xs`}
                      >
                        {report.riskLevel} Risk
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${statusColors[report.status]} border text-xs`}
                      >
                        {report.status}
                      </Badge>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {report.description}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {report.district} - {report.pincode}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {date}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 flex-wrap gap-2 lg:flex-col">
                    {report.status === "Pending" ? (
                      <>
                        <Button
                          size="sm"
                          className="gap-2 rounded-lg"
                          onClick={() => handleMarkCleaned(report.id)}
                          disabled={cleaningId === report.id}
                        >
                          {cleaningId === report.id ? (
                            <span className="flex items-center gap-2">
                              <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                              Processing
                            </span>
                          ) : (
                            <>
                              <CheckCircle className="h-3.5 w-3.5" />
                              Mark Cleaned
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 rounded-lg"
                          onClick={() => handleUploadCleanup(report.id)}
                        >
                          <Upload className="h-3.5 w-3.5" />
                          Upload Photo
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={(el) => {
                            fileInputRefs.current[report.id] = el
                          }}
                          onChange={() => handleCleanupImageChange(report.id)}
                        />
                      </>
                    ) : (
                      <div className="flex items-center gap-2 rounded-lg border border-success/20 bg-success/10 px-3 py-2 text-sm text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">Cleaned</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

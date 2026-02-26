"use client"

import { useState, useRef } from "react"
import { addReport, type Report } from "@/lib/data-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Upload,
  MapPin,
  CheckCircle,
  Loader2,
  ImageIcon,
  Ticket,
  AlertTriangle,
  Shield,
} from "lucide-react"

export function ReportForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [pincode, setPincode] = useState("")
  const [district, setDistrict] = useState("")
  const [gpsLocation, setGpsLocation] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [submittedReport, setSubmittedReport] = useState<Report | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleGps() {
    setIsLocating(true)
    // Simulate GPS detection
    setTimeout(() => {
      setGpsLocation("12.9716, 77.5946")
      setIsLocating(false)
    }, 1500)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const report = addReport({
        imageUrl: imagePreview || "",
        pincode,
        district,
        gpsLocation,
        description,
      })
      setSubmittedReport(report)
      setIsSubmitting(false)
    }, 2000)
  }

  const riskColors: Record<string, string> = {
    Low: "bg-success/10 text-success border-success/20",
    Medium: "bg-warning/10 text-warning border-warning/20",
    High: "bg-destructive/10 text-destructive border-destructive/20",
  }

  if (submittedReport) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h2
          className="mt-6 text-2xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Report Submitted Successfully
        </h2>
        <p className="mt-2 text-muted-foreground">
          Your report has been received and is being processed by our AI system.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-6 py-4">
            <Ticket className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Ticket ID</p>
              <p className="text-lg font-bold text-foreground">{submittedReport.ticketId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Risk Level:</span>
              <Badge
                variant="outline"
                className={`${riskColors[submittedReport.riskLevel]} border`}
              >
                {submittedReport.riskLevel}
              </Badge>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant="outline" className="border-warning/20 bg-warning/10 text-warning">
                Pending
              </Badge>
            </div>
          </div>
        </div>

        <Button
          className="mt-8 rounded-xl"
          onClick={() => {
            setSubmittedReport(null)
            setImagePreview(null)
            setPincode("")
            setDistrict("")
            setGpsLocation("")
            setDescription("")
          }}
        >
          Submit Another Report
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 lg:p-8">
      <div className="flex flex-col gap-6">
        {/* Image Upload */}
        <div>
          <Label className="mb-2 block text-sm font-medium text-foreground">
            Upload Photo / Video Evidence
          </Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Upload preview"
                className="max-h-48 rounded-lg object-cover"
              />
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <ImageIcon className="h-7 w-7 text-primary" />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">Click to upload</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, MP4 up to 10MB
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Pincode & District */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="pincode" className="mb-2 block text-sm font-medium text-foreground">
              Pincode
            </Label>
            <Input
              id="pincode"
              placeholder="e.g. 560001"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="rounded-xl"
              required
            />
          </div>
          <div>
            <Label htmlFor="district" className="mb-2 block text-sm font-medium text-foreground">
              District
            </Label>
            <Input
              id="district"
              placeholder="e.g. Bangalore Urban"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="rounded-xl"
              required
            />
          </div>
        </div>

        {/* GPS Location */}
        <div>
          <Label className="mb-2 block text-sm font-medium text-foreground">GPS Location</Label>
          <div className="flex gap-3">
            <Input
              placeholder="Latitude, Longitude"
              value={gpsLocation}
              onChange={(e) => setGpsLocation(e.target.value)}
              className="flex-1 rounded-xl"
              readOnly
            />
            <Button
              type="button"
              variant="outline"
              className="gap-2 rounded-xl"
              onClick={handleGps}
              disabled={isLocating}
            >
              {isLocating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              {isLocating ? "Detecting..." : "Auto Detect"}
            </Button>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="mb-2 block text-sm font-medium text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe the area, type of stagnant water, and any health concerns observed..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] rounded-xl"
            required
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="w-full gap-2 rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing & Submitting...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Submit Report
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

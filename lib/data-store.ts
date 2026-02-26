export type RiskLevel = "Low" | "Medium" | "High"
export type ReportStatus = "Pending" | "Cleaned"

export interface Report {
  id: string
  ticketId: string
  imageUrl: string
  postCleanupImageUrl?: string
  pincode: string
  district: string
  gpsLocation: string
  description: string
  riskLevel: RiskLevel
  status: ReportStatus
  createdAt: string
}

const SAMPLE_REPORTS: Report[] = [
  {
    id: "1",
    ticketId: "SS-2026-0001",
    imageUrl: "",
    pincode: "560001",
    district: "Bangalore Urban",
    gpsLocation: "12.9716, 77.5946",
    description: "Large stagnant water body near residential area with visible mosquito breeding. Multiple puddles formed after recent rains near the community park.",
    riskLevel: "High",
    status: "Pending",
    createdAt: "2026-02-24T10:30:00Z",
  },
  {
    id: "2",
    ticketId: "SS-2026-0002",
    imageUrl: "",
    pincode: "110001",
    district: "New Delhi",
    gpsLocation: "28.6139, 77.2090",
    description: "Open drain near school campus with accumulated water. Potential breeding ground for disease-carrying mosquitoes.",
    riskLevel: "Medium",
    status: "Pending",
    createdAt: "2026-02-23T14:15:00Z",
  },
  {
    id: "3",
    ticketId: "SS-2026-0003",
    imageUrl: "",
    pincode: "400001",
    district: "Mumbai",
    gpsLocation: "19.0760, 72.8777",
    description: "Construction site with accumulated rainwater. Workers reported mosquito activity around the site.",
    riskLevel: "High",
    status: "Cleaned",
    createdAt: "2026-02-22T09:00:00Z",
    postCleanupImageUrl: "",
  },
  {
    id: "4",
    ticketId: "SS-2026-0004",
    imageUrl: "",
    pincode: "600001",
    district: "Chennai",
    gpsLocation: "13.0827, 80.2707",
    description: "Small puddle formed in a vacant lot. Minor water collection observed after recent rainfall.",
    riskLevel: "Low",
    status: "Pending",
    createdAt: "2026-02-21T16:45:00Z",
  },
  {
    id: "5",
    ticketId: "SS-2026-0005",
    imageUrl: "",
    pincode: "700001",
    district: "Kolkata",
    gpsLocation: "22.5726, 88.3639",
    description: "Blocked drainage causing water stagnation in residential colony. Multiple complaints received from local residents.",
    riskLevel: "High",
    status: "Cleaned",
    createdAt: "2026-02-20T11:20:00Z",
    postCleanupImageUrl: "",
  },
  {
    id: "6",
    ticketId: "SS-2026-0006",
    imageUrl: "",
    pincode: "500001",
    district: "Hyderabad",
    gpsLocation: "17.3850, 78.4867",
    description: "Water tank overflow creating small pools in the backyard. Neighbors concerned about dengue risk.",
    riskLevel: "Medium",
    status: "Pending",
    createdAt: "2026-02-19T08:30:00Z",
  },
]

let reports: Report[] = [...SAMPLE_REPORTS]
let nextId = 7

export function getReports(): Report[] {
  return [...reports]
}

export function addReport(data: {
  imageUrl: string
  pincode: string
  district: string
  gpsLocation: string
  description: string
}): Report {
  const riskLevels: RiskLevel[] = ["Low", "Medium", "High"]
  const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)]
  
  const report: Report = {
    id: String(nextId++),
    ticketId: `SS-2026-${String(nextId).padStart(4, "0")}`,
    imageUrl: data.imageUrl,
    pincode: data.pincode,
    district: data.district,
    gpsLocation: data.gpsLocation,
    description: data.description,
    riskLevel,
    status: "Pending",
    createdAt: new Date().toISOString(),
  }
  
  reports = [report, ...reports]
  return report
}

export function markAsCleaned(id: string, postCleanupImageUrl?: string): Report | null {
  const index = reports.findIndex((r) => r.id === id)
  if (index === -1) return null
  
  reports[index] = {
    ...reports[index],
    status: "Cleaned",
    postCleanupImageUrl: postCleanupImageUrl || "",
  }
  
  return reports[index]
}

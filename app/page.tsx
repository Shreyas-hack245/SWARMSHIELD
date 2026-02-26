import { HeroSection } from "@/components/home/hero-section"
import { ProblemSection } from "@/components/home/problem-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { StatsSection } from "@/components/home/stats-section"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <HowItWorks />
      <StatsSection />
    </div>
  )
}

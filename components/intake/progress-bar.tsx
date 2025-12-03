"use client"

import { useIntakeStore } from "@/lib/intake-store"

export function ProgressBar() {
  const { getProgress, currentStep } = useIntakeStore()
  const progress = getProgress()

  // Map phase to friendly label
  const phaseLabels: Record<string, string> = {
    demographics: "Demographics",
    "health-overview": "Health Overview",
    conditions: "Conditions",
    medications: "Medications",
    review: "Review",
  }

  return (
    <div className="w-full">
      {/* Progress bar only - no question count per UX requirements */}
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Section indicator only */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs font-medium text-primary">{phaseLabels[currentStep.phase] || currentStep.phase}</span>
        <span className="text-xs text-muted-foreground">{progress}%</span>
      </div>
    </div>
  )
}

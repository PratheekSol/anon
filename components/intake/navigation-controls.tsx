"use client"

import { ChevronLeft, ChevronRight, SkipForward } from "lucide-react"
import { useIntakeStore } from "@/lib/intake-store"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavigationControlsProps {
  onComplete: () => void
  canProceed?: boolean
  showSkip?: boolean
  autoAdvance?: boolean
}

export function NavigationControls({
  onComplete,
  canProceed = true,
  showSkip = true,
  autoAdvance = false,
}: NavigationControlsProps) {
  const { currentStep, goBack, goToNext, skipCurrent, getFlowSteps } = useIntakeStore()

  const steps = getFlowSteps()
  const currentStepIndex = steps.findIndex(
    (s) => s.phase === currentStep.phase && s.questionId === currentStep.questionId && s.index === currentStep.index,
  )

  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      goToNext()
    }
  }

  const handleSkip = () => {
    skipCurrent()
  }

  // Don't show navigation on health overview (it has its own continue button)
  if (currentStep.phase === "health-overview") {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-3 pt-6 border-t border-border">
      <Button
        variant="outline"
        onClick={goBack}
        disabled={isFirstStep}
        className="flex items-center gap-2 bg-transparent"
        size="lg"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </Button>

      <div className="flex items-center gap-2">
        {/* Skip button - everything is skippable */}
        {showSkip && !isLastStep && (
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <SkipForward className="w-4 h-4" />
            Skip
          </Button>
        )}

        <Button
          onClick={handleNext}
          size="lg"
          className={cn("flex items-center gap-2 min-w-[120px]", isLastStep && "bg-accent hover:bg-accent/90")}
        >
          {isLastStep ? "Review" : "Next"}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

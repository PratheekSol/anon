"use client"

import { useState, useEffect } from "react"
import { HelpCircle, List } from "lucide-react"
import { useIntakeStore } from "@/lib/intake-store"
import { ProgressBar } from "@/components/intake/progress-bar"
import { QuestionRenderer } from "@/components/intake/question-renderer"
import { NavigationControls } from "@/components/intake/navigation-controls"
import { HealthOverview } from "@/components/intake/health-overview"
import { DocumentUpload } from "@/components/intake/document-upload"
import { SummarySidebar } from "@/components/intake/summary-sidebar"
import { ReviewScreen } from "@/components/intake/review-screen"
import { SuccessScreen } from "@/components/intake/success-screen"
import { HelpModal } from "@/components/intake/help-modal"
import { Button } from "@/components/ui/button"

type Screen = "intake" | "review" | "success"

export default function MedicalIntakePage() {
  const [screen, setScreen] = useState<Screen>("intake")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const {
    currentStep,
    getCurrentQuestion,
    answers,
    goToQuestionById,
    goToNext,
    goToReview,
    resetIntake,
    selectedHealthCategories,
  } = useIntakeStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const currentQuestion = getCurrentQuestion()

  const handleComplete = () => {
    goToReview()
    setScreen("review")
  }

  const handleEditFromReview = (questionId: string) => {
    goToQuestionById(questionId)
    setScreen("intake")
  }

  const handleSubmit = () => {
    setScreen("success")
  }

  const handleReset = () => {
    resetIntake()
    setScreen("intake")
  }

  const handleAutoAdvance = () => {
    goToNext()
  }

  const handleHealthOverviewContinue = () => {
    goToNext()
  }

  if (screen === "success") {
    return <SuccessScreen onReset={handleReset} />
  }

  if (screen === "review" || currentStep.phase === "review") {
    return <ReviewScreen onEdit={handleEditFromReview} onSubmit={handleSubmit} onBack={() => setScreen("intake")} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold text-foreground">Medical Intake</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setHelpOpen(true)} aria-label="Help">
                <HelpCircle className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} aria-label="View answers">
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <ProgressBar />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="chat-scroll">
          {/* Render based on current phase */}
          {currentStep.phase === "health-overview" ? (
            <HealthOverview onContinue={handleHealthOverviewContinue} />
          ) : currentStep.phase === "documents" ? (
            <DocumentUpload />
          ) : currentQuestion ? (
            <QuestionRenderer
              key={`${currentQuestion.id}-${currentStep.index}`}
              question={currentQuestion}
              onAutoAdvance={handleAutoAdvance}
            />
          ) : null}
        </div>

        {/* Navigation - hidden for health overview (it has its own button) */}
        {currentStep.phase !== "health-overview" && <NavigationControls onComplete={handleComplete} showSkip={true} />}
      </main>

      {/* Sidebar */}
      <SummarySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onEditQuestion={(id) => {
          goToQuestionById(id)
          setSidebarOpen(false)
        }}
      />

      {/* Help Modal */}
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

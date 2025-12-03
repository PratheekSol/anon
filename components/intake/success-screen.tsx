"use client"

import { CheckCircle, Copy, Download, Home } from "lucide-react"
import { useState } from "react"
import { useIntakeStore } from "@/lib/intake-store"
import { Button } from "@/components/ui/button"

interface SuccessScreenProps {
  onReset: () => void
}

export function SuccessScreen({ onReset }: SuccessScreenProps) {
  const { answers, exportAnswers, logEvent } = useIntakeStore()
  const [copied, setCopied] = useState(false)

  // Log final submit
  useState(() => {
    logEvent("final_submit", {
      total_answers: Object.keys(answers).length,
      timestamp: Date.now(),
    })
  })

  const getSummaryText = () => {
    const lines = ["Medical Intake Summary", "=".repeat(30), ""]
    Object.values(answers).forEach((a) => {
      lines.push(`${a.questionId}: ${JSON.stringify(a.value)}`)
      if (a.childValues && Object.keys(a.childValues).length > 0) {
        Object.entries(a.childValues).forEach(([k, v]) => {
          lines.push(`  - ${k}: ${JSON.stringify(v)}`)
        })
      }
    })
    return lines.join("\n")
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getSummaryText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const csv = exportAnswers()
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "medical-intake-submission.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-accent" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">Submission Complete</h1>
        <p className="text-muted-foreground mb-8">
          Your medical intake form has been successfully submitted. A copy has been saved for your records.
        </p>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-3">{Object.keys(answers).length} questions answered</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy} className="flex-1 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy Summary"}
            </Button>
            <Button variant="outline" onClick={handleDownload} className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </div>

        <Button onClick={onReset} variant="ghost" className="text-muted-foreground">
          <Home className="w-4 h-4 mr-2" />
          Start New Intake
        </Button>
      </div>
    </div>
  )
}

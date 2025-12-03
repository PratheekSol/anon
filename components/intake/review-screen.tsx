"use client"

import { useState } from "react"
import { Check, Edit2, AlertTriangle, Download, ChevronDown, ChevronRight, File } from "lucide-react"
import { useIntakeStore } from "@/lib/intake-store"
import {
  ALL_QUESTIONS,
  VALIDATION_RULES,
  HEALTH_CATEGORIES,
  DOCUMENT_QUESTIONS,
  type HealthCategoryId,
} from "@/lib/intake-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ReviewScreenProps {
  onEdit: (questionId: string) => void
  onSubmit: () => void
  onBack: () => void
}

export function ReviewScreen({ onEdit, onSubmit, onBack }: ReviewScreenProps) {
  const { answers, selectedHealthCategories, exportAnswers, logEvent, gender } = useIntakeStore()

  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["Demographics", "Health Overview", "Conditions", "Medications", "Documents"]),
  )
  const [consentChecked, setConsentChecked] = useState(false)

  // Log review attempt
  useState(() => {
    logEvent("review_submit_attempt", {
      answered_count: Object.keys(answers).length,
    })
  })

  const getAnsweredQuestions = () => {
    const demographics = ALL_QUESTIONS.filter((q) => {
      if (q.section !== "Demographics") return false
      if (q.genderVisibility === "female-other" && gender === "Male") return false
      return true
    })

    const conditionCategories = selectedHealthCategories.filter((cat) => cat !== "medications" && cat !== "documents")

    const conditions = ALL_QUESTIONS.filter((q) => {
      if (q.section !== "Conditions") return false
      if (!q.healthCategory) return false
      return conditionCategories.includes(q.healthCategory as HealthCategoryId)
    })

    // Medications if that category was selected
    const medications = selectedHealthCategories.includes("medications")
      ? ALL_QUESTIONS.filter((q) => q.section === "Medications")
      : []

    const documents = selectedHealthCategories.includes("documents") ? DOCUMENT_QUESTIONS : []

    return { demographics, conditions, medications, documents }
  }

  const { demographics, conditions, medications, documents } = getAnsweredQuestions()
  const allVisibleQuestions = [...demographics, ...conditions, ...medications, ...documents]
  const answeredCount = Object.keys(answers).length

  // Check for validation conflicts
  const conflicts = VALIDATION_RULES.map((rule) => ({
    ...rule,
    result: rule.check(
      Object.fromEntries(
        Object.entries(answers).flatMap(([_, a]) => [[a.questionId, a.value], ...Object.entries(a.childValues || {})]),
      ),
    ),
  })).filter((r) => !r.result.valid)

  const formatAnswer = (value: unknown, otherValues?: Record<string, string>): string => {
    if (value === null || value === undefined) return "—"
    if (typeof value === "boolean") return value ? "Yes" : "No"
    if (Array.isArray(value)) {
      const items = value.length > 0 ? value.join(", ") : "—"
      const otherEntries = otherValues ? Object.values(otherValues).filter(Boolean) : []
      if (otherEntries.length > 0) {
        return items !== "—" ? `${items}, Other: ${otherEntries.join(", ")}` : `Other: ${otherEntries.join(", ")}`
      }
      return items
    }
    if (typeof value === "object") {
      const obj = value as Record<string, unknown>
      if ("amount" in obj && "unit" in obj) {
        return obj.amount ? `${obj.amount} ${obj.unit}` : "—"
      }
      if (Array.isArray(obj) && obj[0] && "name" in (obj[0] as Record<string, unknown>)) {
        return `${(obj as Array<{ name: string }>).length} file(s) uploaded`
      }
      return JSON.stringify(obj)
    }
    return String(value)
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const handleExport = () => {
    const csv = exportAnswers()
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "medical-intake-answers.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const canSubmit = conflicts.length === 0 && consentChecked

  // Get selected health category labels
  const selectedCategoryLabels = selectedHealthCategories
    .map((id) => HEALTH_CATEGORIES.find((c) => c.id === id)?.label)
    .filter(Boolean)
    .join(", ")

  const sections = [
    { name: "Demographics", questions: demographics },
    { name: "Conditions", questions: conditions },
    { name: "Medications", questions: medications },
    { name: "Documents", questions: documents },
  ].filter((s) => s.questions.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Review Your Answers</h1>
          <p className="text-muted-foreground mt-1">{answeredCount} questions answered</p>
          <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: "100%" }} />
          </div>
        </div>

        {/* Conflicts Alert */}
        {conflicts.length > 0 && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-destructive">Please Resolve Conflicts</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The following inconsistencies were detected in your answers:
                </p>
                <ul className="mt-2 space-y-2">
                  {conflicts.map((c) => (
                    <li key={c.id} className="text-sm">
                      <span className="font-medium">{c.description}:</span>{" "}
                      <span className="text-muted-foreground">{c.result.message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Health Overview Summary */}
        {selectedHealthCategories.length > 0 && (
          <div className="mb-6 p-4 bg-card border border-border rounded-lg">
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Health Areas Selected</h3>
            <p className="text-foreground">{selectedCategoryLabels || "None selected"}</p>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-4">
          {sections.map(({ name, questions }) => {
            const answeredInSection = questions.filter((q) => answers[q.id]).length
            const isExpanded = expandedSections.has(name)

            return (
              <div key={name} className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSection(name)}
                  className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        answeredInSection === questions.length
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground",
                      )}
                    >
                      {answeredInSection === questions.length ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">
                          {answeredInSection}/{questions.length}
                        </span>
                      )}
                    </div>
                    <span className="font-medium">{name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-border divide-y divide-border">
                    {questions.map((q) => {
                      const answer = answers[q.id]

                      return (
                        <div key={q.id} className="flex items-start justify-between p-4 hover:bg-secondary/30 group">
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-sm font-medium">{q.question}</p>
                            <div className="mt-1">
                              <p className={cn("text-sm", answer ? "text-foreground" : "text-muted-foreground italic")}>
                                {answer ? formatAnswer(answer.value, answer.otherValues) : "Skipped"}
                              </p>

                              {answer?.otherValues && Object.keys(answer.otherValues).length > 0 && (
                                <div className="mt-1">
                                  {Object.entries(answer.otherValues)
                                    .filter(([_, val]) => val)
                                    .map(([key, val]) => (
                                      <p key={key} className="text-xs text-primary">
                                        Custom entry: {val}
                                      </p>
                                    ))}
                                </div>
                              )}

                              {/* Child answers */}
                              {answer?.childValues && Object.keys(answer.childValues).length > 0 && (
                                <div className="mt-2 pl-3 border-l-2 border-primary/30 space-y-1">
                                  {Object.entries(answer.childValues).map(([childId, childValue]) => {
                                    const childDef = q.conditionalChildren?.find((c) => c.id === childId)
                                    return (
                                      <p key={childId} className="text-xs text-muted-foreground">
                                        <span className="font-medium">{childDef?.label || childId}:</span>{" "}
                                        {formatAnswer(childValue)}
                                      </p>
                                    )
                                  })}
                                </div>
                              )}

                              {q.type === "file-upload" && answer?.value && Array.isArray(answer.value) && (
                                <div className="mt-2 space-y-1">
                                  {(answer.value as Array<{ name: string; documentType: string }>).map((file, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <File className="w-3 h-3" />
                                      <span>{file.name}</span>
                                      <span className="text-primary">({file.documentType})</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(q.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Consent & Submit */}
        <div className="mt-8 p-6 bg-card border border-border rounded-lg">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-input accent-primary"
            />
            <span className="text-sm text-muted-foreground">
              I confirm that the information provided is accurate to the best of my knowledge. I understand this
              information will be used for medical purposes and consent to its processing.
            </span>
          </label>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
              Back to Questions
            </Button>
            <Button variant="outline" onClick={handleExport} className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={onSubmit} disabled={!canSubmit} className="flex-1 bg-primary hover:bg-primary/90">
              Submit Intake
            </Button>
          </div>

          {!canSubmit && !consentChecked && conflicts.length === 0 && (
            <p className="text-xs text-muted-foreground mt-3 text-center">Please check the consent box to submit</p>
          )}
        </div>
      </div>
    </div>
  )
}

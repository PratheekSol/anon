"use client"

import { useState } from "react"
import { X, Edit2, ChevronRight, Download, AlertTriangle } from "lucide-react"
import { useIntakeStore } from "@/lib/intake-store"
import { ALL_QUESTIONS, VALIDATION_RULES, HEALTH_CATEGORIES, type HealthCategoryId } from "@/lib/intake-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SummarySidebarProps {
  isOpen: boolean
  onClose: () => void
  onEditQuestion: (questionId: string) => void
}

export function SummarySidebar({ isOpen, onClose, onEditQuestion }: SummarySidebarProps) {
  const { answers, selectedHealthCategories, exportAnswers } = useIntakeStore()
  const [expandedSection, setExpandedSection] = useState<string | null>("Demographics")

  // Get questions based on selected health categories (matches review screen logic)
  const getVisibleQuestions = () => {
    const demographics = ALL_QUESTIONS.filter((q) => q.section === "Demographics")

    const conditions = ALL_QUESTIONS.filter((q) => {
      if (q.section !== "Conditions") return false
      if (!q.healthCategory) return false
      return selectedHealthCategories.includes(q.healthCategory as HealthCategoryId)
    })

    const medications = selectedHealthCategories.includes("medications")
      ? ALL_QUESTIONS.filter((q) => q.section === "Medications")
      : []

    return { demographics, conditions, medications }
  }

  const { demographics, conditions, medications } = getVisibleQuestions()
  const allVisibleQuestions = [...demographics, ...conditions, ...medications]
  const answeredCount = Object.keys(answers).length

  // Group questions by section
  const sections = [
    { name: "Demographics", questions: demographics },
    { name: "Conditions", questions: conditions },
    { name: "Medications", questions: medications },
  ].filter((s) => s.questions.length > 0)

  // Check for validation conflicts
  const conflicts = VALIDATION_RULES.map((rule) => ({
    ...rule,
    result: rule.check(
      Object.fromEntries(
        Object.entries(answers).flatMap(([_, a]) => [[a.questionId, a.value], ...Object.entries(a.childValues || {})]),
      ),
    ),
  })).filter((r) => !r.result.valid)

  const formatAnswer = (value: unknown): string => {
    if (value === null || value === undefined) return "—"
    if (typeof value === "boolean") return value ? "Yes" : "No"
    if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "—"
    if (typeof value === "object") {
      const obj = value as Record<string, unknown>
      if ("amount" in obj && "unit" in obj) {
        return obj.amount ? `${obj.amount} ${obj.unit}` : "—"
      }
      return JSON.stringify(obj)
    }
    return String(value)
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-card border-l border-border shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold">Your Answers</h2>
          <p className="text-sm text-muted-foreground">{answeredCount} answered</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Health Categories Summary */}
      {selectedHealthCategories.length > 0 && (
        <div className="p-4 border-b border-border bg-secondary/30">
          <p className="text-xs font-medium text-muted-foreground mb-1">Health Areas</p>
          <p className="text-sm">
            {selectedHealthCategories.includes("none")
              ? "None selected"
              : selectedHealthCategories
                  .map((id) => HEALTH_CATEGORIES.find((c) => c.id === id)?.label)
                  .filter(Boolean)
                  .join(", ")}
          </p>
        </div>
      )}

      {/* Conflicts */}
      {conflicts.length > 0 && (
        <div className="p-4 bg-destructive/10 border-b border-destructive/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive">Conflicts Found</p>
              {conflicts.map((c) => (
                <p key={c.id} className="text-xs text-muted-foreground mt-1">
                  {c.result.message}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {sections.map(({ name, questions }) => {
          const answeredInSection = questions.filter((q) => answers[q.id]).length
          const isExpanded = expandedSection === name

          return (
            <div key={name} className="border-b border-border">
              <button
                type="button"
                onClick={() => setExpandedSection(isExpanded ? null : name)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="text-left">
                  <p className="font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {answeredInSection} of {questions.length} answered
                  </p>
                </div>
                <ChevronRight
                  className={cn("w-5 h-5 text-muted-foreground transition-transform", isExpanded && "rotate-90")}
                />
              </button>

              {isExpanded && (
                <div className="pb-2">
                  {questions.map((q) => {
                    const answer = answers[q.id]

                    return (
                      <div
                        key={q.id}
                        className="flex items-start justify-between px-4 py-2 hover:bg-secondary/30 group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{q.question}</p>
                          <p
                            className={cn(
                              "text-xs mt-0.5 truncate",
                              answer ? "text-foreground" : "text-muted-foreground",
                            )}
                          >
                            {answer ? formatAnswer(answer.value) : "Skipped"}
                          </p>
                          {answer?.childValues && Object.keys(answer.childValues).length > 0 && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              + {Object.keys(answer.childValues).length} detail(s)
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onEditQuestion(q.id)
                            onClose()
                          }}
                          className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Edit ${q.question}`}
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Export */}
      <div className="p-4 border-t border-border">
        <Button variant="outline" onClick={handleExport} className="w-full bg-transparent">
          <Download className="w-4 h-4 mr-2" />
          Export as CSV
        </Button>
      </div>
    </div>
  )
}

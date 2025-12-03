"use client"

import { useState, useEffect, useCallback } from "react"
import type { Question } from "@/lib/intake-data"
import { useIntakeStore, getFilteredKidneyOptions } from "@/lib/intake-store"
import { QuestionBubble } from "./question-bubble"
import { YesNoToggle } from "./yes-no-toggle"
import { SearchableDropdown } from "./searchable-dropdown"
import { MultiSelect } from "./multi-select"
import { NumericInput } from "./numeric-input"
import { HeightWeightInput } from "./height-weight-input"
import { DatePicker } from "./date-picker"
import { AlertCircle, Upload } from "lucide-react"

interface QuestionRendererProps {
  question: Question
  onAutoAdvance?: () => void
}

export function QuestionRenderer({ question, onAutoAdvance }: QuestionRendererProps) {
  const { answers, setAnswer, gender, logEvent } = useIntakeStore()
  const existingAnswer = answers[question.id]

  const [value, setValue] = useState<unknown>(existingAnswer?.value ?? null)
  const [childValues, setChildValues] = useState<Record<string, unknown>>(existingAnswer?.childValues ?? {})
  const [otherValues, setOtherValues] = useState<Record<string, string>>(existingAnswer?.otherValues ?? {})
  const [showChildren, setShowChildren] = useState(existingAnswer?.value === true)

  // Sync state when navigating back
  useEffect(() => {
    setValue(existingAnswer?.value ?? null)
    setChildValues(existingAnswer?.childValues ?? {})
    setOtherValues(existingAnswer?.otherValues ?? {})
    setShowChildren(existingAnswer?.value === true)
  }, [existingAnswer, question.id])

  const handleValueChange = useCallback(
    (newValue: unknown) => {
      setValue(newValue)

      if (question.type === "yes-no") {
        const isYes = newValue === true
        setShowChildren(isYes)

        if (isYes && question.conditionalChildren?.length) {
          logEvent("conditional_opened", {
            question_id: question.id,
            children_count: question.conditionalChildren.length,
          })
        }

        if (!isYes) {
          // Clear child values when No is selected
          setChildValues({})
          setOtherValues({})
          setAnswer(question.id, newValue, {}, {})

          // Auto-advance on No (no follow-up needed)
          if (onAutoAdvance) {
            setTimeout(() => onAutoAdvance(), 300)
          }
        } else {
          setAnswer(question.id, newValue, childValues, otherValues)
        }
      } else {
        setAnswer(question.id, newValue, childValues, otherValues)
      }
    },
    [question, childValues, otherValues, logEvent, setAnswer, onAutoAdvance],
  )

  const handleChildValueChange = (childId: string, childValue: unknown) => {
    const newChildValues = { ...childValues, [childId]: childValue }
    setChildValues(newChildValues)
    setAnswer(question.id, value, newChildValues, otherValues)
  }

  const handleOtherValueChange = (fieldId: string, otherValue: string) => {
    const newOtherValues = { ...otherValues, [fieldId]: otherValue }
    setOtherValues(newOtherValues)
    setAnswer(question.id, value, childValues, newOtherValues)
  }

  const getOptionsForQuestion = (questionId: string, options: string[] | undefined) => {
    if (questionId === "kidney_conditions" && options) {
      return getFilteredKidneyOptions(gender)
    }
    return options || []
  }

  // Get filtered options for child questions
  const getOptionsForChild = (childId: string, options: string[] | undefined) => {
    // Future: add any child-specific filtering here
    return options || []
  }

  // Render out-of-scope placeholder
  if (question.outOfScope) {
    return (
      <QuestionBubble question={question.question} tooltip={question.tooltip} isOptional={question.isOptional}>
        <div className="bg-secondary/50 border border-dashed border-border rounded-lg p-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Upload className="w-5 h-5" />
            <div>
              <p className="text-sm font-medium">Document upload coming soon</p>
              <p className="text-xs">This feature is out of scope for the current phase</p>
            </div>
          </div>
        </div>
      </QuestionBubble>
    )
  }

  return (
    <QuestionBubble question={question.question} tooltip={question.tooltip} isOptional={question.isOptional}>
      <div className="space-y-4">
        {/* Main input */}
        {question.type === "yes-no" && <YesNoToggle value={value as boolean | null} onChange={handleValueChange} />}

        {question.type === "dropdown" && question.options && (
          <SearchableDropdown
            options={question.options}
            value={value as string | null}
            onChange={handleValueChange}
            required={question.required}
            showOtherButton={true}
            otherValue={otherValues[question.id] || ""}
            onOtherChange={(val) => handleOtherValueChange(question.id, val)}
          />
        )}

        {question.type === "multi-select" && question.options && (
          <MultiSelect
            options={getOptionsForQuestion(question.id, question.options)}
            value={(value as string[]) || []}
            onChange={handleValueChange}
            placeholder="Select all that apply"
            showOtherButton={true}
            otherValue={otherValues[question.id] || ""}
            onOtherChange={(val) => handleOtherValueChange(question.id, val)}
            helperText="Select one or more. Press Next when done."
          />
        )}

        {question.type === "numeric" && (
          <NumericInput
            value={value as number | null}
            onChange={handleValueChange}
            placeholder={question.placeholder}
            required={question.required}
            min={0}
            max={question.id === "systolic_bp" ? 300 : question.id === "heart_rate" ? 250 : 100}
            showSlider={question.id !== "oxygen_saturation"}
          />
        )}

        {question.type === "height" && question.units && (
          <HeightWeightInput
            type="height"
            value={value as { amount: number | null; unit: string } | null}
            onChange={handleValueChange}
            units={question.units}
            required={question.required}
          />
        )}

        {question.type === "weight" && question.units && (
          <HeightWeightInput
            type="weight"
            value={value as { amount: number | null; unit: string } | null}
            onChange={handleValueChange}
            units={question.units}
            required={question.required}
          />
        )}

        {question.type === "date" && (
          <DatePicker
            value={value as string | null}
            onChange={handleValueChange}
            required={question.required}
            showPreferNotToSay={question.id === "last_period"}
          />
        )}

        {question.type === "text" && (
          <input
            type="text"
            value={(value as string) || ""}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder={question.placeholder || "Enter your answer..."}
            className="w-full px-4 py-3 rounded-lg bg-card border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
        )}

        {/* Conditional children */}
        {showChildren && question.conditionalChildren && (
          <div className="mt-4 space-y-4 pl-4 border-l-2 border-primary/30 animate-in fade-in slide-in-from-top-2 duration-200">
            {question.conditionalChildren.map((child) => {
              if (child.id === "last_period" && gender === "Male") {
                return null
              }
              if (child.id === "due_date" && gender === "Male") {
                return null
              }
              if (child.id === "prenatal_meds" && gender === "Male") {
                return null
              }

              // Handle file upload placeholder
              if (child.type === "file-upload") {
                return (
                  <div key={child.id} className="bg-secondary/50 border border-dashed border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Upload className="w-4 h-4" />
                      <span>Upload feature coming soon (out of scope)</span>
                    </div>
                  </div>
                )
              }

              const childOptions = getOptionsForChild(child.id, child.options)

              return (
                <div key={child.id}>
                  {child.type === "multi-select" && (
                    <MultiSelect
                      label={child.label}
                      options={childOptions}
                      value={(childValues[child.id] as string[]) || []}
                      onChange={(val) => handleChildValueChange(child.id, val)}
                      placeholder={child.placeholder}
                      required={child.required}
                      showOtherButton={true}
                      otherValue={otherValues[child.id] || ""}
                      onOtherChange={(val) => handleOtherValueChange(child.id, val)}
                      helperText="Select one or more. Press Next when done."
                    />
                  )}

                  {child.type === "dropdown" && (
                    <SearchableDropdown
                      label={child.label}
                      options={childOptions}
                      value={(childValues[child.id] as string) || null}
                      onChange={(val) => handleChildValueChange(child.id, val)}
                      placeholder={child.placeholder}
                      required={child.required}
                      showOtherButton={true}
                      otherValue={otherValues[child.id] || ""}
                      onOtherChange={(val) => handleOtherValueChange(child.id, val)}
                    />
                  )}

                  {child.type === "date" && (
                    <DatePicker
                      label={child.label}
                      value={(childValues[child.id] as string) || null}
                      onChange={(val) => handleChildValueChange(child.id, val)}
                      required={child.required}
                    />
                  )}

                  {child.type === "text" && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{child.label}</label>
                      <input
                        type="text"
                        value={(childValues[child.id] as string) || ""}
                        onChange={(e) => handleChildValueChange(child.id, e.target.value)}
                        placeholder={child.placeholder || "Enter your answer..."}
                        className="w-full px-4 py-3 rounded-lg bg-card border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                      />
                    </div>
                  )}

                  {/* Dataset flag warning */}
                  {child.tooltip?.includes("Dataset flagged") && (
                    <div className="flex items-start gap-2 mt-2 p-2 bg-amber-500/10 rounded text-xs text-amber-700 dark:text-amber-400">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{child.tooltip}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Dataset flag warning for main question */}
        {question.datasetFlag && (
          <div className="flex items-start gap-2 mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-700 dark:text-amber-400">Dataset Flag</p>
              <p className="text-muted-foreground text-xs mt-1">{question.datasetFlag}</p>
            </div>
          </div>
        )}
      </div>
    </QuestionBubble>
  )
}

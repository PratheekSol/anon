"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  DEMOGRAPHIC_QUESTIONS,
  CONDITION_QUESTIONS,
  MEDICATION_QUESTIONS,
  DOCUMENT_QUESTIONS,
  KIDNEY_CONDITIONS,
  KIDNEY_MALE_CONDITIONS,
  KIDNEY_FEMALE_CONDITIONS,
  sortAlphabetically,
  type Question,
  type HealthCategoryId,
} from "./intake-data"

export interface IntakeAnswer {
  questionId: string
  value: unknown
  childValues?: Record<string, unknown>
  otherValues?: Record<string, string> // Store "Other" text entries
  timestamp: number
  timeSpentMs?: number
}

interface AnalyticsEvent {
  event: string
  data: Record<string, unknown>
  timestamp: number
}

// Flow phases for branching system
export type FlowPhase = "demographics" | "health-overview" | "conditions" | "medications" | "documents" | "review"

export interface FlowStep {
  phase: FlowPhase
  questionId?: string
  index: number
}

interface IntakeState {
  // Core state
  answers: Record<string, IntakeAnswer>
  currentStep: FlowStep
  gender: "Male" | "Female" | "Other" | null
  selectedHealthCategories: HealthCategoryId[]
  takesRegularMedication: boolean | null

  // Flow tracking
  startTime: number | null
  questionStartTime: number | null

  // Analytics
  analyticsEvents: AnalyticsEvent[]

  // Derived getters
  getFlowSteps: () => FlowStep[]
  getTotalSteps: () => number
  getProgress: () => number
  getCurrentQuestion: () => Question | null
  getAnswerForQuestion: (questionId: string) => IntakeAnswer | undefined
  getVisibleDemographicQuestions: () => Question[]
  getVisibleConditionQuestions: () => Question[]
  getVisibleMedicationQuestions: () => Question[]

  // Actions
  setAnswer: (
    questionId: string,
    value: unknown,
    childValues?: Record<string, unknown>,
    otherValues?: Record<string, string>,
  ) => void
  setHealthCategories: (categories: HealthCategoryId[]) => void
  goToStep: (step: FlowStep) => void
  goToNext: () => void
  goBack: () => void
  skipCurrent: () => void
  goToReview: () => void
  goToQuestionById: (questionId: string) => void
  resetIntake: () => void

  // Analytics actions
  logEvent: (event: string, data: Record<string, unknown>) => void
  exportAnswers: () => string
}

export const useIntakeStore = create<IntakeState>()(
  persist(
    (set, get) => ({
      answers: {},
      currentStep: { phase: "demographics", index: 0 },
      gender: null,
      selectedHealthCategories: [],
      takesRegularMedication: null,
      startTime: Date.now(),
      questionStartTime: Date.now(),
      analyticsEvents: [],

      getVisibleDemographicQuestions: () => {
        const { gender } = get()
        return DEMOGRAPHIC_QUESTIONS.filter((q) => {
          // Show all questions for non-gendered visibility
          if (q.genderVisibility === "all") return true
          // Show female-other questions only for Female or Other
          if (q.genderVisibility === "female-other") {
            return gender === "Female" || gender === "Other"
          }
          if (q.genderVisibility === "female") return gender === "Female"
          if (q.genderVisibility === "male") return gender === "Male"
          return true
        })
      },

      getFlowSteps: () => {
        const { selectedHealthCategories, takesRegularMedication, gender, answers } = get()
        const steps: FlowStep[] = []

        const visibleDemoQuestions = get().getVisibleDemographicQuestions()
        visibleDemoQuestions.forEach((q, i) => {
          steps.push({ phase: "demographics", questionId: q.id, index: i })
        })

        // Phase 2: Health Overview (single screen)
        steps.push({ phase: "health-overview", index: 0 })

        if (selectedHealthCategories.length > 0) {
          // Get questions in the order categories were selected
          const conditionQuestions = get().getVisibleConditionQuestions()
          conditionQuestions.forEach((q, i) => {
            steps.push({ phase: "conditions", questionId: q.id, index: i })
          })
        }

        // Phase 4: Medications (if selected and user takes meds)
        if (selectedHealthCategories.includes("medications")) {
          const medQuestions = get().getVisibleMedicationQuestions()
          medQuestions.forEach((q, i) => {
            steps.push({ phase: "medications", questionId: q.id, index: i })
          })
        }

        if (selectedHealthCategories.includes("documents")) {
          DOCUMENT_QUESTIONS.forEach((q, i) => {
            steps.push({ phase: "documents", questionId: q.id, index: i })
          })
        }

        return steps
      },

      getTotalSteps: () => {
        return get().getFlowSteps().length
      },

      getProgress: () => {
        const steps = get().getFlowSteps()
        const currentStepIndex = steps.findIndex(
          (s) =>
            s.phase === get().currentStep.phase &&
            s.questionId === get().currentStep.questionId &&
            s.index === get().currentStep.index,
        )
        if (currentStepIndex === -1 || steps.length === 0) return 0
        return Math.round(((currentStepIndex + 1) / steps.length) * 100)
      },

      getCurrentQuestion: () => {
        const { currentStep, gender } = get()

        if (currentStep.phase === "demographics") {
          const visibleQuestions = get().getVisibleDemographicQuestions()
          return visibleQuestions[currentStep.index] || null
        }

        if (currentStep.phase === "conditions" && currentStep.questionId) {
          const questions = get().getVisibleConditionQuestions()
          return questions.find((q) => q.id === currentStep.questionId) || null
        }

        if (currentStep.phase === "medications" && currentStep.questionId) {
          const questions = get().getVisibleMedicationQuestions()
          return questions.find((q) => q.id === currentStep.questionId) || null
        }

        if (currentStep.phase === "documents" && currentStep.questionId) {
          return DOCUMENT_QUESTIONS.find((q) => q.id === currentStep.questionId) || null
        }

        return null
      },

      getAnswerForQuestion: (questionId: string) => {
        return get().answers[questionId]
      },

      getVisibleConditionQuestions: () => {
        const { selectedHealthCategories, gender } = get()

        if (selectedHealthCategories.length === 0) {
          return []
        }

        // Filter out non-condition categories
        const conditionCategories = selectedHealthCategories.filter(
          (cat) => cat !== "medications" && cat !== "documents",
        )

        // Build questions in selection order
        const orderedQuestions: Question[] = []

        conditionCategories.forEach((category) => {
          const categoryQuestions = CONDITION_QUESTIONS.filter((q) => {
            if (q.healthCategory !== category) return false

            // Gender visibility check
            if (q.genderVisibility === "male" && gender !== "Male") return false
            if (q.genderVisibility === "female" && gender !== "Female") return false
            if (q.genderVisibility === "female-other" && gender === "Male") return false

            return true
          })

          orderedQuestions.push(...categoryQuestions)
        })

        return orderedQuestions
      },

      getVisibleMedicationQuestions: () => {
        const { selectedHealthCategories, takesRegularMedication, answers } = get()

        if (!selectedHealthCategories.includes("medications")) {
          return []
        }

        // First question is always the gatekeeper
        const gatekeeper = MEDICATION_QUESTIONS[0]
        const gatekeeperAnswer = answers[gatekeeper.id]

        // If gatekeeper answered No, return only gatekeeper
        if (gatekeeperAnswer?.value === false) {
          return [gatekeeper]
        }

        // If gatekeeper answered Yes or not yet answered, return all
        return MEDICATION_QUESTIONS
      },

      setAnswer: (questionId, value, childValues, otherValues) => {
        const now = Date.now()
        const questionStartTime = get().questionStartTime || now
        const timeSpentMs = now - questionStartTime

        set((state) => {
          const newAnswers = {
            ...state.answers,
            [questionId]: {
              questionId,
              value,
              childValues,
              otherValues, // Store other values
              timestamp: now,
              timeSpentMs,
            },
          }

          let newGender = state.gender
          if (questionId === "gender") {
            newGender = value as "Male" | "Female" | "Other"
          }

          // Track medication gatekeeper
          let newTakesMeds = state.takesRegularMedication
          if (questionId === "regular_medications") {
            newTakesMeds = value === true
          }

          return {
            answers: newAnswers,
            gender: newGender,
            takesRegularMedication: newTakesMeds,
            questionStartTime: now,
          }
        })

        // Log analytics event
        get().logEvent("q_answered", {
          question_id: questionId,
          answer: value,
          time_on_question_ms: timeSpentMs,
          revealed_children_count: childValues ? Object.keys(childValues).length : 0,
        })
      },

      setHealthCategories: (categories) => {
        set({ selectedHealthCategories: categories })
        get().logEvent("health_categories_selected", { categories })
      },

      goToStep: (step) => {
        set({
          currentStep: step,
          questionStartTime: Date.now(),
        })
      },

      goToNext: () => {
        const steps = get().getFlowSteps()
        const currentStepIndex = steps.findIndex(
          (s) =>
            s.phase === get().currentStep.phase &&
            s.questionId === get().currentStep.questionId &&
            s.index === get().currentStep.index,
        )

        if (currentStepIndex < steps.length - 1) {
          set({
            currentStep: steps[currentStepIndex + 1],
            questionStartTime: Date.now(),
          })
        }
      },

      goBack: () => {
        const steps = get().getFlowSteps()
        const currentStepIndex = steps.findIndex(
          (s) =>
            s.phase === get().currentStep.phase &&
            s.questionId === get().currentStep.questionId &&
            s.index === get().currentStep.index,
        )

        if (currentStepIndex > 0) {
          set({
            currentStep: steps[currentStepIndex - 1],
            questionStartTime: Date.now(),
          })
        }
      },

      skipCurrent: () => {
        // Same as goToNext but logs skip event
        const { currentStep } = get()
        get().logEvent("question_skipped", {
          phase: currentStep.phase,
          question_id: currentStep.questionId,
        })
        get().goToNext()
      },

      goToReview: () => {
        set({ currentStep: { phase: "review", index: 0 } })
        get().logEvent("review_submit_attempt", {
          answered_count: Object.keys(get().answers).length,
        })
      },

      goToQuestionById: (questionId: string) => {
        const steps = get().getFlowSteps()
        const step = steps.find((s) => s.questionId === questionId)
        if (step) {
          set({
            currentStep: step,
            questionStartTime: Date.now(),
          })
        }
      },

      resetIntake: () => {
        set({
          answers: {},
          currentStep: { phase: "demographics", index: 0 },
          gender: null,
          selectedHealthCategories: [],
          takesRegularMedication: null,
          startTime: Date.now(),
          questionStartTime: Date.now(),
          analyticsEvents: [],
        })
      },

      logEvent: (event, data) => {
        set((state) => ({
          analyticsEvents: [...state.analyticsEvents, { event, data, timestamp: Date.now() }],
        }))
      },

      exportAnswers: () => {
        const { answers } = get()
        const rows = [["Question ID", "Value", "Child Values", "Other Values", "Timestamp", "Time Spent (ms)"]]

        Object.values(answers).forEach((answer) => {
          rows.push([
            answer.questionId,
            JSON.stringify(answer.value),
            JSON.stringify(answer.childValues || {}),
            JSON.stringify(answer.otherValues || {}),
            new Date(answer.timestamp).toISOString(),
            String(answer.timeSpentMs || 0),
          ])
        })

        return rows.map((row) => row.join(",")).join("\n")
      },
    }),
    {
      name: "medical-intake-v3-storage", // New storage key
      partialize: (state) => ({
        answers: state.answers,
        currentStep: state.currentStep,
        gender: state.gender,
        selectedHealthCategories: state.selectedHealthCategories,
        takesRegularMedication: state.takesRegularMedication,
        startTime: state.startTime,
        analyticsEvents: state.analyticsEvents,
      }),
    },
  ),
)

export function getFilteredKidneyOptions(gender: "Male" | "Female" | "Other" | null): string[] {
  const baseOptions = [...KIDNEY_CONDITIONS]

  if (gender === "Male") {
    return sortAlphabetically([...baseOptions, ...KIDNEY_MALE_CONDITIONS])
  } else if (gender === "Female" || gender === "Other") {
    return sortAlphabetically([...baseOptions, ...KIDNEY_FEMALE_CONDITIONS])
  }

  return sortAlphabetically(baseOptions)
}

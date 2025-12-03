"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  value: string | null
  onChange: (value: string | null) => void
  label?: string
  required?: boolean
  disabled?: boolean
  showPreferNotToSay?: boolean
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function DatePicker({
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  showPreferNotToSay = false,
}: DatePickerProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  const [selectedYear, setSelectedYear] = useState<number | null>(() => {
    if (value && value !== "prefer_not_to_say") {
      return new Date(value).getFullYear()
    }
    return null
  })
  const [selectedMonth, setSelectedMonth] = useState<number | null>(() => {
    if (value && value !== "prefer_not_to_say") {
      return new Date(value).getMonth()
    }
    return null
  })
  const [selectedDay, setSelectedDay] = useState<number | null>(() => {
    if (value && value !== "prefer_not_to_say") {
      return new Date(value).getDate()
    }
    return null
  })
  const [preferNotToSay, setPreferNotToSay] = useState(value === "prefer_not_to_say")

  const updateDate = (year: number | null, month: number | null, day: number | null) => {
    if (year && month !== null && day) {
      const date = new Date(year, month, day)
      onChange(date.toISOString().split("T")[0])
    }
  }

  const handlePreferNotToSay = () => {
    setPreferNotToSay(true)
    setSelectedYear(null)
    setSelectedMonth(null)
    setSelectedDay(null)
    onChange("prefer_not_to_say")
  }

  return (
    <div className="w-full space-y-3">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {!preferNotToSay && (
        <div className="grid grid-cols-3 gap-2">
          {/* Year */}
          <div className="relative">
            <select
              value={selectedYear || ""}
              onChange={(e) => {
                const year = Number.parseInt(e.target.value)
                setSelectedYear(year)
                updateDate(year, selectedMonth, selectedDay)
              }}
              disabled={disabled}
              className={cn(
                "w-full h-12 px-3 pr-8 appearance-none bg-card border border-input rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "text-sm",
              )}
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Month */}
          <div className="relative">
            <select
              value={selectedMonth !== null ? selectedMonth : ""}
              onChange={(e) => {
                const month = Number.parseInt(e.target.value)
                setSelectedMonth(month)
                updateDate(selectedYear, month, selectedDay)
              }}
              disabled={disabled}
              className={cn(
                "w-full h-12 px-3 pr-8 appearance-none bg-card border border-input rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "text-sm",
              )}
            >
              <option value="">Month</option>
              {MONTHS.map((month, i) => (
                <option key={month} value={i}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Day */}
          <div className="relative">
            <select
              value={selectedDay || ""}
              onChange={(e) => {
                const day = Number.parseInt(e.target.value)
                setSelectedDay(day)
                updateDate(selectedYear, selectedMonth, day)
              }}
              disabled={disabled}
              className={cn(
                "w-full h-12 px-3 pr-8 appearance-none bg-card border border-input rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "text-sm",
              )}
            >
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      )}

      {showPreferNotToSay && (
        <button
          type="button"
          onClick={handlePreferNotToSay}
          className={cn(
            "w-full py-3 px-4 text-sm rounded-lg border transition-colors",
            preferNotToSay
              ? "bg-secondary border-primary text-foreground"
              : "bg-card border-input text-muted-foreground hover:bg-secondary",
          )}
        >
          Prefer not to say
        </button>
      )}

      {preferNotToSay && (
        <button
          type="button"
          onClick={() => {
            setPreferNotToSay(false)
            onChange(null)
          }}
          className="text-sm text-primary hover:underline"
        >
          Enter date instead
        </button>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>Approximate date is acceptable</span>
      </div>
    </div>
  )
}

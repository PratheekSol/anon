"use client"

import { cn } from "@/lib/utils"

interface YesNoToggleProps {
  value: boolean | null
  onChange: (value: boolean) => void
  disabled?: boolean
  yesLabel?: string
  noLabel?: string
}

export function YesNoToggle({ value, onChange, disabled = false, yesLabel = "Yes", noLabel = "No" }: YesNoToggleProps) {
  return (
    <div className="flex gap-3 w-full" role="radiogroup" aria-label="Yes or No selection">
      <button
        type="button"
        role="radio"
        aria-checked={value === true}
        disabled={disabled}
        onClick={() => onChange(true)}
        className={cn(
          "flex-1 py-4 px-6 rounded-lg text-base font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "min-h-[56px]",
          value === true
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        )}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={value === false}
        disabled={disabled}
        onClick={() => onChange(false)}
        className={cn(
          "flex-1 py-4 px-6 rounded-lg text-base font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "min-h-[56px]",
          value === false
            ? "bg-muted text-foreground shadow-md border-2 border-foreground/20"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        )}
      >
        {noLabel}
      </button>
    </div>
  )
}

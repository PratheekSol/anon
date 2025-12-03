"use client"

import type React from "react"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface NumericInputProps {
  value: number | null
  onChange: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  label?: string
  required?: boolean
  disabled?: boolean
  showSlider?: boolean
}

export function NumericInput({
  value,
  onChange,
  min = 0,
  max = 300,
  step = 1,
  placeholder = "Enter value",
  label,
  required = false,
  disabled = false,
  showSlider = true,
}: NumericInputProps) {
  const [inputValue, setInputValue] = useState(value?.toString() || "")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    const num = Number.parseFloat(val)
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num)
    } else if (val === "") {
      onChange(null)
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number.parseFloat(e.target.value)
    onChange(num)
    setInputValue(num.toString())
  }

  const increment = () => {
    const newVal = Math.min((value || min) + step, max)
    onChange(newVal)
    setInputValue(newVal.toString())
  }

  const decrement = () => {
    const newVal = Math.max((value || min) - step, min)
    onChange(newVal)
    setInputValue(newVal.toString())
  }

  return (
    <div className="w-full space-y-3">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || (value !== null && value <= min)}
          className={cn(
            "w-12 h-12 rounded-lg bg-secondary flex items-center justify-center",
            "hover:bg-secondary/80 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            (disabled || (value !== null && value <= min)) && "opacity-50 cursor-not-allowed",
          )}
          aria-label="Decrease value"
        >
          <Minus className="w-5 h-5" />
        </button>

        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            "flex-1 h-12 px-4 text-center text-lg font-medium",
            "bg-card border border-input rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          )}
        />

        <button
          type="button"
          onClick={increment}
          disabled={disabled || (value !== null && value >= max)}
          className={cn(
            "w-12 h-12 rounded-lg bg-secondary flex items-center justify-center",
            "hover:bg-secondary/80 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            (disabled || (value !== null && value >= max)) && "opacity-50 cursor-not-allowed",
          )}
          aria-label="Increase value"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showSlider && (
        <input
          type="range"
          value={value || min}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
        />
      )}

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

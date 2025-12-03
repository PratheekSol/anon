"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface HeightWeightInputProps {
  type: "height" | "weight"
  value: { amount: number | null; unit: string } | null
  onChange: (value: { amount: number | null; unit: string }) => void
  units: string[]
  label?: string
  required?: boolean
  disabled?: boolean
}

export function HeightWeightInput({
  type,
  value,
  onChange,
  units,
  label,
  required = false,
  disabled = false,
}: HeightWeightInputProps) {
  const [selectedUnit, setSelectedUnit] = useState(value?.unit || units[0])
  const [amount, setAmount] = useState(value?.amount?.toString() || "")

  const getRange = () => {
    if (type === "height") {
      return selectedUnit === "CM" ? { min: 50, max: 250, step: 1 } : { min: 20, max: 100, step: 0.5 }
    }
    return selectedUnit === "KG" ? { min: 20, max: 300, step: 0.5 } : { min: 45, max: 660, step: 1 }
  }

  const range = getRange()

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setAmount(val)
    const num = Number.parseFloat(val)
    if (!isNaN(num)) {
      onChange({ amount: num, unit: selectedUnit })
    } else if (val === "") {
      onChange({ amount: null, unit: selectedUnit })
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number.parseFloat(e.target.value)
    setAmount(num.toString())
    onChange({ amount: num, unit: selectedUnit })
  }

  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit)
    onChange({ amount: value?.amount || null, unit })
  }

  return (
    <div className="w-full space-y-4">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Unit toggle */}
      <div className="flex rounded-lg overflow-hidden border border-input">
        {units.map((unit) => (
          <button
            key={unit}
            type="button"
            onClick={() => handleUnitChange(unit)}
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium transition-colors",
              selectedUnit === unit
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-secondary",
            )}
          >
            {unit}
          </button>
        ))}
      </div>

      {/* Numeric input */}
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder={`Enter ${type}`}
          min={range.min}
          max={range.max}
          step={range.step}
          disabled={disabled}
          className={cn(
            "flex-1 h-14 px-4 text-center text-xl font-medium",
            "bg-card border border-input rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          )}
        />
        <span className="text-lg font-medium text-muted-foreground w-12">{selectedUnit}</span>
      </div>

      {/* Slider */}
      <input
        type="range"
        value={value?.amount || range.min}
        onChange={handleSliderChange}
        min={range.min}
        max={range.max}
        step={range.step}
        disabled={disabled}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {range.min} {selectedUnit}
        </span>
        <span>
          {range.max} {selectedUnit}
        </span>
      </div>
    </div>
  )
}

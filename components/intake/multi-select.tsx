"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, Check, X, PenLine } from "lucide-react"
import { cn } from "@/lib/utils"

interface MultiSelectProps {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  required?: boolean
  showOtherButton?: boolean
  otherValue?: string
  onOtherChange?: (value: string) => void
  helperText?: string
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select all that apply",
  label,
  disabled = false,
  required = false,
  showOtherButton = true, // Default to true per requirements
  otherValue = "",
  onOtherChange,
  helperText,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [showOtherInput, setShowOtherInput] = useState(!!otherValue)
  const [localOtherValue, setLocalOtherValue] = useState(otherValue)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const otherInputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter((opt) => opt.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (showOtherInput && otherInputRef.current) {
      otherInputRef.current.focus()
    }
  }, [showOtherInput])

  const toggleOption = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt))
    } else {
      onChange([...value, opt])
    }
  }

  const removeOption = (opt: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(value.filter((v) => v !== opt))
  }

  const handleOtherClick = () => {
    setShowOtherInput(true)
    setIsOpen(false)
  }

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalOtherValue(newValue)
    onOtherChange?.(newValue)
  }

  const removeOtherValue = () => {
    setLocalOtherValue("")
    setShowOtherInput(false)
    onOtherChange?.("")
  }

  return (
    <div ref={containerRef} className="relative w-full space-y-3">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-lg",
          "bg-card border border-input text-left",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          "min-h-[48px]",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <div className="flex flex-wrap gap-1.5 flex-1 mr-2">
          {value.length === 0 && !localOtherValue ? (
            <span className="text-muted-foreground text-base">{placeholder}</span>
          ) : (
            <>
              {value.slice(0, 3).map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-sm rounded"
                >
                  {v}
                  <button type="button" onClick={(e) => removeOption(v, e)} className="hover:text-primary/70">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {value.length > 3 && <span className="text-sm text-muted-foreground">+{value.length - 3} more</span>}
            </>
          )}
        </div>
        <ChevronDown
          className={cn("w-5 h-5 text-muted-foreground transition-transform flex-shrink-0", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-input rounded-lg shadow-lg max-h-[300px] overflow-hidden">
          {/* Search input */}
          {options.length > 10 && (
            <div className="p-2 border-b border-border sticky top-0 bg-card">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Selected count */}
          {value.length > 0 && (
            <div className="px-3 py-1.5 text-xs text-muted-foreground border-b border-border bg-secondary/50">
              {value.length} selected
            </div>
          )}

          {/* Options list */}
          <div className="overflow-y-auto max-h-[220px]" role="listbox" aria-multiselectable="true">
            {filteredOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={value.includes(opt)}
                onClick={() => toggleOption(opt)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm",
                  "hover:bg-secondary transition-colors",
                  value.includes(opt) && "bg-primary/5",
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                    value.includes(opt) ? "bg-primary border-primary" : "border-input",
                  )}
                >
                  {value.includes(opt) && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span>{opt}</span>
              </button>
            ))}

            {filteredOptions.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">No options found</div>
            )}
          </div>
        </div>
      )}

      {showOtherButton && !showOtherInput && (
        <button
          type="button"
          onClick={handleOtherClick}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg",
            "border-2 border-dashed border-primary/40 bg-primary/5",
            "text-primary font-medium text-sm",
            "hover:border-primary hover:bg-primary/10 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          )}
        >
          <PenLine className="w-4 h-4" />
          Other (type manually)
        </button>
      )}

      {showOtherInput && (
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex-1 relative">
            <input
              ref={otherInputRef}
              type="text"
              value={localOtherValue}
              onChange={handleOtherInputChange}
              placeholder="Type your condition..."
              className={cn(
                "w-full px-4 py-3 rounded-lg",
                "bg-card border border-primary text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "placeholder:text-muted-foreground",
              )}
            />
            {localOtherValue && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                Custom entry
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={removeOtherValue}
            className="p-3 rounded-lg border border-input hover:bg-secondary transition-colors"
            aria-label="Remove custom entry"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      )}

      {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  )
}

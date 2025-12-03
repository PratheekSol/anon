"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, Check, X, PenLine } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchableDropdownProps {
  options: string[]
  value: string | null
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  required?: boolean
  showOtherButton?: boolean
  otherValue?: string
  onOtherChange?: (value: string) => void
}

export function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder = "— Select —",
  label,
  disabled = false,
  required = false,
  showOtherButton = true, // Default to true per requirements
  otherValue = "",
  onOtherChange,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [showOtherInput, setShowOtherInput] = useState(!!otherValue)
  const [localOtherValue, setLocalOtherValue] = useState(otherValue)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const otherInputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter((opt) => opt.toLowerCase().includes(search.toLowerCase()))

  // Group by first letter for long lists
  const groupedOptions = filteredOptions.reduce(
    (acc, opt) => {
      const letter = opt[0].toUpperCase()
      if (!acc[letter]) acc[letter] = []
      acc[letter].push(opt)
      return acc
    },
    {} as Record<string, string[]>,
  )

  const showGrouping = options.length > 15

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
          "min-h-[48px] text-base",
          disabled && "opacity-50 cursor-not-allowed",
          !value && !localOtherValue && "text-muted-foreground",
        )}
      >
        <span className="truncate">{localOtherValue ? `Other: ${localOtherValue}` : value || placeholder}</span>
        <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
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

          {/* Options list */}
          <div className="overflow-y-auto max-h-[240px]" role="listbox">
            {showGrouping
              ? Object.entries(groupedOptions)
                  .sort()
                  .map(([letter, opts]) => (
                    <div key={letter}>
                      <div className="px-3 py-1 text-xs font-semibold text-muted-foreground bg-secondary sticky top-0">
                        {letter}
                      </div>
                      {opts.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          role="option"
                          aria-selected={value === opt}
                          onClick={() => {
                            onChange(opt)
                            setIsOpen(false)
                            setSearch("")
                            setShowOtherInput(false)
                            setLocalOtherValue("")
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-2.5 text-left text-sm",
                            "hover:bg-secondary transition-colors",
                            value === opt && "bg-primary/10 text-primary",
                          )}
                        >
                          <span>{opt}</span>
                          {value === opt && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  ))
              : filteredOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="option"
                    aria-selected={value === opt}
                    onClick={() => {
                      onChange(opt)
                      setIsOpen(false)
                      setSearch("")
                      setShowOtherInput(false)
                      setLocalOtherValue("")
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2.5 text-left text-sm",
                      "hover:bg-secondary transition-colors",
                      value === opt && "bg-primary/10 text-primary",
                    )}
                  >
                    <span>{opt}</span>
                    {value === opt && <Check className="w-4 h-4" />}
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
              placeholder="Type your entry..."
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
    </div>
  )
}

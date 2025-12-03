"use client"

import type { ReactNode } from "react"
import { TooltipIcon } from "./tooltip-icon"
import { cn } from "@/lib/utils"

interface QuestionBubbleProps {
  question: string
  tooltip?: string
  isOptional?: boolean
  children: ReactNode
  className?: string
}

export function QuestionBubble({ question, tooltip, isOptional = false, children, className }: QuestionBubbleProps) {
  return (
    <div className={cn("animate-in fade-in slide-in-from-bottom-4 duration-300", className)}>
      {/* System message bubble */}
      <div className="flex gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <div className="flex items-start gap-2">
              <p className="text-base font-medium text-foreground flex-1">
                {question}
                {isOptional && <span className="ml-2 text-xs font-normal text-muted-foreground">(Optional)</span>}
              </p>
              {tooltip && <TooltipIcon content={tooltip} />}
            </div>
          </div>
        </div>
      </div>

      {/* User response area */}
      <div className="pl-14">{children}</div>
    </div>
  )
}

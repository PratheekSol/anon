"use client"

import { X, Mail, Phone, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl max-w-md w-full shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Need Help?</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            If you have questions about this intake form or need assistance, please contact our support team.
          </p>

          <div className="space-y-3">
            <a
              href="mailto:support@example.com"
              className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Email Support</p>
                <p className="text-xs text-muted-foreground">support@example.com</p>
              </div>
            </a>

            <a
              href="tel:+1234567890"
              className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Phone Support</p>
                <p className="text-xs text-muted-foreground">+1 (234) 567-890</p>
              </div>
            </a>

            <a
              href="#faq"
              className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <HelpCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">FAQ</p>
                <p className="text-xs text-muted-foreground">Common questions answered</p>
              </div>
            </a>
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

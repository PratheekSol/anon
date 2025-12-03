"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, File, X, Check, AlertCircle } from "lucide-react"
import { DOCUMENT_TYPES } from "@/lib/intake-data"
import { useIntakeStore } from "@/lib/intake-store"
import { QuestionBubble } from "./question-bubble"
import { SearchableDropdown } from "./searchable-dropdown"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  documentType: string
  notes: string
  preview?: string
}

interface DocumentUploadProps {
  onComplete?: () => void
}

export function DocumentUpload({ onComplete }: DocumentUploadProps) {
  const { answers, setAnswer } = useIntakeStore()
  const existingAnswer = answers["document_upload"]

  const [files, setFiles] = useState<UploadedFile[]>((existingAnswer?.value as UploadedFile[]) || [])
  const [currentDocType, setCurrentDocType] = useState<string | null>(null)
  const [currentNotes, setCurrentNotes] = useState("")
  const [otherDocType, setOtherDocType] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.type,
      size: file.size,
      documentType: currentDocType || otherDocType || "Unspecified",
      notes: currentNotes,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }))

    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)
    setAnswer("document_upload", updatedFiles)

    // Reset form
    setCurrentDocType(null)
    setCurrentNotes("")
    setOtherDocType("")
  }

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter((f) => f.id !== fileId)
    setFiles(updatedFiles)
    setAnswer("document_upload", updatedFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <QuestionBubble
      question="Upload your medical documents"
      tooltip="Upload ECG, scans, blood reports, etc."
      isOptional={true}
    >
      <div className="space-y-6">
        {/* Document type selector */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">Document Type</label>
          <SearchableDropdown
            options={DOCUMENT_TYPES}
            value={currentDocType}
            onChange={setCurrentDocType}
            placeholder="Select document type..."
            showOtherButton={true}
            otherValue={otherDocType}
            onOtherChange={setOtherDocType}
          />
        </div>

        {/* Optional notes */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Notes (optional)</label>
          <textarea
            value={currentNotes}
            onChange={(e) => setCurrentNotes(e.target.value)}
            placeholder="Add any notes about this document..."
            className="w-full px-4 py-3 rounded-lg bg-card border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground resize-none"
            rows={2}
          />
        </div>

        {/* Drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 transition-colors cursor-pointer",
            "flex flex-col items-center justify-center gap-4",
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/50",
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileInput}
            className="hidden"
          />

          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              dragActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
            )}
          >
            <Upload className="w-8 h-8" />
          </div>

          <div className="text-center">
            <p className="text-base font-medium text-foreground">
              {dragActive ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">or click to browse (images and PDFs supported)</p>
          </div>
        </div>

        {/* Uploaded files list */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Uploaded Files ({files.length})</h4>
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                  {file.preview ? (
                    <img
                      src={file.preview || "/placeholder.svg"}
                      alt={file.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center">
                      <File className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.documentType} • {formatFileSize(file.size)}
                    </p>
                    {file.notes && <p className="text-xs text-muted-foreground mt-1 truncate">Note: {file.notes}</p>}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-secondary rounded transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info message */}
        <div className="flex items-start gap-2 p-3 bg-secondary/50 rounded-lg">
          <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Your documents are stored securely and will only be accessible to your healthcare provider. You can upload
            multiple files by selecting them together or dropping them all at once.
          </p>
        </div>
      </div>
    </QuestionBubble>
  )
}

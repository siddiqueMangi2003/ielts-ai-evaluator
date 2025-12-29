"use client"

import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface TranscriptDisplayProps {
  transcript: string
  isLoading: boolean
}

export function TranscriptDisplay({ transcript, isLoading }: TranscriptDisplayProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Transcript</h3>
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </Card>
    )
  }

  if (!transcript) return null

  // Highlight pauses and fillers
  const highlightedTranscript = transcript.split(" ").map((word, idx) => {
    if (word === "(pause)") {
      return (
        <span
          key={idx}
          className="inline-block mx-1 px-2 py-1 bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded text-sm font-medium"
        >
          pause
        </span>
      )
    }
    if (word.match(/$$um$$|$$uh$$|$$er$$/i)) {
      return (
        <span
          key={idx}
          className="inline-block mx-1 px-2 py-1 bg-rose-500/20 text-rose-700 dark:text-rose-400 rounded text-sm font-medium"
        >
          {word.replace(/[()]/g, "")}
        </span>
      )
    }
    return <span key={idx}>{word} </span>
  })

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">Transcript</h3>
      </div>
      <div className="prose prose-sm max-w-none">
        <p className="leading-relaxed text-foreground">{highlightedTranscript}</p>
      </div>
      <div className="mt-4 flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500/20" />
          <span className="text-muted-foreground">Pauses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-rose-500/20" />
          <span className="text-muted-foreground">Fillers</span>
        </div>
      </div>
    </Card>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { Award, TrendingUp, Target } from "lucide-react"

interface EvaluationCardProps {
  evaluation: string
  isLoading: boolean
}

export function EvaluationCard({ evaluation, isLoading }: EvaluationCardProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Evaluation</h3>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </Card>
    )
  }

  if (!evaluation) return null

  // Parse evaluation text
  const lines = evaluation.split("\n").filter((line) => line.trim())
  let bandScore = ""
  const strengths: string[] = []
  const improvements: string[] = []
  let currentSection = ""

  lines.forEach((line) => {
    if (line.toLowerCase().startsWith("band:")) {
      bandScore = line.replace(/band:/i, "").trim()
    } else if (line.toLowerCase().startsWith("strengths:")) {
      currentSection = "strengths"
      const content = line.replace(/strengths:/i, "").trim()
      if (content) strengths.push(content)
    } else if (line.toLowerCase().startsWith("improvements:")) {
      currentSection = "improvements"
      const content = line.replace(/improvements:/i, "").trim()
      if (content) improvements.push(content)
    } else if (currentSection === "strengths" && line.trim()) {
      strengths.push(line.trim())
    } else if (currentSection === "improvements" && line.trim()) {
      improvements.push(line.trim())
    }
  })

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">IELTS Evaluation</h3>
      </div>

      {/* Band Score */}
      {bandScore && (
        <div className="mb-6 p-6 bg-primary/10 rounded-lg text-center">
          <div className="text-sm text-muted-foreground mb-2">Band Score</div>
          <div className="text-5xl font-bold text-primary">{bandScore}</div>
        </div>
      )}

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h4 className="font-semibold text-emerald-600">Strengths</h4>
          </div>
          <ul className="space-y-2">
            {strengths.map((strength, idx) => (
              <li key={idx} className="text-sm leading-relaxed pl-4 border-l-2 border-emerald-600/30">
                {strength}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements */}
      {improvements.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-600">Areas for Improvement</h4>
          </div>
          <ul className="space-y-2">
            {improvements.map((improvement, idx) => (
              <li key={idx} className="text-sm leading-relaxed pl-4 border-l-2 border-blue-600/30">
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Raw evaluation if parsing fails */}
      {!bandScore && (
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">{evaluation}</pre>
        </div>
      )}
    </Card>
  )
}

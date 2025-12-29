"use client"

import { Card } from "@/components/ui/card"
import { Play } from "lucide-react"

const questions = [
  {
    id: 1,
    category: "Part 1",
    question: "Describe your hometown. What do you like most about it?",
    videoPlaceholder: "IELTS speaking practice question about hometown",
  },
  {
    id: 2,
    category: "Part 2",
    question: "Describe a memorable trip you have taken. Where did you go and what made it special?",
    videoPlaceholder: "IELTS speaking practice about travel experiences",
  },
  {
    id: 3,
    category: "Part 1",
    question: "What are your hobbies? How often do you practice them?",
    videoPlaceholder: "IELTS speaking practice about hobbies and interests",
  },
  {
    id: 4,
    category: "Part 3",
    question: "How has technology changed the way people communicate?",
    videoPlaceholder: "IELTS speaking practice about technology impact",
  },
]

export function QuestionsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {questions.map((question) => (
        <Card key={question.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
          {/* Video Placeholder */}
          <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            <Play className="w-16 h-16 text-primary/60 group-hover:scale-110 transition-transform" />
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                {question.category}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="p-5">
            <p className="text-foreground font-medium leading-relaxed text-pretty">{question.question}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

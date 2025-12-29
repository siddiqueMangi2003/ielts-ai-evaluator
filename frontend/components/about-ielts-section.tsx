import { BookOpen, Mic, Clock, Award } from "lucide-react"
import { Card } from "@/components/ui/card"

export function AboutIeltsSection() {
  const features = [
    {
      icon: Mic,
      title: "Speaking Test Format",
      description:
        "The IELTS Speaking test consists of three parts: introduction, individual long turn, and two-way discussion.",
    },
    {
      icon: Clock,
      title: "Test Duration",
      description: "The speaking test takes 11-14 minutes and is conducted face-to-face with a certified examiner.",
    },
    {
      icon: Award,
      title: "Band Score System",
      description: "Scores range from 0-9 based on fluency, lexical resource, grammatical range, and pronunciation.",
    },
    {
      icon: BookOpen,
      title: "Practice Makes Perfect",
      description: "Regular practice with AI feedback helps improve your speaking skills and confidence for test day.",
    },
  ]

  return (
    <section id="about-ielts" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">About IELTS Speaking</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Understand the IELTS Speaking test format and how our AI evaluation helps you prepare effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 p-8 rounded-xl bg-card border">
          <h3 className="text-2xl font-semibold mb-4">How Our AI Evaluator Helps</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-primary">Real-Time Feedback</h4>
              <p className="text-muted-foreground text-pretty">
                Get instant band scores and detailed analysis of your speaking performance, identifying areas for
                improvement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">Pronunciation Analysis</h4>
              <p className="text-muted-foreground text-pretty">
                Our AI detects pauses, fillers, and pronunciation issues to help you speak more fluently and naturally.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">Unlimited Practice</h4>
              <p className="text-muted-foreground text-pretty">
                Practice as many times as you want with diverse question types covering all IELTS topics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">Track Progress</h4>
              <p className="text-muted-foreground text-pretty">
                Monitor your improvement over time and focus on specific skills that need more attention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

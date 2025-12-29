import { QuestionsList } from "@/components/questions-list"
import { AudioRecorder } from "@/components/audio-recorder"
import { Navbar } from "@/components/navbar"
import { AboutIeltsSection } from "@/components/about-ielts-section"
import { AboutUsSection } from "@/components/about-us-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              IELTS Speaking <span className="text-primary">AI Evaluator</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Practice IELTS Speaking with AI-powered evaluation. Record your answers and get instant band scores with
              detailed feedback.
            </p>
          </header>

          {/* Questions Section */}
          <section id="practice" className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Practice Questions</h2>
            <QuestionsList />
          </section>

          {/* Recorder Section */}
          <section>
            <AudioRecorder />
          </section>
        </div>
      </main>

      <AboutIeltsSection />
      <AboutUsSection />
      <PricingSection />
      <Footer />
    </>
  )
}

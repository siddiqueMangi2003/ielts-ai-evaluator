"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, Square, Upload, Loader2 } from "lucide-react"
import { AudioWaveform } from "@/components/audio-waveform"
import { TranscriptDisplay } from "@/components/transcript-display"
import { EvaluationCard } from "@/components/evaluation-card"
import { useToast } from "@/hooks/use-toast"

export function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [transcript, setTranscript] = useState<string>("")
  const [evaluation, setEvaluation] = useState<string>("")

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { toast } = useToast()

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      toast({
        title: "Recording started",
        description: "Speak clearly and naturally",
      })
    } catch (error) {
      console.error("[v0] Error starting recording:", error)
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAudioBlob(file)
      setAudioUrl(URL.createObjectURL(file))
      toast({
        title: "File uploaded",
        description: file.name,
      })
    }
  }

  const evaluateAudio = async () => {
    if (!audioBlob) return

    setIsLoading(true)
    setTranscript("")
    setEvaluation("")

    try {
      const formData = new FormData()
      formData.append("file", audioBlob, "recording.webm")

      // Replace with your actual backend URL
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

      const response = await fetch(`${backendUrl}/evaluate-speaking`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Evaluation failed")
      }

      const data = await response.json()
      console.log("[v0] Evaluation response:", data)

      setTranscript(data.transcript)
      setEvaluation(data.evaluation)

      toast({
        title: "Evaluation complete",
        description: "Your speaking has been analyzed",
      })
    } catch (error) {
      console.error("[v0] Error evaluating audio:", error)
      toast({
        title: "Error",
        description: "Could not evaluate audio. Check backend connection.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Recording Controls */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold mb-6">Record Your Answer</h3>

        {/* Waveform Visualization */}
        {isRecording && (
          <div className="mb-6">
            <AudioWaveform isActive={isRecording} />
          </div>
        )}

        {/* Audio Preview */}
        {audioUrl && !isRecording && (
          <div className="mb-6">
            <audio src={audioUrl} controls className="w-full" />
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {!isRecording ? (
            <>
              <Button size="lg" onClick={startRecording} disabled={isLoading} className="min-w-[140px]">
                <Mic className="w-5 h-5 mr-2" />
                Record
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="min-w-[140px]"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload
              </Button>
              <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
            </>
          ) : (
            <Button size="lg" variant="destructive" onClick={stopRecording} className="min-w-[140px]">
              <Square className="w-5 h-5 mr-2" />
              Stop
            </Button>
          )}

          {audioBlob && !isRecording && (
            <Button size="lg" onClick={evaluateAudio} disabled={isLoading} className="min-w-[140px]">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Evaluating...
                </>
              ) : (
                "Get Evaluation"
              )}
            </Button>
          )}
        </div>
      </Card>

      {/* Results Section */}
      {(transcript || evaluation || isLoading) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TranscriptDisplay transcript={transcript} isLoading={isLoading} />
          <EvaluationCard evaluation={evaluation} isLoading={isLoading} />
        </div>
      )}
    </div>
  )
}

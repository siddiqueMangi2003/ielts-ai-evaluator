"use client"

interface AudioWaveformProps {
  isActive: boolean
}

export function AudioWaveform({ isActive }: AudioWaveformProps) {
  return (
    <div className="flex items-center justify-center gap-1 h-24 bg-muted/50 rounded-lg p-4">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-primary rounded-full transition-all duration-150"
          style={{
            height: isActive ? `${Math.random() * 60 + 20}%` : "20%",
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  )
}

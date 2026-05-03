"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Clock, Sprout, Upload } from "lucide-react"

interface HistoryEntry {
  id: number
  date: string
  type: string
  summary: string
}

export default function HistoryPage() {
  const router = useRouter()
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("cropResult")
    const savedForm = localStorage.getItem("formData")
    if (saved && savedForm) {
      const result = JSON.parse(saved)
      const form = JSON.parse(savedForm)
      setHistory([
        {
          id: 1,
          date: new Date().toISOString().split("T")[0],
          type: "Crop Analysis",
          summary: `Analysed soil data — N:${form.nitrogen}, P:${form.phosphorus}, K:${form.potassium}, pH:${form.ph}. Recommended: ${result.predicted_crop} with ${result.confidence}% confidence.`,
        },
      ])
    }
  }, [])

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="rounded-2xl bg-muted p-6 text-center max-w-md">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif text-xl font-bold text-foreground mb-2">
            No History Yet
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Your past analyses will appear here after you upload crop data.
          </p>
          <button
            onClick={() => router.push("/dashboard/upload")}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Upload className="h-4 w-4" />
            Go to Upload Data
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">History</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Past analyses and recommendations from your AI assistant.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {history.map((entry) => (
          <div key={entry.id} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Sprout className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{entry.type}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {entry.date}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {entry.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
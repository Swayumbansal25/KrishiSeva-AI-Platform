"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sprout, Upload, AlertTriangle, BarChart3 } from "lucide-react"

interface CropResult {
  predicted_crop: string
  confidence: number
  soil_health: string
  recommendations: string[]
  all_predictions: { name: string; confidence: number; riskLevel: string }[]
}

export default function RecommendationsPage() {
  const router = useRouter()
  const [result, setResult] = useState<CropResult | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("cropResult")
    if (saved) setResult(JSON.parse(saved))
  }, [])

  const riskColors: Record<string, { bg: string; text: string }> = {
    Low: { bg: "bg-emerald-100", text: "text-emerald-700" },
    Medium: { bg: "bg-amber-100", text: "text-amber-700" },
    High: { bg: "bg-red-100", text: "text-red-700" },
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="rounded-2xl bg-muted p-6 text-center max-w-md">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif text-xl font-bold text-foreground mb-2">
            No Data Yet
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Upload your crop data first to see AI-generated recommendations here.
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
        <h1 className="font-serif text-2xl font-bold text-foreground">Crop Recommendations</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          AI-generated crop suggestions based on your submitted soil and climate data.
        </p>
      </div>

      {/* Best Crop */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sprout className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Top Recommendation</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-primary/10 p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Best Crop</p>
            <p className="font-bold text-foreground text-lg">{result.predicted_crop}</p>
          </div>
          <div className="rounded-xl bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Confidence</p>
            <p className="font-bold text-foreground text-lg">{result.confidence}%</p>
          </div>
          <div className="rounded-xl bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Soil Health</p>
            <p className="font-bold text-foreground text-lg">{result.soil_health}</p>
          </div>
        </div>
      </div>

      {/* All Predictions */}
      {result.all_predictions?.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">All Crop Predictions</h3>
          </div>
          <div className="flex flex-col gap-3">
            {result.all_predictions.map((crop) => {
              const risk = riskColors[crop.riskLevel] ?? { bg: "bg-muted", text: "text-muted-foreground" }
              return (
                <div key={crop.name} className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{crop.name}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BarChart3 className="h-3 w-3" />
                        Confidence: {crop.confidence}%
                      </span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium ${risk.bg} ${risk.text}`}>
                    <AlertTriangle className="h-3 w-3" />
                    {crop.riskLevel}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sprout className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">AI Recommendations</h3>
        </div>
        <ul className="flex flex-col gap-2">
          {result.recommendations.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary mt-0.5">•</span> {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
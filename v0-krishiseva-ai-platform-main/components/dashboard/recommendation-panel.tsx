import { cn } from "@/lib/utils"
import { Sprout, TrendingUp, AlertTriangle, BarChart3 } from "lucide-react"
import type { PredictedCrop } from "@/lib/mock-data"

interface RecommendationPanelProps {
  predictedCrops: PredictedCrop[]
}

const riskColors: Record<string, { bg: string; text: string }> = {
  Low: { bg: "bg-emerald-100", text: "text-emerald-700" },
  Medium: { bg: "bg-amber-100", text: "text-amber-700" },
  High: { bg: "bg-red-100", text: "text-red-700" },
}

export function RecommendationPanel({ predictedCrops }: RecommendationPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Sprout className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">
          AI Crop Recommendations
        </h3>
      </div>

      {/* Placeholder: This data will be injected from the AI agent */}
      <div className="flex flex-col gap-3">
        {predictedCrops.map((crop) => {
          const risk = riskColors[crop.riskLevel]
          return (
            <div
              key={crop.name}
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{crop.name}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Yield: {crop.expectedYield}%
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Confidence: {crop.confidence}%
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium",
                  risk.bg,
                  risk.text
                )}
              >
                <AlertTriangle className="h-3 w-3" />
                {crop.riskLevel}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

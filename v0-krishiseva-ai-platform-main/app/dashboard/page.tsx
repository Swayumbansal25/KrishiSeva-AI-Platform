"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sprout, Upload, TrendingUp, Droplets, Thermometer, CloudRain, Wind, FlaskConical, AlertTriangle, BarChart3 } from "lucide-react"

interface CropResult {
  predicted_crop: string
  confidence: number
  soil_health: string
  recommendations: string[]
  all_predictions: { name: string; confidence: number; riskLevel: string }[]
}

interface FormData {
  nitrogen: string
  phosphorus: string
  potassium: string
  temperature: string
  humidity: number
  ph: number
  rainfall: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [result, setResult] = useState<CropResult | null>(null)
  const [formData, setFormData] = useState<FormData | null>(null)

  useEffect(() => {
    const savedResult = localStorage.getItem("cropResult")
    const savedForm = localStorage.getItem("formData")
    if (savedResult) setResult(JSON.parse(savedResult))
    if (savedForm) setFormData(JSON.parse(savedForm))
  }, [])

  const riskColors: Record<string, { bg: string; text: string }> = {
    Low: { bg: "bg-emerald-100", text: "text-emerald-700" },
    Medium: { bg: "bg-amber-100", text: "text-amber-700" },
    High: { bg: "bg-red-100", text: "text-red-700" },
  }

  if (!result || !formData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="rounded-2xl bg-muted p-6 text-center max-w-md">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif text-xl font-bold text-foreground mb-2">
            No Data Yet
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            You have not uploaded any crop data yet. Go to Upload Data first to get your crop recommendations and overview.
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

  const metrics = [
    { label: "Temperature", value: formData.temperature, unit: "°C", icon: Thermometer, color: "text-orange-600", bgColor: "bg-orange-50" },
    { label: "Humidity", value: formData.humidity, unit: "%", icon: Wind, color: "text-teal-600", bgColor: "bg-teal-50" },
    { label: "Rainfall", value: formData.rainfall, unit: "mm", icon: CloudRain, color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { label: "Soil pH", value: formData.ph, unit: "", icon: FlaskConical, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { label: "Nitrogen", value: formData.nitrogen, unit: "kg/ha", icon: Droplets, color: "text-blue-600", bgColor: "bg-blue-50" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your crop analysis results based on submitted soil and weather data.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
              <div className={`rounded-lg ${metric.bgColor} p-2`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </div>
            <span className="text-2xl font-bold text-foreground">
              {metric.value}
              <span className="text-sm font-normal text-muted-foreground"> {metric.unit}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sprout className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Best Recommended Crop</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-primary/10 p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Predicted Crop</p>
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

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
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
    </div>
  )
}
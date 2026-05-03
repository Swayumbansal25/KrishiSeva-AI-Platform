"use client"

import { useState } from "react"
import { Loader2, CheckCircle, Sprout, TrendingUp, BarChart3, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

interface CropResult {
  predicted_crop: string
  confidence: number
  soil_health: string
  recommendations: string[]
  all_predictions: { name: string; confidence: number; riskLevel: string }[]
}

export default function UploadPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CropResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: 50,
    ph: 6.5,
    rainfall: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSlider = (name: string, value: number) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async () => {
    if (!form.nitrogen || !form.phosphorus || !form.potassium || !form.temperature || !form.rainfall) {
      setError("Please fill in all fields before submitting.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nitrogen: parseFloat(form.nitrogen),
          phosphorus: parseFloat(form.phosphorus),
          potassium: parseFloat(form.potassium),
          temperature: parseFloat(form.temperature),
          humidity: form.humidity,
          ph: form.ph,
          rainfall: parseFloat(form.rainfall),
        }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data: CropResult = await res.json()
      setResult(data)
      // Save to localStorage so dashboard can use it
      localStorage.setItem("cropResult", JSON.stringify(data))
      localStorage.setItem("formData", JSON.stringify(form))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect to backend")
    } finally {
      setLoading(false)
    }
  }

  const riskColors: Record<string, { bg: string; text: string }> = {
    Low: { bg: "bg-emerald-100", text: "text-emerald-700" },
    Medium: { bg: "bg-amber-100", text: "text-amber-700" },
    High: { bg: "bg-red-100", text: "text-red-700" },
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Upload & Analyse Crop Data</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your soil and weather parameters to get AI-powered crop recommendations.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-foreground">Soil & Weather Parameters</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Nitrogen */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Nitrogen (N) <span className="text-muted-foreground font-normal">kg/ha</span>
            </label>
            <input
              type="number"
              name="nitrogen"
              value={form.nitrogen}
              onChange={handleChange}
              placeholder="e.g. 40"
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Phosphorus */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Phosphorus (P) <span className="text-muted-foreground font-normal">kg/ha</span>
            </label>
            <input
              type="number"
              name="phosphorus"
              value={form.phosphorus}
              onChange={handleChange}
              placeholder="e.g. 30"
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Potassium */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Potassium (K) <span className="text-muted-foreground font-normal">kg/ha</span>
            </label>
            <input
              type="number"
              name="potassium"
              value={form.potassium}
              onChange={handleChange}
              placeholder="e.g. 35"
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Temperature */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Temperature <span className="text-muted-foreground font-normal">°C</span>
            </label>
            <input
              type="number"
              name="temperature"
              value={form.temperature}
              onChange={handleChange}
              placeholder="e.g. 28.5"
              step="0.1"
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Rainfall */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Rainfall <span className="text-muted-foreground font-normal">mm</span>
            </label>
            <input
              type="number"
              name="rainfall"
              value={form.rainfall}
              onChange={handleChange}
              placeholder="e.g. 120"
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Humidity Slider */}
        <div className="mt-6 flex flex-col gap-3">
          <label className="text-sm font-medium text-foreground">
            Humidity <span className="text-muted-foreground font-normal">%</span>
            <span className="ml-2 text-primary font-semibold">{form.humidity}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={form.humidity}
            onChange={(e) => handleSlider("humidity", parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Soil pH Slider */}
        <div className="mt-6 flex flex-col gap-3">
          <label className="text-sm font-medium text-foreground">
            Soil pH
            <span className="ml-2 text-primary font-semibold">{form.ph}</span>
          </label>
          <input
            type="range"
            min={3}
            max={10}
            step={0.1}
            value={form.ph}
            onChange={(e) => handleSlider("ph", parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>3 (Acidic)</span>
            <span>6.5 (Neutral)</span>
            <span>10 (Alkaline)</span>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Analysing your crop data...</>
          ) : (
            <><Sprout className="h-4 w-4" /> Get Crop Recommendations</>
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground text-lg">Analysis Complete</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 mb-6">
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

            {result.recommendations?.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-3">Recommendations</p>
                <ul className="flex flex-col gap-2">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* All Predictions */}
          {result.all_predictions?.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">All Crop Predictions</h3>
              </div>
              <div className="flex flex-col gap-3">
                {result.all_predictions.map((crop) => {
                  const risk = riskColors[crop.riskLevel] ?? { bg: "bg-muted", text: "text-muted-foreground" }
                  return (
                    <div
                      key={crop.name}
                      className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
                    >
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

          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            <TrendingUp className="h-4 w-4" />
            View Full Overview Dashboard
          </button>
        </div>
      )}
    </div>
  )
}
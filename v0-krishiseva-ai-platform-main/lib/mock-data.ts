// ============================================================
// MOCK DATA PLACEHOLDERS
// Replace these with real AI agent outputs when integrating.
// Components accept props: { soilData, weatherData, predictedCrops, confidenceScores }
// ============================================================

export interface SoilData {
  moisture: number
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
}

export interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
}

export interface PredictedCrop {
  name: string
  expectedYield: number
  riskLevel: "Low" | "Medium" | "High"
  confidence: number
}

export interface MonthlyTrend {
  month: string
  temperature: number
  rainfall: number
}

export interface SoilNutrient {
  nutrient: string
  value: number
  optimal: number
}

export interface YieldPrediction {
  month: string
  confidence: number
}

// Current readings
export const soilData: SoilData = {
  moisture: 62,
  ph: 6.5,
  nitrogen: 45,
  phosphorus: 32,
  potassium: 38,
}

export const weatherData: WeatherData = {
  temperature: 28,
  humidity: 74,
  rainfall: 120,
}

// Recommended crops from AI agent
export const predictedCrops: PredictedCrop[] = [
  { name: "Rice (Paddy)", expectedYield: 92, riskLevel: "Low", confidence: 94 },
  { name: "Wheat", expectedYield: 85, riskLevel: "Low", confidence: 88 },
  { name: "Sugarcane", expectedYield: 78, riskLevel: "Medium", confidence: 82 },
  { name: "Maize", expectedYield: 74, riskLevel: "Medium", confidence: 79 },
  { name: "Cotton", expectedYield: 65, riskLevel: "High", confidence: 68 },
]

// Monthly trends (line chart data)
export const monthlyTrends: MonthlyTrend[] = [
  { month: "Jan", temperature: 18, rainfall: 20 },
  { month: "Feb", temperature: 21, rainfall: 15 },
  { month: "Mar", temperature: 26, rainfall: 25 },
  { month: "Apr", temperature: 32, rainfall: 40 },
  { month: "May", temperature: 36, rainfall: 55 },
  { month: "Jun", temperature: 34, rainfall: 180 },
  { month: "Jul", temperature: 30, rainfall: 250 },
  { month: "Aug", temperature: 29, rainfall: 220 },
  { month: "Sep", temperature: 28, rainfall: 160 },
  { month: "Oct", temperature: 26, rainfall: 80 },
  { month: "Nov", temperature: 22, rainfall: 30 },
  { month: "Dec", temperature: 19, rainfall: 15 },
]

// Soil nutrient levels (bar chart data)
export const soilNutrients: SoilNutrient[] = [
  { nutrient: "Nitrogen", value: 45, optimal: 60 },
  { nutrient: "Phosphorus", value: 32, optimal: 40 },
  { nutrient: "Potassium", value: 38, optimal: 45 },
  { nutrient: "Calcium", value: 52, optimal: 55 },
  { nutrient: "Iron", value: 28, optimal: 35 },
  { nutrient: "Zinc", value: 18, optimal: 25 },
]

// Yield prediction confidence (area chart data)
export const yieldPredictions: YieldPrediction[] = [
  { month: "Jan", confidence: 70 },
  { month: "Feb", confidence: 72 },
  { month: "Mar", confidence: 78 },
  { month: "Apr", confidence: 82 },
  { month: "May", confidence: 88 },
  { month: "Jun", confidence: 91 },
  { month: "Jul", confidence: 94 },
  { month: "Aug", confidence: 92 },
  { month: "Sep", confidence: 87 },
  { month: "Oct", confidence: 80 },
  { month: "Nov", confidence: 75 },
  { month: "Dec", confidence: 71 },
]

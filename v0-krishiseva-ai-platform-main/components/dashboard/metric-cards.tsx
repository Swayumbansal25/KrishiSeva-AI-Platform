import {
  Droplets,
  Thermometer,
  CloudRain,
  Wind,
  FlaskConical,
} from "lucide-react"
import type { SoilData, WeatherData } from "@/lib/mock-data"

interface MetricCardsProps {
  soilData: SoilData
  weatherData: WeatherData
}

const metrics = [
  {
    label: "Soil Moisture",
    key: "moisture" as const,
    source: "soil" as const,
    unit: "%",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Temperature",
    key: "temperature" as const,
    source: "weather" as const,
    unit: "\u00B0C",
    icon: Thermometer,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    label: "Humidity",
    key: "humidity" as const,
    source: "weather" as const,
    unit: "%",
    icon: Wind,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    label: "Rainfall",
    key: "rainfall" as const,
    source: "weather" as const,
    unit: "mm",
    icon: CloudRain,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    label: "Soil pH",
    key: "ph" as const,
    source: "soil" as const,
    unit: "",
    icon: FlaskConical,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
]

export function MetricCards({ soilData, weatherData }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {metrics.map((metric) => {
        const value =
          metric.source === "soil"
            ? soilData[metric.key as keyof SoilData]
            : weatherData[metric.key as keyof WeatherData]

        return (
          <div
            key={metric.label}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {metric.label}
              </span>
              <div className={`rounded-lg ${metric.bgColor} p-2`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </div>
            <span className="text-2xl font-bold text-foreground">
              {value}
              <span className="text-sm font-normal text-muted-foreground">
                {metric.unit}
              </span>
            </span>
          </div>
        )
      })}
    </div>
  )
}

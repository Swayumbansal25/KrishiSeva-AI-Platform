"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { SoilNutrient } from "@/lib/mock-data"

interface NutrientChartProps {
  data: SoilNutrient[]
}

export function NutrientChart({ data }: NutrientChartProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        Soil Nutrient Levels
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(80 15% 85%)" />
            <XAxis
              dataKey="nutrient"
              tick={{ fill: "hsl(140 10% 40%)", fontSize: 12 }}
              axisLine={{ stroke: "hsl(80 15% 85%)" }}
            />
            <YAxis
              tick={{ fill: "hsl(140 10% 40%)", fontSize: 12 }}
              axisLine={{ stroke: "hsl(80 15% 85%)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(40 30% 98%)",
                border: "1px solid hsl(80 15% 85%)",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar
              dataKey="value"
              name="Current"
              fill="hsl(145 63% 32%)"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="optimal"
              name="Optimal"
              fill="hsl(85 50% 45%)"
              radius={[6, 6, 0, 0]}
              opacity={0.5}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

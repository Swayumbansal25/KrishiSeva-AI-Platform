"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { MonthlyTrend } from "@/lib/mock-data"

interface TrendChartProps {
  data: MonthlyTrend[]
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        Temperature & Rainfall Trends
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(80 15% 85%)" />
            <XAxis
              dataKey="month"
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
            <Line
              type="monotone"
              dataKey="temperature"
              name="Temperature (\u00B0C)"
              stroke="hsl(25 80% 55%)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="rainfall"
              name="Rainfall (mm)"
              stroke="hsl(200 50% 50%)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { YieldPrediction } from "@/lib/mock-data"

interface YieldChartProps {
  data: YieldPrediction[]
}

export function YieldChart({ data }: YieldChartProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        Yield Prediction Confidence
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(145 63% 32%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(145 63% 32%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(80 15% 85%)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "hsl(140 10% 40%)", fontSize: 12 }}
              axisLine={{ stroke: "hsl(80 15% 85%)" }}
            />
            <YAxis
              domain={[60, 100]}
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
              formatter={(value: number) => [`${value}%`, "Confidence"]}
            />
            <Area
              type="monotone"
              dataKey="confidence"
              stroke="hsl(145 63% 32%)"
              strokeWidth={2}
              fill="url(#confidenceGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

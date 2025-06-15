"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { date: "Jan 1", sales: 2400 },
  { date: "Jan 2", sales: 1398 },
  { date: "Jan 3", sales: 9800 },
  { date: "Jan 4", sales: 3908 },
  { date: "Jan 5", sales: 4800 },
  { date: "Jan 6", sales: 3800 },
  { date: "Jan 7", sales: 4300 },
  { date: "Jan 8", sales: 5200 },
  { date: "Jan 9", sales: 3200 },
  { date: "Jan 10", sales: 6100 },
  { date: "Jan 11", sales: 4900 },
  { date: "Jan 12", sales: 7200 },
  { date: "Jan 13", sales: 5800 },
  { date: "Jan 14", sales: 6900 },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `KSh ${value}`}
        />
        <Tooltip formatter={(value) => [`KSh ${value}`, "Sales"]} labelStyle={{ color: "#000" }} />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#16a34a"
          strokeWidth={2}
          dot={{ fill: "#16a34a", strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

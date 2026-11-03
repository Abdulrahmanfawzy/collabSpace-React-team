import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ChartPoint } from "../types/project.types"

interface ProjectOverviewChartProps {
  data: ChartPoint[]
}

export function ProjectOverviewChart({ data }: ProjectOverviewChartProps) {
  return (
    <Card className="rounded-base">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-small font-semibold">Project overview</CardTitle>

        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-32 border-0 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="year">
            <SelectTrigger className="h-8 w-28 border-0 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => `${value / 1000}k`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary-blue-500)"
                fill="var(--color-primary-blue-50)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
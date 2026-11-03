import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectProgress } from "../types/project.types"

interface StatProps {
  dotClassName: string
  value: string
  label: string
}

function Stat({ dotClassName, value, label }: StatProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-small font-semibold">{value}</span>
      <span className="flex items-center gap-1 text-caption text-secondary-gray-300">
        <span className={`h-1.5 w-1.5 rounded-full ${dotClassName}`} />
        {label}
      </span>
    </div>
  )
}

interface ProjectProgressCardProps {
  progress: ProjectProgress
}

export function ProjectProgressCard({ progress }: ProjectProgressCardProps) {
  const { percent, pending, inProgress, completed, total } = progress


  const gaugeData = [
    { name: "done", value: percent },
    { name: "left", value: 100 - percent },
  ]


  const needleAngle = (percent / 100) * 180 - 90

  return (
    <Card className="rounded-base">
      <CardHeader>
        <CardTitle className="text-h6 font-semibold">Project Progress</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        {/* counter*/}
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-32.5 w-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gaugeData}
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  cx="50%"
                  cy="100%"
                  innerRadius={100}
                  outerRadius={120}
                  stroke="none"
                >
                  <Cell fill="var(--color-secondary-gray-700)" />
                  <Cell fill="var(--color-secondary-gray-50)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* العقرب */}
            <div
              className="absolute bottom-0 left-1/2 h-22 w-2 origin-bottom rounded-full bg-secondary-gray-700"
              style={{ transform: `translateX(-50%) rotate(${needleAngle}deg)` }}
            />
            <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-secondary-gray-700 bg-white" />
          </div>

          <div className="flex flex-col items-center">
            <span className="text-small font-semibold">{percent}%</span>
            <span className="text-caption text-secondary-gray-300">Project Completed</span>
          </div>
        </div>

      
        <div className="flex w-full justify-around">
          <Stat
            dotClassName="bg-secondary-gray-100"
            value={`${pending}/${total}`}
            label="Pending tasks"
          />
          <Stat
            dotClassName="bg-primary-blue-500"
            value={`${inProgress}/${total}`}
            label="In progress tasks"
          />
          <Stat
            dotClassName="bg-support-success"
            value={`${completed}/${total}`}
            label="Completed tasks"
          />
        </div>
      </CardContent>
    </Card>
  )
}
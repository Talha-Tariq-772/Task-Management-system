
"use client";

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTasks } from "@/context/taskContext"


const chartData = [{ month: "january", desktop: 1260, mobile: 570 }]

const chartConfig = {
  desktop: {
   label:"Completed ",
  
    color:"#3aafae",
  },
  mobile: {
   label:"Pending ",
    color:"#F97316",
  
  },
} satisfies ChartConfig
 function RadialChart() {
const {tasks , completed , activeTasks , pending}=useTasks();

  const tasksTotal=tasks?.length;

  console.log("Here are the complete tasks " , completed?.length  )
   console.log("Here are the pending tasks " , pending?.length  )
   const chartData=[
    {
      Completed:completed?.length,
      Pending:pending?.length,

    },
   ];

  return (
  <Card className="flex flex-col border-2 border-white shadow-none bg-[#EDEDED]">
      <CardHeader className="items-center py-1">
        <CardTitle className="text-base">Task Completion Status:</CardTitle>
        <CardDescription className="text-sm">Complete vs Pending Tasks</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center p-0"> 
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full max-w-[250px] h-[140px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={50}
            outerRadius={80}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 10}
                          className="fill-foreground text-xl font-semibold"
                        >
                          {tasksTotal}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 8}
                          className="fill-muted-foreground text-sm"
                        >
                          Tasks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>

            <RadialBar
              dataKey="Completed"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Pending"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-1 py-1 text-sm">
        <div className="flex items-center gap-1 font-medium leading-tight">
          Task completion improved by 12% this month{""} 
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none text-xs">
          Showing completed and pending tasks for the current month
        </div>
      </CardFooter>
    </Card>


  )
}


export default RadialChart
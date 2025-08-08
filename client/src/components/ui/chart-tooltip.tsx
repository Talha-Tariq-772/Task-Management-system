import * as React from "react"

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  category?: string
  value?: string
}

export function ChartTooltip({
  active,
  payload,
  label,
  category,
  value,
}: ChartTooltipProps) {
  if (!active) return null

  return (
    <div className="rounded-md bg-white p-4 shadow-md">
      <p className="font-medium">{label}</p>
      {payload?.map((item, index) => (
        <div key={index} className="mt-1 flex items-center">
          <span
            className="mr-2 h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm">
            {category && `${item.dataKey}: `}
            {value && `${item.value}`}
          </span>
        </div>
      ))}
    </div>
  )
}
// src/components/ui/chart-config.ts
import type { ChartConfig } from "./chart";

/**
 * Each top‐level key (e.g. "desktop", "mobile", "tablet") must match the
 * dataKey used in your RadialBar/RadialBarChart.  The "color" must be a valid
 * CSS variable (we use var(--chart-1), etc.).
 */
export const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop Users",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile Users",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet Users",
    color: "var(--chart-3)",
  },
};

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { dataset, valueFormatter } from "./dataset/weather";

const chartSetting = {
  width: 1000,
  height: 480,
};

export function BarChartDiagram() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        { dataKey: "london", label: "London", valueFormatter },
        { dataKey: "paris", label: "Paris", valueFormatter },
        { dataKey: "newYork", label: "New York", valueFormatter },
        { dataKey: "seoul", label: "Seoul", valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}

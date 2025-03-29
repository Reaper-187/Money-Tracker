import React from "react";
import { Overview } from "@c/Overview/Overview";

import BarChartComponent from "@c/Charts/BarChart/BarChartComp";
import PieChartComponent from "@c/Charts/PieChart/PieChartComp";

import "./Dashboard.scss";

export function Dashboard() {
  return (
    <>
      <Overview />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 chart-container">
        <BarChartComponent />
        <PieChartComponent />
      </div>
    </>
  );
}

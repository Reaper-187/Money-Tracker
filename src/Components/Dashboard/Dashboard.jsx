import React from "react";
import { Overview } from "../Overview/Overview";
// import { BarChartDiagram } from "../Charts/BarChart/BarChart";
// import { PieChartDiagram } from "../Charts/PieChart/PieChart";

import BarChartComponent from "../Charts/BarChart/BarChartComp";
import PieChartComponent from "../Charts/PieChart/PieChartComp";

import "./Dashboard.scss";

export function Dashboard() {
  return (
    <>
      <Overview />
      {/* <div className="chart-diagram">
        <BarChartDiagram />
        <PieChartDiagram />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <BarChartComponent />
        <PieChartComponent />
      </div>
    </>
  );
}

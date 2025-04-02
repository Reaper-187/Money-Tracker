import React from "react";
import { Overview } from "@c/Overview/Overview";

import BarChartComponent from "@c/Charts/BarChart/BarChartComp";
import PieChartComponent from "@c/Charts/PieChart/PieChartComp";

// import "./Dashboard.css";
import { DatePickerWithRange } from "@c/Datepicker/DatePicker";

export function Dashboard() {
  return (
    <>
      <Overview />
      <div className="flex justify-center date-range-picker">
        <DatePickerWithRange />
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 p-6 chart-container">
        <BarChartComponent />
        <PieChartComponent />
      </div>
    </>
  );
}

import React, { useState } from "react";
import { subDays } from "date-fns";
import { Overview } from "@c/Overview/Overview";
import BarChartComponent from "@c/Charts/BarChart/BarChartComp";
import PieChartComponent from "@c/Charts/PieChart/PieChartComp";
import { DatePickerWithRange } from "@c/Datepicker/DatePicker";

export function Dashboard() {
  const [date, setDate] = useState({
    from:subDays(new Date(), 10),
    to: new Date(),
  });

  
  const handleDateChange = (newDateRange) => {
    if (newDateRange) {
      setDate((prev) => ({
        from: newDateRange.from ?? prev.from,
        to: newDateRange.to ?? prev.to,
      }));
    }
  };
  
  

  return (
    <>
      <Overview date={date}/>
      <div className="flex justify-center date-range-picker">
        <DatePickerWithRange date={date} onDateChange={handleDateChange} />
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 p-6 chart-container">
        <BarChartComponent date={date} />
        <PieChartComponent date={date}/>
      </div>
    </>
  );
}

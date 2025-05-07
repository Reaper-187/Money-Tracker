import React, { useState } from "react";
import { Overview } from "@c/Overview/Overview";
import BarChartComponent from "@c/Charts/BarChart/BarChartComp";
import PieChartComponent from "@c/Charts/PieChart/PieChartComp";
import { DatePickerWithRange } from "@c/Datepicker/DatePicker";
import { motion } from "motion/react";

export function Dashboard() {
  const [date, setDate] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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
      <Overview date={date} />
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 20,
            x: 10,
          },
          visible: { opacity: 1, x: 0, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.65 }}
        className="flex justify-center date-range-picker"
      >
        <DatePickerWithRange date={date} onDateChange={handleDateChange} />
      </motion.div>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 20,
            x: 10,
          },
          visible: { opacity: 1, x: 0, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.75 }}
        className="grid xl:grid-cols-2 md:grid-cols-1 gap-4 p-3 chart-container"
      >
        <BarChartComponent date={date} />

        <PieChartComponent date={date} />
      </motion.div>
    </>
  );
}

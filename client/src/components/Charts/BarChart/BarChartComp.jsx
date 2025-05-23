import { useContext, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { FetchTransactionsContext } from "@c/Context/Context";
import { isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { useMediaQuery } from "react-responsive";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-black">
        <p className="font-semibold">{label}</p>
        <p className="text-green-600">Income: {payload[0].payload.income} €</p>
        <p className="text-red-600">
          Expenses: {payload[0].payload.expenses} €
        </p>
      </div>
    );
  }

  return null;
};

export default function BarChartComponent({ date }) {
  const { selectTransactions } = useContext(FetchTransactionsContext);

  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  const filteredTransactions = selectTransactions.filter((tx) =>
    isWithinInterval(new Date(tx.date), {
      start: startOfDay(new Date(date.from)),
      end: endOfDay(new Date(date.to)),
    })
  );

  const groupedByDay = filteredTransactions.reduce((acc, tx) => {
    const dateObj = new Date(tx.date);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    const date = `${day}.${month}.${year}`;

    if (!acc[date]) {
      acc[date] = { date, income: 0, expenses: 0 };
    }

    if (tx.amount >= 0) {
      acc[date].income += tx.amount;
    } else {
      acc[date].expenses += Math.abs(tx.amount);
    }

    return acc;
  }, {});

  const groupedArray = Object.values(groupedByDay).sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split(".");
    const [dayB, monthB, yearB] = b.date.split(".");

    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

    return dateA - dateB;
  });

  const data = groupedArray;

  return (
    <Card className="w-full bg-transparent p-4 mx-3">
      <CardContent>
        <h2 className="text-lg text-center font-semibold">Overview</h2>
        <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 370}>
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              tickFormatter={(value) => value.slice(0, 5)} // nur "01.05"
            />

            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="income"
              fill="#00C02C"
              radius={4}
              barSize={isSmallScreen ? 10 : 20}
            />
            <Bar
              dataKey="expenses"
              fill="#D52828"
              radius={4}
              barSize={isSmallScreen ? 10 : 20}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

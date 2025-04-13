import { useContext } from "react";
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
  
  const filteredTransactions = selectTransactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return txDate >= new Date(date.from) && txDate <= new Date(date.to);
  });

  console.log(filteredTransactions);
  
  
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
    <Card className="w-full p-4 bar-card flex justify-center bg-transparent">
      <CardContent>
        <h2 className="text-lg text-center font-semibold">Weekly Overview</h2>
        <ResponsiveContainer width="100%" height={370}>
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" fill="#00C02C" radius={4} />
            <Bar dataKey="expenses" fill="#D52828" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

import { useContext } from "react";
import { Card, CardContent } from "@ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMediaQuery } from "react-responsive";

import { FetchTransactionsContext } from "@c/Context/Context";

export default function StackedDonutChart() {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  const { selectTransactions } = useContext(FetchTransactionsContext);

  const filteredInCategory = selectTransactions.filter((fetchCat) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const transactionDate = new Date(fetchCat.date);

    return transactionDate >= startOfMonth && transactionDate <= today;
  });

  const groupedByMonth = filteredInCategory.reduce((acc, txForEachCat) => {
    const category = txForEachCat.category;

    if (!acc[category]) {
      acc[category] = 0;
    }

    if (txForEachCat.amount <= 0) {
      acc[category] += Math.abs(txForEachCat.amount);
    }

    return acc;
  }, {});

  const pieChartData = Object.entries(groupedByMonth).map(([name, value]) => ({
    name,
    value,
  }));

  const totalValue = pieChartData.reduce((sum, item) => sum + item.value, 0);

  const colors = {
    housing: "#0088FE",
    living: "#00C49F",
    transportation: "#FFBB28",
    entertainment: "#FF8042",
    finance: "#AF19FF",
  };

  const month = new Date().toLocaleString("default", { month: "long" });

  return (
    <Card className="w-full p-4 bg-transparent">
      <CardContent>
        <h2 className="text-lg font-semibold text-center py-2">
          Spending Breakdown for {month}
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={70}
              paddingAngle={3}
              startAngle={90}
              endAngle={-270}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[entry.name] || "#ccc"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value.toFixed(2)} €`, "Betrag"]}
            />
            <Legend
              layout={isSmallScreen ? "horizontal" : "vertical"}
              align={isSmallScreen ? "center" : "right"}
              verticalAlign={isSmallScreen ? "bottom" : "middle"}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

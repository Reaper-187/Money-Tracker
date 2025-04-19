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
import { FetchTransactionsContext } from "@c/Context/Context";

export default function StackedDonutChart() {
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
        <h2 className="text-lg font-semibold text-center">
          Spending Breakdown for {month}
        </h2>
        <ResponsiveContainer width="100%" height={430}>
          <PieChart>
            {pieChartData.map((entry, index) => (
              <Pie
                key={index}
                data={[entry]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="55%"
                innerRadius={60 + index * 35}
                outerRadius={70 + index * 35}
                startAngle={90}
                endAngle={90 - (entry.value / totalValue) * 360}
              >
                <Cell fill={colors[entry.name] || "#ccc"} />
              </Pie>
            ))}
            <Tooltip />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

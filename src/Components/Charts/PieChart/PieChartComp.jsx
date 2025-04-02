import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent } from "@ui/card";

const data = [
  { name: "Investments", value: 1550, color: "#0088FE" },
  { name: "Entertainment", value: 600, color: "#00C49F" },
  { name: "Study", value: 360, color: "#FFBB28" },
];

const totalValue = Math.max(...data.map((entry) => entry.value));

export default function StackedDonutChart() {
  return (
    <Card className="w-full p-4 bg-transparent">
      <CardContent>
        <h2 className="text-lg font-semibold text-center">
          Spending Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={445}>
          <PieChart>
            {data.map((entry, index) => (
              <Pie
                key={index}
                data={[entry]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60 + index * 35}
                outerRadius={70 + index * 35}
                startAngle={90}
                endAngle={90 - (entry.value / totalValue) * 360}
              >
                <Cell fill={entry.color} />
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

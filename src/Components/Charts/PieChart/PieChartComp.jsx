import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const data = [
  { name: "Investments", value: 400 },
  { name: "Entertainment", value: 300 },
  { name: "Study", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function PieChartComponent() {
  return (
    <Card className="w-full p-4">
      <CardContent>
        <h2 className="text-lg font-semibold">Spending Breakdown</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

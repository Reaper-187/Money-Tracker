import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const data = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 500 },
  { name: "Thu", value: 200 },
  { name: "Fri", value: 600 },
];

export function BarChartComponent() {
  return (
    <Card className="w-full p-4">
      <CardContent>
        <h2 className="text-lg font-semibold">Weekly Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

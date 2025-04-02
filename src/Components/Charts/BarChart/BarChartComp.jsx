import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// import "./BarChart.css";

const data = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 500 },
  { name: "Thu", value: 200 },
  { name: "Fri", value: 600 },
];

export default function BarChartComponent() {
  return (
    <Card className="w-full p-4 bar-card flex justify-center bg-transparent">
      <CardContent>
        <h2 className="text-lg text-center font-semibold">Weekly Overview</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0088FE" />
            <Bar dataKey="value" fill="#0080ff33" />
            <Bar dataKey="value" fill="#000" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

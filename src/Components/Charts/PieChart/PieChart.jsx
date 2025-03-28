import { useState } from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import { mobileAndDesktopOS, valueFormatter } from "./webUsageStats";

export function PieChartDiagram() {
  const [radius, setRadius] = useState(80);
  const [itemNb, setItemNb] = useState(4);

  return (
    <Box sx={{ width: "50%" }}>
      <PieChart
        height={300}
        series={[
          {
            data: mobileAndDesktopOS.slice(0, itemNb),
            innerRadius: radius,
            arcLabel: (params) => params.label ?? "",
            arcLabelMinAngle: 20,
            valueFormatter,
          },
        ]}
      />
    </Box>
  );
}

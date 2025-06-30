import React, { FC, useMemo } from "react";
import { ApexOptions } from "apexcharts";
import { visitorsChartColors } from "@app/constants";
import { Chart } from ".";
import { getWeekDays } from "@app/utils";
import { format } from "date-fns";

interface IProps {
  data: number[];
}

const weekDays = getWeekDays(new Date());

const VisitorsChart: FC<IProps> = ({ data }) => {
  const visitorsChartConfig = useMemo(
    () => ({
      series: [
        {
          name: "Lượt truy cập",
          data,
        },
      ] as ApexAxisChartSeries,
      options: {
        labels: weekDays.map(
          (day, index) => `${format(day, "dd/MM/yyyy")} (${index + 2 <= 7 ? `Thứ ${index + 2}` : "Chủ nhật"})`,
        ),
        chart: {
          height: "305px",
          fontFamily: "Inter, sans-serif",
          sparkline: {
            enabled: true,
          },
          toolbar: {
            show: false,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: visitorsChartColors.fillGradientShade,
            shadeIntensity: visitorsChartColors.fillGradientShadeIntensity,
          },
        },
        plotOptions: {
          area: {
            fillTo: "end",
          },
        },
        theme: {
          monochrome: {
            enabled: true,
            color: "#1A56DB",
          },
        },
        tooltip: {
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
          },
        },
      } as ApexOptions,
    }),
    [data],
  );

  return (
    <Chart
      series={visitorsChartConfig.series}
      options={visitorsChartConfig.options}
      type="area"
      height={350}
      width={"100%"}
    />
  );
};

export default VisitorsChart;

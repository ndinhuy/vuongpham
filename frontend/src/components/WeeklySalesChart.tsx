"use client";

import { mainChartColors } from "@app/constants";
import React, { FC, useMemo } from "react";
import { ApexOptions } from "apexcharts";
import { Chart } from ".";
import { getWeekDays } from "@app/utils";
import { format } from "date-fns";

interface IWeeklySalesChartProps {
  data: WeeklySalesData;
}

const weekDays = getWeekDays(new Date());

const WeeklySalesChart: FC<IWeeklySalesChartProps> = ({ data }) => {
  const mainChartConfig = useMemo(
    () => ({
      series: [
        {
          name: "Doanh thu tuần trước",
          data: data.prevWeek,
          color: "#1A56DB",
        },
        {
          name: "Doanh thu tuần này",
          data: data.currWeek,
          color: "#FDBA8C",
        },
      ] as ApexAxisChartSeries,
      options: {
        chart: {
          height: 350,
          type: "area",
          fontFamily: "Inter, sans-serif",
          foreColor: mainChartColors.labelColor,
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          labels: {
            style: {
              colors: [mainChartColors.labelColor],
              fontSize: "14px",
              fontWeight: 600,
            },
          },
          axisBorder: {
            color: mainChartColors.borderColor,
          },
          axisTicks: {
            color: mainChartColors.borderColor,
          },
          crosshairs: {
            show: true,
            position: "back",
            stroke: {
              color: mainChartColors.borderColor,
              width: 1,
              dashArray: 10,
            },
          },
          categories: weekDays.map(
            (day, index) => `${format(day, "dd/MM/yyyy")} (${index + 2 <= 7 ? `Thứ ${index + 2}` : "Chủ nhật"})`,
          ),
        },
        yaxis: {
          labels: {
            style: {
              colors: [mainChartColors.labelColor],
              fontSize: "14px",
              fontWeight: 600,
            },
            formatter: (value) => {
              return value + " VNĐ";
            },
          },
        },
        tooltip: {
          y: {
            formatter: (value) => `${value} VNĐ`,
          },
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
          },
        },
        grid: {
          show: true,
          borderColor: mainChartColors.borderColor,
          strokeDashArray: 1,
          padding: {
            left: 35,
            bottom: 15,
          },
        },
        markers: {
          size: 5,
          strokeColors: "#ffffff",
          hover: {
            size: undefined,
            sizeOffset: 3,
          },
        },
        legend: {
          fontSize: "14px",
          fontWeight: 500,
          fontFamily: "Inter, sans-serif",
          labels: {
            colors: [mainChartColors.labelColor],
          },
          itemMargin: {
            horizontal: 10,
          },
        },
      } as ApexOptions,
    }),
    [data],
  );

  return (
    <Chart series={mainChartConfig.series} options={mainChartConfig.options} type="area" height={450} width={"100%"} />
  );
};

export default WeeklySalesChart;

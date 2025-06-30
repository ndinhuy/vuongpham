import { signupsChartColors } from "@app/constants";
import React, { FC, useMemo } from "react";
import { Chart } from ".";
import { ApexOptions } from "apexcharts";
import { getWeekDays } from "@app/utils";
import { format } from "date-fns";

interface IProps {
  data: number[];
}

const weekDays = getWeekDays(new Date());

const UserSignUpChart: FC<IProps> = ({ data }) => {
  const userSignupsChartConfig = useMemo(
    () => ({
      series: [
        {
          name: "Người dùng",
          data,
        },
      ] as ApexAxisChartSeries,
      options: {
        labels: weekDays.map(
          (day, index) => `${format(day, "dd/MM/yyyy")} (${index + 2 <= 7 ? `Thứ ${index + 2}` : "Chủ nhật"})`,
        ),
        chart: {
          height: "140px",
          foreColor: "#4B5563",
          fontFamily: "Inter, sans-serif",
          toolbar: {
            show: false,
          },
        },
        theme: {
          monochrome: {
            enabled: true,
            color: "#1A56DB",
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "25%",
            borderRadius: 3,
            colors: {
              backgroundBarColors: signupsChartColors.backgroundBarColors,
              backgroundBarRadius: 3,
            },
          },
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
        xaxis: {
          floating: false,
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
          },
        },
        states: {
          hover: {
            filter: {
              type: "darken",
              value: 0.8,
            },
          },
        },
        fill: {
          opacity: 1,
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
      } as ApexOptions,
    }),
    [data],
  );

  return (
    <Chart
      series={userSignupsChartConfig.series}
      options={userSignupsChartConfig.options}
      type="bar"
      height={350}
      width={"100%"}
    />
  );
};

export default UserSignUpChart;

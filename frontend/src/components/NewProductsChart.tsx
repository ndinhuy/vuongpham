import React, { FC, useMemo } from "react";
import { ApexOptions } from "apexcharts";
import { Chart } from ".";
import { getWeekDays } from "@app/utils";
import { format } from "date-fns";

interface IProps {
  data: number[];
}

const weekDays = getWeekDays(new Date());

const getChartData = (data: number[]) => {
  return weekDays.map((day, index) => ({
    x: `${format(day, "dd/MM/yyyy")} (${index + 2 <= 7 ? `Thứ ${index + 2}` : "Chủ nhật"})`,
    y: data[index],
  }));
};

const chartOptions: ApexOptions = {
  colors: ["#1A56DB", "#FDBA8C"],
  chart: {
    height: "140px",
    fontFamily: "Inter, sans-serif",
    foreColor: "#4B5563",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "90%",
      borderRadius: 3,
    },
  },
  tooltip: {
    shared: false,
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
        value: 1,
      },
    },
  },
  stroke: {
    show: true,
    width: 5,
    colors: ["transparent"],
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
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
};

const NewProductsChart: FC<IProps> = ({ data }) => {
  const chartData = useMemo(() => {
    if (data.length !== 7) return null;
    return getChartData(data);
  }, [data]);

  if (!chartData) {
    return (
      <div className="flex justify-center w-full h-full items-center">
        <p className="text-center text-sm text-gray-400">Chưa có dữ liệu</p>
      </div>
    );
  }

  return (
    <Chart
      series={[{ name: "Số lượng", color: "#1A56DB", data: chartData }]}
      options={chartOptions}
      type="bar"
      height={350}
      width={"100%"}
    />
  );
};

export default NewProductsChart;

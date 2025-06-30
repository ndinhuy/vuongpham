"use client";

import React, { FC } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IChartProps {
  options?: ApexOptions;
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  width?: number | string;
  height?: number | string;
  type:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
}

const Chart: FC<IChartProps> = (props) => {
  return (
    <ReactApexChart
      options={props.options}
      series={props.series}
      type={props.type}
      height={props.height}
      width={props.width}
    />
  );
};

export default Chart;

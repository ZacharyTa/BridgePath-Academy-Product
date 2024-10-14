"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LineChart from "@/components/Charts/LineChart";
import BarChartOverlap from "@/components/Charts/BarChartOverlap";
import dynamic from "next/dynamic";
import React from "react";

const PieChartDonut = dynamic(
  () => import("@/components/Charts/PieChartDonut"),
  {
    ssr: false,
  },
);

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <LineChart />
        <BarChartOverlap />
        <PieChartDonut />
      </div>
    </>
  );
};

export default Chart;

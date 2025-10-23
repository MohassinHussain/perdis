"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

export interface DistrictYearChart {
  data: Array<any>;
}

const metricMappings: Record<string, string> = {
  Approved_Labour_Budget: "Total budget allocated for wages",
  Average_Wage_rate_per_day_per_person: "Average wage earned per day",
  Average_days_of_employment_provided_per_Household: "Avg days of employment per household",
  Total_Households_Worked: "Number of households worked",
  Total_Individuals_Worked: "Total people employed",
  Total_No_of_Active_Workers: "Active workers",
  Total_No_of_JobCards_issued: "Job cards issued",
  Total_No_of_Works_Takenup: "Works/projects started",
  Wages: "Total wages paid",
  Women_Persondays: "Person-days by women",
  SC_persondays: "SC person-days",
  ST_persondays: "ST person-days",
  percent_of_Expenditure_on_Agriculture_Allied_Works: "% spent on agri works",
  Total_No_of_HHs_completed_100_Days_of_Wage_Employment: "HHs completed 100 days work",
};

const colors = [
  "#4ade80", "#3b82f6", "#f59e0b", "#f43f5e", "#8b5cf6",
  "#14b8a6", "#f97316", "#eab308", "#a3e635", "#06b6d4",
  "#db2777", "#facc15", "#0ea5e9"
];

const DistrictYearChart: React.FC<DistrictYearChart> = ({ data }) => {
  if (!data || data.length === 0) return <p>No data to display</p>;

  const metrics = Object.keys(metricMappings);

  const chartData = data.map((d) => ({
    fin_year: d.fin_year,
    ...metrics.reduce((acc, key) => {
      acc[key] = Number(d[key]) || 0;
      return acc;
    }, {} as Record<string, number>),
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {metrics.map((metric, index) => (
          <SwiperSlide key={metric}>
            <h3 className="text-lg font-semibold mb-4 text-green-700 text-center">
              {metricMappings[metric]}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fin_year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={metric}
                  fill={colors[index % colors.length]}
                  name={metricMappings[metric]}
                />
              </BarChart>
            </ResponsiveContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DistrictYearChart;



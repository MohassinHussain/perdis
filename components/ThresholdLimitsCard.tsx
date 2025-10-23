// "use client";

// import React from "react";

// export interface ThresholdLimitsCardProps {
//   data: Record<string, any>;
// }

// interface MetricThreshold {
//   label: string;
//   key: string;
//   threshold: number;
//   description?: string;
// }

// // Define thresholds for key metrics
// const THRESHOLDS: MetricThreshold[] = [
//   { key: "Approved_Labour_Budget", label: "Total Budget Allocated for Wages", threshold: 1000000 },
//   { key: "Average_Wage_rate_per_day_per_person", label: "Average Wage per Day", threshold: 150 },
//   { key: "Average_days_of_employment_provided_per_Household", label: "Avg Days of Employment per Household", threshold: 25 },
//   { key: "Total_Households_Worked", label: "Households Worked", threshold: 50000 },
//   { key: "Total_Individuals_Worked", label: "Individuals Worked", threshold: 70000 },
//   { key: "Wages", label: "Total Wages Paid", threshold: 2000 },
//   { key: "Women_Persondays", label: "Women Persondays", threshold: 100000 },
//   { key: "SC_persondays", label: "SC Persondays", threshold: 50000 },
//   { key: "ST_persondays", label: "ST Persondays", threshold: 50000 },
//   { key: "percent_of_Expenditure_on_Agriculture_Allied_Works", label: "% Expenditure on Agriculture Works", threshold: 25 },
//   { key: "Total_No_of_HHs_completed_100_Days_of_Wage_Employment", label: "HHs Completed 100 Days", threshold: 1000 },
// ];

// const ThresholdLimitsCard: React.FC<ThresholdLimitsCardProps> = ({ data }) => {
//   if (!data) return null;

//   return (
//     <div className="bg-white rounded-xl shadow p-4">
//       <h3 className="text-lg font-semibold text-green-700 mb-3 text-center">
//         Threshold Performance Check
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//         {THRESHOLDS.map((metric) => {
//           const value = parseFloat(data[metric.key]) || 0;
//           const isGood = value >= metric.threshold;

//           return (
//             <div
//               key={metric.key}
//               className={`flex justify-between items-center border-b py-2 px-2 rounded ${
//                 isGood ? "bg-green-100" : "bg-red-100"
//               }`}
//             >
//               <div>
//                 <span className="font-semibold text-gray-700">{metric.label}</span>
//                 <p className="text-xs text-gray-600">{metric.description}</p>
//               </div>
//               <span
//                 className={`font-bold ${
//                   isGood ? "text-green-700" : "text-red-700"
//                 }`}
//               >
//                 {value} {metric.key.includes("percent") ? "%" : ""}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ThresholdLimitsCard;


// "use client";

// import React, { useState } from "react";

// export interface ThresholdLimitsCardProps {
//   data: Record<string, any>;
// }

// interface MetricThreshold {
//   key: string;
//   label: string;
//   threshold: number;
//   improvement: string;
// }

// // Define thresholds and improvement guidance
// const THRESHOLDS: MetricThreshold[] = [
//   {
//     key: "Approved_Labour_Budget",
//     label: "Total Budget Allocated for Wages",
//     threshold: 1000000,
//     improvement: "Allocate more funds for wages and timely release of funds to workers.",
//   },
//   {
//     key: "Average_Wage_rate_per_day_per_person",
//     label: "Average Wage per Day",
//     threshold: 150,
//     improvement: "Ensure proper wage rate as per MGNREGA guidelines and timely payments.",
//   },
//   {
//     key: "Average_days_of_employment_provided_per_Household",
//     label: "Avg Days of Employment per Household",
//     threshold: 25,
//     improvement: "Plan more projects and distribute workdays evenly across households.",
//   },
//   {
//     key: "Total_Households_Worked",
//     label: "Households Worked",
//     threshold: 50000,
//     improvement: "Identify more households in need and encourage participation.",
//   },
//   {
//     key: "Total_Individuals_Worked",
//     label: "Individuals Worked",
//     threshold: 70000,
//     improvement: "Increase project outreach and ensure equal opportunity for all individuals.",
//   },
//   {
//     key: "Wages",
//     label: "Total Wages Paid",
//     threshold: 2000,
//     improvement: "Ensure full payment of wages on time and avoid deductions.",
//   },
// ];

// const ThresholdLimitsCard: React.FC<ThresholdLimitsCardProps> = ({ data }) => {
//   const [visibleTips, setVisibleTips] = useState<Record<string, boolean>>({});

//   const toggleTip = (key: string) => {
//     setVisibleTips((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   if (!data) return null;

//   return (
//     <div className="bg-white rounded-xl shadow p-4">
//       <h3 className="text-lg font-semibold text-green-700 mb-3 text-center">
//         Threshold Performance Check
//       </h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//         {THRESHOLDS.map((metric) => {
//           const value = parseFloat(data[metric.key]) || 0;
//           const isGood = value >= metric.threshold;

//           return (
//             <div
//               key={metric.key}
//               className={`flex flex-col border-b py-2 px-2 rounded ${
//                 isGood ? "bg-green-100" : "bg-red-100"
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-1">
//                   <span className="font-semibold text-gray-700">{metric.label}</span>
//                   <button
//                     onClick={() => toggleTip(metric.key)}
//                     className="text-sm text-blue-500 font-bold px-1 rounded hover:bg-blue-100"
//                   >
//                     i
//                   </button>
//                 </div>
//                 <span className={`font-bold ${isGood ? "text-green-700" : "text-red-700"}`}>
//                   {value} / {metric.threshold}
//                 </span>
//               </div>

//               {/* Show improvement tip if clicked */}
//               {visibleTips[metric.key] && (
//                 <p className="mt-1 text-xs text-gray-700 bg-gray-100 p-2 rounded">
//                   {metric.improvement}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ThresholdLimitsCard;


"use client";

import React, { useState } from "react";

export interface ThresholdLimitsCardProps {
  data: Record<string, any>;
}

interface MetricThreshold {
  key: string;
  label: string;
  threshold: number;
  improvement: string;
  type: "money" | "time" | "people";
}

const THRESHOLDS: MetricThreshold[] = [
  {
    key: "Approved_Labour_Budget",
    label: "Total Budget Allocated for Wages",
    threshold: 1000000,
    improvement: "Allocate more funds for wages and timely release of funds to workers.",
    type: "money",
  },
  {
    key: "Average_Wage_rate_per_day_per_person",
    label: "Average Wage per Day",
    threshold: 150,
    improvement: "Ensure proper wage rate as per MGNREGA guidelines and timely payments.",
    type: "money",
  },
  {
    key: "Average_days_of_employment_provided_per_Household",
    label: "Avg Days of Employment per Household",
    threshold: 25,
    improvement: "Plan more projects and distribute workdays evenly across households.",
    type: "time",
  },
  {
    key: "Total_Households_Worked",
    label: "Households Worked",
    threshold: 50000,
    improvement: "Identify more households in need and encourage participation.",
    type: "people",
  },
  {
    key: "Total_Individuals_Worked",
    label: "Individuals Worked",
    threshold: 70000,
    improvement: "Increase project outreach and ensure equal opportunity for all individuals.",
    type: "people",
  },
  {
    key: "Wages",
    label: "Total Wages Paid",
    threshold: 2000000,
    improvement: "Ensure full payment of wages on time and avoid deductions.",
    type: "money",
  },
];

// Helper to format money
function formatMoney(value: number): string {
  if (value >= 10000000) return `₹ ${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹ ${(value / 100000).toFixed(2)} L`;
  return `₹ ${value.toLocaleString()}`;
}

const ThresholdLimitsCard: React.FC<ThresholdLimitsCardProps> = ({ data }) => {
  const [visibleTips, setVisibleTips] = useState<Record<string, boolean>>({});

  const toggleTip = (key: string) => {
    setVisibleTips((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold text-green-700 mb-3 text-center">
        Threshold Performance Check
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {THRESHOLDS.map((metric) => {
          let value = parseFloat(data[metric.key]) || 0;
          let displayValue = value.toLocaleString();
          if (metric.type === "money") displayValue = formatMoney(value);
          if (metric.type === "time") displayValue = `${value} days`;

          const isGood = value >= metric.threshold;

          return (
            <div
              key={metric.key}
              className={`flex flex-col border-b py-2 px-2 rounded ${
                isGood ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-700">{metric.label}</span>
                  <button
                    onClick={() => toggleTip(metric.key)}
                    className="text-sm text-blue-500 font-bold px-1 rounded hover:bg-blue-100"
                  >
                    i
                  </button>
                </div>
                <span className={`font-bold ${isGood ? "text-green-700" : "text-red-700"}`}>
                  {displayValue} / {metric.type === "money" ? formatMoney(metric.threshold) : metric.threshold}
                </span>
              </div>

              {visibleTips[metric.key] && (
                <p className="mt-1 text-xs text-gray-700 bg-gray-100 p-2 rounded">
                  {metric.improvement}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThresholdLimitsCard;

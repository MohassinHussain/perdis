"use client";

import React from "react";

export interface KeyMetricsCardProps {
  data: Record<string, any>; 
}

const metricLabels: Record<string, string> = {
  Approved_Labour_Budget: "Total budget allocated for wages",
  Average_Wage_rate_per_day_per_person: "Average wage per day",
  Average_days_of_employment_provided_per_Household: "Avg days of employment per household",
  Differently_abled_persons_worked: "Differently-abled persons worked",
  Material_and_skilled_Wages: "Material & skilled wages",
  Number_of_Completed_Works: "Completed works",
  Number_of_GPs_with_NIL_exp: "GPs with NIL expenditure",
  Number_of_Ongoing_Works: "Ongoing works",
  Persondays_of_Central_Liability_so_far: "Persondays of central liability",
  SC_persondays: "SC persondays",
  SC_workers_against_active_workers: "SC workers",
  ST_persondays: "ST persondays",
  ST_workers_against_active_workers: "ST workers",
  Total_Adm_Expenditure: "Total administrative expenditure",
  Total_Exp: "Total expenditure",
  Total_Households_Worked: "Households worked",
  Total_Individuals_Worked: "Individuals worked",
  Total_No_of_Active_Job_Cards: "Active job cards",
  Total_No_of_Active_Workers: "Active workers",
  Total_No_of_HHs_completed_100_Days_of_Wage_Employment: "HHs completed 100 days",
  Total_No_of_JobCards_issued: "Job cards issued",
  Total_No_of_Workers: "Total workers",
  Total_No_of_Works_Takenup: "Works taken up",
  Wages: "Total wages paid",
  Women_Persondays: "Women persondays",
  percent_of_Category_B_Works: "% Category B works",
  percent_of_Expenditure_on_Agriculture_Allied_Works: "% expenditure on agriculture works",
  percent_of_NRM_Expenditure: "% NRM expenditure",
  percentage_payments_gererated_within_15_days: "% payments within 15 days",
};

const KeyMetricsCard: React.FC<KeyMetricsCardProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold text-green-700 mb-3 text-center">
        {data.month} — {data.fin_year} Metrics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.keys(metricLabels).map((key) => (
          data[key] !== undefined && (
            <div key={key} className="flex justify-between border-b py-1">
              <span className="text-gray-600 text-sm">{metricLabels[key]}</span>
              <span className="font-semibold text-black text-sm">{data[key]}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default KeyMetricsCard;

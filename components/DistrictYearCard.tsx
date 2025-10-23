import React from "react";

export interface DistrictYearCardProps {
  data: {
    fin_year: string;
    district_name: string;
    Total_Households_Worked: string | number;
    Average_days_of_employment_provided_per_Household: string | number;
    Wages: string | number;
    Women_Persondays: string | number;
    SC_persondays: string | number;
    ST_persondays: string | number;
    Number_of_Completed_Works: string | number;
    Number_of_Ongoing_Works: string | number;
    Remarks?: string;
  };
}

const DistrictYearCard: React.FC<DistrictYearCardProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-black">
      <h3 className="text-lg font-semibold mb-2 text-green-700 text-center">
        {data.district_name} — {data.fin_year}
      </h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p><strong>Total Households Worked:</strong> {data.Total_Households_Worked}</p>
        <p><strong>Avg Days of Employment:</strong> {data.Average_days_of_employment_provided_per_Household}</p>
        <p><strong>Wages (₹):</strong> {data.Wages}</p>
        <p><strong>Women Persondays:</strong> {data.Women_Persondays}</p>
        <p><strong>SC Persondays:</strong> {data.SC_persondays}</p>
        <p><strong>ST Persondays:</strong> {data.ST_persondays}</p>
        <p><strong>Completed Works:</strong> {data.Number_of_Completed_Works}</p>
        <p><strong>Ongoing Works:</strong> {data.Number_of_Ongoing_Works}</p>
        {data.Remarks && <p><strong>Remarks:</strong> {data.Remarks}</p>}
      </div>
    </div>
  );
};

export default DistrictYearCard;

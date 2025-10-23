"use client";

import React, { useState } from "react";
import KeyMetricsCard from "./KeyMetricsCard";

interface PastMetricsCardProps {
  data: Record<string, any>[]; 
}

const PastMetricsCard: React.FC<PastMetricsCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortedData = [...data].sort((a, b) => (a.fin_year > b.fin_year ? -1 : 1));
  const latestYear = sortedData[0]?.fin_year;

  const pastData = sortedData.filter((d) => d.fin_year !== latestYear);

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        View Past Metrics
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto w-[90%] md:w-[70%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Past Years Metrics</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                ✖
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {pastData.map((item) => (
                <KeyMetricsCard key={item.fin_year} data={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PastMetricsCard;

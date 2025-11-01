"use client";

import { useEffect, useState } from "react";
import { fetchAllDistrictsDetails } from "@/utils/fetchAllDistrictsDetails";
import { fetchDetailsOfSelectedDistrict } from "@/utils/fetchDetailsOfSelectedDistrict";
import { getUserLocation } from "@/utils/getUserLocation";
import DistrictYearCard from "@/components/DistrictYearCard";
import DistrictYearChart from "@/components/DistrictYearChart";
import KeyMetricsCard from "@/components/KeyMetricsCard";
import PastMetricsCard from "@/components/PastMetricsCard";
import ThresholdLimitsCard from "@/components/ThresholdLimitsCard";
const STATES = [
  "ANDHRA PRADESH", "ARUNACHAL PRADESH", "ASSAM", "BIHAR", "CHHATTISGARH",
  "GOA", "GUJARAT", "HARYANA", "HIMACHAL PRADESH", "JHARKHAND", "KARNATAKA",
  "KERALA", "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR", "MEGHALAYA", "MIZORAM",
  "NAGALAND", "ODISHA", "PUNJAB", "RAJASTHAN", "SIKKIM", "TAMIL NADU",
  "TELANGANA", "TRIPURA", "UTTAR PRADESH", "UTTARAKHAND", "WEST BENGAL"
];

const FIN_YEARS = ["2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"];

export default function HomePage() {
  const [userState, setUserState] = useState("");
  const [userDistrict, setUserDistrict] = useState("");
  const [districts, setDistricts] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedFinYear, setSelectedFinYear] = useState("");
  const [districtData, setDistrictData] = useState<any[]>([]);
  const [userDataAvailable, setUserDataAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({ state: "", district: "" });


  // 1️⃣ Load user's district data
  useEffect(() => {
    const loadUserDistrictData = async () => {
      setLoading(true);
      try {
        const data = await fetchDetailsOfSelectedDistrict("2024-2025"); // last 4-5 years included
        if (data?.records?.length) {
          const state = data.records[0].state_name || "";
          const district = data.records[0].district_name || "";
          setUserState(state);
          setUserDistrict(district);
          setSelectedState(state);
          setSelectedDistrict(district);
          setDistrictData(data.records);
          setUserDataAvailable(true);
        } else {
          setUserDataAvailable(false);
        }
      } catch (err) {
        console.error(err);
        setUserDataAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    loadUserDistrictData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const loc = await getUserLocation();
      setUserLocation(loc);

      // const data = await fetchDetailsOfSelectedDistrict(
      //   loc.state,
      //   loc.district
      // );

      // setDistrictData(data);

      setLoading(false);
    };

    loadData();
  }, []);


  useEffect(() => {
    if (!selectedState) return;

    const fetchStateDistricts = async () => {
      setLoading(true);
      try {
        const data = await fetchAllDistrictsDetails(selectedState);
        const uniqueDistricts = data?.records?.map((r: any) => r.district_name) || [];
        setDistricts([...new Set(uniqueDistricts)]);
        if (!uniqueDistricts.includes(selectedDistrict)) {
          setSelectedDistrict("");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStateDistricts();
  }, [selectedState]);

  useEffect(() => {
    if (!selectedState || !selectedDistrict) return;

    const fetchDistrictDataManually = async () => {
      setLoading(true);
      try {
        const yearsToFetch = selectedFinYear ? [selectedFinYear] : FIN_YEARS;
        const allData: any[] = [];

        for (const year of yearsToFetch) {
          const data = await fetchAllDistrictsDetails(selectedState, year);
          const filtered = data?.records?.filter(
            (r: any) => r.district_name.toLowerCase().trim() === selectedDistrict.toLowerCase().trim()
          ) || [];
          if (filtered.length) allData.push(...filtered);
        }

        setDistrictData(allData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistrictDataManually();
  }, [selectedState, selectedDistrict, selectedFinYear]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        MGNREGA Dashboard
      </h1>
 */}

      <div className="bg-gray-700 shadow-md rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-300">
          📍 Your Location
        </h2>
        <p className="text-gray-300 mt-2">
          State: <span className="font-semibold text-gray-300">{userLocation.state}</span> | District:{" "}
          <span className="font-semibold text-gray-300">{userLocation.district}</span>
        </p>
      </div>


      {!userDataAvailable && !loading && (
        <p className="text-center text-orange-400 mb-4">
          Your district "{userLocation.district}" is not listed in the selected state. Please choose from the dropdowns below.
        </p>
      )}

      


      {/* Dropdowns */}
      <div className="bg-gray-700 p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 items-center justify-center">
        <div>
          <label className="block text-gray-300 font-semibold mb-1">State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border p-2 rounded w-60 text-white bg-gray-800"
          >
            <option value="">Select State</option>
            {STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 font-semibold mb-1">District</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!districts.length}
            className="border p-2 rounded w-60 text-white bg-gray-800"
          >
            <option value="">Select District</option>
            {districts.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>

        {/* <div>
          <label className="block text-gray-700 font-semibold mb-1">Financial Year (optional)</label>
          <select
            value={selectedFinYear}
            onChange={(e) => setSelectedFinYear(e.target.value)}
            className="border p-2 rounded w-60 text-black"
          >
            <option value="">All Years</option>
            {FIN_YEARS.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div> */}
      </div>

      {loading && <p className="text-center text-gray-300 mb-4">Loading data...</p>}
<h1 className="text-gray-200 font-bold text-center">
        Showing results for District {selectedDistrict}
      </h1>
      <div className="grid md:grid-cols-1 gap-4 mt-6">
        {districtData.length > 0 && <ThresholdLimitsCard data={districtData[0]} />}
      </div>

      
      {districtData.length > 0 && (
        <>
          {/* Latest Year Key Metrics */}
          <KeyMetricsCard
            data={districtData.sort((a, b) => (a.fin_year > b.fin_year ? -1 : 1))[0]}
          />

          {/* Past Metrics Button */}
          <div className="mt-4">
            <PastMetricsCard data={districtData} />
          </div>
        </>
      )}


      {districtData.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* {districtData.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {FIN_YEARS.map((year) => {
                const yearData = districtData.filter((r) => r.fin_year === year);
                if (yearData.length === 0) return null;

                return yearData.map((d, idx) => (
                  <DistrictYearCard key={`${year}-${idx}`} data={d} />
                ));
              })}
            </div>
          )} */}
          {/* {FIN_YEARS.map((year) => {
            const yearData = districtData.filter((r) => r.fin_year === year);
            if (yearData.length === 0) return null;

            return (
              <div key={year} className="bg-white p-4 rounded-xl shadow text-black">
                <h3 className="text-lg font-semibold mb-2 text-green-700 text-center">
                  {selectedDistrict} — {year}
                </h3>
                <pre className="text-xs md:text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(yearData, null, 2)}
                </pre>
              </div>
            );
          })} */}
        </div>
      )}

      {/* {districtData.length > 0 && (
        <DistrictYearChart data={districtData} />
      )} */}


      <footer className="mt-8 text-center text-gray-500 text-sm">
        Data Source: data.gov.in
      </footer>
    </div>
  );
}

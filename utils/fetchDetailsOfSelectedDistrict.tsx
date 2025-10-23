  import { getUserLocation } from "./getUserLocation";

  export async function fetchDetailsOfSelectedDistrict(
    currentFinYear: string = "2024-2025"
  ) {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    const baseUrl =
      "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";

    try {
      // ✅ 1️⃣ Get user's current state & district
      const { state, district } = await getUserLocation();
      const formattedState = state?.toUpperCase().trim();
      const formattedDistrict = district?.toUpperCase().trim();

      // ✅ 2️⃣ Generate past 4 financial years (including current)
      const finYears = getPastFinYears(currentFinYear, 4);

      // ✅ 3️⃣ Fetch all districts data for the state for each fin year
      const allData = await Promise.all(
        finYears.map(async (finYear) => {
          const params = new URLSearchParams({
            "api-key": apiKey ?? "",
            format: "json",
            limit: "500",
            offset: "0",
            "filters[state_name]": formattedState,
            "filters[fin_year]": finYear,
          });

          const url = `${baseUrl}?${params.toString()}`;
          console.log("🔍 Fetching:", url);

          const res = await fetch(url);
          if (!res.ok) throw new Error(`Failed for year ${finYear}`);
          const data = await res.json();

          // ✅ Filter for the user's district only
          const districtRecords = (data?.records || []).filter(
            (r: any) =>
              r?.district_name?.toUpperCase().trim() === formattedDistrict
          );

          console.log(
            `✅ Year ${finYear}: Found ${districtRecords.length} records for ${formattedDistrict}`
          );

          return { fin_year: finYear, records: districtRecords };
        })
      );

      // ✅ 4️⃣ Merge filtered data
      const merged = mergeApiResponses(allData, formattedDistrict);
      return merged;
    } catch (error) {
      console.error("❌ Error fetching district details:", error);
      return null;
    }
  }

  /**
   * Generate last N financial years including current.
   */
  function getPastFinYears(currentFinYear: string, count: number): string[] {
    const [start] = currentFinYear.split("-").map(Number);
    const years: string[] = [];
    for (let i = 0; i < count; i++) {
      const from = start - i;
      const to = from + 1;
      years.push(`${from}-${to}`);
    }
    return years;
  }

  /**
   * Merge multiple API responses into one structure.
   */
  function mergeApiResponses(responses: any[], district: string): any {
    if (responses.length === 0) return null;

    const allRecords = responses.flatMap((res) => res.records || []);
    return {
      message: `Merged ${responses.length} years of data for ${district}`,
      fetched_fin_years: responses.map((r) => r.fin_year),
      count: allRecords.length,
      records: allRecords,
    };
  }

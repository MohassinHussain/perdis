// utils/fetchAllDistrictsDetails.ts
export async function fetchAllDistrictsDetails(
  stateName: string,
  finYear: string = "2020-2021",
  limit: number = 50,
  offset: number = 0
) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const baseUrl =
    "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";

  const url = `${baseUrl}?api-key=${apiKey}&format=json&filters[state_name]=${encodeURIComponent(
    stateName
  )}&filters[fin_year]=${encodeURIComponent(
    finYear
  )}&limit=${limit}&offset=${offset}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch all districts");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all district details:", error);
    return null;
  }
}

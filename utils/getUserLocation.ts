export async function getUserLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("Failed to get location");
    const data = await res.json();
    return {
      state: data.region || "Unknown",
      district: data.city || "Unknown",
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return { state: "Unknown", district: "Unknown" };
  }
}

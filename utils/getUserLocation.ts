// export async function getUserLocation() {
//   try {
//     const res = await fetch("https://ipapi.co/json/");
//     if (!res.ok) throw new Error("Failed to get location");
//     const data = await res.json();
//     return {
//       state: data.region || "Unknown",
//       district: data.city || "Unknown",
//     };
//   } catch (error) {
//     console.error("Error fetching location:", error);
//     return { state: "Unknown", district: "Unknown" };
//   }
// }



// utils/getUserLocation.ts
"use client";

export async function getUserLocation(): Promise<{ state: string; district: string }> {
  try {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported by browser");
      return { state: "", district: "" };
    }

    // 1️⃣ Ask permission & get coordinates
    const position = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const { latitude, longitude } = position.coords;

    // 2️⃣ Reverse geocode using OpenStreetMap (free & reliable)
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
    );
    const data = await res.json();

    const state = data?.address?.state || "";
    const district =
      data?.address?.county ||
      data?.address?.state_district ||
      data?.address?.region ||
      "";

    console.log("📍 User location detected:", { state, district });
    return { state: state.toUpperCase(), district: district.toUpperCase() };
  } catch (err) {
    console.error("❌ Failed to get user location:", err);
    return { state: "", district: "" };
  }
}

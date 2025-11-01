"use client";

import { useEffect, useState } from "react";

export default function useRequestLocationPermission() {
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationGranted(true);
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setLocationGranted(false);
        setError(err.message);
      }
    );
  }, []);

  return { locationGranted, coords, error };
}

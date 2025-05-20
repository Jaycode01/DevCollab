"use client";

import { useState, useEffect } from "react";

export default function UserLocation() {
  const [location, setLocation] = useState<string>("Getting location...");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village;
          const country = data?.address?.country;
          setLocation(
            `${city ? city + ", " : ""}${country || "Unknown Location"}`
          );
        } catch (err) {
          console.error(err);
          setLocation("Failed to fetch location name");
        }
      },
      (err) => {
        console.error(err);
        setError("Location access denied");
      }
    );
  }, []);

  return (
    <div className="text-sm">
      {error ? <p>{error}</p> : <p>Location: {location}</p>}
    </div>
  );
}

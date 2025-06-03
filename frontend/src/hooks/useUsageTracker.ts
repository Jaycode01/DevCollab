"use client";

import { useEffect, useRef } from "react";
import axios from "axios";

export default function useUsageTracker(token: string | null) {
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!token) return;

    startTimeRef.current = Date.now();

    const handleEnd = async () => {
      if (!startTimeRef.current) return;

      const durationMs = Date.now() - startTimeRef.current;
      const durationMinutes = Math.floor(durationMs / 60000);

      if (durationMinutes <= 0) return;
      const API_BASE = process.env.NEXT_PUBLIC_API_URL;
      try {
        await axios.post(
          `${API_BASE}/api/logged-hours`,
          { duration: durationMinutes },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Failed to log usage time:", err);
      }
    };
    window.addEventListener("beforeunload", handleEnd);

    return () => {
      handleEnd();
      window.removeEventListener("beforeunload", handleEnd);
    };
  }, [token]);
}

"use client";

import { useEffect, useRef } from "react";
import axios from "axios";

export default function useUsageTracker(
  token: string | null,
  loading: boolean
) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (loading || !token) {
      console.log("🔃 Still loading or no token yet.", { loading, token });
      return;
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    const sendUsage = async () => {
      try {
        if (document.hidden) {
          console.log("Tab not visible, skipping usage log");
          return;
        }

        console.log("📡 Sending usage log...");
        await axios.post(
          `${API_BASE}/api/logged-hours`,
          { duration: 10 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Usage logged");
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Usage log error:", err.message);
        } else {
          console.error("Usage log error");
        }
      }
    };

    const startTracking = () => {
      if (!intervalRef.current) {
        sendUsage();
        intervalRef.current = setInterval(sendUsage, 10 * 60 * 1000);
        console.log("Tracking started");
      }
    };

    const stopTracking = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("Tracking stopped.");
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startTracking();
      } else {
        startTracking();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (document.visibilityState === "visible") {
      startTracking();
    }

    return () => {
      stopTracking();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [token, loading]);
}

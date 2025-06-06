"use client";

import { useEffect } from "react";
import axios from "axios";

export default function useUsageTracker(
  token: string | null,
  loading: boolean
) {
  useEffect(() => {
    if (loading || !token) {
      console.log("🔃 Still loading or no token yet.", { loading, token });
      return;
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    const sendUsage = async () => {
      try {
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

    sendUsage();
    const intervalId = setInterval(sendUsage, 60 * 1000);
    return () => clearInterval(intervalId);
  }, [token, loading]);
}

"use client";

import { useEffect } from "react";
import axios from "axios";

export default function useUsageTracker(token: string | null) {
  useEffect(() => {
    if (!token) return;

    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    const sendUsage = async () => {
      try {
        await axios.post(
          `${API_BASE}/api/logged-hours`,
          { duration: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Failed to log usage time:", err);
      }
    };

    sendUsage();

    const intervalId = setInterval(sendUsage, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [token]);
}

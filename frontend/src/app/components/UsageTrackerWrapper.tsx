"use client";

import useUsageTracker from "@/hooks/useUsageTracker";
import { useAuth } from "../auth/auth-provider";

export default function UsageTrackerWrapper() {
  const { token } = useAuth();

  useUsageTracker(token);

  return null;
}

"use client";

import useUsageTracker from "@/hooks/useUsageTracker";
import { useAuth } from "../auth/auth-provider";

export default function UsageTrackerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAuth();

  console.log("Wrapper state: ", { loading, token });

  useUsageTracker(token, loading);

  if (loading) return null;

  return <>{children}</>;
}

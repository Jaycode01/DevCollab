"use client";

import { useEffect, useState } from "react";
import ProgressBar from "./progress-bar";
import Image from "next/image";
import Streak from ".././../../public/streak.svg";
import { useAuth } from "../auth/auth-provider";
import { getAuth } from "firebase/auth";

interface LogEntry {
  day: string;
  hours: number;
  minutes: number;
}

export default function HoursLogged() {
  const { token, loading } = useAuth();
  const [logs, setlogs] = useState<LogEntry[]>([]);
  const [streak, setstreak] = useState<number>(0);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!token || loading) return;

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      try {
        const freshToken = await user.getIdToken(true); // force refresh
        if (!freshToken) return;

        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await fetch(`${API_BASE}/api/logged-hours`, {
          headers: {
            Authorization: `Bearer ${freshToken}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setlogs(data.logs || []);
        setstreak(data.streak || 0);
      } catch (err) {
        console.error("Failed to fetch logged hours:", err);
      }
    };

    fetchLogs();
  }, [token, loading]);

  const getProgress = (hours: number, minutes: number) => {
    const totalMinutes = hours * 60 + minutes;
    const percent = (totalMinutes / (12 * 60)) * 100;
    return Math.min(percent, 100);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <h3 className="md:text-2xl text-[22px]">Logged Time</h3>
        <p className="flex items-center gap-0.5">
          {streak}{" "}
          <Image
            alt="streak icon"
            src={Streak}
            width={20}
            height={20}
            className="mb-1"
          />{" "}
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        {logs.length > 0 ? (
          logs.map((log, i) => (
            <div className="mb-2" key={i}>
              <p className="text-sm mb-1">
                {log.day}: {log.hours}hrs {log.minutes}mins
              </p>
              <ProgressBar value={getProgress(log.hours, log.minutes)} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No logs yet this week.</p>
        )}
      </div>
    </div>
  );
}

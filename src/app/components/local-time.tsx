"use client";

import { useEffect, useState } from "react";

export default function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formattedTime = now.toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: `2-digit`,
        minute: `2-digit`,
        second: `2-digit`,
        hour12: true,
      });
      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <p className="text-sm">Time (GMT/UTC): {time}</p>
    </>
  );
}

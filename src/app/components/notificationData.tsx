"use client";
import { useState } from "react";
import Notification from "./notification";
import { notifications } from "@/lib/notifications"; // <-- import shared data

type NotificationType = {
  id: number;
  message: string;
};

export default function NotificationData() {
  const [data] = useState<NotificationType[]>(notifications);

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl">
      <Notification notifyData={data} />
    </div>
  );
}

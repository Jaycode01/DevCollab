"use client";

import { useState } from "react";
import Notification from "./notification";

const notifications = [
  {
    id: 1,
    message: "New team member added",
  },
  {
    id: 2,
    message: "You just committed to X project",
  },
  {
    id: 3,
    message: "Peter Pan review your code",
  },
  {
    id: 4,
    message: "Peter Pan review your code",
  },
  {
    id: 5,
    message: "Peter Pan review your code",
  },
  {
    id: 6,
    message: "Peter Pan review your code",
  },
  {
    id: 7,
    message: "Peter Pan review your code",
  },
  {
    id: 8,
    message: "Peter Pan review your code",
  },
];

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

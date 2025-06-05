import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@/app/auth/auth-provider";

type Notification = {
  userId: string;
  path: string;
  message: string;
  timestamp: string;
};

export const useSocketNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!user?.uid) return;

    const socket = io(`${API_BASE}`);

    socket.emit("join", user.uid);
    socket.on("notification", (data: Notification) => {
      console.log("Received notification:", data);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.uid, API_BASE]);

  return { notifications };
};

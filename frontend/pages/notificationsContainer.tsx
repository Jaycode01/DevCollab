import { useEffect, useState } from "react";
import NotificationQuickBox from "@/app/components/notification-quick-box";

type Notification = {
  id: string;
  message: string;
};

export default function NotificationsContainer() {
  const [topFive, setTopFive] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch("/api/notifications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setTopFive(data.notifications || []);
        } else {
          setTopFive([]);
        }
      } catch (err) {
        console.error("Error fetching notifications", err);
        setTopFive([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  if (loading) return <p>Loading Notifications...</p>;
  return <NotificationQuickBox topFive={topFive} />;
}

import { useSocketNotifications } from "@/hooks/useSocketNotifications";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/auth-provider";

export default function Notifications() {
  const { notifications: socketNotifications } = useSocketNotifications();
  const [apiNotifications, setApiNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        const API_BASE = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_BASE}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data.notifications)) {
          setApiNotifications(data.notifications);
        } else {
          console.warn("Unexpected notifications response:", data);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, [user]);

  const allNotifications = [...apiNotifications, ...socketNotifications].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="p-4 bg-white shadow-md border rounded-sm h-[600px] overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {allNotifications.length === 0 ? (
        <p className="text-sm">No notifications yet.</p>
      ) : (
        <ul className="space-y-2">
          {allNotifications.map((n, index) => (
            <li className="p-2 bg-gray-100 rounded shadow" key={index}>
              <p className="text-sm text-gray-700">{n.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(n.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

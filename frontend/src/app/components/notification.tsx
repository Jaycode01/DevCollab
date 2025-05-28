import { useEffect, useState } from "react";
import io from "socket.io-client";

type Notification = {
  id: string;
  message: string;
};

export default function Notification() {
  const [notifyData, setnotifyData] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("notify", (data: { message: string }) => {
      const newNotification = {
        id: Date.now().toString(),
        message: data.message,
      };

      setnotifyData((prev) => [newNotification, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!notifyData || notifyData.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-md border p-4 w-full">
        <h3 className="text-xl font-semibold mb-4">All Notifications</h3>
        <p>No notifications available</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-md border p-4 w-full">
      <h3 className="text-xl font-semibold mb-4">All Notifications</h3>

      <div className="max-h-[400px] overflow-y-auto pr-2">
        {notifyData.map((notify) => (
          <div
            className="py-2 transition-all duration-300 hover:scale-95 cursor-pointer"
            key={notify.id}
          >
            <div className="p-3 border rounded-md shadow-sm">
              {notify.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

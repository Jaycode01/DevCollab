import { useSocketNotifications } from "@/hooks/useSocketNotifications";

export default function Notifications() {
  const { notifications } = useSocketNotifications();

  if (notifications.length === 0) {
    return <p className="text-gray-500">No notifications yet.</p>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white max-w-md aspect-square">
      <h2 className="text-xl font-semibold mb-2">Notifications</h2>
    </div>
  );
  <ul className="space-y-2">
    {notifications.map((notif, idx) => (
      <li key={idx} className="bg-gray-100 p-2 rounded">
        <div className="text-sm">{notif.message}</div>
        <div className="text-sm text-gray-500">
          {new Date(notif.timestamp).toLocaleString()}
        </div>
      </li>
    ))}
  </ul>;
}

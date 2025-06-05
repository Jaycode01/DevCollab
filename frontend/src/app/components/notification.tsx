import { useSocketNotifications } from "@/hooks/useSocketNotifications";

export default function Notifications() {
  const { notifications } = useSocketNotifications();

  return (
    <div className="p-4 bg-white shadow-md border rounded-sm">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-sm">No notifications yet.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n, index) => (
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

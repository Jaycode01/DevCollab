type Notification = {
  id: number;
  message: string;
};

type NotificationProps = {
  notifyData: Notification[];
};

export default function Notification({ notifyData }: NotificationProps) {
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

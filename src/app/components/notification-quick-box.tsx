import Link from "next/link";

type Notification = {
  id: number;
  message: string;
};

type NotificationQuickBoxProps = {
  topFive: Notification[];
};

export default function NotificationQuickBox({
  topFive,
}: NotificationQuickBoxProps) {
  return (
    <div className="absolute bg-white z-50 w-72 shadow-md rounded-md border p-4 right-0 top-16">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Recent Notifications</h4>
        <Link
          href="/dashboard"
          className="text-sm underline hover:text-blue-600 text-gray-900"
        >
          see all
        </Link>
      </div>

      {topFive.length === 0 ? (
        <p className="text-sm text-gray-500">No recent notifications</p>
      ) : (
        <ul className="text-sm text-gray-700 flex flex-col gap-2.5">
          {topFive.map((item) => (
            <li className="border-b pb-2 last:border-0" key={item.id}>
              {item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

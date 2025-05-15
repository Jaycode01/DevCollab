import Link from "next/link";

export default function NotificationQuickBox() {
  return (
    <>
      <div className="absolute bg-white w-72 shadow-md rounded-sm left-[-250px] z-50 top-16 py-4 px-3 flex flex-col gap-5">
        <h4 className="font-semi-bold mb-2 flex flex-row items-center justify-between">
          Notification{" "}
          <Link
            href="/dashboard"
            className="text-[12px] underline hover:text-blue-600 text-gray-900"
          >
            see all
          </Link>
        </h4>

        <ul className="text-sm text-gray-700 flex flex-col gap-2.5">
          <li className="py-1 border-b cursor-pointer">
            You have new task assigned
          </li>
          <li className="py- border-b cursor-pointer">
            Project {`"X"`} was updated
          </li>
          <li className="py-1 border-b cursor-pointer">
            New comment on you issue
          </li>
          <li className="py-1 cursor-pointer">
            You have a new invitation from abdulahi.0x
          </li>
        </ul>
      </div>
    </>
  );
}

export default function NotificationQuickBox() {
  return (
    <>
      <div className="absolute bg-white w-72 rounded-sm left-[-250px] z-50 top-16 py-4 px-3">
        <h4 className="font-semi-bold mb-2">Notification</h4>
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
            You have a new invitation from Abdulahi.0x
          </li>
        </ul>
      </div>
    </>
  );
}

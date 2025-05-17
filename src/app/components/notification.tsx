export default function Notification() {
  const notifications = [
    {
      id: 1,
      message: "New team member added",
    },
    {
      id: 2,
      message: "You just committed to X project",
    },

    {
      id: 3,
      message: "Peter Pan review your code",
    },

    {
      id: 4,
      message: "Peter Pan review your code",
    },

    {
      id: 5,
      message: "Peter Pan review your code",
    },

    {
      id: 6,
      message: "Peter Pan review your code",
    },
  ];
  return (
    <div className="aspect-square bg-white shadow-md rounded-md border">
      {notifications.map((notification) => (
        <div className="" key={notification.id}>
          <ul>
            <li className="">{notification.message}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

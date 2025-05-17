import Styles from "./styles/notifications.module.css";

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
    {
      id: 7,
      message: "Peter Pan review your code",
    },
    {
      id: 8,
      message: "Peter Pan review your code",
    },
  ];
  return (
    <div
      className={`aspect-square bg-white shadow-md rounded-md border p-4 h-[500px] md:h-fit w-full md:overflow-hidden overflow-auto whitespace-nowrap ${Styles.scrollHide}`}
    >
      <h3 className="text-[20px]">Notifications</h3>
      {notifications.map((notification) => (
        <div
          className="py-1.5 transition-transform duration-300 hover:scale-103"
          key={notification.id}
        >
          <ul>
            <li className="p-2.5 border shadow rounded">
              {notification.message}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

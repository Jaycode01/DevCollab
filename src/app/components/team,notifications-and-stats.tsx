import Calendar from "./calendar";
import Notification from "./notification";
import Team from "./team";

export default function TeamAndNotifications() {
  return (
    <div className="grid grid-cols-3 mt-2 gap-4 px-4 justify-between">
      <Team />
      <Notification />
      <Calendar />
    </div>
  );
}

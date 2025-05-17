import Calendar from "./calendar";
import Notification from "./notification";
import Team from "./team";

export default function TeamAndNotifications() {
  return (
    <div className="grid grid-cols-3 gap-4 px-4 mt-10 justify-between">
      <Team />
      <Notification />
      <Calendar />
    </div>
  );
}

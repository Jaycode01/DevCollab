import Calendar from "./calendar";
import Team from "./team";

export default function TeamAndNotifications() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-4 px-4 justify-between">
      <Team />
      <Calendar />
    </div>
  );
}

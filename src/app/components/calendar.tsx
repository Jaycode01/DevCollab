import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Calendar() {
  return (
    <div className="w-full h-full bg-white shadow-md rounded-md p-4 flex flex-col  justify-center items-center">
      <DayPicker className="w-full h-full m-auto" />
    </div>
  );
}

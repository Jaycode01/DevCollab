import CancelIcon from "../../../public/cancel.svg";
import Image from "next/image";
import User from "../../../public/user.svg";

export default function ViewTaskDetails() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1>Task Details</h1>{" "}
        <button type="button">
          <Image src={CancelIcon} alt="cancel icon" />
        </button>
      </div>
      <div className="border rounded p-2.5 mt-3">
        <div className="flex flex-row justify-between items-center">
          <h1>Task Title</h1>
          <p className="text-sm text-gray-900">Task Status</p>
        </div>
        <div className="flex flex-row justify-between items-center mt-2">
          <div className="flex flex-row">
            {/* users assigned to the task image */}
            <Image src={User} alt="user icon" />
            <Image src={User} alt="user icon" />
          </div>
          <p className="text-xs">Due Date</p>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <p className="text-sm text-gray-900 ">Task Description</p>
          <p className="text-sm">Created By: </p>
          <p className="text-sm">Created At:</p>
          <p className="text-sm">Last Updated:</p>
          <p className="text-sm">Comments: 2</p>
        </div>
      </div>
    </div>
  );
}

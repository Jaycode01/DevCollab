import Image from "next/image";
import CancelIcon from "../../../public/cancel.svg";

export default function UpdateTaskStatus() {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-[20px]">Update Task Status</h2>
        <button type="button">
          <Image src={CancelIcon} alt="cancel icon" />
        </button>
      </div>
      <form action="" className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="text-md">Update Task Status:</label>
          <select
            name=""
            id=""
            className="w-full px-4 py-2 text-sm border border-gray-900 outline-none"
          >
            <option value="">Update Status</option>
            <option value="">In Progress</option>
            <option value="">Completed</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-md">
            Update Comment:
          </label>
          <textarea
            name=""
            id=""
            className="text-sm border outline-none h-[200px] border-gray-900 px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-sm text-white w-full px-4 py-2 hover:bg-blue-500"
        >
          Update Status
        </button>
      </form>
    </div>
  );
}

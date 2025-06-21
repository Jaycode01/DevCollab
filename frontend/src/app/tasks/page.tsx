"use client";

import { useState } from "react";
import AddIcon from "../../../public/add.svg";
import { Circle, CheckCircle, AlertCircle } from "lucide-react";
import DeleteIocn from "../../../public/delete.svg";
import Dots from "../../../public/dots.svg";
import Image from "next/image";
import AddTasksModal from "../components/addTasksModal";

const statusStyles = {
  "In Progress": {
    icon: Circle,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  Completed: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  Due: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-100" },
};

type Task = {
  id: string;
  name: string;
  status: "In Progress" | "Completed" | "Due";
  dueDate: string;
};

export default function Tasks() {
  const [open, setopen] = useState(false);
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      name: "Fix dashboard loading",
      status: "In Progress",
      dueDate: "2025-06-22",
    },
    {
      id: "2",
      name: "Update user profile modal",
      status: "Completed",
      dueDate: "2025-06-22",
    },
    {
      id: "3",
      name: "Handle team deleteion edge case",
      status: "Due",
      dueDate: "2025-06-20",
    },
  ]);

  return (
    <>
      <div className="fixed top-[25%] left-[25%] w-1/2 bg-white shadow-md z-50 border rounded p-5">
        <AddTasksModal />
      </div>
      <div className="bg-gray-50 px-8 min-h-[100vh] border-t">
        {/* Header buttons */}
        <div className="w-full flex flex-row justify-end gap-5 pt-5 pr-5 items-center">
          <div className="relative inline-block text-left text-sm">
            <button
              className="border px-5 py-3 rounded"
              onClick={() => setopen(!open)}
            >
              All ▼
            </button>
            {open && (
              <div className="absolute mt-2 bg-white border rounded shadow w-40">
                <div className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                  <Circle className="text-yellow-500 w-4 h-4" /> In Progress
                </div>
                <div className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                  <CheckCircle className="text-green-600 w-4 h-4" /> Completed
                </div>
                <div className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                  <AlertCircle className="text-red-500 w-4 h-4" /> Due
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className="bg-blue-600 text-sm text-white py-3 px-5 flex items-center gap-1.5 hover:bg-blue-500"
          >
            Add New Task
            <Image src={AddIcon} alt="add icon" />
          </button>
        </div>

        {/* Task cards grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.map((task) => {
            const { icon: StatusIcon, color } = statusStyles[task.status];
            return (
              <div
                key={task.id}
                className="flex flex-col justify-between bg-white shadow border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-[17px] text-gray-900">
                      {task.name}
                    </h2>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src={DeleteIocn}
                      alt="delete icon"
                      width={18}
                      height={18}
                    />
                    <Image
                      src={Dots}
                      alt="more actions"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${color}`}
                  >
                    <StatusIcon className={`w-4 h-4`} />
                    {task.status}
                  </div>
                  <span className="text-xs text-gray-600">{task.dueDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

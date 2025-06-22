"use client";

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import AddIcon from "../../../public/add.svg";
import { Circle, CheckCircle, AlertCircle } from "lucide-react";
import DeleteIocn from "../../../public/delete.svg";
import Dots from "../../../public/dots.svg";
import Image from "next/image";
import AddTasksModal from "../components/addTasksModal";
import UpdateTaskStatus from "../components/updateTaskStatus";

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
  const [showModal, setshowModal] = useState(false);
  const [tasks, settasks] = useState<Task[]>([]);
  const [loading, setloading] = useState(true);
  const [activeDropdownTaskId, setactiveDropdownTaskId] = useState<
    string | null
  >(null);
  const [showStatusModal, setshowStatusModal] = useState(false);
  const [statusModalTaskId, setstatusModalTaskId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchTasks = async () => {
      setloading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await fetch(`${API_BASE}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch tasks");

        settasks(data.tasks);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setloading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleDropDown = (taskId: string) => {
    setactiveDropdownTaskId((prev) => (prev === taskId ? null : taskId));
  };

  const handleDelete = async (taskId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to dekte this task?"
    );
    if (!confirmed) return;

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw Error(data.error || "Delete failed.");

      alert("Task deleted.");
      settasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Delete task error:", err);
      alert("Failed to delete task.");
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed top-[25%] left-[25%] w-1/2 bg-white shadow-md z-50 border rounded p-5">
          <AddTasksModal onClose={() => setshowModal(false)} />
        </div>
      )}
      {showStatusModal && statusModalTaskId && (
        <div className="fixed top-[25%] left-[25%] w-1/2 bg-white shadow-md z-40 border rounded p-5">
          <UpdateTaskStatus
            onClose={() => {
              setstatusModalTaskId(null);
              setshowStatusModal(false);
            }}
            onStatusUpdated={() => {
              window.location.reload();
            }}
            taskId={statusModalTaskId}
          />
        </div>
      )}
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
            onClick={() => setshowModal(true)}
            className="bg-blue-600 text-sm text-white py-3 px-5 flex items-center gap-1.5 hover:bg-blue-500"
          >
            Add New Task
            <Image src={AddIcon} alt="add icon" />
          </button>
        </div>

        {/* Task cards grid */}
        <div className="mt-10">
          {loading ? (
            <p className="text-center text-sm text-gray-600">
              Loading tasks...
            </p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-sm text-gray-600">No tasks yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {tasks.map((task) => {
                const { icon: StatusIcon, color } = statusStyles[task.status];

                return (
                  <div
                    key={task.id}
                    className="flex flex-col justify-between bg-white shadow border rounded p-4 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-semibold text-[17px] text-gray-900">
                          {task.name}
                        </h2>
                      </div>
                      <div className="flex gap-1 relative">
                        <button
                          type="button"
                          onClick={() => handleDelete(task.id)}
                        >
                          {" "}
                          <Image
                            src={DeleteIocn}
                            alt="delete icon"
                            width={19}
                            height={19}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleDropDown(task.id)}
                        >
                          {" "}
                          <Image
                            src={Dots}
                            alt="more actions"
                            width={20}
                            height={20}
                          />
                        </button>
                        {activeDropdownTaskId === task.id && (
                          <div className="absolute top-6 w-[150px] right-[0px]">
                            <ul className="bg-white p-2.5 shadow-md border text-sm text-gray-900 ">
                              <li
                                onClick={() => {
                                  setstatusModalTaskId(task.id);
                                  setshowStatusModal(true);
                                  setactiveDropdownTaskId(null);
                                }}
                                className="hover:text-blue-600 hover:underline"
                              >
                                Update Status
                              </li>
                              <li className="hover:text-blue-600 hover:underline">
                                View
                              </li>
                              <li className="text-blue-600 hover:underline">
                                Edit
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <div
                        className={`flex items-center gap-1 text-xs font-medium ${color}`}
                      >
                        <StatusIcon className="w-h h-4" />
                        {task.status}
                      </div>
                      <span className="text-xs text-gray-600">
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

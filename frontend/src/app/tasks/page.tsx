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
import ViewTaskDetails from "../components/viewTaskDetails";
import EditTaskModal from "../components/editTaskModal";

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
  description: string;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  assignedTo?: string[];
  updates?: {
    comment: string;
    status: string;
    updatedAt: string;
  }[];
  teamId?: string;
  kind?: "personal" | "team";
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
  const [selectedTask, setselectedTask] = useState<Task | null>(null);
  const [showEditModal, setshowEditModal] = useState(false);
  const [taskToEdit, settaskToEdit] = useState<Task | null>(null);
  const [openKind, setopenKind] = useState(false);
  const [filterStatus, setfilterStatus] = useState<
    "In Progress" | "Completed" | "Due" | "All"
  >("All");
  const [filterKind, setfilterKind] = useState<"All" | "personal" | "team">(
    "All"
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

        console.log("fetched tasks:", data.tasks);
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
      "Are you sure you want to delete this task?"
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

  const filteredTasks = tasks
    .filter((task) =>
      filterStatus === "All" ? true : task.status === filterStatus
    )
    .filter((task) => (filterKind === "All" ? true : task.kind === filterKind));

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
      {selectedTask && (
        <div className="fixed top-[25%] left-[25%] w-1/2 shadow-md bg-white z-50  border rounded p-5 ">
          <ViewTaskDetails
            task={selectedTask}
            onClose={() => setselectedTask(null)}
          />
        </div>
      )}
      {showEditModal && taskToEdit && (
        <div className="fixed top-[25%] left-[25%] w-1/2 shadow-md bg-white z-50 border rounded p-5">
          <EditTaskModal
            task={taskToEdit}
            onClose={() => {
              setshowEditModal(false);
              settaskToEdit(null);
            }}
            onTaskUpdated={() => {
              window.location.reload();
            }}
          />
        </div>
      )}
      <div className="bg-gray-50 px-8 min-h-[100vh] border-t">
        {/* Header buttons */}
        <div className="w-full flex flex-row justify-end gap-5 pt-5 pr-5 items-center">
          <div className="relative inline-block text-left text-sm">
            <button
              type="button"
              className="border px-5 py-3 rounded"
              onClick={() => setopenKind(!openKind)}
            >
              {filterKind === "All"
                ? "All Tasks"
                : filterKind === "personal"
                ? "My Tasks"
                : "Team Tasks"}
            </button>
            {openKind && (
              <div className="absolute mt-2 bg-white border rounded shadow w-40 z-10">
                {["All", "personal", "team"].map((kind) => (
                  <div
                    key={kind}
                    onClick={() => {
                      setfilterKind(kind as "All" | "personal" | "team");
                      setopenKind(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
                  >
                    {kind === "All"
                      ? "All Tasks"
                      : kind === "personal"
                      ? "My Tasks"
                      : "Team Tasks"}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative inline-block text-left text-sm">
            <button
              className="border px-5 py-3 rounded"
              onClick={() => setopen(!open)}
            >
              {filterStatus} ▼
            </button>
            {open && (
              <div className="absolute mt-2 bg-white border rounded shadow w-40 z-10">
                {["All", "In Progress", "Completed", "Due"].map((status) => (
                  <div
                    key={status}
                    onClick={() => {
                      setfilterStatus(status as typeof filterStatus);
                      setopen(false);
                    }}
                    className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {status === "In Progress" && (
                      <Circle className="text-yellow-500 w-4 h-4" />
                    )}
                    {status === "Completed" && (
                      <CheckCircle className="text-green-600 w-4 h-4" />
                    )}
                    {status === "Due" && (
                      <AlertCircle className="text-red-500 w-4 h-4" />
                    )}
                    {status}
                  </div>
                ))}
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
          ) : filteredTasks.length === 0 ? (
            <p className="text-center text-sm text-gray-600">
              No tasks match selected status
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredTasks.map((task) => {
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
                              <li
                                onClick={() => {
                                  setselectedTask(task);
                                  setactiveDropdownTaskId(null);
                                }}
                                className="hover:text-blue-600 hover:underline"
                              >
                                View
                              </li>
                              <li
                                onClick={() => {
                                  settaskToEdit(task);
                                  setshowEditModal(true);
                                  setactiveDropdownTaskId(null);
                                }}
                                className="text-blue-600 hover:underline"
                              >
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

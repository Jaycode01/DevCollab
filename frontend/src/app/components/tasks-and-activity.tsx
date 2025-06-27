"use client";

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

type Task = {
  id: string;
  name: string;
  assignedTo?: string[];
  dueDate: string;
  teamId?: string;
  kind?: "personal" | "team";
  status: "In Progress" | "Completed" | "Due";
  tag?: string;
};

type FormattedTask = {
  id: string;
  name: string;
  assignee: string;
  date: string;
  tag: string;
  status: string;
};

export default function TasksAndActivity() {
  const [sorting, setSorting] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [loading, setloading] = useState<boolean>(true);
  const [allTasks, setallTasks] = useState<FormattedTask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setloading(true);
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
      if (!res.ok) {
        console.error("Failed to fetch tasks:", data.error);
        setloading(false);
        return;
      }

      const formatted = data.tasks.map((task: Task) => ({
        id: task.id,
        name: task.name,
        assignee: Array.isArray(task.assignedTo)
          ? task.assignedTo.join(", ")
          : "Unassigned",
        date: task.dueDate || "N/A",
        tag: task.kind === "team" ? "team" : "personal",
        status:
          task.status === "In Progress"
            ? "doing"
            : task.status === "Due"
            ? "due"
            : task.status.toLowerCase(),
      }));

      setallTasks(formatted);
      setloading(false);
    };

    fetchTasks();
  }, []);

  const filteredAndSorted = allTasks
    .filter((task) => !filterStatus || task.status === filterStatus)
    .filter((task) => !sorting || task.tag === sorting)
    .slice(0, 6);

  const renderTaskCard = (task: FormattedTask) => {
    const bgColor =
      task.tag === "personal"
        ? "#ADD8E6"
        : task.tag === "team"
        ? "#90ee90"
        : "#eee";

    const textColor = "#fff";

    return (
      <div
        key={task.id}
        className="flex flex-col shadow-md rounded border p-3 gap-4 hover:curpoi'"
      >
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-[16.5px] font-medium">{task.name}</h3>
          <p
            className="text-[11px] px-2 py-1 rounded"
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
          >
            {task.tag}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[14px]">{task.assignee || "Unassigned"}</p>
          <p className="text-[14px] text-gray-700">{task.date}</p>
        </div>
      </div>
    );
  };

  const activities = [
    {
      id: 1,
      time: "2 mins ago",
      user: "Mark",
      description: "Created a new task: Fix landing page bug",
    },
    {
      id: 2,
      time: "5 mins ago",
      user: "Thomas",
      description: "Updated project Marketing Website status to In Progress",
    },
    {
      id: 3,
      time: "8 mins ago",
      user: "Chris",
      description: "Commented on task Design login page",
    },
    {
      id: 4,
      time: "32 mins ago",
      user: "Deven",
      description: "Completed task Add feature section",
    },
    {
      id: 5,
      time: "1 hour ago",
      user: "Sofia",
      description: "Added new member John Doe to team Frontend Devs",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full p-4 gap-3 md:gap-5">
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-md md:p-6 p-3">
        <h3 className="md:text-[25px] text-[22px]">Recent Tasks</h3>
        <div>
          <div className="flex flex-row justify-between mt-3">
            <select
              className="bg-gray-200 p-2 outline-0 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="doing">Doing</option>
              <option value="due">Due</option>
              <option value="completed">Completed</option>
            </select>

            <select
              name="sort"
              id="sort"
              className="bg-gray-200 p-2 outline-0 text-sm"
              onChange={(e) => setSorting(e.target.value)}
              value={sorting}
            >
              <option value="">All</option>
              <option value="personal">Personal</option>
              <option value="team">Team</option>
            </select>
          </div>

          <div className="flex flex-col gap-5 mt-7">
            {loading ? (
              <p className="text-sm text-gray-500">Loading recent tasks...</p>
            ) : filteredAndSorted.length === 0 ? (
              <p className="text-sm txt-gray-500">No tasks yet.</p>
            ) : (
              filteredAndSorted.map(renderTaskCard)
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white shadow-md rounded-md p-6">
        <h3 className="md:text-[25px] text-[22px] font-bold">
          Activities Feed
        </h3>
        {activities.map((activity) => (
          <div
            className="flex flex-col pb-3 gap-3 md:gap-0 md:flex-row justify-between mt-10 border-b-2 hover:text-blue-600 "
            key={activity.id}
          >
            <div className="w-full md:w-[30%] text-sm">{activity.time}</div>
            <div className="w-full md:w-[30%] text-sm">{activity.user}</div>
            <div className="w-full md:w-[30%] text-sm">
              {activity.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

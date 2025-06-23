"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import cancelIcon from "../../../public/cancel.svg";
import Image from "next/image";

interface Props {
  onClose: () => void;
}

type TaskPayload = {
  name: string;
  description: string;
  dueDate: string;
  status: "In Progress" | "Completed" | "Due";
  assignedTo?: string[];
  teamId?: string;
};

export default function AddTasksModal({ onClose }: Props) {
  const [taskMode, settaskMode] = useState<"personal" | "team" | "">("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [assignedTo, setassignedTo] = useState<string[]>([]); //For team task
  const [teamId, setteamId] = useState("");
  const [teams, setteams] = useState<{ id: string; name: string }[]>([]);

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();

    const taskPayload: TaskPayload = {
      name,
      description,
      dueDate,
      status: "In Progress",
    };

    if (taskMode === "team" && assignedTo.length > 0 && teamId) {
      taskPayload.assignedTo = assignedTo;
      taskPayload.teamId = teamId;
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create task");

      alert("Task created successfully!");
      onClose();
    } catch (err) {
      console.error("Task create error:", err);
      alert("Error creating task.");
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      try {
        const res = await fetch(`${API_BASE}/api/teams/user-teams`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch teams.");

        setteams(data.teams);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    fetchTeams();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-[20px] font-semibold">Add Task</h1>
          <button type="button" onClick={onClose}>
            <Image src={cancelIcon} alt="cancel icon" />
          </button>
        </div>

        {/* Task mode selector */}
        <select
          onChange={(e) =>
            settaskMode(e.target.value as "personal" | "team" | "")
          }
          value={taskMode}
          className="w-full p-2 outline-none border border-gray-900 text-sm mt-5"
          required
        >
          <option value="">Choose Mode of Task</option>
          <option value="personal">My Task(Personal)</option>
          <option value="team">Team Task</option>
        </select>

        <form action="" onSubmit={handlesubmit}>
          {taskMode && (
            <div className="mt-7 flex flex-col gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Task Title"
                className="w-full border border-gray-900 px-4 py-2 text-sm outline-none"
              />
              <textarea
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Task Description"
                className="w-full border border-gray-900 px-3 py-4 outline-none text-sm h-[200px]"
              />
              <div className="flex flex-col gap-1 mt-2">
                <label htmlFor="dueDate" className="text-sm">
                  Due Date:
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setdueDate(e.target.value)}
                  className="w-full border border-gray-900 px-4 py-2 text-sm outline-none"
                  required
                />
              </div>
              <select
                name=""
                id=""
                className="w-full border border-gray-900 px-4 py-2 text-sm outline-none"
              >
                <option value="">Select Status</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="due">Due</option>
              </select>
            </div>
          )}

          {/* Extra fields for team Task */}
          {taskMode === "team" && (
            <div className="mt-5 flex flex-col gap-3">
              <select
                value={teamId}
                onChange={(e) => setteamId(e.target.value)}
                className="w-full border border-gray-900 px-4 py-2 text-sm"
                required
              >
                <option value="">Select Team</option>
                {/* Dynamic Teams fetched */}
                {teams.map((team) => (
                  <option value={team.id} key={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              <select
                multiple
                name=""
                id=""
                value={assignedTo}
                onChange={(e) =>
                  setassignedTo(
                    Array.from(e.target.selectedOptions, (opt) => opt.value)
                  )
                }
                className="w-full border border-gray-900 px-4 py-2 text-sm"
                required
              >
                <option value="">Assign to Member</option>
                {/* Dynamically load members later */}
                <option value="uid1">Member A</option>
                <option value="uid2">Member B</option>
              </select>
            </div>
          )}

          {taskMode && (
            <button
              type="submit"
              className="mt-5 w-full bg-blue-600 text-sm text-white py-2 hover:bg-blue-500"
            >
              Create Task
            </button>
          )}
        </form>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import cancelIcon from "../../../public/cancel.svg";
import Image from "next/image";

export default function AddTasksModal() {
  const [taskMode, settaskMode] = useState<"personal" | "team" | "">("");

  return (
    <>
      <div>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-[20px] font-semibold">Add Task</h1>
          <button type="button">
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
        >
          <option value="">Choose Mode of Task</option>
          <option value="personal">My Task(Personal)</option>
          <option value="team">Team Task</option>
        </select>

        {taskMode && (
          <div className="mt-7 flex flex-col gap-2">
            <input
              type="text"
              name=""
              id=""
              placeholder="Task Title"
              className="w-full border border-gray-900 px-4 py-2 text-sm outline-none"
            />
            <textarea
              name=""
              id=""
              placeholder="Task Description"
              className="w-full border border-gray-900 px-3 py-4 outline-none text-sm h-[200px]"
            />
            <input
              type="date"
              name=""
              id=""
              className="w-full border border-gray-900 px-4 py-2 text-sm outline-none"
            />
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
              name=""
              id=""
              className="w-full border border-gray-900 px-4 py-2 text-sm"
            >
              <option value="">Select Team</option>
              {/* Dynamic Teams fetched */}
              <option value="team1">Team 1</option>
              <option value="team2">Team 2</option>
            </select>
            <select
              name=""
              id=""
              className="w-full border border-gray-900 px-4 py-2 text-sm"
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
      </div>
    </>
  );
}

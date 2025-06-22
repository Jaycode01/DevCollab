"use client";

import CancelIcon from "../../../public/cancel.svg";
import Image from "next/image";
import User from "../../../public/user.svg";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

type TaskUpdate = {
  comment: string;
  status: string;
  updatedAt: string;
};
interface Props {
  onClose: () => void;
  task?: {
    name: string;
    status: string;
    description: string;
    dueDate: string;
    createdAt: string;
    createdBy: string;
    updatedAt?: string;
    assignedTo?: string[];
    updates?: TaskUpdate[];
  };
}

export default function ViewTaskDetails({ onClose, task }: Props) {
  const [createdByName, setcreatedByName] = useState("");

  useEffect(() => {
    const fetchCreatorName = async () => {
      try {
        const token = await getAuth().currentUser?.getIdToken();
        if (!token || !task?.createdBy) return;

        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await fetch(
          `${API_BASE}/api/users/${task.createdBy}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok && data.user?.name) {
          setcreatedByName(data.user.name);
        }
      } catch (err) {
        console.error("Failed to fetch creator name:", err);
      }
    };

    fetchCreatorName();
  }, [task?.createdBy]);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1>Task Details</h1>{" "}
        <button type="button" onClick={onClose}>
          <Image src={CancelIcon} alt="cancel icon" />
        </button>
      </div>
      <div className="border rounded p-2.5 mt-3">
        <div className="flex flex-row justify-between items-center">
          <h1>{task?.name || "Task Title"}</h1>
          <p className="text-sm text-gray-900">{task?.status}</p>
        </div>
        <div className="flex flex-row justify-between items-center mt-2">
          <div className="flex flex-row gap-1">
            {(task?.assignedTo || []).map((_, i) => (
              <Image src={User} alt="user icon" key={i} />
            ))}
          </div>
          <p className="text-xs">{task?.dueDate || "Due Date"}</p>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <p className="text-sm text-gray-900 ">
            Description: {task?.description}
          </p>
          <p className="text-sm">Created By: {createdByName || "Loading..."}</p>
          <p className="text-sm">
            Created At:{" "}
            {task?.createdAt && new Date(task.createdAt).toLocaleString()}
          </p>
          <p className="text-sm">
            Last Updated:
            {(task?.updatedAt || task?.createdAt) &&
              new Date(task?.updatedAt || task?.createdAt).toLocaleString()}
          </p>
          <p className="text-sm">Comments: {task?.updates?.length || 0}</p>
        </div>
      </div>
    </div>
  );
}

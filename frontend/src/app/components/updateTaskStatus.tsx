"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import CancelIcon from "../../../public/cancel.svg";

interface Props {
  taskId: string;
  onClose: () => void;
  onStatusUpdated?: () => void;
}

export default function UpdateTaskStatus({
  onClose,
  taskId,
  onStatusUpdated,
}: Props) {
  const [status, setstatus] = useState("");
  const [comment, setcomment] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, comment }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update statis");

      alert("Task status updated!");
      onClose();
      onStatusUpdated?.();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update task status.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-[20px]">Update Task Status</h2>
        <button type="button" onClick={onClose}>
          <Image src={CancelIcon} alt="cancel icon" />
        </button>
      </div>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="text-md">Update Task Status:</label>
          <select
            required
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-900 outline-none"
          >
            <option value="">Update Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-md">
            Update Comment:
          </label>
          <textarea
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
            className="text-sm border outline-none h-[200px] border-gray-900 px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-sm text-white w-full px-4 py-2 hover:bg-blue-500"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import Image from "next/image";
import CancelIcon from "../../../public/cancel.svg";
import { getAuth } from "firebase/auth";

interface Props {
  task: {
    id: string;
    name: string;
    description: string;
    dueDate: string;
  };
  onClose: () => void;
  onTaskUpdated?: () => void;
}

export default function EditTaskModal({ task, onClose, onTaskUpdated }: Props) {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setdueDate] = useState(task.dueDate);
  const [loading, setLoading] = useState(false);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getAuth().currentUser?.getIdToken();
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${API_BASE}/api/tasks/${task.id}/edit`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, dueDate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update task");

      alert("Task updated successfully.");
      onClose();
      onTaskUpdated?.();
    } catch (err) {
      console.error("Edit error:", err);
      alert("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-5">
        <h1>Edit Task Details</h1>
        <button type="button" onClick={onClose}>
          <Image src={CancelIcon} alt="cancel icon" />
        </button>
      </div>
      <form onSubmit={handleEdit} className="flex flex-col gap-5">
        <input
          type="text"
          className="text-sm border border-gray-900 px-4 py-2.5 outline-none"
          placeholder="Edit Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="text-sm border border-gray-900 px-4 py-2.5 outline-none h-[200px]"
          placeholder="Edit Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setdueDate(e.target.value)}
          className="text-sm px-4 py-2.5 border border-gray-900 outline-none"
        />

        <button
          type="submit"
          className="bg-blue-600 text-sm text-white py-2.5"
          disabled={loading}
        >
          {loading ? "Updating..." : "Edit Task"}
        </button>
      </form>
    </div>
  );
}

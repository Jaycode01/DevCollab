"use client";

import { useState } from "react";
import CancelIcon from "../../../public/cancel.svg";
import Image from "next/image";

type EditTeamProps = {
  team: {
    id: string;
    name: string;
    description?: string;
  };
  requesterUid: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditTeam({
  team,
  requesterUid,
  onClose,
  onSuccess,
}: EditTeamProps) {
  const [name, setname] = useState(team.name);
  const [description, setdescription] = useState(team.description || "");
  const [loading, setloading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Team name cannot be empty");
      return;
    }

    setloading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_BASE}/api/teams/${team.id}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, requesterUid }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update team.");
      } else {
        alert("Team updated successfully.");
        onSuccess();
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="p-5">
      <form action="" className="flex flex-col gap-5" onSubmit={handleUpdate}>
        <div className="flex flex-row justify-end">
          <button type="button" onClick={onClose}>
            <Image src={CancelIcon} alt="cancel icon" width={22} height={22} />
          </button>
        </div>
        <input
          type="text"
          name=""
          id=""
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="Edit team name..."
          className="border border-gray-900 py-3 px-5 text-sm text-gray-900 outline-none"
        />
        <textarea
          name=""
          id=""
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          placeholder="Edit team description..."
          className="h-[200px] border border-gray-900 outline-none text-sm py-3 px-5 text-gray-900"
        />
        <button
          type="submit"
          className="bg-blue-600 py-3 text-sm text-white"
          disabled={loading}
        >
          {loading ? "Updating" : "Update Team"}
        </button>
      </form>
    </div>
  );
}

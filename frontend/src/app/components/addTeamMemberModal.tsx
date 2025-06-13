"use client";

import { useState } from "react";
import Image from "next/image";
import CancelIcon from "../../../public/cancel.svg";

interface AddTeamMemberModalProps {
  teamId: string;
  onSuccess: () => void;
  onClose: () => void;
}

export default function AddTeamMemberModal({
  teamId,
  onSuccess,
  onClose,
}: AddTeamMemberModalProps) {
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    seterror("");

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(
        `${API_BASE}/api/teams/${teamId}/add-member`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, role }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        seterror(result.message || "Failed to add member.");
        return;
      }

      alert("Member added successfully!");
      onSuccess();
    } catch (err) {
      console.error(err);
      seterror("Something went wrong.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-end mb-2">
        <button type="button" onClick={onClose}>
          <Image alt="cancel icon" src={CancelIcon} />
        </button>
      </div>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-300">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="">{`User's Email`}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            name="usersEmail"
            id="usersEmail"
            className="border border-gray-900 px-5 py-3 outline-none text-sm"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">{`User's Role`}</label>
          <input
            type="text"
            name="UsersRole"
            id="usersrole"
            value={role}
            onChange={(e) => setrole(e.target.value)}
            className="border border-gray-900 px-5 py-3 outline-none text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white text-sm py-3 hover:bg-blue-500"
        >
          {loading ? "Adding..." : "Add Member"}
        </button>
      </form>
    </div>
  );
}

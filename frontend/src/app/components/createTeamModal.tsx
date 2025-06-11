"use client";

import { useState } from "react";

export default function CreateTeamModal({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [teamName, setteamName] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userUid = localStorage.getItem("userUid");

    if (!teamName || !userUid || !token) {
      seterror("Missing required info or you're not logged in.");
      return;
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    try {
      setloading(true);
      const res = await fetch(`${API_BASE}/api/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: teamName,
          description,
          userUid,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setteamName("");
      setdescription("");
      seterror("");
      if (onSuccess) onSuccess();
      alert(`Team: ${teamName} is created successfully!`);
    } catch (err) {
      console.error(err);
      seterror("Server error.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <form
        action=""
        method=""
        className="flex flex-col gap-7"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="">Team Name:</label>
          <input
            type="text"
            name="teamName"
            value={teamName}
            onChange={(e) => setteamName(e.target.value)}
            id=""
            className="border-gray-900 border py-3 px-5  text-[13px] text-gray-900 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Team Description:</label>
          <textarea
            name="teamDescription"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            id=""
            className="border-gray-900 border outline-none text-[13px] text-gray-900 py-3 px-5  h-[200px]"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="text-sm bg-blue-600 text-white py-3 px-5 hover:bg-blue-500 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Team"}
        </button>
      </form>
    </div>
  );
}

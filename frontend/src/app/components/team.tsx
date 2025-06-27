"use client";

import { getAuth } from "firebase/auth";
import Image from "next/image";
import { Dot } from "lucide-react";
import placeHolder from "../../../public/images/placeholder-image.png";
import { useState, useEffect } from "react";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  status: "online" | "offline" | "away" | "busy";
  image?: string;
};
export default function Team() {
  const [members, setmembers] = useState<TeamMember[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const API_BASE =
        process.env.NEXT_PUBLIC_AI_URL || "http://localhost:5000";

      try {
        const res = await fetch(`${API_BASE}/api/teams/random-members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch");

        setmembers(data.members);
      } catch (err) {
        console.error("Error fetching team members:", err);
      } finally {
        setloading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="bg-white p-4 aspect-square border rounded-sm shadow-md flex flex-col gap-5">
      <h3 className="text-[20px]mb-5">Team Members</h3>

      {loading ? (
        <p className="text-sm text-gray-500">Loading team members...</p>
      ) : members.length === 0 ? (
        <p className="text-sm text-gray-500">No team members found.</p>
      ) : (
        members.map((member) => (
          <div
            className="flex gap-3 items-center bg-white shadow-md p-2 rounded border transition-transform duration-300 hover:scale-105"
            key={member.id}
          >
            <div className="">
              <Image
                src={placeHolder}
                alt={member.name}
                width={70}
                height={70}
                className="border shadow rounded-full p-2"
              />
            </div>
            <div className="">
              <p className="text">{member.name}</p>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-gray-500">{member.role}</p>
                <Dot />
                <p className="text-[12px]">{member.status}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
